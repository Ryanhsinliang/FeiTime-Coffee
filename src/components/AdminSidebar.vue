<template>
  <aside class="flex flex-col border-r border-[#e7dacf] h-screen justify-between p-4">
    <div class="">
      <!-- 後台標題 -->
      <div class="flex items-center gap-3 px-2 pb-6">
        <img
          src="/icons/feitime-logo.png"
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
          class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
        >
          <span class="material-symbols-outlined">local_shipping</span>
          <p class="text-sm" :class="{ 'font-semibold': isActive('/admin/orders') }">訂單管理</p>
        </RouterLink>
        <RouterLink
          to="/admin/stocks"
          class="flex items-center gap-3 px-3 py-2.5 my-2 hover:bg-[#f3ede7] hover:text-[#e27312]"
        >
          <span class="material-symbols-outlined">inventory_2</span>
          <p class="text-sm" :class="{ 'font-semibold': isActive('/admin/stocks') }">庫存管理</p>
        </RouterLink>
        <RouterLink
          to="/admin/users"
          class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
        >
          <span class="material-symbols-outlined">group</span>
          <p class="text-sm" :class="{ 'font-semibold': isActive('/admin/users') }">使用者管理</p>
        </RouterLink>
      </nav>
    </div>

    <!-- 管理者設定 -->
    <div>
      <RouterLink
        to="/admin/users/me"
        class="flex items-center gap-3 px-3 py-2.5 mb-2 hover:bg-[#f3ede7] hover:text-[#e27312]"
      >
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm">設定</span>
      </RouterLink>
      <RouterLink
        to="/"
        class="flex items-center gap-2 px-4 py-2.5 mb-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回前台</p>
      </RouterLink>
    </div>
  </aside>
</template>
<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const isActive = (path) => {
    return route.path.startsWith(path);
  };
</script>
