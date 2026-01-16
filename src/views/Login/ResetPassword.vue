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
        <div class="relative z-10 max-w-md">
          <blockquote class="text-2xl font-medium leading-snug text-white drop-shadow-md">
            "一杯咖啡的時間，重新設定您的安全防護。"
          </blockquote>
        </div>
      </div>

      <div class="flex-1 flex flex-col relative w-full lg:w-1/2 bg-white dark:bg-background-dark">
        <div class="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div class="w-full max-w-md flex flex-col gap-8">
            <div class="flex flex-col gap-2 text-center lg:text-left">
              <h1
                class="text-3xl font-bold tracking-tight text-text-main dark:text-white lg:text-4xl"
              >
                設定新密碼
              </h1>
              <p class="text-text-muted dark:text-white/60 text-base">請輸入您的新密碼以完成重設</p>
            </div>

            <div
              v-if="errorMessage"
              class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl"
            >
              <span class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">error</span>
                {{ errorMessage }}
              </span>
            </div>

            <div
              v-if="isSuccess"
              class="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl flex flex-col gap-3"
            >
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined">check_circle</span>
                <span class="font-bold">密碼重設成功！</span>
              </div>
              <router-link to="/login" class="text-primary hover:underline font-bold">
                立即前往登入頁面 →
              </router-link>
            </div>

            <form v-if="!isSuccess" @submit.prevent="handleReset" class="flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-text-main dark:text-white" for="password">
                  新密碼
                </label>
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]"
                  >
                    lock
                  </span>
                  <input
                    v-model="form.password"
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 py-3.5 text-base text-text-main dark:text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="password"
                    placeholder="••••••••"
                    required
                    :type="isPasswordVisible ? 'text' : 'password'"
                  />
                  <button
                    @click="isPasswordVisible = !isPasswordVisible"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    type="button"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ isPasswordVisible ? 'visibility_off' : 'visibility' }}
                    </span>
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label
                  class="text-sm font-semibold text-text-main dark:text-white"
                  for="passwordConfirmation"
                >
                  確認新密碼
                </label>
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]"
                  >
                    lock_reset
                  </span>
                  <input
                    v-model="form.passwordConfirmation"
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 py-3.5 text-base text-text-main dark:text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="passwordConfirmation"
                    placeholder="••••••••"
                    required
                    :type="isComfirmeVisible ? 'text' : 'password'"
                  />
                  <button
                    @click="isComfirmeVisible = !isComfirmeVisible"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    type="button"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ isComfirmeVisible ? 'visibility_off' : 'visibility' }}
                    </span>
                  </button>
                </div>
              </div>
              <button
                :disabled="isLoading || !route.query.code"
                class="group relative flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-base font-bold hover:text-white shadow-sm hover:bg-[#8f9d89] transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
              >
                {{ isLoading ? '提交中...' : '確認修改密碼' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '../../store/auth';
  import { useReCaptcha } from 'vue-recaptcha-v3';

  const isPasswordVisible = ref(false);
  const isComfirmeVisible = ref(false);
  const recaptcha = useReCaptcha();
  const executeRecaptcha = recaptcha?.executeRecaptcha;
  const recaptchaLoaded = recaptcha?.recaptchaLoaded;
  const route = useRoute();
  const authStore = useAuthStore();

  const form = reactive({
    password: '',
    passwordConfirmation: '',
  });

  const isLoading = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

  onMounted(() => {
    if (!route.query.code) {
      errorMessage.value = '無效的重設連結。請重新從「忘記密碼」申請。';
    }
  });

  const handleReset = async () => {
    const cleanPassword = form.password.trim();
    const cleanConfirm = form.passwordConfirmation.trim();

    if (!passwordRegex.test(cleanPassword)) {
      errorMessage.value = '至少 8 碼，需含大小寫字母與數字';
      return;
    }
    if (cleanPassword !== cleanConfirm) {
      errorMessage.value = '兩次輸入的密碼不一致';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
      if (!recaptchaLoaded || !executeRecaptcha) {
        throw new Error('驗證插件尚未準備就緒');
      }
      await recaptchaLoaded();
      const captchaToken = await executeRecaptcha('reset_password');

      const result = await authStore.handleResetPassword(
        route.query.code as string,
        cleanPassword,
        cleanConfirm,
        captchaToken
      );

      if (result.success) {
        isSuccess.value = true;
      } else {
        errorMessage.value = authStore.banner?.message || '重設失敗，連結可能已過期。';
      }
      isLoading.value = false;
    } catch (err) {
      errorMessage.value = '驗證系統異常，請稍後再試';
    } finally {
      isLoading.value = false;
    }
  };
</script>
