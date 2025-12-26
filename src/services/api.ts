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

export default api;
