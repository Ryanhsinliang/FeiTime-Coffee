<template>
  <!-- Body 等級的排版 -->
  <div class="relative min-h-screen font-wenkai overflow-hidden">
    <!-- Container -->
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
      <form @submit.prevent="handleSubmit">
        <label class="block text-sm text-[#F3F3F3]">帳號（Email）</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="請輸入帳號"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:[ring-blue-500]"
        />

        <label class="block text-sm text-[#F3F3F3]">設定密碼</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="請輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-[#F3F3F3]">確認密碼</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="請再次輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-[#F3F3F3]">姓名</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="請輸入姓名"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-[#F3F3F3]">電話</label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="例如：0912345678"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-[#F3F3F3]">郵遞區號</label>
        <input
          v-model="form.zipcode"
          type="text"
          placeholder="請輸入郵遞區號"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-[#F3F3F3]">地址</label>
        <input
          v-model="form.address"
          type="text"
          placeholder="請輸入完整地址"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full py-3 bg-[#ABB7A5] text-white rounded-md text-base font-medium hover:bg-[#DCCFC0] transition"
        >
          註冊
        </button>
      </form>

      <div class="text-center mt-4 text-sm text-[#F3F3F3]">
        已有帳號？
        <RouterLink to="/login" class="text-[#ABB7A5] hover:underline">前往登入</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { RouterLink } from 'vue-router';

  const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    zipcode: '',
    address: '',
  });

  function handleSubmit() {
    if (form.password !== form.confirmPassword) {
      alert('密碼不一致');
      return;
    }

    console.log('註冊資料', form);
  }
</script>
