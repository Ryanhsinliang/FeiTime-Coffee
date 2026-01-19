import api from './api';
export const resetPasswordService = {
    async resetPassword(code, password, passwordConfirmation, captchaToken) {
        await api.post('/api/auth/reset-password', {
            code,
            password,
            passwordConfirmation,
            captchaToken,
        });
    },
};
