import api from '../api';
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}
export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export const registerUser = (data: RegisterInput) =>
  api.post<AuthResponse>('/api/auth/local/register', data);

export const resendConfirmationEmail = (email: string) =>
  api.post('/auth/local/send-email-confirmation', { email });
