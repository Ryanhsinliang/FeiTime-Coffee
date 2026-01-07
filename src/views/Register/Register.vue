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
      class="w-1/3 my-3 mx-auto backdrop-blur-md bg-background-light/90 py-6 px-8 rounded-xl shadow-md"
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
          @blur="validate()"
          type="email"
          placeholder="請輸入帳號（Email）"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.email" class="text-amber-500 text-xs">{{ errors.email }}</p>

        <label class="block text-sm text-[#F3F3F3] mt-2">設定密碼</label>
        <input
          v-model="form.password"
          @blur="validate()"
          type="password"
          placeholder="請輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.password" class="text-amber-500 text-xs">{{ errors.password }}</p>

        <label class="block text-sm text-[#F3F3F3] mt-2">確認密碼</label>
        <input
          v-model="form.confirmPassword"
          @blur="validate()"
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
          @blur="validate()"
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
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { registerUser, resendConfirmationEmail } from '@/services/register/register';
  import { useUserStore } from '@/store/user';

  const userStore = useUserStore();
  const isSubmitted = ref(false);
  const isLoading = ref(false);
  const isResending = ref(false);

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/;

  function validate() {
    let isValid = true;
    (Object.keys(errors) as Array<keyof typeof errors>).forEach((key) => (errors[key] = ''));

    if (!form.email) {
      errors.email = '請輸入Email';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Email格式不符';
      isValid = false;
    }

    if (!form.password) {
      errors.password = '請輸入密碼';
      isValid = false;
    } else if (!passwordRegex.test(form.password)) {
      errors.password = '至少 8 碼，需含大小寫字母與數字';
      isValid = false;
    }

    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = '確認密碼不符，請再次輸入';
      isValid = false;
    }

    if (!form.name) {
      errors.name = '請輸入姓名';
      isValid = false;
    } else if (!nameRegex.test(form.name)) {
      errors.name = '姓名需為 2–20 字以下中、英文';
      isValid = false;
    }
    return isValid;
  }

  async function handleSubmit() {
    if (!validate() || isLoading.value) return;

    isLoading.value = true;
    try {
      await registerUser({
        username: form.name,
        email: form.email,
        password: form.password,
      });
      userStore.setPendingEmail(form.email);
      isSubmitted.value = true;
    } catch (error: any) {
      alert(error.response?.data?.error?.message || '註冊失敗');
    } finally {
      isLoading.value = false;
    }
  }

  async function handleResendEmail() {
    if (!form.email || isResending.value) return;

    isResending.value = true;
    try {
      await resendConfirmationEmail(form.email);
      alert('驗證信已重新發送，請至您的信箱查看。');
    } catch (error: any) {
      alert(error.response?.data?.error?.message || '發送失敗');
    } finally {
      isResending.value = false;
    }
  }
</script>
