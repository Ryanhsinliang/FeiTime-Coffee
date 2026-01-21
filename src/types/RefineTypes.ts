/**
 * ReFineCoffeeSimulator 類型定義
 * 從 App.vue 抽取的所有 TypeScript 介面
 */

// ====== 沖煮配置 ======

/**
 * 沖煮配置物件 - 包含所有計算所需的參數
 */
export interface BrewConfig {
    // 基本參數
    roastLevel: number;        // -1 (淺焙) 到 1 (深焙)
    grindLevel: number;        // -1 (細研磨) 到 1 (粗研磨)
    ratio: number;             // 粉水比 (例如 16 代表 1:16)
    coffeeDose: number;        // 咖啡粉量 (克)

    // 時間相關
    brewTimeSec: number;       // 總沖煮時間 (秒)
    extractionTimeSec: number; // 萃取時間 (排氣完成後)
    elapsedSec: number;        // 已經過時間
    targetBrewTimeSec: number; // 目標沖煮時間
    targetExtractionTimeSec: number; // 目標萃取時間

    // 水量相關
    waterPouredMl: number;     // 已注水量 (ml)
    waterTotal: number;        // 目標總水量 (ml)
    waterDeltaMl?: number;     // 每幀水量變化
    deltaSec?: number;         // 每幀時間變化
    flowRateMlPerSec?: number; // 流速 (ml/秒)

    // 悶蒸相關
    bloomPhase: BloomPhase;
    bloomSaturation01: number;  // 浸濕程度 0~1
    bloomGasRelease01: number;  // 排氣程度 0~1
    bloomTimeSec: number;       // 悶蒸已過時間
    bloomQuality01: number;     // 悶蒸品質 0~1

    // 其他
    pours: number;              // 注水次數
    distributionScore: number;  // 分佈分數
    isPouring: boolean;         // 是否正在注水
    progress01?: number;        // 模擬進度 0~1
}

// ====== 悶蒸狀態 ======

export type BloomPhase = 'idle' | 'wetting' | 'degassing' | 'ready';

/**
 * 悶蒸狀態物件
 */
export interface BloomState {
    phase: BloomPhase;
    waterAdded: number;       // 悶蒸注入水量
    elapsedSec: number;       // 悶蒸已過時間
    gasRelease01: number;     // 排氣程度 0~1
    saturation01: number;     // 浸濕程度 0~1
    readyAtSec: number | null; // 悶蒸完成時的總時間
}

// ====== AI 相關 ======

/**
 * AI 教練即時建議
 */
export interface AiAdvice {
    action: string;   // 行動建議
    reason: string;   // 原因說明
}

/**
 * AI 沖煮報告
 */
export interface AiReport {
    summary: string;              // 總結
    top_issues: string[];         // 主要問題
    next_attempt_plan: string[];  // 下次嘗試計劃
    taste_prediction: string;     // 風味預測
    loading: boolean;             // 載入中
    done: boolean;                // 完成
}

// ====== 視覺化相關 ======

/**
 * 萃取/均勻度進度條視覺資料
 */
export interface VisualIndicator {
    pct: number;        // 百分比 (用於進度條寬度)
    colorClass: string; // Tailwind 顏色類別
    label: string;      // 顯示標籤
    valNum: number;     // 原始數值
    valText: string;    // 格式化數值文字
}

// ====== 日誌相關 ======

/**
 * 沖煮過程日誌條目
 */
export interface SessionLogEntry {
    t: number;   // 時間 (秒)
    w: number;   // 水量 (ml)
    p: number;   // 是否注水 (1: 是, 0: 否)
    ph: string;  // 階段
}
