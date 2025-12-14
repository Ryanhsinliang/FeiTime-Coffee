<template>
  <main class="bg-[#FAF9EE] min-h-screen font-wenkai">
    <!-- Hero 區 -->
    <section
      class="text-center py-20 px-4 transition-all duration-1000 opacity-0 translate-y-4"
      :class="{ 'opacity-100 translate-y-0': heroVisible }"
      ref="heroRef"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#A2AF9B]">探索你的專屬咖啡味道</h1>
      <p class="text-lg md:text-xl mb-8 text-[#DCCFC0]">
        完成 Coffee ID 測驗，找到最適合你的咖啡豆
      </p>
      <button class="bg-[#A2AF9B] text-white px-8 py-3 rounded-full hover:bg-opacity-90">
        開始 Coffee ID 測驗
      </button>
    </section>

    <!-- 熱銷商品區 -->
    <section
      class="py-16 px-4 transition-all duration-1000 opacity-0 translate-y-4"
      :class="{ 'opacity-100 translate-y-0': sectionsVisible[0] }"
      ref="sectionRefs0"
    >
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">熱銷商品</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow p-4 border border-[#EEEEEE]">
          <div class="h-48 bg-[#EEEEEE] mb-4 rounded-lg"></div>
          <h3 class="font-semibold mb-2">商品名稱</h3>
          <p class="text-[#DCCFC0] mb-2">商品描述</p>
          <p class="font-bold text-[#A2AF9B]">NT$ 0</p>
        </div>
      </div>
    </section>

    <!-- 互動功能區 -->
    <section
      class="py-16 px-4 bg-[#EEEEEE] transition-all duration-1000 opacity-0 translate-y-4"
      :class="{ 'opacity-100 translate-y-0': sectionsVisible[1] }"
      ref="sectionRefs1"
    >
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
    <section
      class="py-16 px-4 transition-all duration-1000 opacity-0 translate-y-4"
      :class="{ 'opacity-100 translate-y-0': sectionsVisible[2] }"
      ref="sectionRefs2"
    >
      <h2 class="text-2xl font-semibold mb-8 text-[#A2AF9B]">情境推薦</h2>
      <div class="flex gap-4 mb-6 overflow-x-auto">
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">上班早晨</button>
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">午後休息</button>
        <button class="bg-[#DCCFC0] px-4 py-2 rounded-full whitespace-nowrap">夜晚提神</button>
      </div>
    </section>

    <!-- 品牌故事與文章區 -->
    <section
      class="py-16 px-4 bg-[#EEEEEE] transition-all duration-1000 opacity-0 translate-y-4"
      :class="{ 'opacity-100 translate-y-0': sectionsVisible[3] }"
      ref="sectionRefs3"
    >
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
  </main>

  <!-- AI 助手浮動區 -->
  <div class="fixed bottom-5 right-5 z-50">
    <AIChatBall />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import AIChatBall from '@/components/common/AIChatBall.vue';

  const heroVisible = ref(false);
  const sectionsVisible = ref([false, false, false, false]);

  const heroRef = ref(null);
  const sectionRefs0 = ref(null);
  const sectionRefs1 = ref(null);
  const sectionRefs2 = ref(null);
  const sectionRefs3 = ref(null);

  const sectionRefs = [sectionRefs0, sectionRefs1, sectionRefs2, sectionRefs3];

  onMounted(() => {
    // Hero 區淡入
    heroVisible.value = true;

    // 滾動監聽淡入其他區塊
    const handleScroll = () => {
      sectionRefs.forEach((sectionRef, index) => {
        const el = sectionRef.value;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
          sectionsVisible.value[index] = true;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });
</script>

<style scoped>
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 1;
  }
  .translate-y-4 {
    transform: translateY(1rem);
  }
  .translate-y-0 {
    transform: translateY(0);
  }
</style>
