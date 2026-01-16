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

    <!-- 訂購商品 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 flex flex-col gap-8">
        <div class="border border-[#e7dacf] bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="px-6 py-4 border-b border-[#e7dacf] flex justify-between items-center">
            <h3 class="font-bold flex items-center gap-2">
              <p class="material-symbols-outlined">receipt_long</p>
              訂購商品
            </h3>
            <p class="text-xs">下單日期：2023-10-25 10:32</p>
          </div>

          <table class="w-full text-left">
            <thead>
              <tr class="text-xs border-b border-[#e7dacf] bg-[#fcfaf8]">
                <th class="py-3 px-6">商品名稱</th>
                <th class="py-3 px-6 text-center">數量</th>
                <th class="py-3 px-6 text-right">價錢</th>
                <th class="py-3 px-6 text-right">小計</th>
              </tr>
            </thead>

            <tbody class="border-b border-[#e7dacf]">
              <tr>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="size-12 rounded overflow-hidden shrink-0">
                      <img
                        alt="Coffee"
                        class="w-full h-full object-cover"
                        src="./assets/coffee_001.png"
                      />
                    </div>
                    <div>
                      <p class="text-sm font-bold">衣索比亞 爺家雪菲</p>
                      <p class="text-xs">250g</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-sm text-center">1</td>
                <td class="py-4 px-6 text-sm text-right">$300</td>
                <td class="py-4 px-6 text-sm font-bold text-right">$300</td>
              </tr>

              <tr>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="size-12 rounded overflow-hidden shrink-0">
                      <img
                        alt="V60"
                        class="w-full h-full object-cover"
                        src="./assets/coffee_001.png"
                      />
                    </div>
                    <div>
                      <p class="text-sm font-bold">印尼 曼特寧</p>
                      <p class="text-xs">250g</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-sm text-center">2</td>
                <td class="py-4 px-6 text-sm text-right">$300</td>
                <td class="py-4 px-6 text-sm font-bold text-right">$600</td>
              </tr>
            </tbody>
          </table>

          <div class="p-6 flex justify-end">
            <div class="w-full max-w-[240px] flex flex-col gap-2">
              <div class="flex justify-between text-sm">
                <p>商品金額</p>
                <p>$900</p>
              </div>
              <div class="flex justify-between text-sm">
                <p>運費</p>
                <p>$125</p>
              </div>
              <div class="h-px my-1"></div>
              <div class="flex justify-between font-bold">
                <p>總金額</p>
                <p>$1025</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm">
          <h3 class="font-bold flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined">person</span>
            收件資訊
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start gap-4">
              <div class="flex flex-col gap-1">
                <p class="text-sm font-bold">收件人: John Doe</p>
                <p class="text-xs">ID: #89932</p>
                <p class="text-xs">Email: john.doe@example.com</p>
                <p class="text-xs">電話: 0900-000-000</p>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-xs font-bold mb-1">收件地址</h3>
              <p class="text-sm">104 臺北市中山區民生東路三段67號</p>
            </div>
          </div>
        </div>

        <div class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm">
          <h3 class="font-bold flex items-center gap-2 mb-6">
            <i class="fa-regular fa-comment-dots text-lg"></i>
            買家備註
          </h3>
          <p class="text-sm">我要送禮，請幫我包裝</p>
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <!-- 運送資訊 -->
        <form class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm ring-2">
          <h3 class="font-bold flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined">local_shipping</span>
            運送資訊
          </h3>

          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-xs font-bold mb-1.5">運送方式</label>
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
                已付款
              </p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款方式</p>
              <p class="text-sm flex items-center gap-1">line pay</p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款時間</p>
              <p class="text-sm">2023-10-25 10:32</p>
            </div>

            <button
              class="w-full border border-red-200 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-50 active:scale-95 mt-2"
            >
              退款
            </button>
          </div>
        </div>

        <button
          class="w-full text-white bg-[#e27312] white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e6a974] active:scale-95"
        >
          返回訂單管理
        </button>
      </div>
    </div>
  </main>

  <!-- 測試用 -->
  <div class="p-4">
    <button @click="$router.back()" class="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
      ← 返回列表
    </button>

    <!-- Loading / Error -->
    <p v-if="loading">載入中...</p>
    <p v-else-if="error" class="text-red-500">{{ error }}</p>

    <!-- 訂單明細 -->
    <div v-else-if="order" class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-6">🧾 訂單明細</h1>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="text-sm text-gray-600">訂單編號</label>
          <div class="font-bold">{{ order.order_number }}</div>
        </div>
        <div>
          <label class="text-sm text-gray-600">訂單狀態</label>
          <div>{{ order.order_status }}</div>
        </div>
        <div>
          <label class="text-sm text-gray-600">付款狀態</label>
          <div>{{ order.payment_status }}</div>
        </div>
        <div>
          <label class="text-sm text-gray-600">付款方式</label>
          <div>{{ order.payment_method }}</div>
        </div>
      </div>

      <div>
        <label class="text-sm text-gray-600">訂購商品</label>
        <div>{{ order.order_items }}</div>
      </div>

      <hr class="my-6" />

      <h2 class="text-lg font-bold mb-4">收件資訊</h2>
      <div class="space-y-2">
        <div>
          <strong>收件人:</strong>
          {{ order.recipient_name }}
        </div>
        <div>
          <strong>電話:</strong>
          {{ order.recipient_phone }}
        </div>
        <div>
          <strong>地址:</strong>
          {{ order.recipient_address }}
        </div>
        <div>
          <strong>配送方式:</strong>
          {{ order.shipping_method }}
        </div>
        <div v-if="order.tracking_number">
          <strong>物流單號:</strong>
          {{ order.tracking_number }}
        </div>
      </div>

      <hr class="my-6" />

      <h2 class="text-lg font-bold mb-4">金額明細</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>商品小計</span>
          <span>${{ order.subtotal }}</span>
        </div>
        <div class="flex justify-between">
          <span>運費</span>
          <span>${{ order.shipping_fee }}</span>
        </div>
        <hr />
        <div class="flex justify-between text-lg font-bold">
          <span>總金額</span>
          <span>${{ order.total_amount }}</span>
        </div>
      </div>

      <hr class="my-6" />

      <div class="text-sm text-gray-600 space-y-1">
        <div>建立時間: {{ new Date(order.createdAt).toLocaleString('zh-TW') }}</div>
        <div v-if="order.paid_at">
          付款時間: {{ new Date(order.paid_at).toLocaleString('zh-TW') }}
        </div>
        <div v-if="order.shipped_at">
          出貨時間: {{ new Date(order.shipped_at).toLocaleString('zh-TW') }}
        </div>
      </div>

      <div v-if="order.customer_note" class="mt-4 p-3 bg-yellow-50 rounded">
        <strong>買家備註:</strong>
        {{ order.customer_note }}
      </div>
    </div>
  </div>
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
