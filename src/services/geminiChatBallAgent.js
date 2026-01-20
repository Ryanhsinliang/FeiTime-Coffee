import api from '@/services/api';
// === API 函數 ===
/**
 * 呼叫咖啡小助手 API
 * @param question 使用者的提問
 * @param conversationHistory 對話歷史（最近 10 則訊息，即 5 輪對話）
 * @returns AI 助手的回答
 */
export async function askCoffeeAssistant(question, conversationHistory = []) {
    const res = await api.post('/api/gemini/chat', {
        question,
        conversationHistory,
    });
    return res.data;
}
