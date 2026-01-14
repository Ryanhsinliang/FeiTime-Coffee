import api from './api';

export const forgotPasswordService = {
  async forgotPassword(email: string): Promise<void> {
    await api.post('/api/auth/forgot-password', { email });
  },
};
