<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Loading -->
    <div v-if="loading" class="min-w-[300px] rounded-lg bg-white p-8 text-center shadow-md">
      <div
        class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"
      ></div>
      <p class="text-gray-700">正在登入中...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="min-w-[300px] rounded-lg bg-white p-8 text-center shadow-md">
      <p class="mb-4 text-base text-red-600">
        {{ error }}
      </p>
      <button
        @click="router.push('/login')"
        class="rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
      >
        返回登入頁
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import type { User } from '@/services/loginService';

  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();

  const loading = ref(true);
  const error = ref('');

  onMounted(async () => {
    const jwt = route.query.jwt as string;
    const userStr = route.query.user as string;
    const errorParam = route.query.error as string;

    if (errorParam) {
      let errorMessage = 'Google 登入失敗';
      if (errorParam === 'no_token') {
        errorMessage = '缺少授權資訊';
      } else if (errorParam === 'auth_failed') {
        errorMessage = '驗證失敗，請重試';
      }

      error.value = errorMessage;
      loading.value = false;
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    if (!jwt || !userStr) {
      error.value = '登入資訊不完整';
      loading.value = false;
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    try {
      const userData: User = JSON.parse(decodeURIComponent(userStr));
      const result = authStore.handleGoogleCallbackData(jwt, userData);

      loading.value = false;

      if (result.success) {
        authStore.setBanner('登入成功！', 'success');

        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');

        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      } else {
        error.value = '登入失敗，請重試';
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err) {
      console.error('Parse error:', err);
      error.value = '處理登入資訊時發生錯誤';
      loading.value = false;
      setTimeout(() => router.push('/login'), 2000);
    }
  });
</script>
