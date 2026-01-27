import api from '@/services/api';

export interface GeminiRequest {
  roast: string; // 烘焙度，例如 "中焙"
  ratio: number; // 粉水比，例如 16
  brewTimeSec: number; // 沖煮時間（秒）
  grind: string; // 研磨度，例如 "中細"
  pours: number; // 注水段數
}

export interface GeminiResponse {
  text: string;
}

// 呼叫後端 Express 的 Gemini API（咖啡沖煮參數）
export async function callGemini(params: GeminiRequest): Promise<GeminiResponse> {
  const res = await api.post<GeminiResponse>('/api/gemini', params);
  return res.data;
}

// 呼叫後端 Gemini API（純文字提示）
export async function geminiText(prompt: string): Promise<string> {
  const res = await api.post<GeminiResponse>('/api/gemini/text', { prompt });
  return res.data.text;
}
