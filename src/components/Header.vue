<template>
  <nav
    :class="navClasses"
    class="sticky top-0 z-50 w-full border-b border-[#DCCFC0]/40 backdrop-blur-lg transition-colors duration-300"
  >
    <div class="px-6 xl:px-12 flex items-center justify-between max-w-[1600px] mx-auto h-16">
      <!-- Logo -->
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

      <!-- Desktop Menu -->
      <div class="hidden lg:flex flex-1 justify-center gap-6 xl:gap-12 relative px-4">
        <div
          v-for="link in links"
          :key="link.name"
          class="relative group text-sm xl:text-base tracking-widest uppercase font-jp whitespace-nowrap"
        >
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
        </div>
      </div>

      <!-- Icons + Mobile Toggle -->
      <div class="flex items-center gap-3 lg:gap-4 flex-shrink-0">
        <!-- Desktop Icons -->
        <div class="hidden lg:flex items-center gap-4">
          <span
            class="material-symbols-outlined cursor-pointer transition-all duration-200 hover:scale-110"
            :style="textColorStyle"
          >
            shopping_bag
          </span>

          <!-- 人頭 icon 加上相對定位容器 -->
          <div class="relative" @mouseenter="openUserMenu" @mouseleave="closeUserMenu">
            <span
              class="material-symbols-outlined cursor-pointer transition-all duration-200 hover:scale-110"
              :style="textColorStyle"
            >
              person
            </span>

            <!-- 使用者下拉選單 -->
            <transition name="dropdown">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border overflow-hidden"
                :class="scrollY < bannerHeight ? 'border-[#DCCFC0]/50' : 'border-[#DCCFC0]/80'"
                :style="dropdownMenuStyle"
              >
                <!-- 未登入狀態 -->
                <div v-if="!isLoggedIn" class="p-3">
                  <div class="flex gap-2">
                    <button
                      class="flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                      :style="buttonStyle"
                      @click="handleRegister"
                    >
                      註冊
                    </button>
                    <button
                      class="flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                      :style="buttonStyle"
                      @click="handleLogin"
                    >
                      登入
                    </button>
                  </div>
                </div>

                <!-- 已登入狀態 -->
                <div v-else class="py-2">
                  <button
                    class="w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200"
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
                  <div
                    class="mx-3 h-px"
                    :style="{
                      backgroundColor: scrollY < bannerHeight ? '#DCCFC0' : '#FAF9EE',
                      opacity: 0.3,
                    }"
                  ></div>
                  <button
                    class="w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200"
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
            </transition>
          </div>
        </div>

        <!-- Mobile Hamburger -->
        <button
          class="lg:hidden material-symbols-outlined text-3xl"
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
  import { useAuthStore } from '@/store/auth';

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();

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
    const baseOpacity = scrollY.value < bannerHeight.value ? 0.98 : 0.95;
    return {
      backgroundColor: `rgba(162, 175, 155, ${baseOpacity})`,
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

  /* 下拉選單動畫 */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }
  .dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }
</style>
