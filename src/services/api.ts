import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { ApiError } from '@/types/apiError';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const pathname = window.location.pathname;
    const isLoginPage = ['/login', '/Login'].includes(pathname);

    if (status === 401 && !isLoginPage) {
      localStorage.clear();
      Cookies.remove('auth_token');
      window.location.href = '/login';
      return Promise.reject(new Error('登入逾時，請重新登入'));
    }

    const responseData = error.response?.data as
      | { error?: string | { message?: string }; message?: string }
      | undefined;
    const serverData = responseData?.error;
    let finalMsg = '未知錯誤';

    if (typeof serverData === 'string') {
      finalMsg = serverData;
    } else if (serverData && typeof serverData === 'object' && serverData.message) {
      finalMsg = serverData.message;
    } else if (responseData?.message) {
      finalMsg = responseData.message;
    } else {
      finalMsg = error.message || '連線伺服器失敗';
    }

    const customError = new Error(finalMsg) as Error & ApiError;
    customError.status = status;
    customError.originalError = error;

    return Promise.reject(customError);
  }
);

export default api;
