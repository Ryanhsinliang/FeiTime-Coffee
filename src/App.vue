<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header 只有非 Intro 頁面顯示 -->
    <Header v-if="showHeaderFooter"></Header>

    <!-- 主要頁面內容 -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer 只有非 Intro 頁面顯示 -->
    <Footer v-if="showHeaderFooter"></Footer>

    <!-- AI Chat Ball -->
    <AIChatBall />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  // 取得當前路由
  const route = useRoute();

  // 判斷是否顯示 Header/Footer
  const showHeaderFooter = computed(() => route.name !== 'Intro');
</script>

<style>
  /* App 全局樣式放這裡 */
</style>
