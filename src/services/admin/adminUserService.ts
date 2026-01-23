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
  username?: string;
  phone_number?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: UserRequest;
}

// 更新自己的資訊請求(前端傳給後端)
export interface UpdateMeRequest {
  username?: string;
  phone_number?: string;
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

// ✅ 更新使用者（只送允許更新的欄位）
export async function updateUser(
  id: string | number,
  payload: UpdateUserRequest
): Promise<UpdateUserResponse> {
  const res = await api.put<UpdateUserResponse>(`/api/admin-users/${id}`, payload);
  return res.data;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function getCurrentUser(): Promise<ApiResponse<UserRequest>> {
  const res = await api.get<ApiResponse<UserRequest>>('/api/admin-users/me');
  return res.data;
}

export async function updateMe(payload: UpdateMeRequest): Promise<ApiResponse<UserRequest>> {
  const res = await api.put<ApiResponse<UserRequest>>('/api/admin-users/me', payload);
  return res.data;
}
