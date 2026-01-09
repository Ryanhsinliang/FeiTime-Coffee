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
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(new Error('登入逾時，請重新登入'));
    }
    const message = error.response?.data?.error || error.message || '未知API錯誤';
    return Promise.reject(new Error(message));
  }
);
export default api;
