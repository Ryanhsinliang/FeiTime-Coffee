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

export interface CurrentUserResponse {
  data: UserRequest;
}

export type UserRole = 'Member' | 'Admin';

// 更新資訊請求(前端傳給後端)
export interface UpdateUserRequest {
  blocked: boolean;
  user_role: UserRole;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: UserRequest;
}

// 取得所有使用者
export async function getAllUsers(page = 1, pageSize = 100): Promise<UserListResponse> {
  const res = await api.get<UserListResponse>('/api/admin-users', {
    params: { page, pageSize },
  });
  return res.data;
}

// 取得單一使用者
export async function getUserById(id: string | number): Promise<SingleUserResponse> {
  const res = await api.get<SingleUserResponse>(`/api/admin-users/${id}`);
  return res.data;
}

// ✅ 取得當前登入使用者
export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const res = await api.get<CurrentUserResponse>('/api/admin-users/me');
  return res.data;
}

// ✅ 更新使用者（只送允許更新的欄位）
export async function updateUser(
  id: string | number,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> {
  const res = await api.put<UpdateUserResponse>(`/api/admin-users/${id}`, data);
  return res.data;
}
