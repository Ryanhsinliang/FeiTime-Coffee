<template>
  <aside
    class="hidden md:flex flex-col w-64 border-r border-[#e7dacf] dark:border-[#3e342c] flex-shrink-0 h-screen"
  >
    <div class="flex flex-col h-full justify-between gap-6 p-4">
      <div class="flex flex-col gap-6">
        <!-- Backend title -->
        <div class="flex items-center gap-3 px-2">
          <img
            src="/icons/feitime-logo.png"
            alt="FeiTime Logo"
            class="w-14 h-14 lg:w-16 lg:h-16 object-cover aspect-square rounded-full"
          />
          <div class="flex flex-col">
            <h1 class="text-lg font-bold">後台管理</h1>
            <p class="text-xs font-normal">FeiTime Coffee Co.</p>
          </div>
        </div>
        <!-- Nav Menu -->
        <nav class="flex flex-col gap-2">
          <a class="flex items-center gap-3 px-3 py-2.5" href="#">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-sm font-semibold">總覽</span>
          </a>
          <a
            class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
            href="#"
          >
            <span class="material-symbols-outlined">shopping_bag</span>
            <span class="text-sm font-medium">訂單管理</span>
          </a>
          <a
            class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
            href="#"
          >
            <span class="material-symbols-outlined">inventory_2</span>
            <span class="text-sm font-medium">商品庫存管理</span>
          </a>
          <a
            class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
            href="#"
          >
            <span class="material-symbols-outlined">group</span>
            <span class="text-sm font-medium">顧客管理</span>
          </a>
        </nav>
      </div>
      <!-- Settings -->
      <div class="flex flex-col gap-2">
        <a
          class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f3ede7] hover:text-[#e27312]"
          href="#"
        >
          <span class="material-symbols-outlined">settings</span>
          <span class="text-sm font-medium">設定</span>
        </a>
        <div
          class="flex items-center gap-3 px-3 py-4 border-t border-[#e7dacf] dark:border-[#3e342c]"
        >
          <img
            src="/icons/feitime-logo.png"
            alt="FeiTime Logo"
            class="w-14 h-14 lg:w-16 lg:h-16 object-cover aspect-square rounded-full"
          />
          <div class="flex flex-col">
            <p class="text-sm font-semibold">管理者</p>
            <p class="text-xs">admin@coffee.com</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup></script>
