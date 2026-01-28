<template>
  <!-- 手機版漢堡按鈕 -->
  <button
    @click="toggleSidebar"
    class="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg border border-[#e7dacf] shadow-md hover:bg-[#f3ede7]"
  >
    <span class="material-symbols-outlined">{{ isOpen ? 'close' : 'menu' }}</span>
  </button>

  <!-- 遮罩層 (手機版) -->
  <div
    v-if="isOpen"
    @click="closeSidebar"
    class="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed lg:static inset-y-0 left-0 z-40 w-64 lg:w-auto',
      'flex flex-col border-r border-[#e7dacf] h-screen justify-between p-4 bg-[#f9f8f6]',
      'transform transition-transform duration-300 ease-in-out lg:transform-none',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div>
      <!-- 後台標題 -->
      <div class="flex items-center gap-3 px-2 pb-6">
        <img
          src="/feitime-logo.png"
          alt="FeiTime Logo"
          class="w-16 h-16 object-cover aspect-square rounded-full"
        />
        <div>
          <h1 class="text-lg font-bold">後台管理</h1>
          <p class="text-xs">FeiTime Coffee Co.</p>
        </div>
      </div>

      <!-- 選單 -->
      <nav>
        <RouterLink
          to="/admin/orders"
          @click="closeSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f3ede7] hover:text-[#e27312] transition-colors"
          :class="{ 'font-semibold bg-[#f3ede7] text-[#e27312]': isActive('/admin/orders') }"
        >
          <span class="material-symbols-outlined">local_shipping</span>
          <p class="text-sm">訂單管理</p>
        </RouterLink>
        <RouterLink
          to="/admin/stocks"
          @click="closeSidebar"
          class="flex items-center gap-3 px-3 py-2.5 my-2 rounded-lg hover:bg-[#f3ede7] hover:text-[#e27312] transition-colors"
          :class="{ 'font-semibold bg-[#f3ede7] text-[#e27312]': isActive('/admin/stocks') }"
        >
          <span class="material-symbols-outlined">inventory_2</span>
          <p class="text-sm">庫存管理</p>
        </RouterLink>
        <RouterLink
          to="/admin/users"
          @click="closeSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f3ede7] hover:text-[#e27312] transition-colors"
          :class="{ 'font-semibold bg-[#f3ede7] text-[#e27312]': route.path === '/admin/users' }"
        >
          <span class="material-symbols-outlined">group</span>
          <p class="text-sm">使用者管理</p>
        </RouterLink>
      </nav>
    </div>

    <!-- 管理者設定 -->
    <div>
      <RouterLink
        to="/admin/users/me"
        @click="closeSidebar"
        class="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg hover:bg-[#f3ede7] hover:text-[#e27312] transition-colors"
        :class="{ 'font-semibold bg-[#f3ede7] text-[#e27312]': isActive('/admin/users/me') }"
      >
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm">設定</span>
      </RouterLink>
      <RouterLink
        to="/"
        class="flex items-center gap-2 px-4 py-2.5 mb-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95 transition-all"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回前台</p>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const isOpen = ref(false);

  const isActive = (path: string) => {
    return route.path.startsWith(path);
  };

  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  const closeSidebar = () => {
    isOpen.value = false;
  };
</script>
