<template>
  <main class="font-wenkai flex justify-center">
    <!-- 寄送資料 -->
    <form action="#" class="w-[55%] bg-[#FAFAFA] pt-4 pb-8 flex justify-end">
      <div class="w-[65%]">
        <div class="my-5">
          <h2 class="text-2xl font-semibold mb-5">配送方式</h2>
          <p>宅配取貨</p>
        </div>

        <div class="">
          <h2 class="text-2xl font-semibold mb-5">收件人資訊</h2>
          <label for="name" class="block">姓名</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="姓名"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="phone" class="block">電話</label>
          <input
            v-model="form.phone"
            type="tel"
            id="phone"
            placeholder="電話"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="email" class="block">電子郵件</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="電子郵件"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="address" class="block">收件人地址</label>
          <input
            v-model="form.address"
            type="text"
            id="address"
            placeholder="收件地址"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="address" class="block">備註</label>
          <input
            v-model="form.address"
            type="text"
            id="address"
            placeholder="若"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <h2 class="text-2xl font-semibold mb-[12px] mt-[24px]">付款方式</h2>

          <div class="flex">
            <input
              type="checkbox"
              id="give-money"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
            />
            <label for="give-money" class="pl-[8px]">
              <img src="./assets/linepay.svg" alt="linepay支付" class="w-[160px]" />
            </label>
          </div>
        </div>

        <button type="submit" class="w-full p-3 rounded-md mt-2 mb-4 bg-[--green-gray] text-white">
          確認送出訂單
        </button>

        <!-- 備用 文字版linepay -->
        <!-- <button @click="useLinePay" class="flex text-[36px] mx-auto">
          <p class="font-[700] px-[12px] py-[8px]">LINE</p>
          <p class="font-[600] px-[12px] py-[8px] rounded-[4px] bg-[#00C34D] text-white">Pay</p>
        </button> -->
      </div>
    </form>

    <!-- 訂單資料 -->
    <section class="w-[45%]">
      <div class="w-[65%]">
        <!-- 這下面要跑v-for -->
        <div class="flex mx-8 my-12">
          <img
            src="./assets/coffee_001.png"
            alt=""
            class="w-[64px] h-full aspect-square object-cover rounded-xl"
          />
          <div class="mx-4 w-full">
            <h3>耶加雪菲G1日曬</h3>
            <p class="text-sm mt-2">200g</p>
          </div>
          <div class="">$1,000</div>
        </div>

        <div class="mx-8">
          <div class="flex justify-between">
            <p class="">商品金額</p>
            <p id="price" class="">$1,000</p>
          </div>

          <div class="flex justify-between">
            <p>運費</p>
            <p id="shippingFee">$130</p>
          </div>

          <div class="flex justify-between text-lg my-4">
            <p>總金額</p>
            <p>$1,130</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <p class="text-[48px] bg-[#ffb8f4] p-3" @click="useLinePay">測試linepay</p>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, reactive, computed } from 'vue';

  const form = reactive({
    email: '',
    name: '',
    phone: '',
    address: '',
  });

  // 串linepay
  const linepayUrl = import.meta.env.VITE_LINK;
  const useLinePay = async () => {
    try {
      // 前往後端
      const response = await axios.post(`${linepayUrl}/linepay/gobuy`, {
        amount: 3, // 這邊之後拉資料庫
        productName: '美味咖啡豆', // 這邊之後拉資料庫
      });

      if (response.data.returnCode === '0000') {
        // linepay回傳物件給後端  後端再丟回物件給前端 從物件中抓出狀態碼
        // linepay定義狀態碼為字串 "0000" 才是成功
        window.location.href = response.data.info.paymentUrl.web;
        // window.location.href 可以跳轉至寫進去的網址 執行後瀏覽器會立刻跳轉過去 就像是在瀏覽器輸入網址並按 Enter 一樣
        // 從物件中抓出網址 跳轉到linepay付款頁面 網址每次都不一樣
      } else {
        alert('建立交易失敗：' + response.data.returnMessage); // 從物件中抓出錯誤訊息
      }
    } catch (error: any) {
      console.error('結帳出錯：', error.response?.data || error.message);
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
