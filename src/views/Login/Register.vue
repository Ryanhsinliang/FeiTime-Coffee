<template>
  <!-- Body 等級的排版 -->
  <div class="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
    <!-- Container -->
    <div class="w-[420px] bg-white p-8 rounded-xl shadow-md">
      <h2 class="text-center text-2xl font-semibold mb-5 text-gray-800">會員註冊</h2>

      <form @submit.prevent="handleSubmit">
        <label class="block text-sm text-gray-700">帳號（Email）</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="請輸入帳號"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">設定密碼</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="請輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">確認密碼</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="請再次輸入密碼"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">姓名</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="請輸入姓名"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">電話</label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="例如：0912345678"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">郵遞區號</label>
        <input
          v-model="form.zipcode"
          type="text"
          placeholder="請輸入郵遞區號"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block text-sm text-gray-700">地址</label>
        <input
          v-model="form.address"
          type="text"
          placeholder="請輸入完整地址"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700 transition"
        >
          註冊
        </button>
      </form>

      <div class="text-center mt-4 text-sm">
        已有帳號？
        <RouterLink to="/login" class="text-blue-600 hover:underline">前往登入</RouterLink>
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
