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
        <h2 class="text-3xl font-bold">訂單管理</h2>
        <p class="text-gray-400 text-sm">主要管理消費者訂單與出貨事宜。</p>
      </div>
      <button
        class="flex items-center justify-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-100 shadow-sm"
      >
        <span class="material-symbols-outlined text-[20px]">download</span>
        <p>批次出貨</p>
      </button>
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

      <!-- <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option value="">所有出貨狀態</option>
          <option value="pending">待付款</option>
          <option value="paid">已付款</option>
          <option value="shipped">已出貨</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div> -->

      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>今天</option>
          <option>最近7天</option>
          <option>最近30天</option>
          <option>30天以上</option>
        </select>
        <i
          class="fa-regular fa-calendar-days absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl"
        ></i>
      </div>
      <button class="px-4 py-2.5 text-sm font-semibold hover:text-[#e27312]">Clear</button>
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
          :class="activeStatus === 'paid' ? 'font-bold border-b-2' : ''"
          @click="activeStatus = 'paid'"
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
        12 筆新訂單
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
      v-else-if="orders"
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
            v-for="order in filteredOrders"
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

          <tr v-if="!filteredOrders.length">
            <td class="py-10 text-center text-sm text-gray-400" colspan="6">
              目前沒有符合條件的訂單
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
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { callOrders } from '@/services/adminOrderService';
  import type { OrderRequest } from '@/services/adminOrderService';

  const router = useRouter();

  const orders = ref<OrderRequest[]>([]);
  const loading = ref(false);
  const error = ref('');
  const keyword = ref('');

  // 目前選到的 tab 狀態
  type TabStatus = 'all' | 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  const activeStatus = ref<TabStatus>('all');

  async function loadOrders() {
    loading.value = true;
    error.value = '';

    try {
      const res = await callOrders();
      orders.value = res.data || [];
      console.log('✅ 成功載入訂單:', orders.value.length, '筆');
    } catch (err: any) {
      console.error('❌ 載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  // 篩選訂單狀態
  const filteredOrders = computed(() => {
    let result = orders.value;

    // 1️⃣ 先依 tab 狀態篩選
    if (activeStatus.value !== 'all') {
      result = result.filter((order) => order.order_status === activeStatus.value);
    }

    // 2️⃣ 再依關鍵字篩選
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

  function goToOrderDetail(order_number: string) {
    router.push({ name: 'AdminOrderDetail', params: { order_number } });
  }

  onMounted(() => {
    loadOrders();
  });
</script>
