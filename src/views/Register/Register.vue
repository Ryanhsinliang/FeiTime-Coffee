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
      <h2 class="text-center text-2xl font-semibold mb-5 text-[#F3F3F3]">會員註冊</h2>
      <div class="auth-container">
        <div v-if="isSubmitted" class="success-message text-[#F3F3F3]">
          <h2>註冊成功，只剩最後一步！</h2>
          <p>
            驗證信已寄送至：
            <strong>{{ form.email }}</strong>
          </p>
          <p>請前往您的信箱點擊連結以啟用帳號</p>
          <router-link to="/login">去登入頁面</router-link>
        </div>
      </div>
      <form v-if="!isSubmitted" @submit.prevent="handleSubmit">
        <label class="block text-sm text-[#F3F3F3] mt-2">帳號（Email）</label>
        <input
          v-model="form.email"
          @blur="validate()"
          type="email"
          placeholder="請輸入帳號（Email）"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:[ring-blue-500]"
        />
        <p v-if="errors.email" class="text-amber-500 text-xs">
          {{ errors.email }}
        </p>

        <label class="block text-sm text-[#F3F3F3] mt-2">設定密碼</label>
        <input
          v-model="form.password"
          @blur="validate()"
          type="password"
          placeholder="請輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.password" class="text-amber-500 text-xs">
          {{ errors.password }}
        </p>

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
        <p v-if="errors.name" class="text-amber-500 text-xs">
          {{ errors.name }}
        </p>

        <!-- <label class="block text-sm text-[#F3F3F3]">手機號碼</label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="例如：0912345678"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> -->

        <button
          type="submit"
          class="w-full py-3 mt-3 bg-[#ABB7A5] text-white rounded-md text-base font-medium hover:bg-[#DCCFC0] transition"
        >
          註冊
        </button>
      </form>

      <div class="text-center mt-4 text-sm text-[#F3F3F3]">
        已有帳號？
        <router-link to="/login" class="text-[#ABB7A5] hover:underline">前往登入</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { registerUser } from '@/services/register/register';
  import { useUserStore } from '@/store/user';

  const userStore = useUserStore();
  const isSubmitted = ref(false);

  const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    // phone: '',
  });
  const errors = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    // phone: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/;
  // const phoneRegex = /^09\d{8}$/;

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

    // if (!form.phone) {
    //   errors.phone = '請輸入手機號碼';
    //   isValid = false;
    // } else if (!phoneRegex.test(form.phone)) {
    //   errors.phone = '手機號碼格式不符';
    //   isValid = false;
    // }
    return isValid;
  }
  async function handleSubmit() {
    if (!validate()) return;
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
    }
  }
</script>
