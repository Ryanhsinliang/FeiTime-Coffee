import axios from 'axios';

export const googleAuthService = {
  initiateGoogleLogin(): void {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${apiBaseUrl}/api/connect/google`;
  },
  async authenticateWithGoogle(accessToken: string) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(`${apiBaseUrl}/api/auth/google/callback`, {
      params: { access_token: accessToken },
    });
    return response.data;
  },
};
