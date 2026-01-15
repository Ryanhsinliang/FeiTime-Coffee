<template>
  <!-- TODO:測試用記得刪除 -->
  <router-link to="/admin/orders/id">查看進度</router-link>

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
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
          placeholder="請輸入訂單編號、顧客姓名或使用者ID"
          type="text"
        />
      </div>

      <div class="relative min-w-48 w-full md:w-auto">
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
      </div>

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
        <button class="px-6 py-4 text-sm font-bold border-b-2">全部</button>
        <button class="px-6 py-4 text-sm">待付款</button>
        <button class="px-6 py-4 text-sm">已付款</button>
        <button class="px-6 py-4 text-sm">已出貨</button>
        <button class="px-6 py-4 text-sm">已完成</button>
        <button class="px-6 py-4 text-sm">已取消</button>
      </div>
      <div class="hidden lg:flex items-center gap-2 text-xs text-text-secondary px-4">
        <span class="flex size-2 bg-emerald-500 rounded-full"></span>
        12 筆新訂單
      </div>
    </section>

    <div class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm">
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
            <th class="py-4 px-6 text-xs font-bold">日期</th>
            <th class="py-4 px-6 text-xs font-bold text-center">出貨狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-right">總金額</th>
            <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#ORD-7352</p>
            </td>

            <td class="py-4 px-6 flex items-start gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
                <p class="text-xs">UID: 89932</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
            <td class="py-4 px-6 text-xs">
              <p class="">下單日期: 2023-10-24</p>
              <p class="text-gray-500">付款日期: --</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200"
              >
                未付款
              </p>
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

            <td class="py-4 px-6 flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">attach_money</span>
              </button>
            </td>
          </tr>

          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#ORD-7352</p>
            </td>

            <td class="py-4 px-6 flex items-start gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
                <p class="text-xs">UID: 89932</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
            <td class="py-4 px-6 text-xs">
              <p class="">下單日期: 2023-10-24</p>
              <p class="text-gray-500">付款日期: 2023-10-24</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200"
              >
                已付款
              </p>
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

            <td class="py-4 px-6 flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">local_shipping</span>
              </button>
            </td>
          </tr>

          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#ORD-7352</p>
            </td>

            <td class="py-4 px-6 flex items-start gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
                <p class="text-xs">UID: 89932</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
            <td class="py-4 px-6 text-xs">
              <p class="">下單日期: 2023-10-24</p>
              <p class="text-gray-500">出貨日期: 2023-10-25</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200"
              >
                已出貨
              </p>
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

            <td class="py-4 px-6 flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">location_on</span>
              </button>
            </td>
          </tr>

          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#ORD-7352</p>
            </td>

            <td class="py-4 px-6 flex items-start gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
                <p class="text-xs">UID: 89932</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
            <td class="py-4 px-6 text-xs">
              <p class="">下單日期: 2023-10-24</p>
              <p class="text-gray-500">出貨日期: 2023-10-25</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200"
              >
                已完成
              </p>
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

            <td class="py-4 px-6 flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">receipt</span>
              </button>
            </td>
          </tr>

          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#ORD-7352</p>
            </td>

            <td class="py-4 px-6 flex items-start gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
                <p class="text-xs">UID: 89932</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
            <td class="py-4 px-6 text-xs">
              <p class="">下單日期: 2023-10-24</p>
              <p class="text-gray-500">出貨日期: 2023-10-25</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-red-100 text-red-800 border-red-200"
              >
                已取消
              </p>
            </td>

            <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

            <td class="py-4 px-6 flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px]">info</span>
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

  <!-- 測試用 -->
  <!-- Loading / Error -->
  <p v-if="loading">載入中...</p>
  <p v-else-if="error" class="text-red-500">{{ error }}</p>

  <!-- 訂單列表（測試 orders） -->
  <section v-if="orders.length">
    <h2 class="font-bold mb-2">📦 訂單列表</h2>
    <ul class="space-y-1">
      <li v-for="order in orders" :key="order.order_number" class="border p-2 rounded">
        <div>訂單編號：{{ order.order_number }}</div>
        <div>狀態：{{ order.order_status }} / {{ order.payment_status }}</div>
        <div>總金額：${{ order.total_amount }}</div>
      </li>
    </ul>
  </section>

  <!-- 單筆訂單（測試 singleOrder） -->
  <section v-if="singleOrder" class="border-t pt-4">
    <h2 class="font-bold mb-2">🧾 訂單明細</h2>

    <div>訂單編號：{{ singleOrder.order_number }}</div>
    <div>收件人：{{ singleOrder.recipient_name }}</div>
    <div>電話：{{ singleOrder.recipient_phone }}</div>
    <div>地址：{{ singleOrder.recipient_address }}</div>

    <div class="mt-2">
      金額：{{ singleOrder.subtotal }} + {{ singleOrder.shipping_fee }} =
      <strong>{{ singleOrder.total_amount }}</strong>
    </div>

    <div class="mt-2">
      付款時間：
      <span v-if="singleOrder.paid_at">
        {{ new Date(singleOrder.paid_at).toLocaleString('zh-TW') }}
      </span>
      <span v-else>尚未付款</span>
    </div>

    <button class="mt-4 px-4 py-2 bg-gray-300 rounded" :disabled="loading">
      測試按鈕（loading 時 disabled）
    </button>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { callOrders, callSingleOrder } from '@/services/adminOrderService';
  import type { OrderRequest } from '@/services/adminOrderService';

  const route = useRoute();

  const orders = ref<OrderRequest[]>([]);
  const singleOrder = ref<OrderRequest | null>(null);
  const loading = ref(false);
  const error = ref('');

  // 呼叫 API
  async function loadOrderData(order_number: string) {
    loading.value = true;
    error.value = '';

    try {
      const [ordersRes, singleOrderRes] = await Promise.all([
        callOrders(),
        callSingleOrder(order_number),
      ]);

      orders.value = ordersRes.data;
      console.log('✅ 成功載入訂單列表:', orders.value.length);

      singleOrder.value = singleOrderRes.data;
      // console.log('✅ 訂單商品數量:', singleOrder.value.length);
    } catch (err) {
      console.error('❌ API 載入失敗', err);
      error.value = '訂單載入失敗';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    const orderNumber = route.params.order_number as string;
    if (orderNumber) loadOrderData(orderNumber);
  });

  watch(
    () => route.params.order_number,
    (newOrderNumber) => {
      if (typeof newOrderNumber === 'string' && newOrderNumber) {
        loadOrderData(newOrderNumber);
      }
    }
  );
</script>
