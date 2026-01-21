// 檔案：src/brewLogic.js
// 這是純粹的計算邏輯，不包含任何 Vue 或 HTML 代碼

// 工具函式：限制數值範圍在 min 和 max 之間
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// ==========================================
// 1. 基礎指標計算 (Helper Functions)
// ==========================================

// 烘焙度索引 (-1:淺, 0:中, 1:深)
function getRoastIndex(cfg) {
  return clamp(cfg.roastLevel, -1, 1);
}

// 比例指標 (-1:濃/1:15, 0:均/1:16, 1:淡/1:17)
function getRatioNorm(cfg) {
  return clamp((cfg.ratio - 16) / 1, -1, 1);
}

// 強度指標
function getStrengthIndex(cfg) {
  return clamp((16 - cfg.ratio) / 3, -1, 1);
}

// 萃取指標 (<0:欠萃, >0:過萃)
function getExtractionIndex(cfg) {
  const idealTime = 165; // 2分45秒
  const timeNorm = clamp((cfg.brewTimeSec - idealTime) / 45, -1, 1);
  const grindNorm = clamp(cfg.grindLevel, -1, 1);
  return 0.6 * timeNorm + 0.4 * grindNorm;
}

// 均勻度指標 (0~1)
function getUniformityIndex(cfg) {
  let poursScore;
  if (cfg.pours === 3 || cfg.pours === 4) poursScore = 1.0;
  else if (cfg.pours === 2 || cfg.pours === 5) poursScore = 0.7;
  else poursScore = 0.4;

  const bloomDiff = Math.abs(cfg.bloomTimeSec - 30);
  const bloomScore = clamp(1 - bloomDiff / 30, 0.3, 1);

  return (poursScore + bloomScore) / 2;
}

// ==========================================
// 2. 五大風味計算 (Main Logic)
// ==========================================

// 甜度 (Sweetness)
export function calculateSweetness(cfg) {
  const rn = getRatioNorm(cfg);
  const ei = getExtractionIndex(cfg);
  const uni = getUniformityIndex(cfg);
  const roast = getRoastIndex(cfg);

  let baseFromRatio = 4 - 2 * Math.abs(rn);
  let extractionBoost = 1.5 * (1 - Math.abs(ei));
  let uniformityAdj = -0.5 * (1 - uni);
  let roastSweetAdj = 0.5 - 0.5 * Math.abs(roast); // 中焙最甜

  return clamp(
    baseFromRatio + extractionBoost + uniformityAdj + roastSweetAdj,
    1,
    5
  );
}

// 酸質 (Acidity)
export function calculateAcidity(cfg) {
  const rn = getRatioNorm(cfg);
  const ei = getExtractionIndex(cfg);
  const uni = getUniformityIndex(cfg);
  const roast = getRoastIndex(cfg);

  let baseFromRatio = 3.5 + 1.5 * rn;
  let extractionAdj = -1.5 * ei; // 欠萃酸高
  let roastAcidAdj = -1.2 * roast; // 淺焙(-1)加分，深焙(+1)扣分
  let uniformityAdj = -0.3 * (1 - uni);

  return clamp(
    baseFromRatio + extractionAdj + roastAcidAdj + uniformityAdj,
    1,
    5
  );
}

// 清晰度 (Clarity)
export function calculateClarity(cfg) {
  const rn = getRatioNorm(cfg);
  const ei = getExtractionIndex(cfg);
  const uni = getUniformityIndex(cfg);
  const roast = getRoastIndex(cfg);

  let baseFromRatio = 3 + 2 * rn;
  let uniformityBoost = 2 * (uni - 0.5);
  let extractionPenalty = -1.5 * Math.abs(ei);
  let roastPenalty = -0.8 * Math.max(roast, 0); // 深焙扣分

  return clamp(
    baseFromRatio + uniformityBoost + extractionPenalty + roastPenalty,
    1,
    5
  );
}

// 醇厚度 (Body)
export function calculateBody(cfg) {
  const rn = getRatioNorm(cfg);
  const si = getStrengthIndex(cfg);
  const ei = getExtractionIndex(cfg);
  const roast = getRoastIndex(cfg);

  let baseFromRatio = 3.5 - 1.5 * rn;
  let strengthBoost = 1.2 * si;
  let roastBodyBoost = 1.0 * roast; // 深焙加分
  const overExtraction = Math.max(ei - 0.5, 0);
  let extractionPenalty = -1.5 * overExtraction;

  return clamp(
    baseFromRatio + strengthBoost + roastBodyBoost + extractionPenalty,
    1,
    5
  );
}

// 餘韻 (Aftertaste)
export function calculateAftertaste(cfg) {
  const sweet = calculateSweetness(cfg);
  const body = calculateBody(cfg);

  const ei = getExtractionIndex(cfg);
  const uni = getUniformityIndex(cfg);
  const roast = getRoastIndex(cfg);

  let base = 0.5 * sweet + 0.5 * body;
  let extractionPenalty = -1.0 * Math.abs(ei);
  let uniformityBoost = 0.8 * (uni - 0.5);

  const roastEffectBase = 0.8 * roast;
  const extractionDamping = 1 - Math.min(Math.abs(ei), 1);
  let roastAftertasteAdj = roastEffectBase * extractionDamping;

  return clamp(
    base + extractionPenalty + uniformityBoost + roastAftertasteAdj,
    1,
    5
  );
}
