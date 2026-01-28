<template>
  <div class="bg-[--main-color] pb-[200px]">
    <!-- 打叉 -->
    <div class="flex flex-col items-center py-[64px] w-[80%] md:w-[450px] lg:w-[450px] mx-auto">
      <div
        class="rounded-full bg-red-800 inline-block w-[100px] h-[100px] text-center leading-[100px] text-[24px] text-white shadow-[0_0_20px_20px_rgba(255,85,85,0.2)]"
      >
        <i class="fa-solid fa-xmark fa-2xl"></i>
      </div>

      <p class="text-4xl font-bold text-[#222222] mt-[32px] mb-[24px]">付款失敗</p>
      <p class="text-[#666666] mb-[40px]">伺服器錯誤 請稍後再試</p>

      <router-link
        to="/Checkout"
        class="text-xl bg-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--main-color)] font-[600] w-full text-center"
      >
        返回結帳
      </router-link>

      <router-link
        to="/home"
        class="mt-[20px] text-xl border-2 border-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--green-gray)] font-[600] w-full text-center"
      >
        前往首頁
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
  /* Tailwind 3.4 官網 */
  /* https://v3.tailwindcss.com/ */

  /* Font-awesome */
  /* https://fontawesome.com/search?ic=free-collection */

  /*
    先寫不會變動的樣式
    再用lg: 寫電腦版
    再用md: 寫平板
    手機版 不用特別寫
  */

  /* 
    在F12 元素丟這段 找回滑鼠
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: auto !important; }`;
    document.head.appendChild(style); 
  */

  :root {
    --main-color: #faf9ee;
    /* 淡黃 */
    --green-gray: #a2af9b;
    /* 抹茶綠 */
    --soft-brown: #dccfc0;
    /* 亮咖啡 */
    --heavy-brown: #b49e89;
    /* 深咖啡 */
    --light-gray: #eeeeee;
    /* 淡灰 */
  }
</style>
