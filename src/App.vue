<template>
  <GlobalBanner />
  <div class="min-h-screen flex flex-col">
    <!-- 添加自定義游標 -->
    <CustomCursor />

    <!-- Header 只有非 Intro 頁面顯示 -->
    <Header v-if="showHeaderFooter"></Header>

    <!-- 主要頁面內容 -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" @after-enter="onAfterEnter">
          <div :key="route.path" class="page-container">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>

    <!-- Footer 只有非 Intro 頁面顯示 -->
    <Footer v-if="showHeaderFooter" class="relative z-50"></Footer>

    <!-- AI Chat Ball -->
    <AIChatBall v-if="showHeaderFooter" />

    <!-- Shopping Cart -->
    <Cart />
  </div>
</template>

<script setup>
  import Cart from '@/components/common/cart/Cart.vue';
  import Header from './components/common/Header.vue';
  import Footer from './components/common/Footer.vue';
  import AIChatBall from './components/common/AIChatBall.vue';
  import CustomCursor from './components/common/CustomCursor.vue';
  import GlobalBanner from './components/GlobalBanner.vue';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, watch } from 'vue';
  import { useCartStore } from '@/store/cart';
  import { useAuthStore } from '@/store/auth';

  // 取得當前路由
  const route = useRoute();
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  // 判斷是否顯示 Header/Footer
  const showHeaderFooter = computed(
    () => route.name !== 'Intro' && !String(route.name).includes('Admin')
  );

  // 確保動畫完成後頁面可見
  const onAfterEnter = (el) => {
    el.style.opacity = '1';
  };

  // 監聽登入狀態變化 - 當使用者登入時立即載入購物車
  watch(
    () => authStore.isLoggedIn,
    async (isLoggedIn, wasLoggedIn) => {
      if (isLoggedIn && !wasLoggedIn) {
        await cartStore.loadCartFromStrapi(authStore.user?.id);
      }
    }
  );

  // App 初始化邏輯 (頁面重新整理時，使用者可能已經登入)
  onMounted(async () => {
    // 如果使用者已登入 (LocalStorage 還原)，則同步最新的購物車資料
    if (authStore.isLoggedIn) {
      await cartStore.loadCartFromStrapi(authStore.user?.id);
    }
  });
</script>

<style>
  /* App 全局樣式放這裡 */

  /* 頁面容器 - 確保有最小高度 */
  .page-container {
    min-height: 400px;
    width: 100%;
  }

  /* 頁面整體淡入（較慢） */
  .fade-enter-active {
    transition: opacity 0.5s ease-out;
  }

  .fade-leave-active {
    transition: opacity 0.2s ease-in;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-leave-from {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
  }

  /* 通用的漸進式淡入類名 */
  .stagger-item {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease-out forwards;
  }

  /* 為不同層設定延遲 */
  .stagger-item:nth-child(1) {
    animation-delay: 0.1s;
  }
  .stagger-item:nth-child(2) {
    animation-delay: 0.2s;
  }
  .stagger-item:nth-child(3) {
    animation-delay: 0.3s;
  }
  .stagger-item:nth-child(4) {
    animation-delay: 0.4s;
  }
  .stagger-item:nth-child(5) {
    animation-delay: 0.5s;
  }
  .stagger-item:nth-child(6) {
    animation-delay: 0.6s;
  }
  .stagger-item:nth-child(7) {
    animation-delay: 0.7s;
  }
  .stagger-item:nth-child(8) {
    animation-delay: 0.8s;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
