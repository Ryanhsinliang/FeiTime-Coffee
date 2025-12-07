<!-- 區塊構成：
• Hero 區：標語＋說明＋「開始 Coffee ID 測驗」主 CTA。
• 熱銷商品區：以商品卡片網格呈現。
• 三大互動功能導覽：Coffee ID、沖煮模擬器、產地地圖介紹卡片。
• 情境推薦區：情境選擇器＋推薦商品卡片。
• 品牌故事與文章入口區：品牌簡介＋最新文章列表。
• AI 協助區：提供「請小助手幫我判斷這支豆適不適合我」按鈕，點擊後開啟對話窗，預先帶入本商品資訊與使用者 Coffee ID（如有），由助手給出解釋與建議。 -->

<template>
  <main class="bg-[#FAF9EE] min-h-screen font-wenkai">
    <!-- Hero 區 -->
    <section class="text-center py-20 px-4 bg-[#FAF9EE]">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#A2AF9B]">探索你的專屬咖啡味道</h1>
      <p class="text-lg md:text-xl mb-8 text-[#DCCFC0]">
        完成 Coffee ID 測驗，找到最適合你的咖啡豆
      </p>
      <button class="bg-[#A2AF9B] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition">
        開始 Coffee ID 測驗
      </button>
    </section>

    <!-- 熱銷商品區 -->
    <section class="py-16 px-4">
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">熱銷商品</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow p-4 border border-[#EEEEEE]">
          <div class="h-48 bg-[#EEEEEE] mb-4 rounded-lg"></div>
          <h3 class="font-semibold mb-2">商品名稱</h3>
          <p class="text-[#DCCFC0] mb-2">商品描述</p>
          <p class="font-bold text-[#A2AF9B]">NT$ 0</p>
        </div>
        <!-- 可複製多個商品卡片 -->
      </div>
    </section>

    <!-- 三大互動功能導覽 -->
    <section class="py-16 px-4 bg-[#EEEEEE]">
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">互動功能</h2>
      <div class="flex flex-col md:flex-row gap-6 justify-center">
        <div class="bg-white rounded-xl shadow p-6 flex-1 text-center border border-[#FAF9EE]">
          <h3 class="font-semibold mb-2">Coffee ID</h3>
          <p class="text-[#DCCFC0]">了解你的咖啡偏好</p>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex-1 text-center border border-[#FAF9EE]">
          <h3 class="font-semibold mb-2">沖煮模擬器</h3>
          <p class="text-[#DCCFC0]">模擬不同沖煮方式</p>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex-1 text-center border border-[#FAF9EE]">
          <h3 class="font-semibold mb-2">產地地圖</h3>
          <p class="text-[#DCCFC0]">探索咖啡豆產地</p>
        </div>
      </div>
    </section>

    <!-- 情境推薦區 -->
    <section class="py-16 px-4">
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">情境推薦</h2>
      <div class="flex gap-4 mb-6 overflow-x-auto">
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">上班早晨</button>
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">午後休息</button>
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">夜晚提神</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow p-4 border border-[#EEEEEE]">
          <div class="h-48 bg-[#EEEEEE] mb-4 rounded-lg"></div>
          <h3 class="font-semibold mb-2">推薦商品</h3>
          <p class="text-[#DCCFC0] mb-2">描述</p>
        </div>
      </div>
    </section>

    <!-- 品牌故事與文章入口區 -->
    <section class="py-16 px-4 bg-[#EEEEEE]">
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">品牌故事</h2>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1 bg-white rounded-xl shadow p-6 border border-[#FAF9EE]">
          <h3 class="font-semibold mb-2">品牌簡介</h3>
          <p class="text-[#DCCFC0]">這裡放品牌故事文字介紹...</p>
        </div>
        <div class="flex-1 grid grid-cols-1 gap-4">
          <div class="bg-white rounded-xl shadow p-4 border border-[#FAF9EE]">
            <h4 class="font-semibold mb-1">最新文章標題</h4>
            <p class="text-[#DCCFC0] text-sm">文章摘要...</p>
          </div>
          <div class="bg-white rounded-xl shadow p-4 border border-[#FAF9EE]">
            <h4 class="font-semibold mb-1">最新文章標題</h4>
            <p class="text-[#DCCFC0] text-sm">文章摘要...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- AI 協助區 -->
    <section class="py-16 px-4 text-center">
      <h2 class="text-2xl font-semibold mb-4 text-[#A2AF9B]">AI 協助</h2>
      <p class="text-[#DCCFC0] mb-6">請小助手幫你判斷這支豆是否適合你</p>
      <button class="bg-[#A2AF9B] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition">
        啟動 AI 判斷
      </button>
    </section>
  </main>
</template>

<script setup>
  // 目前先不寫功能，後續可以用 Composition API 或 Pinia 管理狀態
</script>

<style scoped>
  /* 若需要額外自定義樣式，可寫這裡 */
</style>
