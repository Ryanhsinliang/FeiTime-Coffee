<script setup>
  import { useAuthStore } from '../store/auth';
  const authStore = useAuthStore();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="authStore.banner"
      :class="[
        'banner-container',
        authStore.banner.type === 'error' ? 'bg-red-500' : 'bg-amber-500',
      ]"
    >
      <div class="content">
        <span>{{ authStore.banner.message }}</span>
        <button @click="authStore.clearBanner" class="close-btn">✕</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  .banner-container {
    @apply fixed top-0 left-0 w-full text-white py-3 px-4 z-[9999] shadow-md flex justify-center items-center;
  }
  .content {
    @apply max-w-7xl w-full flex justify-between items-center;
  }
  .close-btn {
    @apply ml-4 hover:opacity-70 font-bold;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
</style>
