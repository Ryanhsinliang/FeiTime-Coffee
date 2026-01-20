<template>
  <nav
    :class="navClasses"
    class="sticky top-0 z-50 w-full border-b border-[#DCCFC0]/40 backdrop-blur-lg transition-colors duration-300"
  >
    <div class="px-6 xl:px-12 flex items-center justify-between max-w-[1600px] mx-auto h-16">
      <router-link to="/home" class="flex items-center gap-2 flex-shrink-0">
        <img
          src="/icons/feitime-logo.png"
          alt="FeiTime Logo"
          class="w-12 h-12 lg:w-16 lg:h-16 object-cover"
        />
        <h2
          class="text-xl lg:text-2xl font-serif font-medium tracking-wide"
          :style="textColorStyle"
        >
          FeiTime
        </h2>
      </router-link>

      <div class="hidden lg:flex flex-1 justify-center gap-6 xl:gap-12 relative px-4">
        <div
          v-for="link in links"
          :key="link.name"
          class="relative group text-sm xl:text-base tracking-widest uppercase font-jp whitespace-nowrap"
        >
          <RouterLink
            :to="link.to"
            class="relative block px-2 py-1 cursor-pointer"
            :style="[textColorStyle, isActive(link) ? activeStyle : {}]"
            @mouseenter="hoveredLink = link.name"
            @mouseleave="hoveredLink = null"
          >
            <span class="invisible">{{ link.max }}</span>

            <span
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
              :class="hoveredLink === link.name || isActive(link) ? 'opacity-0' : 'opacity-100'"
            >
              {{ link.name }}
            </span>

            <span
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
              :class="hoveredLink === link.name || isActive(link) ? 'opacity-100' : 'opacity-0'"
            >
              {{ link.zh }}
            </span>

            <span
              class="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
              :style="underlineStyle"
            ></span>
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center gap-3 lg:gap-4 flex-shrink-0">
        <!-- Desktop Icons -->
        <!-- Always Visible Cart Icon -->
        <button class="relative group outline-none" @click="toggleCart">
          <span class="material-symbols-outlined transition-transform group-hover:scale-110" :style="textColorStyle">shopping_bag</span>
          <span v-if="totalItems > 0" class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#17cf82] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {{ totalItems }}
          </span>
        </button>

        <!-- Desktop Icons (Person with Dropdown) -->
        <div class="hidden lg:flex items-center gap-4">
          <div
            class="relative inline-flex items-center"
            @mouseenter="openUserMenu"
            @mouseleave="closeUserMenu"
          >
            <span
              class="material-symbols-outlined cursor-pointer transition-all duration-200 hover:scale-110"
              :style="textColorStyle"
            >
              person
            </span>

            <transition name="dropdown">
              <div v-if="userMenuOpen" class="absolute left-1/2 -translate-x-1/2 top-full">
                <div class="h-1"></div>
                <div
                  class="rounded-lg shadow-lg border overflow-hidden min-w-[140px]"
                  :class="scrollY < bannerHeight ? 'border-[#DCCFC0]/50' : 'border-[#DCCFC0]/80'"
                  :style="dropdownMenuStyle"
                >
                  <div v-if="!isLoggedIn" class="p-2">
                    <div class="flex flex-col gap-2">
                      <button
                        class="py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                        :style="buttonStyle"
                        @click="handleLogin"
                      >
                        登入
                      </button>
                      <button
                        class="py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                        :style="buttonStyle"
                        @click="handleRegister"
                      >
                        註冊
                      </button>
                    </div>
                  </div>

                  <div v-else class="py-1">
                    <button
                      class="w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200"
                      :style="menuItemHoverStyle('member')"
                      @mouseenter="hoveredMenuItem = 'member'"
                      @mouseleave="hoveredMenuItem = null"
                      @click="handleMemberArea"
                    >
                      <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">account_circle</span>
                        會員專區
                      </span>
                    </button>
                    <button
                      class="w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200"
                      :style="menuItemHoverStyle('order')"
                      @mouseenter="hoveredMenuItem = 'order'"
                      @mouseleave="hoveredMenuItem = null"
                      @click="handleOrderQuery"
                    >
                      <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">receipt_long</span>
                        訂單查詢
                      </span>
                    </button>
                    <div
                      class="mx-2 h-px"
                      :style="{
                        backgroundColor: scrollY < bannerHeight ? '#DCCFC0' : '#FAF9EE',
                        opacity: 0.3,
                      }"
                    ></div>
                    <button
                      class="w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200"
                      :style="menuItemHoverStyle('logout')"
                      @mouseenter="hoveredMenuItem = 'logout'"
                      @mouseleave="hoveredMenuItem = null"
                      @click="handleLogout"
                    >
                      <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">logout</span>
                        登出
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <button
          class="material-symbols-outlined text-3xl lg:!hidden"
          :style="textColorStyle"
          @click="mobileOpen = !mobileOpen"
        >
          menu
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="mobileOpen"
        class="lg:hidden backdrop-blur-xl border-t border-[#DCCFC0]/50"
        :style="dropdownBgStyle"
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

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useCartStore } from '@/store/cart';
  import { useAuthStore } from '@/store/auth';

  const route = useRoute();
  const router = useRouter();
  
  // 整合 Cart Store
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  
  // 直接使用 cartStore.toggleCart 方法
  const toggleCart = cartStore.toggleCart;
  
  // 使用 computed 取得購物車總數量，確保數字會即時更新
  const totalItems = computed(() => cartStore.totalItems);

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
      to: '/UltraCoffeeSimulator',
    },
  ];

  /* ===== State ===== */
  const hoveredLink = ref<string | null>(null);
  const mobileOpen = ref<boolean>(false);
  const userMenuOpen = ref<boolean>(false);
  const hoveredMenuItem = ref<string | null>(null);

  // 從 authStore 取得登入狀態
  const isLoggedIn = computed(() => authStore.isLoggedIn);

  /* ===== Scroll Effect ===== */
  const scrollY = ref<number>(0);
  const bannerHeight = computed(() => window.innerHeight * 0.94);

  const onScroll = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    scrollY.value = window.scrollY;
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
    const b = Math.round(23 + (250 - 23) * t);
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

  const dropdownBgStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
      return { backgroundColor: `rgba(162, 175, 155, 1)` };
    } else {
      return { backgroundColor: `rgba(162, 175, 155, 0.9)` };
    }
  });

  const dropdownMenuStyle = computed(() => {
    // 計算漸層進度 (0 到 1)
    const t = Math.min(scrollY.value / (bannerHeight.value || 1), 1);
    // 背景透明度從 0.92 漸變到 0.98，比 navbar 更不透明以確保可讀性
    const bgOpacity = 0.92 + (0.98 - 0.92) * t;

    return {
      backgroundColor: `rgba(162, 175, 155, ${bgOpacity})`,
      backdropFilter: 'blur(12px)',
      color: scrollY.value < bannerHeight.value ? '#1A1E17' : '#FAF9EE',
    };
  });

  const buttonStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
      return {
        backgroundColor: '#CDBE9A',
        color: '#1A1E17',
        border: '1px solid #DCCFC0',
      };
    }
    return {
      backgroundColor: 'rgba(250, 249, 238, 0.95)',
      color: '#1A1E17',
      border: '1px solid #FAF9EE',
    };
  });

  const menuItemHoverStyle = (itemName: string) => {
    const isHovered = hoveredMenuItem.value === itemName;
    if (scrollY.value < bannerHeight.value) {
      return {
        color: '#1A1E17',
        backgroundColor: isHovered ? 'rgba(205, 190, 154, 0.3)' : 'transparent',
      };
    }
    return {
      color: '#FAF9EE',
      backgroundColor: isHovered ? 'rgba(250, 249, 238, 0.15)' : 'transparent',
    };
  };

  /* ===== Utils ===== */
  const isActive = (link: NavLink): boolean => route.path === link.to;
  const activeStyle = { fontWeight: '700' };

  /* ===== 使用者選單相關功能 ===== */
  const openUserMenu = () => {
    userMenuOpen.value = true;
  };

  const closeUserMenu = () => {
    userMenuOpen.value = false;
    hoveredMenuItem.value = null;
  };

  const handleRegister = () => {
    userMenuOpen.value = false;
    router.push('/register');
  };

  const handleLogin = () => {
    userMenuOpen.value = false;
    router.push('/login');
  };

  const handleMemberArea = () => {
    userMenuOpen.value = false;
    router.push('/member');
  };

  const handleOrderQuery = () => {
    userMenuOpen.value = false;
    router.push('/member?tab=order');
  };

  const handleLogout = async () => {
    userMenuOpen.value = false;
    await authStore.logout();
    router.push('/home');
  };
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

  /* 下拉選單動畫 - 保持置中同時向下滑動 */
  .dropdown-enter-active {
    transition: all 0.25s ease-out;
  }
  .dropdown-leave-active {
    transition: all 0.2s ease-in;
  }
  .dropdown-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  .dropdown-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
</style>
