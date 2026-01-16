import api from './api';

export const resetPasswordService = {
  async resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string,
    captchaToken: string
  ): Promise<void> {
    await api.post('/api/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
      captchaToken,
    });
  },
};
