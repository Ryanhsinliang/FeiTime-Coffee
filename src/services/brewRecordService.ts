import api from './api';

// 風味雷達數據結構
export interface FlavorRadar {
  sweetness: number;
  acidity: number;
  clarity: number;
  body: number;
  aftertaste: number;
}

// AI 反饋數據結構
export interface AIFeedback {
  summary: string;
  taste_prediction: string;
  top_issues: string[];
  next_attempt_plan: string[];
}

// 時間軸事件（日誌條目）
export interface TimelineEvent {
  t: number; // 時間
  w: number; // 水量
  ph: string; // 階段
}

// 創建沖煮記錄的請求參數
export interface CreateBrewRecordParams {
  title?: string | null;
  hardware_setup?: string | null;
  bean_roast?: string | null;
  grind_level?: string | null;
  water_temp?: number | null;
  dose_weight?: number | null;
  total_water?: number | null;
  pour_count?: number | null;
  brew_time?: string | null;
  timeline_events?: TimelineEvent[] | null;
  extraction_yield?: string | null;
  uniformity?: string | null; // 均勻度
  flavor_radar?: FlavorRadar | null;
  ai_feedback?: AIFeedback | null;
  user_rating?: number | null;
  brew_img?: string | null;
  is_public?: boolean | null;
  user?: number | string | null; // 用戶 ID 或 documentId
  product?: string | null; // 產品 documentId
}

// 沖煮記錄回應結構
export interface BrewRecord {
  id: number;
  documentId: string;
  title: string | null;
  hardware_setup: string | null;
  bean_roast: string | null;
  grind_level: string | null;
  water_temp: number | null;
  dose_weight: number | null;
  total_water: number | null;
  pour_count: number | null;
  brew_time: string | null;
  timeline_events: TimelineEvent[] | null;
  extraction_yield: string | null;
  uniformity: string | null; // 均勻度
  flavor_radar: FlavorRadar | null;
  ai_feedback: AIFeedback | null;
  user_rating: number | null;
  brew_img: string | null;
  is_public: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export const brewRecordService = {
  /**
   * 創建沖煮記錄（直接透過 Strapi REST API）
   */
  async createBrewRecord(params: CreateBrewRecordParams): Promise<BrewRecord> {
    const response = await api.post('/api/brew-logs', {
      data: params,
    });
    return response.data.data;
  },

  /**
   * 獲取用戶的沖煮記錄（透過後端代理）
   */
  async getUserBrewRecords(userId: number): Promise<BrewRecord[]> {
    const response = await api.get('/api/gemini/refine/logs', {
      params: {
        userId,
      },
    });
    return response.data.data || [];
  },

  /**
   * 獲取單個沖煮記錄
   */
  async getBrewRecord(documentId: string): Promise<BrewRecord | null> {
    const response = await api.get(`/api/gemini/refine/report/${documentId}`, {
      params: {
        populate: '*',
      },
    });
    return response.data.data || null;
  },

  /**
   * 透過 Gemini refine API 保存沖煮紀錄卡片
   */
  async saveBrewLog(
    params: CreateBrewRecordParams
  ): Promise<{ success: boolean; data: BrewRecord }> {
    const response = await api.post('/api/gemini/refine/save-log', {
      brewLog: params,
    });
    return response.data;
  },
};
