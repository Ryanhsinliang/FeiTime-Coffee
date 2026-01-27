/**
 * 沖煮狀態管理 Composable
 * 從 App.vue 抽取的所有狀態相關邏輯
 */

import { ref, computed, reactive } from 'vue';
import type { BrewConfig, BloomState, SessionLogEntry } from '@/types/RefineTypes';
import {
    clamp,
    createBloomState,
    getIdealBloomWater,
    getIdealBloomTimeSec,
    getBloomQuality01,
    getExtractionIndex,
    getUniformityIndex,
    calculateSweetness,
    calculateAcidity,
    calculateClarity,
    calculateBody,
    calculateAftertaste
} from '@/utils/Refine/brewMath';

/**
 * 沖煮狀態 Composable
 * 管理所有沖煮過程中的狀態
 */
export function useBrewState() {
    // ====== 基本控制 ======
    const canvasContainer = ref<HTMLElement | null>(null);
    const showResultModal = ref(false);
    const isSnapshotting = ref(false);

    // ====== 手機版 UI 狀態 ======
    const showMobileSettings = ref(false);
    const showMobileStats = ref(false);
    const isMobile = ref(false);

    const checkMobile = () => {
        isMobile.value = window.innerWidth < 768;
    };

    // ====== 即時物理參數 ======
    const deltaSecRef = ref(0);
    const waterDeltaMlRef = ref(0);
    const flowRateMlPerSecRef = ref(0);

    // 互動式注水速率約 6 ml/s (≈360 ml/min)
    const pourRateMlPerSec = 6;

    // ====== 沖煮參數 ======
    const roastLevel = ref(0);  // -1 淺焙 到 1 深焙
    const grindLevel = ref(0);  // -1 細研磨 到 1 粗研磨

    const totalWater = ref(0);           // 輸入水量 (ml)
    const accumulatedCoffee = ref(0);    // 輸出咖啡液 (ml)
    const brewTimeSec = ref(0);          // 沖煮時間 (秒)
    const pours = ref(0);                 // 注水次數
    const isPouring = ref(false);        // 是否正在注水
    const hasStarted = ref(false);       // 是否已開始
    const startTime = ref(0);            // 開始時間戳
    const coffeeDose = 18;               // 咖啡粉量 (克)

    const lastPourStopTime = ref(0);
    const bloomState = reactive<BloomState>(createBloomState());

    const distributionScore = ref(1.0);
    const wetGrid = reactive([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    // ====== AI 日誌 ======
    const sessionLog = ref<SessionLogEntry[]>([]);
    let lastLogTime = 0;

    // ====== 計算屬性 ======

    /**
     * 當前粉水比
     */
    const currentRatio = computed(() => (totalWater.value / coffeeDose).toFixed(1));

    /**
     * 烘焙度標籤
     */
    const roastLabel = computed(() =>
        (roastLevel.value < -0.3) ? "淺焙 (Light)" :
            (roastLevel.value > 0.3) ? "深焙 (Dark)" : "中焙 (Medium)"
    );

    /**
     * 研磨度標籤
     */
    const grindLabel = computed(() =>
        (grindLevel.value < -0.3) ? "細研磨 (Fine)" :
            (grindLevel.value > 0.3) ? "粗研磨 (Coarse)" : "中研磨 (Medium)"
    );

    /**
     * 格式化時間 (mm:ss)
     */
    const formattedTime = computed(() => {
        const m = Math.floor(brewTimeSec.value / 60).toString().padStart(2, '0');
        const s = Math.floor(brewTimeSec.value % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    });

    /**
     * 悶蒸階段
     */
    const bloomPhase = computed(() => bloomState.phase);

    /**
     * 悶蒸階段顯示文字
     */
    const bloomPhaseDisplay = computed(() => {
        switch (bloomState.phase) {
            case 'wetting': return '潤濕 (Wetting)';
            case 'degassing': return '排氣 (Degassing)';
            case 'ready': return '就緒 (Ready)';
            default: return '待機 (Idle)';
        }
    });

    /**
     * 核心配置物件 - 提供給所有計算函數使用
     * ⚠️ 這是核心計算物件
     */
    const configObject = computed<BrewConfig>(() => {
        let extractionTime = 0;
        if (bloomState.phase === 'ready' && bloomState.readyAtSec !== null) {
            extractionTime = Math.max(0, brewTimeSec.value - bloomState.readyAtSec);
        }

        let bq = 0;
        if (bloomState.phase === 'ready') bq = getBloomQuality01(bloomState, {});

        return {
            roastLevel: roastLevel.value,
            ratio: parseFloat(currentRatio.value) || 1,
            brewTimeSec: Math.max(brewTimeSec.value, 1),
            extractionTimeSec: extractionTime,
            grindLevel: grindLevel.value,
            pours: Math.max(pours.value, 1),
            coffeeDose: coffeeDose,
            bloomQuality01: bq,
            distributionScore: distributionScore.value,

            bloomPhase: bloomState.phase,
            bloomSaturation01: bloomState.saturation01,
            bloomGasRelease01: bloomState.gasRelease01,
            bloomTimeSec: bloomState.elapsedSec,

            waterPouredMl: totalWater.value,
            waterTotal: coffeeDose * 16,
            elapsedSec: brewTimeSec.value,
            targetBrewTimeSec: 180,
            targetExtractionTimeSec: 150,

            // 即時物理參數
            isPouring: isPouring.value,
            deltaSec: deltaSecRef.value,
            waterDeltaMl: waterDeltaMlRef.value,
            flowRateMlPerSec: flowRateMlPerSecRef.value
        };
    });

    /**
     * 教練指引資訊
     */
    const coachInfo = computed(() => {
        const cfg = configObject.value;
        const idealWater = getIdealBloomWater(cfg);
        const idealTime = getIdealBloomTimeSec(cfg);
        const remainingDegas = Math.max(0, Math.ceil(idealTime - bloomState.elapsedSec));
        const targetTotal = cfg.coffeeDose * 16;

        let message = "";
        let subMessage = "";

        if (bloomState.phase === 'idle') {
            message = "準備開始 (Ready)";
            subMessage = "長按注水 (Hold to Pour)";
        } else if (bloomState.phase === 'wetting') {
            message = `注水至 ${Math.round(idealWater)}ml (Target: ${Math.round(idealWater)}ml)`;
            subMessage = "浸濕粉層 (Wet Grounds)";
        } else if (bloomState.phase === 'degassing') {
            message = `悶蒸倒數 ${remainingDegas}s`;
            subMessage = "釋放氣體 (Degassing)";
        } else {
            if (totalWater.value < targetTotal * 0.6) {
                message = `第一段注水至 ${Math.round(targetTotal * 0.6)}ml (1st Pour)`;
                subMessage = "繞圈注水 (Circle Pour)";
            } else {
                message = `第二段注水至 ${Math.round(targetTotal)}ml (2nd Pour)`;
                subMessage = "中心注水 (Center Pour)";
            }
        }

        return { idealWater, idealTime, remainingDegas, message, subMessage };
    });

    /**
     * 預測萃取率
     */
    const predictedYield = computed(() => {
        let base = 18;
        const timeFactor = Math.min(configObject.value.extractionTimeSec / 180, 1) * 4;
        const grindFactor = grindLevel.value * -1;
        return (base + timeFactor + grindFactor).toFixed(1);
    });

    /**
     * 當前萃取指數
     */
    const currentExtractionIndex = computed(() =>
        getExtractionIndex(configObject.value).toFixed(2)
    );

    /**
     * 當前均勻度指數
     * ⚠️ 關鍵功能
     */
    const currentUniformityIndex = computed(() =>
        getUniformityIndex(configObject.value).toFixed(2)
    );

    /**
     * 風味分數陣列 [甜感, 酸度, 澄澈度, 醇厚度, 餘韻]
     */
    const flavorScores = computed(() => [
        calculateSweetness(configObject.value),
        calculateAcidity(configObject.value),
        calculateClarity(configObject.value),
        calculateBody(configObject.value),
        calculateAftertaste(configObject.value)
    ]);

    /**
     * 萃取狀態視覺化
     */
    const extractionVisual = computed(() => {
        const valNum = getExtractionIndex(configObject.value);
        const pct = clamp(((valNum + 1) / 2) * 100, 5, 100);

        let colorClass = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
        let label = '完美 (Ideal)';

        if (valNum < -0.25) {
            colorClass = 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]';
            label = '欠萃 (Weak)';
        } else if (valNum > 0.25) {
            colorClass = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
            label = '過萃 (Strong)';
        }

        return { pct, colorClass, label, valNum, valText: valNum.toFixed(2) };
    });

    /**
     * 均勻度視覺化
     * ⚠️ 均勻度顯示 - 必須保留
     */
    const uniformityVisual = computed(() => {
        const valNum = getUniformityIndex(configObject.value);
        const pct = clamp(valNum * 100, 5, 100);

        let colorClass = 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]';
        let label = '極佳 (Excellent)';

        if (valNum < 0.6) {
            colorClass = 'bg-orange-500';
            label = '不均 (Poor)';
        } else if (valNum < 0.85) {
            colorClass = 'bg-amber-400';
            label = '尚可 (Avg)';
        }

        return { pct, colorClass, label, valNum, valText: valNum.toFixed(2) };
    });

    /**
     * 重置模擬
     */
    const resetSimulation = () => {
        showResultModal.value = false;
        isPouring.value = false;
        hasStarted.value = false;
        brewTimeSec.value = 0;
        totalWater.value = 0;
        accumulatedCoffee.value = 0;
        pours.value = 0;
        startTime.value = 0;
        lastPourStopTime.value = 0;

        Object.assign(bloomState, createBloomState());

        distributionScore.value = 1.0;

        for (let i = 0; i < wetGrid.length; i++) wetGrid[i] = 0;

        sessionLog.value = [];
        lastLogTime = 0;
    };

    /**
     * 增加日誌條目
     */
    const addLogEntry = (entry: SessionLogEntry) => {
        sessionLog.value.push(entry);
    };

    return {
        // DOM 參考
        canvasContainer,

        // UI 狀態
        showResultModal,
        isSnapshotting,
        showMobileSettings,
        showMobileStats,
        isMobile,
        checkMobile,

        // 物理參數 refs
        deltaSecRef,
        waterDeltaMlRef,
        flowRateMlPerSecRef,
        pourRateMlPerSec,

        // 沖煮參數
        roastLevel,
        grindLevel,
        totalWater,
        accumulatedCoffee,
        brewTimeSec,
        pours,
        isPouring,
        hasStarted,
        startTime,
        coffeeDose,
        lastPourStopTime,
        bloomState,
        distributionScore,
        wetGrid,

        // 日誌
        sessionLog,
        addLogEntry,

        // 計算屬性
        currentRatio,
        roastLabel,
        grindLabel,
        formattedTime,
        bloomPhase,
        bloomPhaseDisplay,
        configObject,
        coachInfo,
        predictedYield,
        currentExtractionIndex,
        currentUniformityIndex,
        flavorScores,
        extractionVisual,
        uniformityVisual,

        // 方法
        resetSimulation
    };
}
