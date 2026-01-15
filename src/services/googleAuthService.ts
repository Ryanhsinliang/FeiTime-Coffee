export const googleAuthService = {
  // 發起 Google 登入（透過 Express）
  initiateGoogleLogin(): void {
    // 儲存當前路徑，登入後可以導回
    localStorage.setItem('redirectAfterLogin', window.location.pathname);

    // 導向 Express 的 Google connect endpoint
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${apiBaseUrl}/api/connect/google`;
  },
};
