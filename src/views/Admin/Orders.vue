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
    <section>
      <h2 class="text-3xl font-bold">訂單管理</h2>
      <p class="text-gray-400 text-sm">主要管理消費者訂單與出貨事宜。</p>
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
          placeholder="請輸入訂單編號、訂購者姓名或ID"
          type="text"
        />
      </div>

      <div class="relative min-w-48 w-full md:w-auto">
        <select
          v-model="dateRange"
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option value="all">全部</option>
          <option value="today">今天</option>
          <option value="last7">最近7天</option>
          <option value="last30">最近30天</option>
          <option value="older30">30天以上</option>
        </select>
        <i
          class="fa-regular fa-calendar-days absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl"
        ></i>
      </div>
      <button class="px-4 py-2.5 text-sm font-semibold hover:text-[#e27312]" @click="clearFilters">
        Clear
      </button>
    </section>

    <section class="border-b flex items-center justify-between">
      <div class="flex">
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'all' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'all'"
        >
          全部
        </button>
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'pending' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'pending'"
        >
          待付款
        </button>
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'processing' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'processing'"
        >
          待出貨
        </button>
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'shipped' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'shipped'"
        >
          已出貨
        </button>
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'delivered' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'delivered'"
        >
          已完成
        </button>
        <button
          class="px-6 py-4 text-sm"
          :class="activeStatus === 'cancelled' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'cancelled'"
        >
          已取消
        </button>
      </div>
      <div class="hidden lg:flex items-center gap-2 text-xs text-text-secondary px-4">
        <span class="flex size-2 bg-emerald-500 rounded-full"></span>
        {{ processingCount }}筆待出貨訂單需處理
      </div>
    </section>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error">{{ error }}</div>

    <!-- 訂單列表 -->
    <div
      class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm"
      v-else-if="allOrders.length"
    >
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">
                訂單編號
                <span class="material-symbols-outlined">arrow_downward</span>
              </div>
            </th>
            <th class="py-4 px-6 text-xs font-bold">訂購者姓名</th>
            <th class="py-4 px-6 text-xs font-bold">下訂商品名稱</th>
            <th class="py-4 px-6 text-xs font-bold">訂購日期</th>
            <th class="py-4 px-6 text-xs font-bold text-center">出貨狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-right">總金額</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in paginatedOrders"
            :key="order.order_number"
            @click="goToOrderDetail(order.order_number)"
            class="hover:bg-gray-100 cursor-pointer"
          >
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">{{ order.order_number }}</p>
            </td>

            <td class="py-4 px-6 flex flex-col items-start">
              <p class="text-sm font-semibold">{{ order.user?.username || '無' }}</p>
              <p class="text-xs">ID: {{ order.user?.user_id || '無' }}</p>
            </td>

            <td class="py-4 px-6 text-sm">
              {{ order.order_items[0]?.quantity }}x {{ order.order_items[0]?.snapshot_name }}
              {{ order.order_items[0]?.snapshot_weight }}
              <span v-if="order.order_items.length > 1" class="text-gray-400">
                ＋其他 {{ order.order_items.length - 1 }} 件
              </span>
            </td>
            <td class="py-4 px-6 text-xs">
              {{ order.createdAt?.slice(0, 10) }}
            </td>

            <td class="py-4 px-6 text-center text-sm font-semibold">
              {{ order.order_status }}
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">${{ order.total_amount }}</td>
          </tr>

          <tr v-if="!paginatedOrders.length">
            <td class="py-10 text-center text-sm text-gray-400" colspan="6">
              目前沒有符合條件的訂單
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
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { callOrders } from '@/services/admin/adminOrderService';
  import type { OrderRequest } from '@/services/admin/adminOrderService';

  const router = useRouter();

  const allOrders = ref<OrderRequest[]>([]); // ✅ 儲存全部訂單
  const loading = ref(false);
  const error = ref('');
  const keyword = ref('');

  // 分頁狀態
  const currentPage = ref(1);
  const pageSize = ref(20);

  // 目前選到的 tab 狀態
  type TabStatus =
    | 'all'
    | 'pending'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  const activeStatus = ref<TabStatus>('all');

  // 訂購日期篩選
  type DateRange = 'all' | 'today' | 'last7' | 'last30' | 'older30';
  const dateRange = ref<DateRange>('all');

  function isSameLocalDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  async function loadOrders() {
    loading.value = true;
    error.value = '';

    try {
      // ✅ 一次載入全部資料
      const res = await callOrders(1, 1000);
      allOrders.value = res.data || [];
      console.log('✅ 成功載入訂單:', allOrders.value.length, '筆');
    } catch (err: any) {
      console.error('❌ 載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  //  先篩選
  const filteredOrders = computed(() => {
    let result = allOrders.value;

    // 狀態 tab
    if (activeStatus.value !== 'all') {
      result = result.filter((o) => o.order_status === activeStatus.value);
    }

    // 訂購日期篩選
    const now = new Date();
    result = result.filter((o) => {
      if (dateRange.value === 'all') return true;
      if (!o.createdAt) return false;

      const created = new Date(o.createdAt);
      if (isNaN(created.getTime())) return false;

      if (dateRange.value === 'today') {
        return isSameLocalDate(created, now);
      }

      const diffMs = now.getTime() - created.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (dateRange.value === 'last7') return diffDays <= 7;
      if (dateRange.value === 'last30') return diffDays <= 30;
      if (dateRange.value === 'older30') return diffDays > 30;

      return true;
    });

    // 關鍵字搜尋
    const key = keyword.value.trim().toLowerCase();
    if (key) {
      result = result.filter((order) => {
        const hay = [
          order.order_number,
          order.recipient_name,
          order.user?.username,
          order.user?.user_id,
          String(order.user?.user_id),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return hay.includes(key);
      });
    }

    return result;
  });

  // 計算待出貨訂單數量
  const processingCount = computed(
    () => allOrders.value.filter((o) => o.order_status === 'processing').length
  );

  // ✅ 計算篩選後的總筆數和總頁數
  const totalFilteredItems = computed(() => filteredOrders.value.length);
  const totalPages = computed(() => Math.ceil(totalFilteredItems.value / pageSize.value));

  // ✅ 再做分頁切割
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredOrders.value.slice(start, end);
  });

  // ✅ 換頁功能
  function changePage(page: number) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  }

  // ✅ 清除篩選時重置頁碼
  function clearFilters() {
    keyword.value = '';
    activeStatus.value = 'all';
    dateRange.value = 'all';
    currentPage.value = 1; // 重置頁碼
  }

  // ✅ 監聽篩選條件變化，重置頁碼
  watch([activeStatus, dateRange, keyword], () => {
    currentPage.value = 1;
  });

  function goToOrderDetail(order_number: string) {
    router.push({ name: 'AdminOrderDetail', params: { order_number } });
  }

  onMounted(() => {
    loadOrders();
  });
</script>
