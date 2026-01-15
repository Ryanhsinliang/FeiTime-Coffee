<template>
  <footer class="bg-[#FAF9EE]/70 backdrop-blur-md py-6 border-t border-[#DCCFC0]/30">
    <div class="max-w-[1200px] mx-auto px-6 md:px-12">
      <!-- 聯絡資訊區塊 -->
      <div class="text-center mb-5">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="material-symbols-outlined text-[#8C7B5D] text-lg">chat_bubble</span>
          <h3 class="font-medium text-[#8C7B5D] uppercase tracking-[0.2em] text-sm">Contact Us</h3>
        </div>
        <div
          class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 text-sm text-[#B5A893] font-light font-notosans"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#8C7B5D] text-base">location_on</span>
            <span>07 時光大道, 咖啡城, CF 66666</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#8C7B5D] text-base">mail</span>
            <span>goodtime@feitime.com</span>
          </div>
        </div>
      </div>

      <div class="border-t border-[#DCCFC0]/30 mb-3"></div>

      <!-- Copyright -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-xs text-[#B5A893] uppercase tracking-wider font-notosans"
      >
        <p>© 2025 FeiTime Coffee. All rights reserved.</p>
        <div class="flex gap-8">
          <a class="hover:text-[#8C7B5D] transition-colors" href="#">隱私權政策</a>
          <a class="hover:text-[#8C7B5D] transition-colors" href="#">Cookie 政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>
