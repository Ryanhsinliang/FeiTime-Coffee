<template>
  <nav
    :class="navClasses"
    class="sticky top-0 z-50 w-full border-b border-[#DCCFC0]/40 backdrop-blur-lg transition-colors duration-300"
  >
    <div class="px-6 md:px-12 flex items-center justify-between max-w-[1600px] mx-auto h-16">
      <!-- Logo -->
      <router-link to="/home" class="flex items-center gap-3">
        <img src="/icons/feitime-logo.png" alt="FeiTime Logo" class="w-16 h-16 object-cover" />
        <h2 class="text-2xl font-serif font-medium tracking-wide" :style="textColorStyle">
          FeiTime
        </h2>
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex flex-1 justify-center gap-12 relative">
        <div
          v-for="link in links"
          :key="link.name"
          class="relative group text-base tracking-widest uppercase font-jp whitespace-nowrap"
        >
          <!-- 主連結 -->
          <RouterLink
            :to="link.to"
            class="relative block px-2 py-1"
            :style="[textColorStyle, isActive(link) ? activeStyle : {}]"
            @mouseenter="hoveredLink = link.name"
            @mouseleave="hoveredLink = null"
          >
            <!-- 固定寬度佔位 -->
            <span class="invisible">{{ link.max }}</span>

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

            <!-- 底線動畫 -->
            <span
              class="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
              :style="underlineStyle"
            ></span>
          </RouterLink>

          <!-- 桌面版下拉選單 (Shop) -->
          <div
            v-if="link.name === 'Shop'"
            class="absolute top-full left-0 mt-1 w-36 backdrop-blur-xl rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0"
            :style="dropdownBgStyle"
          >
            <RouterLink
              v-for="sub in shopSubLinks"
              :key="sub.name"
              :to="sub.to"
              class="block px-4 py-2 text-sm hover:bg-[#FAF9EE]/20 text-left transition-colors duration-200"
              @click="mobileOpen = false"
            >
              {{ sub.name }}
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Icons + Mobile Toggle -->
      <div class="flex items-center gap-4">
        <!-- Desktop Icons -->
        <div class="hidden md:flex items-center gap-4">
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
        class="md:hidden backdrop-blur-xl border-t border-[#DCCFC0]/50"
        :style="dropdownBgStyle"
      >
        <div v-for="link in links" :key="link.name">
          <!-- 主連結 -->
          <RouterLink
            :to="link.to"
            class="block px-6 py-4 text-lg font-jp border-b border-[#DCCFC0]/30"
            :style="textColorStyle"
            @click="toggleMobileSubmenu(link.name)"
          >
            {{ link.zh }}
          </RouterLink>

          <!-- 手機版下拉選單 (Shop) -->
          <transition name="expand-height">
            <div v-if="link.name === 'Shop' && mobileSubOpen" class="overflow-hidden">
              <RouterLink
                v-for="sub in shopSubLinks"
                :key="sub.name"
                :to="sub.to"
                class="block px-10 py-3 text-base border-b border-[#DCCFC0]/20"
                @click="mobileOpen = false"
              >
                {{ sub.name }}
              </RouterLink>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  /* ===== 型別定義 ===== */
  interface NavLink {
    name: string;
    zh: string;
    max: string;
    to: string;
  }

  /* ===== Menu Data ===== */
  const links: NavLink[] = [
    { name: 'Shop', zh: '商店', max: '商店', to: '/product' },
    { name: 'Story', zh: '故事', max: '故事', to: '/about' },
    { name: 'CoffeeIDTest', zh: 'CoffeeID測驗', max: 'CoffeeID測驗', to: '/coffee-id-test' },
    {
      name: 'CoffeeSimulator',
      zh: '咖啡沖煮模擬器',
      max: '咖啡沖煮模擬器',
      to: '/coffeeLabT1-T-P1',
    },
  ];

  const shopSubLinks = [
    { name: '單品咖啡豆', to: '/product/beans' },
    { name: '濾掛咖啡', to: '/product/drip' },
    { name: '沖煮器具', to: '/product/tools' },
  ];

  /* ===== State ===== */
  const hoveredLink = ref<string | null>(null);
  const mobileOpen = ref<boolean>(false);
  const mobileSubOpen = ref<boolean>(false);

  const toggleMobileSubmenu = (name: string) => {
    if (name === 'Shop') mobileSubOpen.value = !mobileSubOpen.value;
  };

  /* ===== Scroll Effect ===== */
  const scrollY = ref<number>(0);
  const bannerHeight = ref<number>(0);

  const onScroll = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    const banner = document.querySelector<HTMLElement>('header');
    bannerHeight.value = banner?.offsetHeight ?? 0;
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  /* ===== Styles ===== */
  const textColorStyle = computed(() => {
    const t = Math.min(scrollY.value / (bannerHeight.value || 1), 1);
    const r = Math.round(26 + (250 - 26) * t);
    const g = Math.round(30 + (249 - 30) * t);
    const b = Math.round(23 + (238 - 23) * t);
    return { color: `rgb(${r}, ${g}, ${b})` };
  });

  const navClasses = computed(() => [
    scrollY.value < bannerHeight.value ? 'bg-[#A2AF9B]/40' : 'bg-[#A2AF9B]/90',
  ]);

  const underlineStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
      return { backgroundColor: '#CDBE9A', height: '1.5px', opacity: 0.95 };
    }
    return { backgroundColor: '#FAF9EE', height: '1px', opacity: 1 };
  });

  /* ===== Dropdown 背景動態同步 navbar ===== */
  const dropdownBgStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
      // 初始在 banner 區域，不透明
      return { backgroundColor: `rgba(162, 175, 155, 1)` };
    } else {
      // 滾動後與 navbar 同步透明度
      return { backgroundColor: `rgba(162, 175, 155, 0.9)` };
    }
  });

  /* ===== Utils ===== */
  const isActive = (link: NavLink): boolean => route.path === link.to;
  const activeStyle = { fontWeight: '700' };
</script>

<style scoped>
  /* 桌面/手機共用淡入動畫 */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.25s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  /* 手機子選單平滑高度展開 */
  .expand-height-enter-active,
  .expand-height-leave-active {
    transition: max-height 0.3s ease;
  }
  .expand-height-enter-from,
  .expand-height-leave-to {
    max-height: 0;
  }
  .expand-height-enter-to,
  .expand-height-leave-from {
    max-height: 500px; /* 根據子選單高度調整 */
  }
</style>
