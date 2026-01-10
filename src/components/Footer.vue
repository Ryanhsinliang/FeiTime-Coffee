<template>
  <footer class="bg-[#FAF9EE]/70 backdrop-blur-md pt-20 pb-10 border-t border-[#DCCFC0]/30">
    <!-- 內部內容限制寬度並置中 -->
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <!-- 五欄 Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-16">
        <!-- Logo & Info -->
        <div class="flex flex-col gap-6 md:col-span-3 lg:col-span-1">
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
          <p class="text-[#B5A893] text-sm md:text-base leading-loose font-notoserif py-2 pl-10">
            咖啡有風味，時光有旋律。
          </p>
        </div>

        <!-- Products / 產品系列 -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            All Products
          </h3>
          <ul
            class="flex flex-col gap-3 text-xs md:text-sm text-[#B5A893] font-light tracking-wide font-notosans"
          >
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/product/beans">
                單品咖啡豆
              </RouterLink>
            </li>
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/product/drip">
                濾掛咖啡
              </RouterLink>
            </li>
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/product/tools">
                沖煮器具
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- About Us -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            About Us
          </h3>
          <ul
            class="flex flex-col gap-3 text-xs md:text-sm text-[#B5A893] font-light tracking-wide font-notosans"
          >
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/aboutus">
                關於我們
              </RouterLink>
            </li>
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/coffeeLabT1-T-P1">
                咖啡沖煮模擬器
              </RouterLink>
            </li>
            <li>
              <RouterLink class="hover:text-[#8C7B5D] transition-colors" to="/coffee-id-test">
                Coffee ID測驗
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-medium text-[#8C7B5D] mb-6 uppercase tracking-[0.1em] text-xs md:text-sm">
            Support
          </h3>
          <ul
            class="flex flex-col gap-3 text-xs md:text-sm text-[#B5A893] font-light tracking-wide font-notosans"
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
            class="flex flex-col gap-4 text-xs md:text-sm text-[#B5A893] font-light tracking-wide font-notosans"
          >
            <li class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#8C7B5D] text-base">location_on</span>
              <span>42 時光大道, 咖啡城, CF 66666</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#8C7B5D] text-base">mail</span>
              <span>goodtime@feitime.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="pt-8 border-t border-[#DCCFC0]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-[#B5A893] uppercase tracking-wider max-w-[1600px] mx-auto px-6 md:px-12 font-notosans"
    >
      <p>© 2025 FeiTime Coffee. All rights reserved.</p>
      <div class="flex gap-8">
        <a class="hover:text-[#8C7B5D] transition-colors" href="#">隱私權政策</a>
        <a class="hover:text-[#8C7B5D] transition-colors" href="#">Cookie 政策</a>
      </div>
    </div>
  </footer>
</template>
