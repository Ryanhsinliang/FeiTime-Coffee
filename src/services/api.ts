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
    const serverData = error.response?.data?.error;

    // 如果 serverData 是物件就抓裡面的 message
    const finalMsg =
      typeof serverData === 'object' && serverData !== null
        ? serverData.message
        : serverData || error.message || '未知錯誤';

    // 這樣 new Error 接收到的就是錯誤字串，而不是物件
    const customError = new Error(finalMsg);

    // 放入狀態碼用以判斷
    (customError as any).status = error.response?.status;

    return Promise.reject(customError);
  }
);

export default api;
