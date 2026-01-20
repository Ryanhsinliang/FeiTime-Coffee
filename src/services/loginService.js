import api from './api';
export const loginService = {
    async login(identifier, password, captchaToken) {
        const response = await api.post('/api/login', {
            identifier,
            password,
            captchaToken,
        });
        return response.data;
    },
};
