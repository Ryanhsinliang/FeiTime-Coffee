import api from '@/services/api';

// === 類型定義 ===

export interface CoffeeAssistantRequest {
  question: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface CoffeeAssistantResponse {
  answer: string;
}

// === API 函數 ===

/**
 * 呼叫咖啡小助手 API
 * @param question 使用者的提問
 * @param conversationHistory 對話歷史（最近 10 則訊息，即 5 輪對話）
 * @returns AI 助手的回答
 */
export async function askCoffeeAssistant(
  question: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<CoffeeAssistantResponse> {
  const res = await api.post<CoffeeAssistantResponse>('/api/gemini/chat', {
    question,
    conversationHistory,
  });
  return res.data;
}
