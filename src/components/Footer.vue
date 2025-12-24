<template>
  <footer class="bg-[#FAF9EE]/70 backdrop-blur-md pt-20 pb-10 border-t border-[#DCCFC0]/30">
    <!-- 內部內容限制寬度並置中 -->
    <div class="max-w-[1200px] mx-auto px-6 md:px-12">
      <!-- 四欄 Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
        <!-- Logo & Info -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2 text-[#8C7B5D]">
            <div
              class="size-8 rounded-full border border-[#DCCFC0]/40 flex items-center justify-center bg-[#8C7B5D] text-[#B5A893] relative shadow-sm overflow-hidden"
            >
              <span class="material-symbols-outlined text-base font-light z-10">coffee</span>
            </div>
            <h2 class="text-xl md:text-2xl font-serif font-medium tracking-widest text-[#8C7B5D]">
              FeiTime
            </h2>
          </div>
          <!-- 文楷 -->
          <p class="text-[#B5A893] text-sm md:text-base leading-relaxed font-light font-wenkai">
            簡單、誠實的咖啡。用心挑選豆子，精心烘焙，為你的每一個悠閒時刻帶來香醇。
          </p>
          <div class="flex gap-6 mt-2 text-[#8C7B5D] text-xl">
            <a href="#"><span class="material-symbols-outlined">public</span></a>
            <a href="#"><span class="material-symbols-outlined">photo_camera</span></a>
            <a href="#"><span class="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>

        <!-- Products / 產品系列 -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            All Products
          </h3>
          <ul
            class="flex flex-col gap-3 text-xs md:text-sm text-[#B5A893] font-light tracking-wide"
          >
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">單品咖啡豆</a></li>
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">濾掛咖啡</a></li>
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">沖煮器具</a></li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            Support
          </h3>
          <ul
            class="flex flex-col gap-3 text-xs md:text-sm text-[#B5A893] font-light tracking-wide"
          >
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">常見問題</a></li>
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">運送與退貨</a></li>
            <li><a class="hover:text-[#8C7B5D] transition-colors" href="#">會員中心</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            Contact Us
          </h3>
          <ul
            class="flex flex-col gap-4 text-xs md:text-sm text-[#B5A893] font-light tracking-wide"
          >
            <li class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#8C7B5D] text-base">location_on</span>
              <span>42 時光大道, 咖啡城, CF 66666</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#8C7B5D] text-base">mail</span>
              <span>hello@feitime.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="pt-8 border-t border-[#DCCFC0]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-[#B5A893] uppercase tracking-wider max-w-[1200px] mx-auto px-6 md:px-12"
    >
      <p>© 2025 FeiTime Coffee. All rights reserved.</p>
      <div class="flex gap-8">
        <a class="hover:text-[#8C7B5D] transition-colors" href="#">隱私權政策</a>
        <a class="hover:text-[#8C7B5D] transition-colors" href="#">Cookie 政策</a>
      </div>
    </div>
  </footer>
</template>
