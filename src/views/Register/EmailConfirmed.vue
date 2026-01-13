<template>
  <div class="relative min-h-screen font-wenkai flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-stone-800 to-black -z-10"></div>
    <div class="absolute inset-0 bg-black/40 -z-10"></div>

    <div
      class="w-full max-w-md mx-4 backdrop-blur-lg bg-background-light/90 py-10 px-8 rounded-2xl shadow-2xl text-center transform transition-all duration-700 animate-in fade-in slide-in-from-bottom-4"
    >
      <div
        class="mb-6 inline-flex items-center justify-center w-20 h-20 bg-[#ABB7A5]/20 rounded-full text-[#ABB7A5]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 class="text-3xl font-bold mb-4 text-[#F3F3F3] tracking-tight">驗證成功！</h1>

      <p class="text-[#DCCFC0] text-lg mb-8 leading-relaxed">
        您的帳號已經啟動完成，
        <br />
        現在可以探索所有專屬內容。
      </p>

      <router-link to="/login">
        <button
          class="w-full py-4 bg-[#ABB7A5] text-white rounded-xl text-lg font-semibold hover:bg-[#DCCFC0] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          立即前往登入
        </button>
      </router-link>

      <div class="mt-8">
        <p class="text-xs text-[#F3F3F3]/50">歡迎加入我們的咖啡社群</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 簡單的進場動畫 */
  .animate-in {
    animation-duration: 0.8s;
    animation-fill-mode: both;
  }
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-in {
    animation-name: fade-in-up;
  }
</style>
