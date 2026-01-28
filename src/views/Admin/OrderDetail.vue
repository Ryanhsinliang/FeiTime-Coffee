<template>
  <header
    class="h-16 flex items-center px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center text-sm gap-2">
      <p>訂單管理</p>
      <span class="material-symbols-outlined text-lg">chevron_right</span>
      <p class="font-semibold">訂單編號 #{{ order?.order_number }}</p>
    </div>
  </header>

  <main class="max-w-[1200px] mx-auto flex flex-col gap-8 flex-1 overflow-y-auto p-8">
    <!-- 運送狀態 -->
    <div v-if="order" class="rounded-xl p-6 shadow-sm border border-[#e7dacf] bg-white">
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto pb-4 md:pb-0"
      >
        <!-- 待付款 -->
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span
            class="material-symbols-outlined text-2xl"
            :class="isPending ? 'text-emerald-500' : 'text-[#e7dacf]'"
          >
            pending_actions
          </span>
          <p class="text-xs" :class="isPending ? 'text-emerald-500' : 'text-[#e7dacf]'">待付款</p>
        </div>

        <div
          class="hidden md:block h-[2px] flex-1"
          :class="isProcessing ? 'bg-emerald-500' : 'bg-[#e7dacf]'"
        ></div>

        <!-- 待出貨 -->
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span
            class="material-symbols-outlined text-2xl"
            :class="isProcessing ? 'text-emerald-500' : 'text-[#e7dacf]'"
          >
            deployed_code_history
          </span>
          <p class="text-xs" :class="isProcessing ? 'text-emerald-500' : 'text-[#e7dacf]'">
            待出貨
          </p>
        </div>

        <div
          class="hidden md:block h-[2px] flex-1"
          :class="isShipped ? 'bg-emerald-500' : 'bg-[#e7dacf]'"
        ></div>

        <!-- 已出貨 -->
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span
            class="material-symbols-outlined text-2xl"
            :class="isShipped ? 'text-emerald-500' : 'text-[#e7dacf]'"
          >
            local_shipping
          </span>
          <p class="text-xs" :class="isShipped ? 'text-emerald-500' : 'text-[#e7dacf]'">已出貨</p>
        </div>

        <div
          class="hidden md:block h-[2px] flex-1"
          :class="isDelivered ? 'bg-emerald-500' : 'bg-[#e7dacf]'"
        ></div>

        <!-- 已完成 -->
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span
            class="material-symbols-outlined text-2xl"
            :class="isDelivered ? 'text-emerald-500' : 'text-[#e7dacf]'"
          >
            verified
          </span>
          <p class="text-xs" :class="isDelivered ? 'text-emerald-500' : 'text-[#e7dacf]'">已完成</p>
        </div>

        <div class="hidden md:block h-[2px] flex-1 bg-[#e7dacf]"></div>

        <!-- 已取消 -->
        <div class="flex flex-col items-center gap-2 min-w-[100px]">
          <span
            class="material-symbols-outlined text-2xl"
            :class="isCancelled ? 'text-red-500' : 'text-[#e7dacf]'"
          >
            cancel
          </span>
          <p class="text-xs" :class="isCancelled ? 'text-red-500' : 'text-[#e7dacf]'">已取消</p>
        </div>
      </div>
    </div>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error" class="text-red-600 text-center py-8">{{ error }}</div>

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
            <p class="text-sm">訂單狀態: {{ orderStatusText(order.order_status) }}</p>
            <p class="text-sm">物流單號: {{ order.tracking_number || '尚未出貨' }}</p>
            <p class="text-sm">
              出貨時間:
              {{
                order.shipped_at ? new Date(order.shipped_at).toLocaleString('zh-TW') : '尚未出貨'
              }}
            </p>
            <p class="font-bold flex items-center gap-2 px-2 py-4 rounded-lg bg-[#fcfaf8]">
              <i class="fa-regular fa-comment-dots text-lg"></i>
              買家備註： {{ order.customer_note || '無' }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <!-- 運送資訊 -->
        <form
          @submit.prevent="handleUpdateShipping"
          class="border border-[#e7dacf] bg-white rounded-xl p-6 shadow-sm ring-2"
        >
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
              <label class="block text-sm font-bold mb-1.5">物流單號</label>
              <div class="relative">
                <input
                  v-model="shippingForm.tracking_number"
                  class="w-full pl-4 pr-10 py-2.5 rounded-lg border border-[#e7dacf] bg-[#fcfaf8] focus:ring-0 text-sm font-mono"
                  type="text"
                  placeholder="請輸入物流單號"
                  required
                />
                <button
                  type="button"
                  @click="generateTrackingNumber"
                  class="absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#e27312]"
                  title="自動生成物流單號"
                >
                  <span class="material-symbols-outlined text-lg">auto_fix</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold mb-1.5">出貨時間</label>
              <input
                v-model="shippingForm.shipped_at"
                class="w-full px-4 py-2.5 rounded-lg focus:ring-0 text-sm border border-[#e7dacf] bg-[#fcfaf8]"
                type="datetime-local"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="updating"
              class="w-full text-white bg-[#e27312] py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e6a974] active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ updating ? '更新中...' : '更新物流狀態' }}
            </button>

            <!-- 更新成功/錯誤提示 -->
            <div
              v-if="updateMessage"
              class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 mb-6 p-4 rounded-lg"
              :class="
                updateSuccess
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              "
            >
              {{ updateMessage }}
            </div>
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
                {{ paymentStatusText(order.payment_status) }}
              </p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款方式</p>
              <p class="text-sm flex items-center gap-1">
                {{ paymentMethodText(order.payment_method) }}
              </p>
            </div>

            <div class="flex justify-between items-center">
              <p class="text-xs">付款時間</p>
              <p class="text-sm">
                {{ order.paid_at ? new Date(order.paid_at).toLocaleString('zh-TW') : '尚未付款' }}
              </p>
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
          class="w-full text-white bg-[#e27312] py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e6a974] active:scale-95"
        >
          返回訂單管理
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { callSingleOrder, callUpdateOrder } from '@/services/admin/adminOrderService';
  import type { OrderRequest } from '@/services/admin/adminOrderService';
  import { orderStatusText, paymentStatusText, paymentMethodText } from '@/utils/statusTranslator';

  const route = useRoute();

  const order = ref<OrderRequest | null>(null);
  const loading = ref(false);
  const error = ref('');
  const updating = ref(false);
  const updateMessage = ref('');
  const updateSuccess = ref(false);

  // 物流表單資料
  const shippingForm = ref({
    tracking_number: '',
    shipped_at: '',
  });

  // 自動生成物流單號(依時間戳)
  function generateTrackingNumber() {
    const timestamp = Date.now();
    shippingForm.value.tracking_number = `TRK-${timestamp}`;
  }

  // 轉換為 datetime-local 格式
  function toDatetimeLocal(input?: string | Date | null) {
    const date = input ? new Date(input) : new Date();
    if (Number.isNaN(date.getTime())) return ''; // 防呆：日期無效就回空字串

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // 設定當前時間為出貨時間
  function setCurrentDateTime() {
    shippingForm.value.shipped_at = toDatetimeLocal(); // 不傳值就用現在時間
  }

  // 判斷付款方式是否為取貨付款
  const isCashOnDelivery = computed(() => {
    return (
      order.value?.payment_method === '取貨付款' ||
      order.value?.payment_method === '貨到付款' ||
      order.value?.payment_method === 'cod'
    );
  });

  // 待付款階段：line pay支付成功之前，取貨付款訂單成立前
  const isPending = computed(() => {
    if (!order.value) return false;
    const status = order.value.order_status;

    // 包含全部出貨狀態
    return ['pending', 'paid', 'processing', 'shipped', 'delivered'].includes(status);
  });

  // 待出貨(processing)階段：line pay支付成功跳轉回訂單成立，取貨付款訂單成立
  // 結帳頁已處理：line pay付款(paid)後會跳processing，取貨付款直接跳processing
  const isProcessing = computed(() => {
    if (!order.value) return false;
    const status = order.value.order_status;

    // Line Pay: paid, processing, shipped, delivered 都算待出貨
    if (!isCashOnDelivery.value) {
      return ['paid', 'processing', 'shipped', 'delivered'].includes(status);
    }
    // 取貨付款: pending 就算進入待出貨階段
    return ['pending', 'paid', 'processing', 'shipped', 'delivered'].includes(status);
  });

  // 判斷是否已出貨
  const isShipped = computed(() => {
    if (!order.value) return false;
    const status = order.value.order_status;
    return ['shipped', 'delivered'].includes(status);
  });

  // 判斷是否已完成(已送達)
  const isDelivered = computed(() => {
    return order.value?.order_status === 'delivered';
  });

  // 判斷是否已取消
  const isCancelled = computed(() => {
    return order.value?.order_status === 'cancelled';
  });

  // 載入訂單資料
  async function loadOrder(order_number: string) {
    loading.value = true;
    error.value = '';
    try {
      const res = await callSingleOrder(order_number);
      order.value = res.data;

      // 如果訂單已有物流資訊，填入表單
      if (order.value.tracking_number) {
        shippingForm.value.tracking_number = order.value.tracking_number;
      }
      if (order.value.shipped_at) {
        // 轉換為 datetime-local 格式
        shippingForm.value.shipped_at = toDatetimeLocal(order.value.shipped_at);
      } else {
        // 如果沒有出貨時間，預設為當前時間
        setCurrentDateTime();
      }
    } catch (err: unknown) {
      error.value = '商品載入失敗';
    } finally {
      loading.value = false;
    }
  }

  // 處理物流更新
  async function handleUpdateShipping() {
    if (!order.value) return;

    // 驗證表單
    if (!shippingForm.value.tracking_number.trim()) {
      updateMessage.value = '請輸入物流單號';
      updateSuccess.value = false;
      return;
    }
    if (!shippingForm.value.shipped_at) {
      updateMessage.value = '請選擇出貨時間';
      updateSuccess.value = false;
      return;
    }

    updating.value = true;
    updateMessage.value = '';

    try {
      const res = await callUpdateOrder(order.value.order_number, {
        tracking_number: shippingForm.value.tracking_number,
        shipped_at: new Date(shippingForm.value.shipped_at).toISOString(),
      });

      updateMessage.value = '物流資訊更新成功！';
      updateSuccess.value = true;

      // 重新載入訂單資料
      await loadOrder(order.value.order_number);

      // 3秒後清除提示訊息
      setTimeout(() => {
        updateMessage.value = '';
      }, 3000);
    } catch (err: unknown) {
      updateMessage.value = '物流資訊更新失敗';
      updateSuccess.value = false;
      setTimeout(() => {
        updateMessage.value = '';
      }, 3000);
    } finally {
      updating.value = false;
    }
  }

  onMounted(() => {
    const orderNumber = route.params.order_number as string;

    if (orderNumber) {
      loadOrder(orderNumber);
    } else {
      error.value = '缺少訂單編號';
    }
  });
</script>
