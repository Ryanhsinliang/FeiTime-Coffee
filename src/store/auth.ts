import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loginService } from '@/services/loginService';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  user_role: 'Member' | 'Admin';

  role?: {
    type: string;
  };
}
interface AuthResponse {
  jwt: string;
  user: User;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref<string | null>(Cookies.get('auth_token') || 'null');

  const isAdmin = computed(() => user.value?.user_role === 'Admin');

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

      return { success: false, message };
    }
  }
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.clear();
  }
  return { user, token, isAdmin, isLoggedIn, handleLogin, logout };
});
