<template>
  <main class="min-h-screen bg-coffee-bg flex flex-col">
    <!-- 標題 -->
    <h2
      class="w-2/3 mx-auto my-8 relative text-center font-shizuru text-3xl font-bold p-6 bg-[rgba(238,238,238,0.9)] rounded-2xl border-[5px] border-dotted border-[#dccfc0]"
    >
      Coffee ID TEST
    </h2>
    <!-- 進度條 -->
    <div class="w-2/3 h-8 rounded-lg mx-auto mb-5 bg-[rgb(238,238,238)]">進度條</div>
    <!-- 內容區塊（RWD 置中） -->
    <section class="flex-1 flex justify-center">
      <div class="bg-[rgb(238,238,238)] w-2/3 p-5 rounded-2xl mb-5">
        <!-- img放logo -->
        <img class="w-16 mx-auto" src=".\assets\img\coffeeWalk.gif" alt="" />
        <h3 class="text-center">Question 1</h3>
        <p class="text-center mt-3">你能接受咖啡裡的果酸感到什麼程度？</p>
        <p class="text-center text-xs text-[#875e2f]">想像你喝到第一口咖啡時的酸甜明亮度。</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-9">
          <div
            class="text-center leading-normal bg-[#dccfc0] p-5 rounded-2xl hover:bg-[#a2af9b] hover:cursor-pointer"
          >
            越酸越喜歡，果汁感越明亮越好
            <p class="text-[#79916e]">偏好莓果、柑橘的酸度</p>
          </div>
          <div
            class="text-center leading-normal bg-[#dccfc0] p-5 rounded-2xl hover:bg-[#a2af9b] hover:cursor-pointer"
          >
            可以接受微酸，但不喜歡太刺激
            <p class="text-[#79916e]">有亮度但不尖銳</p>
          </div>
          <div
            class="text-center leading-normal bg-[#dccfc0] p-5 rounded-2xl hover:bg-[#a2af9b] hover:cursor-pointer"
          >
            不太喜歡酸，偏好溫和滑順
            <p class="text-[#79916e]">入口柔和、圓潤</p>
          </div>
          <div
            class="text-center leading-normal bg-[#dccfc0] p-5 rounded-2xl hover:bg-[#a2af9b] hover:cursor-pointer"
          >
            完全不喜歡酸，只想要濃郁感
            <p class="text-[#79916e]">深焙、拿鐵派</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup></script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-image: url('.\assets\img\bgImage.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
