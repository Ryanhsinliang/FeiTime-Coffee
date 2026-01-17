<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>訂單管理</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">訂單編號 #ORD-7352</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button
        class="flex items-center justify-center gap-2 h-9 px-4 border rounded-lg text-xs font-semibold hover:bg-gray-50"
      >
        <span class="material-symbols-outlined text-[18px]">print</span>
        <p>列印收據</p>
      </button>
    </div>
  </header>

  <main class="max-w-[1200px] mx-auto flex flex-col gap-8 flex-1 overflow-y-auto p-8">
    <!-- 運送狀態 -->
    <div class="rounded-xl p-6 shadow-sm border border-[#e7dacf] bg-white">
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto pb-4 md:pb-0"
      >
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span class="material-symbols-outlined text-2xl text-emerald-500">check_circle</span>
          <!-- <span class="material-symbols-outlined text-2xl text-[#e7dacf]">pending_actions</span> -->
          <p class="text-xs text-emerald-500">待付款</p>
        </div>

        <div class="hidden md:block h-[2px] flex-1 bg-emerald-500"></div>

        <div class="flex flex-col items-center gap-2 min-w-[100px] step-completed">
          <span class="material-symbols-outlined text-2xl text-emerald-500">check_circle</span>
          <!-- <span class="material-symbols-outlined text-2xl text-[#e7dacf]">payments</span> -->
          <p class="text-xs text-emerald-500">已付款</p>
        </div>

        <!-- <div class="hidden md:block h-[2px] flex-1 bg-emerald-500"></div>

        <div class="flex flex-col items-center gap-2 min-w-[100px] step-active">
          <span class="material-symbols-outlined icon-fill text-2xl text-emerald-500">
            autorenew
          </span>
          <p class="text-xs text-emerald-500">備貨中</p>
        </div> -->

        <div class="hidden md:block h-[2px] flex-1 bg-[#e7dacf]"></div>

        <div class="flex flex-col items-center gap-2 min-w-[100px] step-pending">
          <span class="material-symbols-outlined text-2xl text-[#e7dacf]">local_shipping</span>
          <p class="text-xs text-[#e7dacf]">已出貨</p>
        </div>

        <div class="hidden md:block h-[2px] flex-1 bg-[#e7dacf]"></div>

        <div class="flex flex-col items-center gap-2 min-w-[100px] step-pending">
          <span class="material-symbols-outlined text-2xl text-[#e7dacf]">verified</span>
          <p class="text-xs text-[#e7dacf]">已完成</p>
        </div>

        <div class="hidden md:block h-[2px] flex-1 bg-[#e7dacf]"></div>

        <div class="flex flex-col items-center gap-2 min-w-[100px] step-pending">
          <span class="material-symbols-outlined text-2xl text-[#e7dacf]">cancel</span>
          <p class="text-xs text-[#e7dacf]">已取消</p>
        </div>
      </div>
    </div>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error">{{ error }}</div>

    <!-- 訂單明細 -->
    <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 flex flex-col gap-8">
        <div class="border border-[#e7dacf] bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="px-6 py-4 border-b border-[#e7dacf] flex justify-between items-center">
            <h3 class="font-bold flex items-center gap-2">
              <p class="material-symbols-outlined">receipt_long</p>
              訂購商品
              <span class="material-symbols-outlined text-lg">chevron_right</span>
              <p class="font-semibold">訂單編號: {{ order.order_number }}</p>
            </h3>
            <p class="text-xs">下單時間：{{ new Date(order.createdAt).toLocaleString('zh-TW') }}</p>
          </div>

          <table class="w-full text-left">
            <thead>
              <tr class="text-xs border-b border-[#e7dacf] bg-[#fcfaf8]">
                <th class="py-3 px-6">商品名稱</th>
                <th class="py-3 px-6 text-center">數量</th>
                <th class="py-3 px-6 text-right">單價</th>
                <th class="py-3 px-6 text-right">小計</th>
              </tr>
            </thead>

            <tbody
              class="border-b border-[#e7dacf]"
              v-for="item in order.order_items"
              :key="item.id"
            >
              <tr>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="size-14 bg-gray-200 rounded overflow-hidden shrink-0">
                      <img
                        v-if="item.snapshot_image"
                        :src="item.snapshot_image"
                        :alt="item.snapshot_name"
                        class="w-full h-full object-cover rounded"
                      />
                      <div
                        v-else
                        class="w-full h-full text-sm flex items-center justify-center text-gray-400"
                      >
                        無圖片
                      </div>
                    </div>
                    <div>
                      <p class="text-sm font-bold">{{ item.snapshot_name }}</p>
                      <p class="text-xs">{{ item.snapshot_weight }}</p>
                      <p class="text-xs text-gray-600">{{ item.pid }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-sm text-center">{{ item.quantity }}</td>
                <td class="py-4 px-6 text-sm text-right">${{ item.snapshot_price }}</td>
                <td class="py-4 px-6 text-sm font-bold text-right">${{ item.item_total }}</td>
              </tr>
            </tbody>
          </table>

          <div class="p-6 flex justify-end">
            <div class="w-full max-w-[240px] flex flex-col gap-2">
              <div class="flex justify-between text-sm">
                <p>商品金額</p>
                <p>${{ order.subtotal }}</p>
              </div>
              <div class="flex justify-between text-sm">
                <p>運費</p>
                <p>${{ order.shipping_fee }}</p>
              </div>
              <div class="h-px my-1"></div>
              <div class="flex justify-between font-bold">
                <p>總金額</p>
                <p>${{ order.total_amount }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm">
          <h2 class="font-bold flex items-center gap-2 mb-5 text-lg">
            <span class="material-symbols-outlined">account_circle</span>
            訂購人資訊
          </h2>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-sm">會員姓名：{{ order.user?.username || '無' }}</p>
            <p class="text-sm">信箱：{{ order.user?.email || '無' }}</p>
            <p class="text-sm">會員ID：{{ order.user?.user_id || '無' }}</p>
          </div>
        </div>

        <div class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm">
          <h3 class="font-bold flex items-center gap-2 mb-5 text-lg">
            <span class="material-symbols-outlined">person</span>
            收件資訊
          </h3>
          <div class="flex flex-col gap-1">
            <p class="text-sm">收件人: {{ order.recipient_name }}</p>
            <p class="text-sm">電話: {{ order.recipient_phone }}</p>
            <p class="text-sm">地址: {{ order.recipient_address }}</p>
            <p class="text-sm">配送方式: {{ order.shipping_method }}</p>
            <p class="text-sm">訂單狀態: {{ order.order_status }}</p>
            <p class="font-bold flex items-center gap-2 px-2 py-4 rounded-lg bg-[#fcfaf8]">
              <i class="fa-regular fa-comment-dots text-lg"></i>
              買家備註： {{ order.customer_note }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <!-- 運送資訊 -->

        <form class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm ring-2">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-lg flex items-center gap-2">
              <span class="material-symbols-outlined">local_shipping</span>
              運送資訊
            </h3>
            <a
              class="text-sm font-bold text-[#e27312] flex items-center gap-1"
              href="https://www.t-cat.com.tw/inquire/trace.aspx"
              target="_blank"
            >
              <span class="material-symbols-outlined text-[14px]">search</span>
              貨態查詢
            </a>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-bold mb-1.5">運送方式</label>
              <select
                class="w-full px-4 py-2.5 rounded-lg border border-[#e7dacf] bg-[#fcfaf8] focus:ring-0 text-sm"
              >
                <option>黑貓宅急便</option>
                <option>郵局</option>
                <option>宅配通</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold mb-1.5">物流單號</label>
              <div class="relative">
                <input
                  class="w-full pl-4 pr-10 py-2.5 rounded-lg border border-[#e7dacf] bg-[#fcfaf8] focus:ring-0 text-sm font-mono"
                  type="text"
                  value="TRK-9823104859"
                />
                <button class="absolute right-3 top-1/2 -translate-y-1/2">
                  <span class="material-symbols-outlined text-lg">auto_fix</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold mb-1.5">出貨時間</label>
              <input
                class="w-full px-4 py-2.5 rounded-lg focus:ring-0 text-sm border border-[#e7dacf] bg-[#fcfaf8]"
                type="datetime-local"
              />
            </div>

            <button
              class="w-full text-white bg-[#e27312] white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e6a974] active:scale-95 mt-4"
            >
              更新物流狀態
            </button>
          </div>
        </form>

        <!-- 付款資訊 -->
        <div class="rounded-xl p-6 shadow-sm border border-[#e7dacf] bg-white">
          <h3 class="font-bold flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined">payments</span>
            付款資訊
          </h3>

          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <p class="text-xs">付款狀態</p>
              <p
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200"
              >
                {{ order.payment_status }}
              </p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款方式</p>
              <p class="text-sm flex items-center gap-1">{{ order.payment_method }}</p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款時間</p>
              <p class="text-sm">{{ new Date(order.paid_at).toLocaleString('zh-TW') }}</p>
            </div>

            <button
              class="w-full border border-red-200 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-50 active:scale-95 mt-2"
            >
              退款
            </button>
          </div>
        </div>

        <button
          @click="$router.back()"
          type="button"
          class="w-full text-white bg-[#e27312] white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e6a974] active:scale-95"
        >
          返回訂單管理
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { callSingleOrder } from '@/services/adminOrderService';
  import type { OrderRequest } from '@/services/adminOrderService';

  const route = useRoute();

  const order = ref<OrderRequest | null>(null);
  const loading = ref(false);
  const error = ref('');

  async function loadOrder(order_number: string) {
    loading.value = true;
    error.value = '';

    try {
      console.log('🔍 載入訂單明細:', order_number);
      const res = await callSingleOrder(order_number);
      order.value = res.data;
      console.log('✅ 載入成功:', order.value);
    } catch (err: any) {
      console.error('❌ 載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    const orderNumber = route.params.order_number as string;
    console.log('訂單編號:', orderNumber);

    if (orderNumber) {
      loadOrder(orderNumber);
    } else {
      error.value = '缺少訂單編號';
    }
  });
</script>
