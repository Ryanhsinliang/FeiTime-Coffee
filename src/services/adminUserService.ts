import api from '@/services/api';

export interface UserRequest {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phone_number: string;
  shipping_address: string;
  user_role: string;
  user_id: string;
}

export interface UserListResponse {
  data: UserRequest[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface SingleUserResponse {
  data: UserRequest;
}

// 出貨資訊請求(前端傳給後端)
export interface updateUserRequest {
  data: UserRequest;
}

//呼叫 後端 Express 的 API
export async function getAllUsers(page = 1, pageSize = 100): Promise<UserListResponse> {
  const res = await api.get<UserListResponse>('/api/admin-users', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}

// 取得單筆訂單
export async function getUserById(id: string): Promise<SingleUserResponse> {
  const res = await api.get<SingleUserResponse>(`/api/admin-users/${id}`);
  return res.data;
}

// 出貨 API
export async function updateUser(
  // 前端傳給後端的東西
  id: string | number,
  data: Partial<updateUserRequest>
  // 後端處理完後，回來跟我說的結果
): Promise<{ success: boolean; message: string; data: UserRequest }> {
  const res = await api.put(`/api/admin-users/${id}`, data);
  return res.data;
}

export const userService = {
  // async getAllUsers(): Promise<UserRequest[]> {
  //   const res = await api.get('/api/admin-users');
  //   return res.data.data;
  // },

  // async getUserById(id: string | number): Promise<UserRequest> {
  //   const res = await api.get(`/api/admin-users/${id}`);
  //   return res.data.data;
  // },

  async getCurrentUser(): Promise<UserRequest> {
    const res = await api.get('/api/admin-users/me');
    return res.data.data;
  },

  // async updateUser(id: string | number, data: Partial<UserRequest>): Promise<UserRequest> {
  //   const res = await api.put(`/api/admin-users/${id}`, data);
  //   return res.data.data;
  // },
};
