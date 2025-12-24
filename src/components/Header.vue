<template>
  <nav
    :class="navClasses"
    class="sticky top-0 z-50 w-full border-b border-[#DCCFC0]/50 backdrop-blur-xl transition-colors duration-300"
  >
    <div class="px-6 md:px-12 flex items-center justify-between max-w-[1600px] mx-auto h-32">
      <!-- Logo -->
      <router-link to="/home" class="flex items-center gap-3">
        <img src="/icons/feitime-logo.png" alt="FeiTime Logo" class="w-36 h-36 object-cover" />
        <h2 class="text-2xl font-serif font-medium tracking-wide" :style="textColorStyle">
          FeiTime
        </h2>
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex flex-1 justify-center gap-12">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="relative group text-sm tracking-widest uppercase font-jp whitespace-nowrap"
          :style="[textColorStyle, isActive(link) ? activeStyle : {}]"
          @mouseenter="hoveredLink = link.name"
          @mouseleave="hoveredLink = null"
        >
          <!-- 固定寬度佔位（避免中英切換抖動） -->
          <span class="invisible">
            {{ link.max }}
          </span>

          <!-- 英文 -->
          <span
            class="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
            :class="hoveredLink === link.name || isActive(link) ? 'opacity-0' : 'opacity-100'"
          >
            {{ link.name }}
          </span>

          <!-- 中文 -->
          <span
            class="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
            :class="hoveredLink === link.name || isActive(link) ? 'opacity-100' : 'opacity-0'"
          >
            {{ link.zh }}
          </span>

          <!-- 底線動畫（顏色依 scroll 狀態） -->
          <span
            class="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
            :style="underlineStyle"
          ></span>
        </RouterLink>
      </div>

      <!-- Icons + Mobile Toggle -->
      <div class="flex items-center gap-4">
        <!-- Desktop Icons -->
        <div class="hidden md:flex items-center gap-4">
          <span class="material-symbols-outlined" :style="textColorStyle">search</span>
          <span class="material-symbols-outlined" :style="textColorStyle">shopping_bag</span>
          <span class="material-symbols-outlined" :style="textColorStyle">person</span>
        </div>

        <!-- Mobile Hamburger -->
        <button
          class="md:hidden material-symbols-outlined text-3xl"
          :style="textColorStyle"
          @click="mobileOpen = !mobileOpen"
        >
          menu
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-[#A2AF9B]/95 backdrop-blur-xl border-t border-[#DCCFC0]/50"
      >
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="block px-6 py-4 text-lg font-jp border-b border-[#DCCFC0]/30"
          :style="textColorStyle"
          @click="mobileOpen = false"
        >
          {{ link.zh }}
        </RouterLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  /* ===== Menu Data ===== */
  const links = [
    { name: 'Shop', zh: '商店', max: '商店', to: '/product' },
    { name: 'Story', zh: '故事', max: '故事', to: '/about' },
    {
      name: 'CoffeeIDTest',
      zh: 'CoffeeID測驗',
      max: 'CoffeeID測驗',
      to: '/coffee-id-test',
    },
    {
      name: 'CoffeeSimulator',
      zh: '咖啡沖煮模擬器',
      max: '咖啡沖煮模擬器',
      to: '/coffeeLabT1-T-P1',
    },
  ];

  /* ===== State ===== */
  const hoveredLink = ref(null);
  const mobileOpen = ref(false);

  /* ===== Scroll Effect ===== */
  const scrollY = ref(0);
  const bannerHeight = ref(0);

  const onScroll = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    const banner = document.querySelector('header');
    bannerHeight.value = banner?.offsetHeight || 0;
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  /* ===== Styles ===== */

  // 文字顏色（你原本的邏輯）
  const textColorStyle = computed(() => {
    const t = Math.min(scrollY.value / (bannerHeight.value || 1), 1);
    const r = Math.round(26 + (250 - 26) * t);
    const g = Math.round(30 + (249 - 30) * t);
    const b = Math.round(23 + (238 - 23) * t);
    return { color: `rgb(${r}, ${g}, ${b})` };
  });

  // Nav 背景
  const navClasses = computed(() => [
    scrollY.value < bannerHeight.value ? 'bg-[#A2AF9B]/40' : 'bg-[#A2AF9B]/90',
  ]);

  // ✅ 底線顏色控制（你要的重點）
  const underlineStyle = computed(() => {
    // banner 前（綠底）
    if (scrollY.value < bannerHeight.value) {
      return {
        backgroundColor: '#CDBE9A',
        height: '1.5px',
        opacity: 0.95,
      };
    }

    // banner 後（淺底）
    return {
      backgroundColor: '#FAF9EE',
      height: '1px',
      opacity: 1,
    };
  });

  const isActive = (link) => route.path === link.to;
  const activeStyle = { fontWeight: '700' };
</script>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.25s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
</style>
