<template>
  <div class="bg-[--main-color]">
    <p class="text-center pt-[100px] text-[40px] font-bold text-[#222222]">讀取中</p>
    <p class="text-center text-[#666666]">若加載時間太久 請重新整理</p>
    <div class="loader"></div>
    <div class="flex flex-col items-center w-[300px] mx-auto pb-[48px]">
      <router-link
        to="/Checkout"
        class="text-xl bg-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--main-color)] font-[600] w-full text-center"
      >
        返回結帳
      </router-link>

      <router-link
        to="/home"
        class="mt-[20px] text-xl border-2 border-[var(--green-gray)] px-[48px] py-[20px] rounded-full text-[var(--green-gray)] font-[600] w-full text-center"
      >
        前往首頁
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getCart } from '@/services/checkout';

  const route = useRoute();
  const linepayUrl = import.meta.env.VITE_LINK;

  let pay = ref('');
  const router = useRouter();

  // 【 抓購物車 】
  interface UserRule {
    // 購物車物件內的 user物件 的規範
    id: number;
  }

  interface ProductRule {
    // 購物車物件內的 product物件 的規範
    id: number;
    name: string;
    price: number;
    quantity: number;
    weight: string;
  }

  interface CartRule {
    // 購物車物件 的規範
    id: number;
    item_total: number; // 總價錢
    product: ProductRule;
    user: UserRule;
    quantity: number;
    snapshot_image: string;
  }

  const memberBuyArr = ref<CartRule[]>([]); // 裝有同一個id的人買的所有產品物件 的陣列
  const fontAmount = ref(0); //總價錢

  // 計算總價錢 準備給後端再打一次賴佩
  onMounted(async () => {
    // 【 1 】 用userid再抓一次資料
    const buyId = 26; // 假參數 之後用user.id 到時候把參數放進()
    const cartData = await getCart(); // 所有人 買的所有產品的物件 的陣列
    const idCart = cartData.filter((obj: CartRule) => {
      if (Number(obj?.user?.id)) {
        return obj.user.id == buyId;
      }
    }); // 篩選出 所有user.id是buyId 的物件 的陣列 [{},{},{}]

    memberBuyArr.value = idCart;

    // 總價錢 (不含運)
    const totalCost = memberBuyArr.value.reduce((sum, obj) => {
      return sum + Number(obj.product.price) * Number(obj.quantity);
    }, 0);

    if (totalCost < 350) {
      alert('沒有訂單');
      return;
      // 防呆 總金額 會 >= 最低價產品的價格
    } else {
      fontAmount.value = totalCost + 250;
      // 運費 250
    }

    // 【 2 】 把資料給後端
    const transactionId = route.query.transactionId;
    // 付款成功後 linepay 會幫忙導回成功頁 並透過網址傳遞  transactionId (交易編號)

    if (transactionId) {
      // 如果有 transactionId 就跟後端說可以執行第二階段 付款授權
      try {
        const res = await axios.post(`${linepayUrl}/linePay/confirm`, {
          transactionId: transactionId,
          amount: fontAmount.value, // 這邊之後串資料庫拿總金額
          // linepay要求要再傳一次 amount 給它  所以這邊再傳一次給後端
        });
        console.log('成功');
        console.log('金流狀態：', res.data.message);
        console.log('金流狀態：', res.data.status);
        pay.value = res.data.status; // 把後端給的 status 抓過來 等等依此判斷要跳轉成功頁還是失敗頁
        // message status 是由後端提供的
        // 在那個res.json()內的物件 後端可自行定義要給前端什麼資料
        // 註:res是後端 express().post()第二參數callback的第二參數 慣例用res

        if (pay.value === 'success') {
          // 用 pay 判斷要跳轉 成功頁 還是 失敗頁
          router.push('/payment-success');
        } else {
          router.push('/payment-cancel');
        }
      } catch (error: any) {
        // console.log('失敗');
        // console.error('確認失敗：', error.res?.data || error.message);
        router.push('/payment-cancel');
      }
    }
  });
</script>

<style scoped>
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

  .loader {
    margin-left: auto;
    margin-right: auto;
    margin-top: 36px;
    margin-bottom: 36px;
    width: 35%;
    height: 32px;
    border-radius: 12px;
    background: linear-gradient(var(--green-gray) 0 0) 0/0% no-repeat #dddddd;
    animation: maxtsute 2s infinite linear;
  }
  @keyframes maxtsute {
    100% {
      background-size: 100%;
    }
  }
</style>
