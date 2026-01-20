import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Cookies from 'js-cookie';
import { loginService } from '../services/loginService';
import { forgotPasswordService } from '@/services/forgotPasswordService';
import { resetPasswordService } from '@/services/resetPasswordService';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;
export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const token = ref(Cookies.get('auth_token') || null);
    const isAdmin = computed(() => user.value?.user_role === 'Admin');
    const banner = ref(null);
    function setBanner(message, type = 'warning') {
        banner.value = { message, type };
    }
    function clearBanner() {
        banner.value = null;
    }
    const isLoggedIn = computed(() => {
        return !!token.value && !!user.value;
    });
    async function handleLogin(identifier, password, remember = false, captchaToken) {
        try {
            const data = await loginService.login(identifier, password, captchaToken);
            token.value = data.jwt;
            user.value = data.user;
            if (remember) {
                Cookies.set('auth_token', data.jwt, { expires: 7, sameSite: 'strict' });
            }
            else {
                Cookies.set('auth_token', data.jwt, { sameSite: 'strict' });
            }
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true };
        }
        catch (err) {
            const status = err.status;
            let message = err.message || '帳號或密碼錯誤';
            if (status === 401) {
                message = '帳號或密碼錯誤，請重新輸入';
            }
            else if (status === 429) {
                message = '登入嘗試次數過多，請於15分鐘後再試';
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
    async function handleForgotPassword(email) {
        try {
            clearBanner();
            await forgotPasswordService.forgotPassword(email);
            setBanner('重設密碼連結已發送至您的信箱', 'success');
            return { success: true };
        }
        catch (error) {
            const message = error.response?.data?.error?.message || '發送失敗，請稍後再試';
            setBanner(message, 'error');
            return { success: false };
        }
    }
    async function handleResetPassword(code, password, confirmPass, captchaToken) {
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
        }
        catch (error) {
            let displayMessage = '重設失敗，連結可能已過期或無效';
            const backendMessage = error.response?.data?.error?.message;
            if (backendMessage && error.response?.status < 500) {
                displayMessage = backendMessage;
            }
            setBanner(displayMessage, 'error');
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
