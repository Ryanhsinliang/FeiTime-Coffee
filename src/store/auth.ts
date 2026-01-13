import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Cookies from 'js-cookie';
import {
  loginService,
  forgotPasswordService,
  resetPasswordService,
  type User,
  type AuthResponse,
} from '../services/loginService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref<string | null>(Cookies.get('auth_token') || null);
  const isAdmin = computed(() => user.value?.user_role === 'Admin');
  const banner = ref<{ message: string; type: 'success' | 'error' | 'warning' | null } | null>(
    null
  );

  function setBanner(message: string, type: 'success' | 'error' | 'warning' = 'warning') {
    banner.value = { message, type };
  }

  function clearBanner() {
    banner.value = null;
  }

  const isLoggedIn = computed(() => {
    return !!token.value && !!user.value;
  });

  async function handleLogin(identifier: string, password: string, remember: boolean = false) {
    try {
      const data: AuthResponse = await loginService.login(identifier, password);

      token.value = data.jwt;
      user.value = data.user;

      if (remember) {
        Cookies.set('auth_token', data.jwt, { expires: 7, sameSite: 'strict' });
      } else {
        Cookies.set('auth_token', data.jwt, { sameSite: 'strict' });
      }
      localStorage.setItem('user', JSON.stringify(data.user));

      return { success: true };
    } catch (err: any) {
      const status = err.status;
      let message = err.message || '帳號或密碼錯誤';
      if (status === 401) {
        message = '帳號或密碼錯誤，請重新輸入';
      } else if (status === 429) {
        message = '登入嘗試次數過多，請稍後再試';
      }

      setBanner(message, 'error');
      return { success: false, message };
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    Cookies.remove('auth_token');
  }

  async function handleForgotPassword(email: string) {
    try {
      clearBanner();
      await forgotPasswordService.forgotPassword(email);
      setBanner('重設密碼連結已發送至鄰的信箱', 'success');
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error?.message || '發送失敗，請稍後再試';
      setBanner(message, 'error');
      return { success: false };
    }
  }

  async function handleResetPassword(code: string, pass: string, confirmPass: string) {
    try {
      clearBanner();
      await resetPasswordService.resetPassword(code, pass, confirmPass);
      setBanner('密碼修改成功', 'success');
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error?.message || '重設失敗，連結可能已過期';
      setBanner(message, 'error');
      return { success: false };
    }
  }

  return {
    user,
    token,
    isAdmin,
    isLoggedIn,
    banner,
    handleLogin,
    handleForgotPassword,
    handleResetPassword,
    logout,
    setBanner,
    clearBanner,
  };
});
