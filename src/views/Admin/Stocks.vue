<template>
  <header
    class="h-16 flex items-center justify-end px-8 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-10 flex-shrink-0"
  >
    <button class="w-10 h-10 hover:text-[#e27312] relative">
      <i class="fa-regular fa-bell text-2xl"></i>
      <span
        class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"
      ></span>
    </button>
  </header>

  <main class="overflow-y-auto p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
    <section class="flex justify-between">
      <div>
        <h2 class="text-3xl font-bold">庫存管理</h2>
        <p class="text-gray-400 text-sm">主要管理商品庫存。</p>
      </div>
      <button
        class="flex items-center justify-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-100 shadow-sm"
      >
        <i class="fa-solid fa-plus text-sm"></i>
        <p>新增商品</p>
      </button>
    </section>

    <!-- 搜尋 -->
    <div class="flex flex-wrap gap-4 p-5 rounded-xl bg-white border border-[#e7dacf] shadow-sm">
      <div class="relative min-w-60 flex-1">
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] pointer-events-none"
        ></i>
        <input
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
          placeholder="請輸入商品名稱或PID"
          type="text"
          value=""
        />
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>所有庫存狀態</option>
          <option>無庫存</option>
          <option>低庫存</option>
          <option>庫存正常</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div>
      <button class="h-12 px-6 rounded-lg bg-[#f3ede7] hover:bg-[#e7dacf] font-bold text-sm">
        套用
      </button>
    </div>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error">{{ error }}</div>
    <!-- 表格 -->
    <div
      class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm"
      v-else-if="products"
    >
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">
                商品PID
                <span class="material-symbols-outlined">arrow_downward</span>
              </div>
            </th>
            <th class="py-4 px-6 text-xs font-bold">商品名稱</th>
            <th class="py-4 px-6 text-xs font-bold text-center">價格</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存量</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in products"
            :key="product.pid"
            @click="goToStockDetail(product.pid)"
            class="hover:bg-gray-100 cursor-pointer"
          >
            <td class="py-4 px-6">
              <p class="text-sm font-bold">{{ product.pid }}</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <img
                :src="product.img[0]?.formats?.large?.url"
                :alt="product.name"
                class="size-12 rounded-lg object-cover aspect-square"
              />
              <p class="text-sm font-bold">{{ product.name }}</p>
            </td>

            <td class="py-4 px-6 text-sm text-center">{{ product.price }}</td>

            <td class="py-4 px-6 text-center text-sm font-bold">
              {{ product.stock }}
            </td>

            <td class="py-4 px-6 text-center">
              <p
                v-if="product.stock === 0"
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200"
              >
                無庫存
              </p>

              <p
                v-else-if="product.stock <= 20"
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200"
              >
                低庫存
              </p>
              <p
                v-else-if="product.stock > 20"
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200"
              >
                庫存正常
              </p>
            </td>

            <td class="py-4 px-6 text-right flex justify-center gap-5">
              <!-- <button type="button">
                <span class="material-symbols-outlined text-[20px] hover:text-[#9a704c]">
                  visibility
                </span>
              </button> -->
              <button type="button">
                <span class="material-symbols-outlined text-[20px] hover:text-[#9a704c]">edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex items-center justify-between p-4 border-t gap-4 border-[#e7dacf] bg-[#fcfaf8]"
      >
        <p class="text-sm">1 - 10 筆 / 共 24 筆</p>

        <div class="flex items-center gap-2">
          <button
            class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
            disabled="false"
          >
            <i class="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button
            class="flex items-center justify-center size-9 rounded-lg bg-[#f09a4e] font-bold text-sm shadow-sm"
          >
            1
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            2
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            3
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            <i class="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { callProducts } from '@/services/ProductDetail';
  import type { ProductRequest } from '@/services/ProductDetail';

  const router = useRouter();

  const products = ref<ProductRequest[]>([]);
  const loading = ref(false);
  const error = ref('');

  async function loadProducts() {
    loading.value = true;
    error.value = '';

    try {
      const res = await callProducts();
      products.value = res.data || [];
      console.log('✅ 成功載入訂單:', products.value.length, '筆');
    } catch (err: any) {
      console.error('❌ 載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  // // 庫存顯示(無庫存/低庫存)
  // const isSoldOut = computed(() => {
  //   if (!product.value) return false;
  //   return product.value.stock === 0;
  // });
  // const isLowStock = computed(() => {
  //   if (!product.value) return false;
  //   return product.value.stock > 0 && product.value.stock < 21;
  // });

  function goToStockDetail(pid: string) {
    router.push({ name: 'AdminStockDetail', params: { pid } });
  }

  onMounted(() => {
    loadProducts();
  });

  // // 防止使用者手動輸入違規數字
  // watch(quantity, (newVal) => {
  //   if (!products.value) return;
  //   if (newVal > products.value.stock) {
  //     quantity.value = products.value.stock;
  //   } else if (newVal < 1) {
  //     quantity.value = 1;
  //   }
  // });
</script>
