<template>
  <!-- 打勾 -->
  <div class="flex flex-col items-center my-[64px] w-[450px] mx-auto">
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
        <p class="text-[--heavy-brown]">6658876876465454656</p>
      </div>
      <div class="flex justify-between my-[16px]">
        <p class="text-[#666666]">總金額</p>
        <p class="text-[--heavy-brown]">NT$ 7890</p>
      </div>
      <div class="flex justify-between">
        <p class="text-[#666666]">購買日期</p>
        <p class="text-[--heavy-brown]">2065/10/3 18:16</p>
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
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const linepayUrl = import.meta.env.VITE_LINK;

  onMounted(async () => {
    const transactionId = route.query.transactionId;
    // 付款成功後 linepay 會幫忙導回成功頁 並透過網址傳遞  transactionId (交易編號)

    if (transactionId) {
      // 如果有 transactionId 就跟後端說可以執行第二階段 付款授權
      try {
        const res = await axios.post(`${linepayUrl}/linePay/confirm`, {
          transactionId: transactionId,
          amount: 3, // 這邊之後串資料庫拿總金額
          // linepay要求要再傳一次 amount 給它  所以這邊再傳一次給後端
        });
        console.log('成功');
        console.log('金流狀態：', res.data.message);
        // message 是由後端提供的
        // 在那個res.json()內的物件 後端可自行定義要給前端什麼資料
        // 註:res是後端 express().post()第二參數callback的第二參數 慣例用res
      } catch (error: any) {
        console.log('失敗');
        console.error('確認失敗：', error.res?.data || error.message);
      }
    }
  });
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

  .SS {
    display: flex;
    align-items: center;
  }

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
