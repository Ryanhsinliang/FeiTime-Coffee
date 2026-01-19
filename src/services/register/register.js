import api from '../api';
export const registerUser = async (data) => {
    try {
        const response = await api.post('/api/auth/local/register', data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
export const resendConfirmationEmail = (email) => api.post('/api/auth/local/send-email-confirmation', { email });
