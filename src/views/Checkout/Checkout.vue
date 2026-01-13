<template>
  <main class="font-wenkai flex flex-col items-center bg-[--main-color]">
    <form action="#" class="w-[50%] pt-4 pb-8 px-[40px] justify-center">
      <div class="">
        <div class="my-5">
          <!-- 【 1 】 配送方式 -->
          <h2 class="text-2xl font-semibold mb-5">配送方式</h2>
          <div class="flex my-[18px]">
            <!-- 車icon-->
            <div
              class="cursor-pointer mx-[12px] w-[50%] flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px]"
            >
              <i class="fa-solid fa-truck text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">宅配取貨</p>
              <p class="text-[#666666]">約3~5個工作天</p>
            </div>
            <!--店icon -->
            <div
              class="cursor-pointer mx-[12px] w-[50%] flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px]"
            >
              <i class="fa-solid fa-shop text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">來店取貨</p>
              <p class="text-[#666666]">約3~5小時</p>
            </div>
          </div>
        </div>

        <!-- 【 2 】 收件人資訊 -->
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

          <label for="remark" class="block">備註</label>
          <input
            v-model="form.remark"
            type="text"
            id="remark"
            placeholder="請輸入備註（ 最多200字 ）"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <!-- 【 3 】  付款方式 -->
          <h2 class="text-2xl font-semibold mb-[12px] mt-[24px]">付款方式</h2>

          <div class="flex">
            <input
              type="radio"
              id="give-money"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
            />
            <label for="give-money" class="pl-[8px]">
              <img src="./assets/linepay.svg" alt="linepay支付" class="w-[160px]" />
            </label>
          </div>
        </div>

        <!-- 【 4 】  訂單資料 -->
        <section class="">
          <h2 class="text-2xl font-semibold mb-5">訂單資料</h2>
          <div class="px-[40px]">
            <!-- 這下面要跑v-for -->
            <div class="flex my-12">
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

            <!-- 產品小計 -->
            <div class="">
              <div class="flex justify-between text-[20px]">
                <p class="">商品金額</p>
                <p id="price" class="">$1,000</p>
              </div>

              <div class="flex justify-between text-[20px]">
                <p>運費</p>
                <p id="shippingFee">$130</p>
              </div>

              <div class="flex justify-between my-4 text-[24px] font-bold">
                <p>總金額</p>
                <p>$1,130</p>
              </div>
            </div>
          </div>
        </section>

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
  </main>
  <p class="text-[48px] bg-[#ffb8f4] p-3" @click="useLinePay">測試linepay</p>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, reactive, computed } from 'vue';

  const form = reactive({
    name: '',
    phone: '',
    email: '',
    address: '',
    remark: '',
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
