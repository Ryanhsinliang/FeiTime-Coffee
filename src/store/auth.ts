import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Cookies from 'js-cookie';
import { loginService, type User, type AuthResponse } from '../services/loginService';
import { memberService } from '../services/memberService';
import { useCartStore } from './cart';

import { forgotPasswordService } from '@/services/forgotPasswordService';
import { resetPasswordService } from '@/services/resetPasswordService';
import { googleAuthService } from '@/services/googleAuthService';

import { ApiError } from '@/types/apiError';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref<string | null>(Cookies.get('auth_token') || null);
  const isAdmin = computed(() => {
    return user.value?.user_role === 'Admin' || user.value?.role?.type === 'admin';
  });

  const username = computed(() => {
    return user.value?.username;
  });
  const email = computed(() => {
    return user.value?.email;
  });
  const userId = computed(() => {
    return user.value?.user_id;
  });
  const phoneNumber = computed(() => {
    return user.value?.phone_number;
  });
  const shippingAddress = computed(() => {
    return user.value?.shipping_address;
  });

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

  async function handleLogin(
    identifier: string,
    password: string,
    remember: boolean = false,
    captchaToken: string
  ) {
    try {
      const data: AuthResponse = await loginService.login(identifier, password, captchaToken);

      token.value = data.jwt;
      user.value = data.user;

      if (remember) {
        Cookies.set('auth_token', data.jwt, { expires: 7, sameSite: 'strict' });
      } else {
        Cookies.set('auth_token', data.jwt, { sameSite: 'strict' });
      }
      localStorage.setItem('user', JSON.stringify(data.user));

      // 登入成功後，從 Strapi 載入購物車（傳入 userId 以繞過 computed 時序問題）
      const cartStore = useCartStore();
      await cartStore.loadCartFromStrapi(data.user.id);

      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;

      const status = error.status;
      let message = error.message || '帳號或密碼錯誤';

      if (status === 401) {
        message = '帳號或密碼錯誤，請重新輸入';
      } else if (status === 429) {
        message = '登入嘗試次數過多，請於15分鐘後再試';
      }

      setBanner(message, 'error');
      return { success: false, message };
    }
  }

  function logout() {
    // 清除認證資訊 (購物車清空由 Header.vue 負責，避免循環依賴)
    token.value = null;
    user.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    Cookies.remove('auth_token');
  }

  // 更新會員資料
  async function updateContactInfo(data: {
    phone_number?: string | null;
    shipping_address?: string | null;
  }) {
    if (!user.value) return { success: false, message: '請先登入' };

    try {
      await memberService.updateMemberInfo(user.value.id, data);
      // 更新本地狀態
      user.value = { ...user.value, ...data };
      localStorage.setItem('user', JSON.stringify(user.value));
      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.message || '更新失敗';
      return { success: false, message };
    }
  }

  async function handleForgotPassword(email: string) {
    try {
      clearBanner();
      await forgotPasswordService.forgotPassword(email);
      setBanner('重設密碼連結已發送至您的信箱', 'success');
      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.response?.data?.error?.message || '發送失敗，請稍後再試';
      setBanner(message, 'error');
      return { success: false };
    }
  }

  async function handleResetPassword(
    code: string,
    password: string,
    confirmPass: string,
    captchaToken: string
  ) {
    const cleanPassword = password.trim();
    const cleanConfirmPass = confirmPass.trim();
    try {
      clearBanner();
      if (cleanPassword !== cleanConfirmPass) {
        setBanner('兩次輸入的密碼不一致', 'error');
        return { success: false };
      }
      if (!passwordRegex.test(cleanPassword)) {
        setBanner('至少 8 碼，需含大小寫字母與數字', 'error');
        return { success: false };
      }
      await resetPasswordService.resetPassword(code, cleanPassword, cleanConfirmPass, captchaToken);
      setBanner('密碼修改成功', 'success');
      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;
      let displayMessage = '重設失敗，連結可能已過期或無效';
      const backendMessage = error.response?.data?.error?.message;
      const responseStatus = error.response?.status;

      if (backendMessage && responseStatus && responseStatus < 500) {
        displayMessage = backendMessage;
      }
      setBanner(displayMessage, 'error');
      return { success: false };
    }
  }
  function handleGoogleLogin() {
    try {
      clearBanner();
      const currentPath = window.location.pathname;
      const safeRedirectPath =
        currentPath === '/login' || currentPath === '/register' || currentPath === '/Login'
          ? '/'
          : currentPath;
      localStorage.setItem('redirectAfterLogin', safeRedirectPath);
      googleAuthService.initiateGoogleLogin();
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.message || 'Google 登入失敗';
      setBanner(message, 'error');
      return { success: false, message };
    }
  }

  function handleGoogleCallbackData(jwt: string, userData: User) {
    try {
      clearBanner();

      token.value = jwt;
      user.value = userData;

      Cookies.set('auth_token', jwt, { sameSite: 'strict' });
      localStorage.setItem('user', JSON.stringify(userData));

      // Google 登入成功後，從 Strapi 載入購物車（傳入 userId 以繞過 computed 時序問題）
      const cartStore = useCartStore();
      cartStore.loadCartFromStrapi(userData.id);

      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.message || 'Google 登入處理失敗';
      setBanner(message, 'error');
      return { success: false, message };
    }
  }

  return {
    user,
    token,
    isAdmin,
    username,
    email,
    userId,
    phoneNumber,
    shippingAddress,
    isLoggedIn,
    banner,
    handleLogin,
    handleGoogleLogin,
    handleGoogleCallbackData,
    handleForgotPassword,
    handleResetPassword,
    logout,
    updateContactInfo,
    setBanner,
    clearBanner,
  };
});
