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

  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();

  const loading = ref(true);
  const error = ref('');

  onMounted(async () => {
    const googleAccessToken = (route.query.access_token || route.query.id_token) as string;
    const finalJwt = route.query.jwt as string;
    const userStr = route.query.user as string;
    if (finalJwt && userStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userStr));
        authStore.handleGoogleCallbackData(finalJwt, userData);
        if (authStore.isLoggedIn) {
          authStore.setBanner('登入成功！', 'success');
          let redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
          localStorage.removeItem('redirectAfterLogin');
          const lowerPath = redirectPath.toLowerCase();
          if (
            lowerPath === '/login' ||
            lowerPath === '/register' ||
            lowerPath.includes('callback')
          ) {
            redirectPath = '/';
          }

          console.log('最終跳轉目標:', redirectPath);
          setTimeout(() => {
            if (redirectPath === '/') {
              router.replace({ name: 'HomePage' });
            } else {
              router.replace(redirectPath);
            }
          }, 200);
        }
        return;
      } catch (e) {
        console.error('解析失敗', e);
      }
    }

    if (googleAccessToken) {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const backendUrl = `${apiBaseUrl}/api/auth/google/callback?access_token=${googleAccessToken}`;
      window.location.href = backendUrl;
      return;
    }

    console.error('缺少憑證資訊');
  });
</script>
