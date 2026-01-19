import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 自動添加 token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  // 取得所有用戶
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get('/api/admin-users');
    return response.data.data;
  },

  // 取得單一用戶
  async getUserById(id: string | number): Promise<User> {
    const response = await apiClient.get(`/api/admin-users/${id}`);
    return response.data.data;
  },

  // 取得當前登入用戶
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/api/admin-users/me');
    return response.data.data;
  },

  // 更新用戶資訊
  async updateUser(id: string | number, data: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/api/admin-users/${id}`, data);
    // 如果更新的是當前用戶，更新 localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.id === id) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data.data;
  },
};
