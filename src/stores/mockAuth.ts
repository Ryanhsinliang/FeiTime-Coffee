import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 模擬 Auth Store (Mock)
 * 目的: 在不影響負責 Auth 功能開發者的情況下，提供購物車開發所需的登入狀態。
 * 未來可以直接替換回真實的 Auth Store。
 */
export const useAuthStore = defineStore('auth', () => {
    // State - 模擬登入使用者資料
    const jwt = ref<string>('mock-jwt-token'); // 模擬 JWT Token
    const id = ref<number>(5);                 // 模擬 User ID (對應資料庫 ID)
    const user_id = ref<string>('FT1M2N3O4P5Q'); // 模擬會員編號
    const username = ref<string>('Charlene');  // 模擬使用者名稱
    const email = ref<string>('charlene@email.com');
    const isLoggedIn = ref<boolean>(true);     // 預設為已登入 (方便開發測試)

    // Actions - 模擬登入行為
    function login(userData: any) {
        jwt.value = userData.jwt;
        id.value = userData.user.id;
        user_id.value = userData.user.user_id;
        username.value = userData.user.username;
        email.value = userData.user.email;
        isLoggedIn.value = true;
    }

    // Actions - 模擬登出行為
    function logout() {
        jwt.value = '';
        id.value = 0;
        user_id.value = '';
        username.value = '';
        email.value = '';
        isLoggedIn.value = false;
    }

    return {
        jwt,
        id,
        user_id,
        username,
        email,
        isLoggedIn,
        login,
        logout
    };
}, {
    persist: true // 啟用持久化，重新整理後保持登入狀態
});
