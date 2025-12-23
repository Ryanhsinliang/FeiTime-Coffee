//呼叫 後端 Express 的 Gemini API

export interface BeansRequest {
  roast: string; // 烘焙度，例如 "中焙"
  ratio: number; // 粉水比，例如 16
  brewTimeSec: number; // 沖煮時間（秒）
  grind: string; // 研磨度，例如 "中細"
  pours: number; // 注水段數
}

export interface GeminiResponse {
  text: string;
}

/**
 * 呼叫後端 Gemini API，傳 JSON 參數
 * @param params 手沖咖啡參數
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function callGemini(params: GeminiRequest): Promise<GeminiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params), // 直接傳 JSON，不包 prompt
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? `Gemini API error: ${res.status}`);
    }

    const data: GeminiResponse = await res.json();
    return data;
  } catch (error: any) {
    console.error('callGemini error', error);
    throw new Error(error.message || '未知 Gemini API 錯誤');
  }
}
