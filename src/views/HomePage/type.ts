/**
 * HomePage 專屬型別定義與常數配置
 */

// ============================================
// 型別定義
// ============================================

/**
 * 風味選擇介面
 */
export interface Flavor {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

// ============================================
// 常數配置
// ============================================

/**
 * 產品風味中英文對照表
 */
export const flavorMap: Record<string, string> = {
  Fruity: '果香清爽',
  Floral: '花香明亮',
  Nutty: '堅果巧克力',
  Bold: '濃郁厚實',
};

/**
 * 風味顏色樣式對照表 (Tailwind CSS classes)
 */
export const flavorStyles: Record<string, string> = {
  Fruity: 'bg-orange-100 text-orange-700 border border-orange-200',
  Floral: 'bg-purple-100 text-purple-700 border border-purple-200',
  Nutty: 'bg-amber-100 text-amber-800 border border-amber-200',
  Bold: 'bg-stone-600 text-stone-200 border border-stone-300',
};
