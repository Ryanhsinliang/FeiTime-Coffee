// 背景 key，對應目前所有背景圖
export type BackgroundKey = 'cafe' | 'mountain' | 'escalator' | 'campus';

// 背景對應的圖片路徑
// 使用 Record 保證每個 key 都有對應的字串路徑
export type BackgroundMap = Record<BackgroundKey, string>;

// 如果之後想新增其他屬性，例如每個背景的描述或顏色
export interface BackgroundInfo {
  src: string; // 圖片路徑
  description?: string; // 可選描述
  color?: string; // 可選背景色或漸層
}

// 可擴展成 map，例如有更多背景屬性
export type BackgroundInfoMap = Record<BackgroundKey, BackgroundInfo>;

export interface QuizData {
  currentIndex: number;
  answers: (Option | undefined)[]; // 已選答案
  scores: Scores;
  questions: Question[];
  showResult: boolean;
}

export interface Scores {
  acidity: number;
  sweetness: number;
  body: number;
  aftertaste: number;
  clarity: number;
}

// export interface Option {
//   option: string; // a, b, c, d
//   label: string; // 選項文字
//   helper?: string; // 選項補充說明（可選）
//   score: Scores; // 分數物件
// }
export interface Option {
  option: string;
  label: string;
  helper: string;
  score: {
    acidity: number;
    sweetness: number;
    body: number;
    aftertaste: number;
    clarity: number;
  };
}
export interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
}
export interface QuizMethods {
  selectOption(score: Scores): void;
  recalculateScores(): void;
  toPreviousQuestion(): void;
  resetTest(): void;
}
