<template>
  <div
    class="-mt-5 font-wenkai bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary/30 selection:text-text-main"
  >
    <div class="relative min-h-screen w-full flex overflow-hidden">
      <div class="hidden lg:flex w-1/2 relative bg-secondary/20 flex-col justify-between p-12">
        <div class="absolute inset-0 z-0">
          <video
            src="./assets/iced_coffee.mp4"
            class="w-full h-full object-cover object-center"
            loop
            autoplay
            muted
          ></video>
          <div class="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          ></div>
        </div>
        <div class="relative z-10 flex items-center gap-3 text-white"></div>
        <div class="relative z-10 max-w-md">
          <blockquote class="text-2xl font-medium leading-snug text-white drop-shadow-md">
            "The perfect start to my morning. Every bean tells a story of origin and craft."
          </blockquote>
        </div>
      </div>

      <div class="w-full max-w-md mx-auto mt-20 mb-20 font-cactus">
        <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-8 py-10 flex flex-col gap-8">
          <!-- Title -->
          <div class="flex flex-col gap-2 text-center">
            <h1 class="text-3xl font-bold text-zinc-900 dark:text-white font-wenkai">找回密碼</h1>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              請輸入註冊時使用的 Email，我們將發送密碼重設連結給您。
            </p>
          </div>

          <form @submit.prevent="handleForgot" class="flex flex-col gap-6">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-wenkai">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="example@mail.com"
                class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
            </div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-primary/90 hover:bg-primary text-zinc-900 font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              {{ isLoading ? '發送中...' : '發送重設郵件' }}
            </button>
          </form>
          <div class="text-center">
            <router-link
              to="/login"
              class="w-full bg-primary/90 hover:bg-primary text-zinc-900 font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              返回登入
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '../../store/auth';

  const email = ref('');
  const isLoading = ref(false);
  const isSent = ref(false);
  const authStore = useAuthStore();
  const errorMessage = ref('');

  const handleForgot = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    const res = await authStore.handleForgotPassword(email.value);
    if (res.success) isSent.value = true;
    isLoading.value = false;
  };
</script>
