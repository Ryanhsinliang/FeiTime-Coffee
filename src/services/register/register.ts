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
export const registerUser = async (data: RegisterInput) => {
  try {
    const response = await api.post<AuthResponse>('/api/auth/local/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendConfirmationEmail = (email: string) =>
  api.post('/api/auth/local/send-email-confirmation', { email });
