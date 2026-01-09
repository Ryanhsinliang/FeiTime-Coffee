import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loginService } from '@/services/loginService';
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
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAdmin = computed(() => user.value?.user_role === 'Admin');

  const isLoggedIn = computed(() => {
    return !!token.value && !!user.value;
  });

  async function handleLogin(identifier: string, password: string) {
    try {
      const data: AuthResponse = await loginService.login(identifier, password);

      token.value = data.jwt;
      user.value = data.user;

      localStorage.setItem('token', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.clear();
  }
  return { user, token, isAdmin, isLoggedIn, handleLogin, logout };
});
