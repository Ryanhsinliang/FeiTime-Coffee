import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Cookies from 'js-cookie';
import { loginService, type User, type AuthResponse } from '@/services/loginService';

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
      const message =
        err?.response?.data?.error?.message || err?.response?.data?.message || '帳號或密碼錯誤';
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
  return { user, token, isAdmin, isLoggedIn, banner, handleLogin, logout, setBanner, clearBanner };
});
