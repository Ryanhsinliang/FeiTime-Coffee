<template>
  <main class="font-wenkai flex flex-col items-center bg-[--main-color]">
    <form action="#" class="w-[90%] md:w-[80%] lg:w-[50%] pt-4 pb-8 px-[40px] justify-center">
      <div class="">
        <div class="mt-[20px] mb-[28px]">
          <!-- 【 1 】 配送方式 -->
          <h2 class="text-2xl font-semibold mb-[20px]">配送方式</h2>
          <div class="flex my-[18px] flex-col md:flex-row lg:flex-row">
            <!-- 車icon-->
            <div
              class="cursor-pointer flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px] mb-[12px] md:mb-0 lg:mb-0 mx-auto md:mx-[12px] lg:mx-[12px] w-[200px] md:w-[50%] lg:w-[50%]"
            >
              <i class="fa-solid fa-truck text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">宅配取貨</p>
              <p class="text-[#666666]">約3~5個工作天</p>
            </div>
            <!--店icon -->
            <div
              class="cursor-pointer flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px] mb-[12px] md:mb-0 lg:mb-0 mx-auto md:mx-[12px] lg:mx-[12px] w-[200px] md:w-[50%] lg:w-[50%]"
            >
              <i class="fa-solid fa-shop text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">來店取貨</p>
              <p class="text-[#666666]">約3~5小時</p>
            </div>
          </div>
        </div>

        <!-- 【 2 】 收件人資訊 -->
        <div class="mb-[28px]">
          <h2 class="text-2xl font-semibold mb-[20px]">收件人資訊</h2>
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
        </div>

        <!-- 【 3 】  付款方式 -->
        <div class="mb-[28px]">
          <h2 class="text-2xl font-semibold mt-[12px] mb-[20px]">付款方式</h2>

          <div class="flex">
            <input
              type="radio"
              id="m-linepay"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
              name="give-money"
            />
            <label for="m-linepay" class="pl-[20px]">
              <img src="./assets/linepay.svg" alt="linepay支付" class="w-[160px] h-[60px]" />
            </label>
          </div>

          <div class="flex my-[12px]">
            <input
              type="radio"
              id="m-paypay"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
              name="give-money"
            />
            <label for="m-paypay" class="pl-[20px]">
              <img src="./assets/paypay.svg" alt="paypay支付" class="w-[160px] h-[60px]" />
            </label>
          </div>

          <div class="flex">
            <input
              type="radio"
              id="m-card"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
              name="give-money"
            />
            <label for="m-card" class="pl-[20px]">
              <img
                src="./assets/kaato.svg"
                alt="刷卡"
                class="w-[160px] py-[16px] h-[60px] bg-white"
              />
            </label>
          </div>

          <div class="flex">
            <input
              type="radio"
              id="m-ok711"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
              name="give-money"
            />
            <label for="m-ok711" class="pl-[20px]">
              <img src="./assets/ok711.svg" alt="超商付款" class="w-[160px] h-[60px]" />
            </label>
          </div>

          <div class="flex my-[12px]">
            <input
              type="radio"
              id="m-come"
              required
              class="p-3 border border-gray-300 rounded-md mt-2 mb-4"
              name="give-money"
            />
            <label for="m-come" class="pl-[20px]">
              <img src="./assets/come.svg" alt="貨到付款" class="w-[160px] h-[60px]" />
            </label>
          </div>
        </div>

        <!-- 【 4 】  訂單資料 -->
        <section class="">
          <h2 class="text-2xl font-semibold mb-[20px]">訂單資料</h2>
          <div class="px-0 md:px-[40px] lg:px-[40px]">
            <div class="my-[48px] px-[24px] max-h-[400px] overflow-y-auto">
              <!-- 這下面的div要跑v-for -->
              <div class="flex flex-col md:flex-row lg:flex-row my-[20px]">
                <img
                  src="./assets/coffee_001.png"
                  alt="商品圖片"
                  class="w-[64px] h-full aspect-square object-cover rounded-xl"
                />
                <div class="mx-0 md:mx-[16px] lg:mx-[16px] w-full">
                  <h3>耶加雪菲G1日曬</h3>
                  <p class="text-sm mt-0 md:mt-[8px] lg:mt-[8px]">200g</p>
                </div>
                <div class="">$1,000</div>
              </div>
              <!-- v-for結束 -->

              <!-- 以下假資料 -->
              <div class="flex flex-col md:flex-row lg:flex-row my-[20px]">
                <img
                  src="./assets/coffee_001.png"
                  alt="商品圖片"
                  class="w-[64px] h-full aspect-square object-cover rounded-xl"
                />
                <div class="mx-0 md:mx-[16px] lg:mx-[16px] w-full">
                  <h3>耶加雪菲G1日曬</h3>
                  <p class="text-sm mt-0 md:mt-[8px] lg:mt-[8px]">200g</p>
                </div>
                <div class="">$1,000</div>
              </div>
              <div class="flex flex-col md:flex-row lg:flex-row my-[20px]">
                <img
                  src="./assets/coffee_001.png"
                  alt="商品圖片"
                  class="w-[64px] h-full aspect-square object-cover rounded-xl"
                />
                <div class="mx-0 md:mx-[16px] lg:mx-[16px] w-full">
                  <h3>耶加雪菲G1日曬</h3>
                  <p class="text-sm mt-0 md:mt-[8px] lg:mt-[8px]">200g</p>
                </div>
                <div class="">$1,000</div>
              </div>
              <div class="flex flex-col md:flex-row lg:flex-row my-[20px]">
                <img
                  src="./assets/coffee_001.png"
                  alt="商品圖片"
                  class="w-[64px] h-full aspect-square object-cover rounded-xl"
                />
                <div class="mx-0 md:mx-[16px] lg:mx-[16px] w-full">
                  <h3>耶加雪菲G1日曬</h3>
                  <p class="text-sm mt-0 md:mt-[8px] lg:mt-[8px]">200g</p>
                </div>
                <div class="">$1,000</div>
              </div>
              <!-- 【假資料】結束 -->
            </div>

            <!-- 產品小計 -->
            <div
              class="bg-[--soft-brown] px-[24px] py-[18px] rounded-[24px] mb-[24px] shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
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

        <button
          type="submit"
          class="ml-0 md:ml-[25%] lg:ml-[25%] w-[100%] md:w-[50%] lg:w-[50%] p-[12px] rounded-md mt-2 mb-4 bg-[--green-gray] text-white font-bold text-[20px]"
        >
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
  <p class="text-[48px] bg-[#67EBEF] p-3" @click="cart">測試購物車</p>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, reactive } from 'vue';
  import { getCart } from '@/services/checkout';

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

  // 抓購物車
  interface cartProductRule {
    // 購物車物件 內的 陣列 的規範
    name: string;
    price: number;
    quantity: number;
  }

  interface cartRule {
    // 購物車物件 的規範
    id: number;
    item_total: number; // 總價錢
    product: cartProductRule[];
    quantity: number;
    snapshot_price: number;
  }

  const memberCart = ref<Partial<cartRule>>({}); // 一個產品資訊的物件

  const cart = async () => {
    const AAA = 12; // 假參數 之後用user.id 到時候把參數放進()

    const cartData = await getCart(); // 它是陣列
    const idCart = cartData.filter((obj: cartRule) => {
      return Number(obj.id) == AAA;
    }); // 這會篩選出 裝有所有user.id(AAA)是12的物件 的陣列 [ {},{},{}]
    console.log(idCart);
  };
  // 概念釐清 : 一個table 只是id=1買的一個其中產品
  // id = 1 可能買很多個不同的商品 所以會有很多個table
  // 我要找出這些table 加總 總金額 並加上【運費】

  // 之後慈會加一個欄位 <付款狀態>
  // 當它成功結帳後 我要把 <付款狀態> 改成已付款
  // 避免每次在撈資料時 撈到之前已結帳的單
</script>

<style>
  /* Tailwind 3.4 官網 */
  /* https://v3.tailwindcss.com/ */

  /* Font-awesome */
  /* https://fontawesome.com/search?ic=free-collection */

  /*
    先md 再lg
    先寫不會變動的樣式
    再用md: 寫平板 (>768px)
    再用lg: 寫電腦版 (>1024px)
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
