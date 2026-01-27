import api from './api';
export interface User {
  id: number;
  documentId: string; // Strapi v5 Document ID
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  user_role: 'Member' | 'Admin';
  user_id: string; // LifeCycle 滾出的會員編號
  phone_number: string | null;
  shipping_address: string | null;

  role?: {
    type: string;
  };
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export const loginService = {
  async login(identifier: string, password: string, captchaToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/login', {
      identifier,
      password,
      captchaToken,
    });
    return response.data;
  },
};
