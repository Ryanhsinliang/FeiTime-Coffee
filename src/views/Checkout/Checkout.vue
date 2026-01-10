<template>
  <main class="font-wenkai flex justify-center">
    <form action="#" class="w-[55%] bg-[#FAFAFA] pt-4 pb-8 flex justify-end">
      <div class="w-[65%]">
        <div class="my-5">
          <h2 class="text-2xl font-semibold mb-5">配送方式</h2>
          <p>宅配取貨付款</p>
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
        </div>
        <button type="submit" class="w-full p-3 rounded-md mt-2 mb-4 bg-lime-400 text-white">
          確認送出訂單
        </button>
      </div>
    </form>

    <section class="w-[45%]">
      <div class="w-[65%]">
        <div class="flex mx-8 my-12">
          <img
            src="./assets/coffee_001.png"
            alt=""
            class="w-[64px] h-full aspect-square object-cover rounded-xl"
          />
          <div class="mx-4 w-[65%]">
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
  <button @click="useLinePay" class="w-full p-3 rounded-md mt-2 mb-4 bg-lime-400 text-white">
    確認送出訂單
  </button>
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

<style></style>
