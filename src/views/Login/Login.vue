<template lang="">
  <div
    class="-mt-5 font-wenkai bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary/30 selection:text-text-main"
  >
    <div class="relative min-h-screen w-full flex overflow-hidden">
      <!-- Left Side: Visual/Branding -->
      <div class="hidden lg:flex w-1/2 relative bg-secondary/20 flex-col justify-between p-12">
        <!-- Background Image with Overlay -->
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
        <!-- Logo -->
        <div class="relative z-10 flex items-center gap-3 text-white"></div>
        <!-- Testimonial / Quote -->
        <div class="relative z-10 max-w-md">
          <blockquote class="text-2xl font-medium leading-snug text-white drop-shadow-md">
            "The perfect start to my morning. Every bean tells a story of origin and craft."
          </blockquote>
        </div>
      </div>
      <!-- Right Side: Login Form -->
      <div class="flex-1 flex flex-col relative w-full lg:w-1/2 bg-white dark:bg-background-dark">
        <!-- Scrollable Content Container -->
        <div class="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div class="w-full max-w-md flex flex-col gap-8">
            <!-- Header -->
            <div class="flex flex-col gap-2 text-center lg:text-left">
              <h1
                class="text-3xl font-bold tracking-tight text-text-main dark:text-white lg:text-4xl"
              >
                喝下一杯專屬於您的個性
              </h1>
              <p class="text-text-muted dark:text-white/60 text-base">歡迎光臨FeiTime Coffee</p>
            </div>
            <!-- Form -->
            <form action="#" class="flex flex-col gap-6" method="POST">
              <!-- Email Field -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-text-main dark:text-white" for="email">
                  Email / 帳號
                </label>
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted select-none pointer-events-none text-[20px]"
                  >
                    mail
                  </span>
                  <input
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 py-3.5 text-base text-text-main dark:text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="email"
                    name="email"
                    placeholder="barista@coffeeco.com"
                    type="email"
                  />
                </div>
              </div>
              <!-- Password Field -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-text-main dark:text-white" for="password">
                  密碼
                </label>
                <div class="relative group">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted select-none pointer-events-none text-[20px]"
                  >
                    lock
                  </span>
                  <input
                    class="form-input w-full rounded-xl border border-border-gray bg-background-light/50 dark:bg-white/5 dark:border-white/10 px-4 pl-11 pr-11 py-3.5 text-base text-text-main dark:text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    type="button"
                  >
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>
              <!-- Remember & Forgot -->
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative flex items-center">
                    <input
                      class="peer h-5 w-5 rounded border-2 border-border-gray text-primary bg-white focus:ring-primary focus:ring-offset-0 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                      type="checkbox"
                    />
                  </div>
                  <span
                    class="text-sm font-medium text-text-main dark:text-white/80 group-hover:text-primary transition-colors"
                  >
                    Remember me
                  </span>
                </label>
                <a
                  class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  href="#"
                >
                  忘記密碼?
                </a>
              </div>
              <!-- Submit Button -->
              <button
                class="group relative flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-base font-bold hover:text-white shadow-sm hover:bg-[#8f9d89] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all duration-200 mt-2"
                type="submit"
              >
                登入
                <span
                  class="material-symbols-outlined absolute right-4 transition-transform group-hover:translate-x-1"
                >
                  arrow_forward
                </span>
              </button>
            </form>
            <!-- Divider -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-border-gray dark:border-white/10"></div>
              <span class="flex-shrink-0 mx-4 text-sm text-text-muted">Or continue with</span>
              <div class="flex-grow border-t border-border-gray dark:border-white/10"></div>
            </div>
            <!-- Social Login -->
            <div class="grid grid-cols-2 gap-4">
              <button
                class="flex items-center justify-center gap-3 rounded-xl border border-border-gray bg-white dark:bg-white/5 dark:border-white/10 px-4 py-3 text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-white/10 transition-colors"
                type="button"
              >
                <i class="fa-brands fa-google" style="color: #abb7a5"></i>
                Google
              </button>
              <button
                class="flex items-center justify-center gap-3 rounded-xl border border-border-gray bg-white dark:bg-white/5 dark:border-white/10 px-4 py-3 text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-white/10 transition-colors"
                type="button"
              >
                <i class="fa-brands fa-apple" style="color: #abb7a5"></i>
                Apple
              </button>
            </div>
            <!-- Sign Up Link -->
            <div class="text-center mt-4">
              <p class="text-base text-text-muted dark:text-white/60">
                還沒有帳號?
                <RouterLink to="/Register" class="text-[#ABB7A5] hover:underline">
                  點我註冊
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
