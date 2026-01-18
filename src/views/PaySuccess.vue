<template>
  <div class="bg-[--main-color]">
    <!-- 打勾 -->
    <div class="flex flex-col items-center py-[64px] w-[450px] mx-auto">
      <div
        class="rounded-full bg-[var(--green-gray)] inline-block w-[100px] h-[100px] text-center leading-[100px] text-[24px] text-white shadow-[0_0_20px_20px_rgba(0,0,0,0.1)]"
      >
        <i class="fa-solid fa-check fa-2xl"></i>
      </div>

      <p class="text-4xl font-bold text-[#222222] mt-[32px] mb-[24px]">付款成功</p>
      <p class="text-[#666666]">感謝您的購買！FeiTime期待您再次光臨</p>

      <!-- 訂單資訊 -->
      <div
        class="bg-white rounded-[12px] border-[#dddddd] border-4 text-[20px] my-[32px] w-[100%] px-[24px] py-[24px]"
      >
        <div class="flex justify-between">
          <p class="text-[#666666]">訂單編號</p>
          <p class="text-[--heavy-brown]">{{ orderThing?.order_number }}</p>
        </div>
        <div class="flex justify-between my-[16px]">
          <p class="text-[#666666]">總金額</p>
          <p class="text-[--heavy-brown]">$ {{ orderThing?.total_amount }}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-[#666666]">購買日期</p>
          <p class="text-[--heavy-brown]">{{ taiwanTime }}</p>
        </div>
      </div>

      <router-link
        to="/product"
        class="text-xl bg-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--main-color)] font-[600] w-full text-center"
      >
        繼續購物
      </router-link>

      <router-link
        to="/home"
        class="mt-[20px] text-xl border-2 border-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--green-gray)] font-[600] w-full text-center"
      >
        前往首頁
      </router-link>
    </div>
  </div>
  <div @click="A" class="text-[48px] bg-[#ffb8f4]">測試put</div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { orderList } from '@/store/order';
  import { updateOrder } from '@/services/checkout';

  /*
  interface ProductRule {
    pid: string;
    quantity: number;
    snapshot_name: string;
    snapshot_price: number;
    snapshot_image: string;
    snapshot_weight: string;
    item_total: number;
  }

  interface OrderRule {
    id: number;
    order_number: string;
    subtotal: number;
    shipping_fee: number;
    total_amount: number;
    order_status: string;
    payment_status: string;
    recipient_name: string;
    recipient_phone: string;
    recipient_address: string;
    shipping_method: string;
    createdAt: string;
    updatedAt: string;
    order_items: ProductRule[];
  }
*/

  const piniaGet = orderList();
  const orderThing = computed(() => piniaGet.orderThing);
  const taiwanTime = ref('');

  // order_status: 'processing'    訂單狀態 (處理中)
  // payment_status: 'paid'  付款狀態 (已付款)

  onMounted(async () => {
    if (orderThing.value) {
      taiwanTime.value = new Date(orderThing.value.createdAt).toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false, // 使用 24 小時制，若要 12 小時制可改為 true
      });
      // orderThing.value.id
    }
  });

  const A = async () => {
    const orderId = orderThing.value?.order_number;
    if (!orderId) {
      return;
    }

    const buyAfter = {
      order_number: orderId,
      payment_status: 'paid',
    };

    try {
      const putAfter = await updateOrder(buyAfter);
      console.log(putAfter.data);
    } catch (err: any) {
      console.error('API 串接出錯：', err.message);
      console.error(err.res.error);
      console.error(err.res.message);
      console.error(err.res.detail);
    }
  };
</script>

<style>
  /* Tailwind 3.4 官網 */
  /* https://v3.tailwindcss.com/ */

  /* Font-awesome */
  /* https://fontawesome.com/search?ic=free-collection */

  /*
    先寫不會變動的樣式
    再用lg: 寫電腦版
    再用md: 寫平板
    手機版 不用特別寫
  */

  /* 
    在F12 元素丟這段 找回滑鼠
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: auto !important; }`;
    document.head.appendChild(style); 
  */

  :root {
    --main-color: #faf9ee;
    /* 淡黃 */
    --green-gray: #a2af9b;
    /* 抹茶綠 */
    --soft-brown: #dccfc0;
    /* 亮咖啡 */
    --heavy-brown: #b49e89;
    /* 深咖啡 */
    --light-gray: #eeeeee;
    /* 淡灰 */
  }
</style>
