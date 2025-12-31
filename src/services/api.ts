import { Answer } from '@/views/CoffeeIdTest/type';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor：統一錯誤格式
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || '未知 API 錯誤';

    return Promise.reject(new Error(message));
  }
);
export const questionAPI = {
  // 獲取所有問題
  getQuestions() {
    return api.get('/api/questions');
  },
};
export const quizAPI = {
  calculateScores(answers: Answer[]) {
    return api.post('/api/quiz/calculate', { answers });
  },
};
export default api;
