import api from '@/services/api';
//呼叫 後端 Express 的 Gemini API
export async function callGemini(params) {
    const res = await api.post('/api/gemini', params);
    return res.data;
}
