/**
 * ReFineCoffeeSimulator 沖煮數學計算模組
 * 
 * 從 App.vue 第 16-303 行抽取的所有萃取計算函數
 * ⚠️ 這些函數是核心計算邏輯，必須保持完全一致
 */

import type { BrewConfig, BloomState, BloomPhase } from '@/types/RefineTypes';

// ====== 基礎工具函數 ======

/**
 * 將數值限制在指定範圍內
 */
export function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
}

/**
 * 確保比例值不為零或負數
 */
export function safeRatio(r: number): number {
    return Math.max(r, 0.1);
}

/**
 * 線性插值
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

// ====== 烘焙/研磨/比例相關 ======

/**
 * 取得烘焙指數 (-1 淺焙 到 1 深焙)
 */
export function getRoastIndex(cfg: Partial<BrewConfig>): number {
    return clamp(cfg.roastLevel ?? 0, -1, 1);
}

/**
 * 取得比例正規化值 (以 1:16 為中心)
 */
export function getRatioNorm(cfg: Partial<BrewConfig>): number {
    const r = safeRatio(cfg.ratio ?? 16);
    const center = 16;
    const x = Math.log(r / center);
    const scale = 0.22;
    return Math.tanh(x / scale);
}

/**
 * 取得比例偏離度 (0~1，0 為最理想)
 */
export function getRatioDist01(cfg: Partial<BrewConfig>): number {
    const r = safeRatio(cfg.ratio ?? 16);
    const center = 16;
    const x = Math.abs(Math.log(r / center));
    const maxX = Math.abs(Math.log(50 / center));
    const dist = Math.log1p(x) / Math.log1p(maxX);
    return clamp(dist, 0, 1);
}

/**
 * 取得濃度指數 (比例越小越濃)
 */
export function getStrengthIndex(cfg: Partial<BrewConfig>): number {
    return -getRatioNorm(cfg);
}

// ====== 模擬進度 ======

/**
 * 取得模擬進度 (0~1)
 * 根據悶蒸階段或水量/時間計算
 */
export function getSimProgress01(cfg: Partial<BrewConfig>): number {
    if (typeof cfg.progress01 === 'number') return clamp(cfg.progress01, 0, 1);

    const phase = cfg.bloomPhase;
    if (phase === 'wetting') {
        const s = clamp(cfg.bloomSaturation01 ?? 0, 0, 1);
        return 0.25 * s;
    }
    if (phase === 'degassing') {
        const g = clamp(cfg.bloomGasRelease01 ?? 0, 0, 1);
        return 0.25 + 0.25 * g;
    }
    if (phase === 'ready') {
        const targetExt = Math.max(cfg.targetExtractionTimeSec ?? 165, 1);
        const extElapsed = clamp((cfg.extractionTimeSec ?? 0) / targetExt, 0, 1);
        return 0.5 + 0.5 * extElapsed;
    }
    if (typeof cfg.waterPouredMl === 'number' && typeof cfg.waterTotal === 'number' && cfg.waterTotal > 0) {
        return clamp(cfg.waterPouredMl / cfg.waterTotal, 0, 1);
    }
    if (typeof cfg.elapsedSec === 'number') {
        const target = cfg.targetBrewTimeSec ?? 165;
        return clamp(cfg.elapsedSec / Math.max(target, 1), 0, 1);
    }
    return 1;
}

// ====== 流速與滲透阻力 ======

/**
 * 取得流速 (ml/秒)
 */
export function getFlowRateMlPerSec(cfg: Partial<BrewConfig>): number {
    if (typeof cfg.flowRateMlPerSec === 'number') return Math.max(cfg.flowRateMlPerSec, 0);
    if (typeof cfg.waterDeltaMl === 'number' && typeof cfg.deltaSec === 'number' && cfg.deltaSec > 0) {
        return Math.max(cfg.waterDeltaMl / cfg.deltaSec, 0);
    }
    return 0;
}

/**
 * 取得滲透阻力 (0~1)
 * 細研磨 -> 高阻力，深焙 -> 略高阻力
 */
export function getPercolationResistance01(cfg: Partial<BrewConfig>): number {
    const grind = clamp(cfg.grindLevel ?? 0, -1, 1);   // -1 fine, +1 coarse
    const roast = clamp(cfg.roastLevel ?? 0, -1, 1);   // -1 light, +1 dark
    const fromGrind = 0.5 + 0.35 * (-grind);           // fine -> higher resistance
    const fromRoast = 0.05 * Math.max(roast, 0);       // dark -> slightly higher
    return clamp(fromGrind + fromRoast, 0, 1);
}

/**
 * 取得理想流速 (ml/秒)
 */
export function getIdealFlowMlPerSec(cfg: Partial<BrewConfig>): number {
    const r = getPercolationResistance01(cfg);
    // Target 2.0 ~ 5.0 ml/s
    return lerp(5.0, 2.0, r);
}

// ====== 悶蒸相關 ======

/**
 * 取得悶蒸品質對萃取的影響因子
 */
export function getBloomFactor(cfg: Partial<BrewConfig>): number {
    const bq = clamp(cfg.bloomQuality01 ?? 0, 0, 1);
    return 0.65 + 0.35 * bq;
}

/**
 * 取得排氣階段注水的懲罰值 (0 或 1)
 */
export function getDegassingPourPenalty01(cfg: Partial<BrewConfig>): number {
    const phase = cfg.bloomPhase;
    const pouring = !!cfg.isPouring;
    if (phase === 'degassing' && pouring) return 1;
    return 0;
}

/**
 * 建立初始悶蒸狀態
 */
export function createBloomState(): BloomState {
    return {
        phase: 'idle',
        waterAdded: 0,
        elapsedSec: 0,
        gasRelease01: 0,
        saturation01: 0,
        readyAtSec: null,
    };
}

/**
 * 取得咖啡粉量 (克)
 */
export function getCoffeeDose(cfg: Partial<BrewConfig>): number {
    if (typeof cfg.coffeeDose === 'number') return cfg.coffeeDose;
    if (typeof cfg.waterTotal === 'number' && typeof cfg.ratio === 'number') {
        return cfg.waterTotal / safeRatio(cfg.ratio);
    }
    return 18;
}

/**
 * 取得理想悶蒸水量 (ml)
 */
export function getIdealBloomWater(cfg: Partial<BrewConfig>): number {
    const dose = getCoffeeDose(cfg);
    const roast = getRoastIndex(cfg);
    return dose * (2.5 - 0.5 * roast);
}

/**
 * 取得理想悶蒸時間 (秒)
 */
export function getIdealBloomTimeSec(cfg: Partial<BrewConfig>): number {
    const roast = getRoastIndex(cfg);
    const grind = cfg.grindLevel ?? 0;
    return clamp(30 + 10 * (-roast) + 8 * grind, 20, 45);
}

/**
 * 開始悶蒸 (如果尚未開始)
 */
export function startBloomIfNeeded(state: BloomState): void {
    if (state.phase === 'idle') state.phase = 'wetting';
}

/**
 * 更新悶蒸浸濕階段
 */
export function updateBloomWetting(state: BloomState, deltaWater: number, cfg: Partial<BrewConfig>): void {
    startBloomIfNeeded(state);
    if (state.phase !== 'wetting') return;
    const idealWater = getIdealBloomWater(cfg);
    state.waterAdded += Math.max(deltaWater, 0);
    state.saturation01 = clamp(state.waterAdded / idealWater, 0, 1);
    if (state.saturation01 >= 1) {
        state.phase = 'degassing';
        state.elapsedSec = 0;
        state.gasRelease01 = 0;
    }
}

/**
 * 更新悶蒸排氣階段
 */
export function updateBloomDegassing(state: BloomState, deltaSec: number, cfg: Partial<BrewConfig>): void {
    if (state.phase !== 'degassing') return;
    state.elapsedSec += Math.max(deltaSec, 0);
    const idealBloomTime = getIdealBloomTimeSec(cfg);
    state.gasRelease01 = clamp(state.elapsedSec / idealBloomTime, 0, 1);
    if (state.gasRelease01 >= 1) {
        state.phase = 'ready';
        state.readyAtSec = cfg.elapsedSec ?? null;
    }
}

/**
 * 取得悶蒸品質 (0~1)
 */
export function getBloomQuality01(state: BloomState | null, cfg: Partial<BrewConfig>): number {
    if (!state || state.phase !== 'ready') return 0;
    return clamp(0.6 * state.saturation01 + 0.4 * state.gasRelease01, 0, 1);
}

// ====== 萃取指數 ======

/**
 * 取得萃取指數 (-1 欠萃 到 1 過萃)
 * ⚠️ 核心計算函數
 */
export function getExtractionIndex(cfg: Partial<BrewConfig>): number {
    const dose = getCoffeeDose(cfg);
    if (dose <= 0) return -1;

    const water = Math.max(cfg.waterPouredMl ?? 0, 0);
    const ratioNow = water / dose;

    const p = getSimProgress01(cfg); // 0..1

    // 1) Ratio term
    const ratioTerm = clamp((ratioNow / 16) - 1, -1, 1);

    // 2) Time/contact term
    const extT = Math.max(cfg.extractionTimeSec ?? 0, 0);
    const targetExtT = Math.max(cfg.targetExtractionTimeSec ?? 150, 1);

    const flow = getFlowRateMlPerSec(cfg);
    const idealFlow = getIdealFlowMlPerSec(cfg);

    // flowFactor: flow too fast -> <1, too slow -> >1
    const flowFactor = clamp(idealFlow / Math.max(flow, 0.1), 0.6, 1.4);

    const resistance = getPercolationResistance01(cfg);
    const resistanceFactor = lerp(0.9, 1.15, resistance);

    const contactProgress01 = clamp((extT / targetExtT) * flowFactor * resistanceFactor, 0, 1);

    // 3) Flow deviation term
    const flowDev = clamp((flow - idealFlow) / idealFlow, -1, 1);
    const flowTerm = clamp(flowDev, -1, 1);

    // 4) Grind term
    const grind = clamp(cfg.grindLevel ?? 0, -1, 1);
    const grindTerm = clamp(-grind, -1, 1);

    // Factors
    const bloomFactor = getBloomFactor(cfg);
    const degasPenalty = getDegassingPourPenalty01(cfg);
    const penaltyFactor = 1 - 0.25 * degasPenalty;

    // Combine
    const baseEi = lerp(-1, ratioTerm, contactProgress01);
    const biasEi = 0.25 * grindTerm + 0.20 * flowTerm;

    let targetEi = (baseEi + biasEi) * bloomFactor * penaltyFactor;
    targetEi = clamp(targetEi, -1, 1);

    // Progress Lerp
    const ei = lerp(-1, targetEi, clamp(p, 0, 1));
    return clamp(ei, -1, 1);
}

// ====== 均勻度指數 ======

/**
 * 取得均勻度指數 (0.1~1)
 * ⚠️ 關鍵功能 - 上次重構時遺失，必須完整保留
 */
export function getUniformityIndex(cfg: Partial<BrewConfig>): number {
    const p = clamp(getSimProgress01(cfg), 0, 1);

    const bq = clamp(cfg.bloomQuality01 ?? 0, 0, 1);
    const bloomBase = 0.55 + 0.45 * bq;

    const pours = Math.max(cfg.pours ?? 1, 1);
    let poursScore = 0.65;
    if (pours === 3 || pours === 4) poursScore = 1.0;
    else if (pours === 2 || pours === 5) poursScore = 0.85;
    else if (pours <= 1) poursScore = 0.60;
    else poursScore = 0.75;

    const grind = clamp(cfg.grindLevel ?? 0, -1, 1);
    const grindExtremePenalty = 0.18 * Math.abs(grind);

    const flow = getFlowRateMlPerSec(cfg);
    const idealFlow = getIdealFlowMlPerSec(cfg);
    const flowTooFast01 = clamp((flow - idealFlow) / idealFlow, 0, 1);
    const flowPenalty = 0.22 * flowTooFast01;

    const degasPenalty = getDegassingPourPenalty01(cfg);
    const degasPenaltyWeight = 0.30 * degasPenalty;

    const ratioDist = getRatioDist01(cfg);
    const ratioPenalty = 0.12 * ratioDist;

    let raw =
        bloomBase *
        poursScore *
        (1 - grindExtremePenalty) *
        (1 - flowPenalty) *
        (1 - degasPenaltyWeight) *
        (1 - ratioPenalty);

    raw = clamp(raw, 0.1, 1);

    const uni = lerp(0.1, raw, p);
    return clamp(uni, 0.1, 1);
}

// ====== 風味計算 ======

/**
 * 取得比例懲罰值
 */
export function getRatioPenalty(cfg: Partial<BrewConfig>, k: number): number {
    const rd = getRatioDist01(cfg);
    return -k * rd;
}

/**
 * 計算甜感 (1~5)
 */
export function calculateSweetness(cfg: Partial<BrewConfig>): number {
    const rn = getRatioNorm(cfg);
    const ei = getExtractionIndex(cfg);
    const uni = getUniformityIndex(cfg);
    const roast = getRoastIndex(cfg);
    return clamp(
        (4 - 2 * Math.abs(rn)) +
        (1.5 * (1 - Math.abs(ei))) +
        (-0.5 * (1 - uni)) +
        (0.5 - 0.5 * Math.abs(roast)) +
        getRatioPenalty(cfg, 1.6),
        1, 5
    );
}

/**
 * 計算酸度 (1~5)
 */
export function calculateAcidity(cfg: Partial<BrewConfig>): number {
    const rn = getRatioNorm(cfg);
    const ei = getExtractionIndex(cfg);
    const uni = getUniformityIndex(cfg);
    const roast = getRoastIndex(cfg);
    return clamp(
        (3.5 + 1.5 * rn) +
        (-1.5 * ei) +
        (-1.2 * roast) +
        (-0.3 * (1 - uni)) +
        getRatioPenalty(cfg, 0.6),
        1, 5
    );
}

/**
 * 計算澄澈度 (1~5)
 */
export function calculateClarity(cfg: Partial<BrewConfig>): number {
    const rn = getRatioNorm(cfg);
    const ei = getExtractionIndex(cfg);
    const uni = getUniformityIndex(cfg);
    const roast = getRoastIndex(cfg);
    return clamp(
        (3 + 2 * rn) +
        (2 * (uni - 0.5)) +
        (-1.5 * Math.abs(ei)) +
        (-0.8 * Math.max(roast, 0)) +
        getRatioPenalty(cfg, 1.8),
        1, 5
    );
}

/**
 * 計算醇厚度 (1~5)
 */
export function calculateBody(cfg: Partial<BrewConfig>): number {
    const rn = getRatioNorm(cfg);
    const si = getStrengthIndex(cfg);
    const ei = getExtractionIndex(cfg);
    const roast = getRoastIndex(cfg);
    const rd = getRatioDist01(cfg);
    return clamp(
        (3.5 - 1.5 * rn) +
        (1.2 * si) +
        (1.0 * roast) +
        (-1.5 * Math.max(ei - 0.5, 0)) +
        (rn > 0 ? -1.6 * rd : -0.8 * rd),
        1, 5
    );
}

/**
 * 計算餘韻 (1~5)
 */
export function calculateAftertaste(cfg: Partial<BrewConfig>): number {
    const sweet = calculateSweetness(cfg);
    const body = calculateBody(cfg);
    const ei = getExtractionIndex(cfg);
    const uni = getUniformityIndex(cfg);
    const roast = getRoastIndex(cfg);
    const rstAdj = (0.8 * roast) * (1 - Math.min(Math.abs(ei), 1));
    return clamp(
        (0.5 * sweet + 0.5 * body) +
        (-1.0 * Math.abs(ei)) +
        (0.8 * (uni - 0.5)) +
        rstAdj +
        getRatioPenalty(cfg, 1.2),
        1, 5
    );
}
