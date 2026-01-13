import axios from 'axios';
import api from './api';
import { st } from 'vue-router/dist/router-CWoNjPRp.mjs';
export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  user_role: 'Member' | 'Admin';

  role?: {
    type: string;
  };
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export const loginService = {
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/login', {
      identifier,
      password,
    });
    return response.data;
  },
};

export const forgotPasswordService = {
  async forgotPassword(email: string): Promise<void> {
    await api.post('api/auth/forgot-password', { email });
  },
};

export const resetPasswordService = {
  async resetPassword(code: string, password: string, passwordConfirmation: string): Promise<void> {
    await api.post('/api/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
  },
};
