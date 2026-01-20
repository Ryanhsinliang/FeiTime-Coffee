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

      <div class="flex-1 flex flex-col relative w-full lg:w-1/2 bg-white dark:bg-background-dark">
        <div class="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div class="w-full max-w-md flex flex-col gap-8">
            <div class="flex flex-col gap-2 text-center lg:text-left">
              <h1 class="text-3xl font-bold tracking-tight text-text-main lg:text-4xl">
                喝下一杯專屬於您的個性
              </h1>
              <p class="text-text-muted text-base">歡迎光臨FeiTime Coffee</p>
            </div>

            <!-- 錯誤訊息 -->
            <div
              v-if="errorMessage"
              class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
            >
              <span class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">error</span>
                {{ errorMessage }}
              </span>
            </div>

            <!-- Google OAuth 錯誤提示 -->
            <div
              v-if="oauthError"
              class="p-4 bg-amber-50 border border-amber-200 rounded-xl dark:bg-amber-900/20 dark:border-amber-800"
            >
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl">
                  info
                </span>
                <div class="flex-1">
                  <p class="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">
                    {{ oauthError }}
                  </p>
                  <router-link
                    v-if="oauthError.includes('密碼')"
                    to="/forgot-password"
                    class="text-sm text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    忘記密碼？點此重設
                  </router-link>
                </div>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-text-main" for="email">Email / 帳號</label>
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted select-none pointer-events-none text-[20px]"
                  >
                    mail
                  </span>
                  <input
                    v-model="form.email"
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 py-3.5 text-base text-text-main placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="email"
                    placeholder="barista@coffeeco.com"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-text-main" for="password">密碼</label>
                <div class="relative group">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted select-none pointer-events-none text-[20px]"
                  >
                    lock
                  </span>
                  <input
                    v-model="form.password"
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 pr-11 py-3.5 text-base text-text-main placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="password"
                    placeholder="••••••••"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    required
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

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input
                    v-model="rememberMe"
                    class="peer h-5 w-5 rounded border-2 border-border-gray text-primary bg-white focus:ring-primary focus:ring-offset-0 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                    type="checkbox"
                  />
                  <span
                    class="text-sm font-medium text-text-main group-hover:text-primary transition-colors"
                  >
                    記住我
                  </span>
                </label>
                <router-link
                  to="/forgot-password"
                  class="text-sm font-medium text-primary hover:text-[#8f9d89] transition-colors"
                >
                  忘記密碼?
                </router-link>
              </div>

              <button
                :disabled="isLoading"
                class="group relative flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-base font-bold hover:text-white shadow-sm hover:bg-[#8f9d89] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
              >
                {{ isLoading ? '登入中...' : '登入' }}
                <span
                  v-if="!isLoading"
                  class="material-symbols-outlined absolute right-4 transition-transform group-hover:translate-x-1"
                >
                  arrow_forward
                </span>
              </button>
            </form>

            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-border-gray dark:border-white/10"></div>
              <span class="flex-shrink-0 mx-4 text-sm text-text-muted">或使用其他方式登入</span>
              <div class="flex-grow border-t border-border-gray dark:border-white/10"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button
                @click="handleGoogleLogin"
                :disabled="isGoogleLoading"
                class="flex items-center justify-center gap-3 rounded-xl border border-border-gray bg-white dark:bg-white/5 dark:border-white/10 px-4 py-3 text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                <i class="fa-brands fa-google" style="color: #abb7a5"></i>
                {{ isGoogleLoading ? '處理中...' : 'Google' }}
              </button>
              <button
                class="flex items-center justify-center gap-3 rounded-xl border border-border-gray bg-white dark:bg-white/5 dark:border-white/10 px-4 py-3 text-sm font-medium text-text-main hover:bg-background-light dark:hover:bg-[#abb7a5] transition-colors"
                type="button"
                disabled
              >
                <i class="fa-brands fa-apple" style="color: #abb7a5"></i>
                Apple
              </button>
            </div>

            <!-- OAuth 說明提示 -->
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
            >
              <div class="flex items-start gap-3">
                <span
                  class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl flex-shrink-0"
                >
                  info
                </span>
                <div class="text-sm text-blue-900 dark:text-blue-200">
                  <p class="font-medium mb-1">💡 使用 Google 登入</p>
                  <ul class="space-y-1 text-xs text-blue-800 dark:text-blue-300">
                    <li>• 首次使用會自動建立帳號</li>
                    <li>• 已註冊用戶會自動連結到現有帳號</li>
                    <li>• 可同時使用密碼和 Google 登入</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <p class="text-base text-text-muted">
                還沒有帳號?
                <router-link to="/Register" class="text-[#ABB7A5] hover:underline font-medium">
                  點我註冊
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useAuthStore } from '../../store/auth';
  import { useRouter, useRoute } from 'vue-router';
  import { useReCaptcha } from 'vue-recaptcha-v3';

  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();

  const recaptcha = useReCaptcha();
  const executeRecaptcha = recaptcha?.executeRecaptcha;
  const recaptchaLoaded = recaptcha?.recaptchaLoaded;

  const form = reactive({
    email: '',
    password: '',
  });

  const isLoading = ref(false);
  const isGoogleLoading = ref(false);
  const errorMessage = ref('');
  const oauthError = ref('');
  const isPasswordVisible = ref(false);
  const rememberMe = ref(false);

  onMounted(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      form.email = savedEmail;
      rememberMe.value = true;
    }

    const error = route.query.error as string;
    if (error) {
      switch (error) {
        case 'no_token':
          oauthError.value = '缺少授權資訊，請重試';
          break;
        case 'auth_failed':
          oauthError.value = 'Google 登入失敗，請稍後再試';
          break;
        case 'email_exists':
          oauthError.value = '此 Email 已使用密碼註冊，請使用密碼登入';
          break;
        case 'account_disabled':
          oauthError.value = '此帳號已被停用，請聯絡客服';
          break;
        default:
          oauthError.value = '登入時發生錯誤';
      }

      router.replace({ query: {} });
    }
  });

  const submitForm = async () => {
    const cleanEmail = form.email.trim();
    const cleanPassword = form.password.trim();

    if (!cleanEmail) {
      errorMessage.value = '請輸入帳號';
      return;
    } else if (!cleanPassword) {
      errorMessage.value = '請輸入密碼';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';
    oauthError.value = '';

    try {
      if (!recaptchaLoaded || !executeRecaptcha) {
        throw new Error('驗證插件尚未準備就緒');
      }
      await recaptchaLoaded();
      const captchaToken = await executeRecaptcha('login');
      const result = await authStore.handleLogin(
        form.email,
        form.password,
        rememberMe.value,
        captchaToken
      );

      if (result.success) {
        if (rememberMe.value) {
          localStorage.setItem('rememberedEmail', form.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        const redirectTo = route.query.redirect as string;
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push({ name: 'HomePage' });
        }
      } else {
        errorMessage.value = authStore.banner?.message || result.message || '登入失敗';
      }
    } catch (err) {
      errorMessage.value = '連線伺服器失敗，請稍後再試';
    } finally {
      isLoading.value = false;
    }
  };

  function handleGoogleLogin() {
    isGoogleLoading.value = true;
    errorMessage.value = '';
    oauthError.value = '';

    try {
      authStore.handleGoogleLogin();
    } catch (err) {
      isGoogleLoading.value = false;
      errorMessage.value = 'Google 登入啟動失敗';
    }
  }
</script>

<style scoped></style>
