//呼叫 後端 Express 的 Gemini API

export interface GeminiRequest {
  prompt: string;
}

export interface GeminiResponse {
  text: string;
}

/**
 * 呼叫後端 Gemini API
 * @param prompt 要生成的文字
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function callGemini(prompt: string): Promise<GeminiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt } as GeminiRequest),
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
