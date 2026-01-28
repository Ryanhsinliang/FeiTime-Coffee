<template>
  <div class="relative min-h-screen font-wenkai overflow-hidden">
    <video
      src="./assets/latte_art.mp4"
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover -z-10"
    ></video>
    <div class="absolute inset-0 bg-black/30 -z-10"></div>

    <div
      class="w-[95%] max-w-[450px] md:w-1/2 my-3 mx-auto backdrop-blur-md bg-background-light/90 py-6 px-8 rounded-xl shadow-md"
    >
      <h2 class="text-center text-2xl font-semibold mb-5 text-[#F3F3F3]">
        {{ isSubmitted ? '註冊確認' : '會員註冊' }}
      </h2>

      <div v-if="isSubmitted" class="text-center text-[#F3F3F3]">
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-4">註冊成功，只剩最後一步！</h3>
          <p>驗證信已寄送至：</p>
          <strong class="text-[#ABB7A5] block my-2">{{ form.email }}</strong>
          <p class="text-sm">請前往您的信箱點擊連結以啟用帳號</p>
        </div>

        <button
          @click="handleResendEmail"
          :disabled="isResending"
          class="text-sm text-[#ABB7A5] hover:text-[#DCCFC0] underline disabled:text-gray-500 mb-8 block mx-auto transition-colors"
        >
          {{ isResending ? '發送中...' : '沒收到信？點此重發驗證信' }}
        </button>

        <router-link
          to="/login"
          class="inline-block bg-[#ABB7A5] px-8 py-3 rounded-md text-white font-medium hover:bg-[#DCCFC0] transition shadow-sm"
        >
          去登入頁面
        </router-link>
      </div>

      <form v-else @submit.prevent="handleSubmit">
        <label class="block text-sm text-[#F3F3F3] mt-2">帳號（Email）</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="請輸入帳號（Email）"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.email" class="text-amber-500 text-xs">{{ errors.email }}</p>

        <label class="block text-sm text-[#F3F3F3] mt-2">設定密碼</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="請輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.password" class="text-amber-500 text-xs">{{ errors.password }}</p>

        <label class="block text-sm text-[#F3F3F3] mt-2">確認密碼</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="請再次輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.confirmPassword" class="text-amber-500 text-xs">
          {{ errors.confirmPassword }}
        </p>

        <label class="block text-sm text-[#F3F3F3] mt-2">姓名</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="請輸入姓名"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.name" class="text-amber-500 text-xs">{{ errors.name }}</p>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 mt-6 bg-[#ABB7A5] text-white rounded-md text-base font-medium hover:bg-[#DCCFC0] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isLoading ? '處理中...' : '註冊' }}
        </button>

        <div class="text-center mt-4 text-sm text-[#F3F3F3]">
          已有帳號？
          <router-link to="/login" class="text-[#ABB7A5] hover:underline">前往登入</router-link>
        </div>
        <p v-if="apiError" class="text-red-500 text-sm mt-2 text-center">{{ apiError }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { registerUser, resendConfirmationEmail } from '@/services/register/register';
  import { useUserStore } from '@/store/user';
  import { useAuthStore } from '@/store/auth';
  import { ApiError } from '@/types/apiError';

  const apiError = ref('');
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const isSubmitted = ref(false);
  const isLoading = ref(false);
  const isResending = ref(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/;

  const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const errors = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  function validate() {
    let isValid = true;
    (Object.keys(errors) as Array<keyof typeof errors>).forEach((key) => (errors[key] = ''));

    if (!form.email.trim()) {
      errors.email = '請輸入Email';
      isValid = false;
    } else if (!emailRegex.test(form.email.trim())) {
      errors.email = 'Email格式不符';
      isValid = false;
    }

    if (!form.password.trim()) {
      errors.password = '請輸入密碼';
      isValid = false;
    } else if (!passwordRegex.test(form.password.trim())) {
      errors.password = '至少 8 碼，需含大小寫字母與數字';
      isValid = false;
    }

    if (form.confirmPassword.trim() !== form.password.trim()) {
      errors.confirmPassword = '確認密碼不符，請再次輸入';
      isValid = false;
    }

    if (!form.name.trim()) {
      errors.name = '請輸入姓名';
      isValid = false;
    } else if (!nameRegex.test(form.name.trim())) {
      errors.name = '姓名需為 2–20 字以下中、英文';
      isValid = false;
    }
    return isValid;
  }

  async function handleSubmit() {
    authStore.clearBanner();
    if (!validate() || isLoading.value) return;

    isLoading.value = true;
    try {
      await registerUser({
        username: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      });
      userStore.setPendingEmail(form.email);
      isSubmitted.value = true;
      authStore.setBanner('註冊成功！請檢查電子信箱驗證帳號。', 'success');
    } catch (err: unknown) {
      let message = '註冊失敗，請稍後再試';
      const error = err as ApiError;
      const status = error.status;
      const serverMessage = error.message || '';

      if (status === 429) {
        message = '操作過於頻繁，請稍等 15 分鐘後再試。';
      } else if (status === 400) {
        if (serverMessage.includes('already taken') || serverMessage.includes('已被註冊')) {
          message = '此 Email 帳號已被註冊，請使用其他 Email 或直接登入。';
        } else if (serverMessage.includes('Invalid') || serverMessage.includes('格式')) {
          message = '輸入的資料格式有誤。';
        } else {
          message = serverMessage || '格式錯誤，請檢查輸入內容。';
        }
      } else if (status && status >= 500) {
        message = '伺服器維護中，請稍後再試。';
      } else {
        if (serverMessage.includes('Network Error')) {
          message = '網路連線不穩定，請檢查您的網路。';
        } else {
          message = serverMessage || message;
        }
      }
      authStore.setBanner(message, 'error');
    } finally {
      isLoading.value = false;
    }
  }

  async function handleResendEmail() {
    const targetEmail = form.email || userStore.pendingEmail;
    if (!targetEmail || isResending.value) return;

    isResending.value = true;
    try {
      await resendConfirmationEmail(targetEmail);
      authStore.setBanner('驗證信已重發，請查看信箱', 'success');
    } catch (err: unknown) {
      const error = err as ApiError;
      const status = error.status;
      let msg = error.message || '重發失敗，請稍後再試';
      if (status === 429) {
        msg = '發送頻率過高，請稍後再試。';
      } else if (status === 404) {
        msg = '找不到該帳號，請重新註冊。';
      }

      authStore.setBanner(msg, 'error');
    } finally {
      isResending.value = false;
    }
  }
</script>
