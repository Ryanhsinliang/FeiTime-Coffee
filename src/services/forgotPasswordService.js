import api from './api';
export const forgotPasswordService = {
    async forgotPassword(email) {
        await api.post('/api/auth/forgot-password', { email });
    },
};
