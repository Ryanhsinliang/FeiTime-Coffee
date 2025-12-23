import api from '@/services/api';

/*呼叫 後端 Express 的 Gemini API
export async function callGemini(params: GeminiRequest): Promise<GeminiResponse> {
  const res = await api.post<GeminiResponse>('/api/gemini', params);
  return res.data;
}
*/

// export async function getProducts(): Promise<GeminiResponse> {
//   const res = await api.get<GeminiResponse>('/api/');
//   return res.data;
// }

export async function getProducts() {
  const res = await api.get('/api/products');
  return res.data;
}
