<template>
  <header class="bg-[#F8F8F8] font-sans shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <div class="text-2xl font-bold text-[#333] tracking-wide">FeiTime</div>

      <!-- 主導覽 -->
      <nav class="space-x-6 hidden md:flex text-[#555]">
        <a href="#" class="hover:text-[#000] transition">Home</a>
        <a href="#" class="hover:text-[#000] transition">Products</a>
        <a href="#" class="hover:text-[#000] transition">About</a>
        <a href="#" class="hover:text-[#000] transition">Contact</a>
      </nav>

      <!-- 搜尋框 & 會員入口 & 購物車 -->
      <div class="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          class="border border-[#DDD] rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#AAA]"
        />
        <button class="text-[#555] hover:text-[#000] transition">Sign In</button>
        <button class="relative text-[#555] hover:text-[#000] transition">
          🛒
          <span
            class="absolute -top-2 -right-2 bg-[#333] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            3
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
  // 可在這裡處理搜尋、會員或購物車邏輯
</script>

<style scoped>
  /* 如果你想全站使用 Inter 或 Poppins，可以在 main.css 或 tailwind.config 裡設定 */
</style>
