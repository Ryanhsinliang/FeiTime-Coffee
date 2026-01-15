<template>
  <GlobalBanner />
  <div class="min-h-screen flex flex-col">
    <!-- 添加自定義游標 -->
    <CustomCursor />

    <!-- Header 只有非 Intro 頁面顯示 -->
    <Header v-if="showHeaderFooter"></Header>

    <!-- 主要頁面內容 -->
    <main class="flex-1">
      <router-view />
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
  import Cart from '@/components/Cart.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import AIChatBall from './components/common/AIChatBall.vue';
  import CustomCursor from './components/common/CustomCursor.vue';
  import GlobalBanner from './components/GlobalBanner.vue';
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';
  import { useCartStore } from '@/store/cart';
  import { useAuthStore } from '@/store/auth';

  // 取得當前路由
  const route = useRoute();

  // 判斷是否顯示 Header/Footer
  const showHeaderFooter = computed(() => route.name !== 'Intro');

  // App 初始化邏輯
  onMounted(async () => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();

    // 如果使用者已登入 (LocalStorage 還原)，則同步最新的購物車資料
    if (authStore.isLoggedIn) {
      console.log('🚀 App Mounted: 同步購物車資料...');
      await cartStore.loadCartFromStrapi();
    }
  });
</script>

<style>
  /* App 全局樣式放這裡 */
</style>
