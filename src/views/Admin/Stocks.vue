<template>
  <main class="overflow-y-auto p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
    <!-- 更新成功提示 -->
    <div
      v-if="showSuccessToast"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
    >
      <i class="fa-solid fa-circle-check"></i>
      <span class="font-semibold">庫存更新成功！</span>
    </div>

    <section class="flex justify-between">
      <div>
        <h2 class="text-3xl font-bold">庫存管理</h2>
        <p class="text-gray-400 text-sm">主要管理商品庫存。</p>
      </div>
      <p class="text-red-400 text-sm font-bold">待補貨商品數量: {{ restockCount }}</p>
    </section>

    <!-- 搜尋 -->
    <section class="flex flex-wrap gap-4 p-5 rounded-xl bg-white border border-[#e7dacf] shadow-sm">
      <div class="relative min-w-60 flex-1">
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] pointer-events-none"
        ></i>
        <input
          v-model="keyword"
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
          placeholder="請輸入商品名稱或PID"
          type="text"
        />
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          v-model="stockStatus"
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer appearance-none"
        >
          <option value="all">所有庫存狀態</option>
          <option value="soldout">無庫存</option>
          <option value="lowstock">低庫存</option>
          <option value="normal">庫存正常</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div>
      <button class="px-4 py-2.5 text-sm font-semibold hover:text-[#e27312]" @click="clearFilters">
        Clear
      </button>
    </section>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div
        class="w-12 h-12 border-4 border-[#e27312] border-t-transparent rounded-full animate-spin"
      ></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error" class="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800">
      {{ error }}
    </div>
    <!-- 表格 -->
    <div
      class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm"
      v-else-if="products"
    >
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">商品PID</div>
            </th>
            <th class="py-4 px-6 text-xs font-bold">商品名稱</th>
            <th class="py-4 px-6 text-xs font-bold text-center">價格</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存量</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-center">編輯庫存</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in paginatedProducts"
            :key="product.pid"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="py-4 px-6">
              <p class="text-sm font-bold">{{ product.pid }}</p>
            </td>

            <td
              @click="goToStockDetail(product.pid)"
              class="py-4 px-6 hover:text-[#9a704c] cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <img
                  :src="product.img[0]?.formats?.large?.url"
                  :alt="product.name"
                  class="size-12 rounded-lg object-cover aspect-square"
                />
                <p class="text-sm font-bold">{{ product.name }}</p>
                <button type="button" class="text-gray-400 hover:text-[#9a704c] transition-colors">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </td>

            <td class="py-4 px-6 text-sm text-center">NT$ {{ product.price }}</td>

            <td class="py-4 px-6 text-center">
              <div
                v-if="editingProduct === product.pid"
                class="flex items-center justify-center gap-2"
              >
                <button
                  @click="decreaseStock(product)"
                  :disabled="tempStock[product.pid] <= 0"
                  class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e7dacf] bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <i class="fa-solid fa-minus text-xs"></i>
                </button>
                <input
                  v-model.number="tempStock[product.pid]"
                  @input="handleInput(product.pid)"
                  type="number"
                  min="0"
                  class="w-20 h-8 text-center text-sm font-bold border border-[#e7dacf] rounded-lg focus:ring-2 focus:ring-[#f09a4e] focus:border-transparent"
                />
                <button
                  @click="increaseStock(product)"
                  class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e7dacf] bg-white hover:bg-gray-100 transition-colors"
                >
                  <i class="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
              <p v-else class="text-sm font-bold">{{ product.stock }}</p>
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

            <td class="py-4 px-6">
              <div class="flex justify-center gap-2">
                <template v-if="editingProduct === product.pid">
                  <button
                    @click="cancelEdit"
                    class="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    @click="saveStock(product)"
                    :disabled="tempStock[product.pid] < 0 || updatingProduct === product.pid"
                    class="px-4 py-2 text-sm font-semibold rounded-lg bg-[#f09a4e] text-white hover:bg-[#e27312] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2"
                  >
                    <i
                      v-if="updatingProduct === product.pid"
                      class="fa-solid fa-circle-notch fa-spin"
                    ></i>
                    <span>{{ updatingProduct === product.pid ? '更新中...' : '送出' }}</span>
                  </button>
                </template>
                <button
                  v-else
                  @click="startEdit(product)"
                  class="px-4 py-2 text-sm font-semibold rounded-lg border border-[#e7dacf] bg-white hover:bg-[#fcfaf8] transition-colors flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-base">edit</span>
                  <span>編輯</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex items-center justify-between p-4 border-t gap-4 border-[#e7dacf] bg-[#fcfaf8]"
      >
        <p class="text-sm">每頁 {{ pageSize }} 筆 / 共 {{ totalFilteredItems }} 筆</p>

        <div class="flex items-center gap-2">
          <button
            class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <i class="fa-solid fa-chevron-left text-sm"></i>
          </button>

          <!-- 頁碼按鈕 -->
          <button
            v-for="page in totalPages"
            :key="page"
            class="flex items-center justify-center size-9 rounded-lg font-bold text-sm"
            :class="page === currentPage ? 'bg-[#f09a4e] shadow-sm' : 'border bg-white'"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
            :disabled="currentPage === totalPages || totalPages === 0"
            @click="changePage(currentPage + 1)"
          >
            <i class="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, reactive, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { callProducts, callUpdateProduct } from '@/services/admin/adminProductService';
  import type { ProductRequest } from '@/services/admin/adminProductService';

  const router = useRouter();

  const products = ref<ProductRequest[]>([]);
  const loading = ref(false);
  const error = ref('');
  const keyword = ref('');

  // 分頁狀態
  const currentPage = ref(1);
  const pageSize = ref(20);

  // 庫存狀態 tab
  type StockStatus = 'all' | 'soldout' | 'lowstock' | 'normal';
  const stockStatus = ref<StockStatus>('all');

  async function loadProducts() {
    loading.value = true;
    error.value = '';

    try {
      const res = await callProducts(1, 1000);
      products.value = res.data || [];
      console.log('✅ 成功載入產品:', products.value.length, '筆');
    } catch (err: any) {
      console.error('❌ 載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  // 編輯相關狀態
  const editingProduct = ref<string | null>(null);
  const updatingProduct = ref<string | null>(null);
  const tempStock = reactive<Record<string, number>>({});
  const showSuccessToast = ref(false);

  // 搜尋欄檢索
  const filteredProducts = computed(() => {
    let result = products.value;

    // 篩庫存狀態
    if (stockStatus.value !== 'all') {
      result = result.filter((p) => {
        const stock = Number(p.stock ?? 0);

        if (stockStatus.value === 'soldout') return stock === 0;
        if (stockStatus.value === 'lowstock') return stock > 0 && stock <= 20;
        if (stockStatus.value === 'normal') return stock > 20;
        return true;
      });
    }

    // 篩關鍵字
    const key = keyword.value.trim().toLowerCase();
    if (key) {
      result = result.filter((p) => {
        const hay = [p.pid, p.name, String(p.pid)].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(key);
      });
    }
    return result;
  });

  // ✅ 計算篩選後的總筆數和總頁數
  const totalFilteredItems = computed(() => filteredProducts.value.length);
  const totalPages = computed(() => Math.ceil(totalFilteredItems.value / pageSize.value));

  // ✅ 再做分頁切割
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredProducts.value.slice(start, end);
  });

  // ✅ 換頁功能
  function changePage(page: number) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  }

  // 清除篩選
  function clearFilters() {
    keyword.value = '';
    stockStatus.value = 'all';
    currentPage.value = 1; // 重置頁碼
  }

  // ✅ 監聽篩選條件變化，重置頁碼
  watch([stockStatus, keyword], () => {
    currentPage.value = 1;
  });

  function goToStockDetail(pid: string) {
    router.push({ name: 'AdminStockDetail', params: { pid } });
  }

  // 開始編輯
  function startEdit(product: ProductRequest) {
    editingProduct.value = product.pid;
    tempStock[product.pid] = product.stock;
  }

  // 取消編輯
  function cancelEdit() {
    editingProduct.value = null;
  }

  // 增加庫存
  function increaseStock(product: ProductRequest) {
    tempStock[product.pid] = (tempStock[product.pid] || 0) + 1;
  }

  // 減少庫存
  function decreaseStock(product: ProductRequest) {
    if (tempStock[product.pid] > 0) {
      tempStock[product.pid] = tempStock[product.pid] - 1;
    }
  }

  // 計算待補貨件數 (庫存 <= 20 的所有商品)
  const restockCount = computed(() => {
    return products.value.filter((p) => p.stock <= 20).length;
  });

  // 防止手動輸入負數
  function handleInput(pid: string) {
    // 如果輸入的值小於 0，強制設為 0
    if (tempStock[pid] < 0) {
      tempStock[pid] = 0;
    }
  }

  // 儲存庫存
  async function saveStock(product: ProductRequest) {
    const newStock = tempStock[product.pid];

    if (newStock === product.stock) {
      editingProduct.value = null;
      return;
    }

    updatingProduct.value = product.pid;

    try {
      await callUpdateProduct(product.pid, { stock: newStock });

      // 更新本地資料
      const index = products.value.findIndex((p) => p.pid === product.pid);
      if (index !== -1) {
        products.value[index].stock = newStock;
      }

      console.log('✅ 庫存更新成功:', product.pid, '新庫存:', newStock);

      // 顯示成功提示
      showSuccessToast.value = true;
      setTimeout(() => {
        showSuccessToast.value = false;
      }, 3000);

      editingProduct.value = null;
    } catch (err: any) {
      console.error('❌ 更新失敗:', err);
      alert(`更新失敗: ${err.response?.data?.message || err.message}`);
    } finally {
      updatingProduct.value = null;
    }
  }

  onMounted(() => {
    loadProducts();
  });
</script>
