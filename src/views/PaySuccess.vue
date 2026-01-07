<template>
  <div class="text-9xl w-3/4 h-[500px] bg-lime-400">成功</div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const linepayUrl = import.meta.env.VITE_LINK; // 準備網址

  onMounted(async () => {
    const transactionId = route.query.transactionId; // 從網址抓取 LINE Pay 給的交易 ID

    // 2. 自動通知後端執行「最後扣款」
    if (transactionId) {
      try {
        const res = await axios.post(`${linepayUrl}/linePay/confirm`, {
          transactionId: transactionId,
          amount: 100, // 測試階段先寫死，之後要從 Pinia 拿
        });
        console.log('金流狀態：', res.data.message);
      } catch (err) {
        console.error('確認失敗：', err);
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
