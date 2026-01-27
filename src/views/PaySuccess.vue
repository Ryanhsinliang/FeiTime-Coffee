<template>
  <div class="bg-[--main-color]">
    <!-- 打勾 -->
    <div class="flex flex-col items-center py-[64px] w-[90%] md:w-[450px] lg:w-[450px] mx-auto">
      <div
        class="rounded-full bg-[var(--green-gray)] inline-block w-[100px] h-[100px] text-center leading-[100px] text-[24px] text-white shadow-[0_0_20px_20px_rgba(0,0,0,0.1)]"
      >
        <i class="fa-solid fa-check fa-2xl"></i>
      </div>

      <p class="text-4xl font-bold text-[#222222] mt-[32px] mb-[24px]">下訂成功</p>
      <p class="text-[#666666]">感謝您的購買！FeiTime期待您再次光臨</p>

      <!-- 訂單資訊 -->
      <div
        class="bg-white rounded-[12px] border-[#dddddd] border-4 text-[14px] md:text-[20px] lg:text-[20px] my-[32px] w-[100%] px-[24px] py-[24px]"
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
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { orderList } from '@/store/order';
  import {
    updateOrder,
    updateProduct,
    productsGet,
    getCart,
    deleteCart,
  } from '@/services/checkout';
  import { useAuthStore } from '@/store/auth';
  import { useCartStore } from '@/store/cart';
  import type { UpdateOrderRule } from '@/services/checkout';

  interface AllProductRule {
    // 設定data規格
    id: number;
    pid: string;
    documentId: string;
    name: string;
    price: number;
    origin: string;
    img: any[];
    popularity: number;
    sweetness: number;
    acidity: number;
    body: number;
    aftertaste: number;
    clarity: number;
    flavor_type: string;
    roast: string;
    stock: number;
  }

  interface LittleProductRule {
    // 設定data規格
    id: number;
    pid: string;
    name: string;
    stock: number;
    documentId: string;
  }

  interface UserRule {
    // 購物車物件內的 user物件 的規範
    id: number;
  }
  interface CartRule {
    // 購物車物件 的規範
    id: number;
    item_total: number; // 總價錢
    user: UserRule;
    quantity: number;
    snapshot_image: string;
    documentId: string;
  }

  const piniaGet = orderList();
  const reset = orderList().orderReset;
  const orderThing = computed(() => piniaGet.orderThing); // 從 pinia 抓 訂單訊息
  const buyProducts = computed(() => piniaGet.buyProducts); // 從 pinia 抓 剛剛買的產品 的訊息
  const taiwanTime = ref('');
  const productsNow = ref<LittleProductRule[]>([]); // 打get 整理後的產品[{},{},...]
  const idCart = ref<CartRule[]>([]);
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  // 用id取得 現在庫存 和 真正用來put的id
  const getNowStock = (pid: number | string) => {
    const findAPIproduct = productsNow.value.filter((obj) => {
      return obj.pid == pid;
    });
    return {
      stock: Number(findAPIproduct[0].stock),
      documentId: findAPIproduct[0].documentId,
    };
  };

  onMounted(async () => {
    if (orderThing.value) {
      // 把pinia時間 轉成臺灣時區 + 常人閱讀格式
      taiwanTime.value = new Date(orderThing.value.createdAt).toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false, // 使用 24 小時制，若要 12 小時制可改為 true
      });

      // 從pinia抓 documentId 來 put (strapi 現在是用 documentId 而不是 id ！)
      const documentId = orderThing.value?.documentId;
      if (!documentId) {
        return;
      }

      // 若是貨到付款 只更新order_status
      let buyAfter: Partial<UpdateOrderRule>;
      if (orderThing.value.payment_method == 'cod') {
        buyAfter = {
          order_status: 'processing',
        };
      } else {
        buyAfter = {
          payment_status: 'paid',
          order_status: 'processing',
          paid_at: new Date().toISOString(),
        };
      }

      // 打put更新orders
      try {
        const res = await updateOrder(documentId, buyAfter);
        console.log('訂單成功更新');
        // console.log(res.data);
      } catch (err: any) {
        const errorDetail = err.response?.data?.detail || err.message;
        console.error('API 串接出錯：', errorDetail);
        throw err;
      }
      // 打put更新products
      try {
        const res = await productsGet(); // 能抓到所有產品
        productsNow.value = res.map((obj: AllProductRule) => {
          return {
            id: obj.id,
            pid: obj.pid,
            documentId: obj.documentId,
            name: obj.name,
            stock: Number(obj.stock),
          };
        });
      } catch (err: any) {
        const errorDetail = err.response?.data?.detail || err.message;
        console.error('API 串接出錯：', errorDetail);
        throw err;
      }

      /*
      // console.log('買的東西 要扣的數量 pinia提供');
      // console.log(buyProducts.value); // 完整的 訂購的 產品資料
      // // 要扣庫存的資料

      // console.log('所有產品簡化資料 打API來的');
      // console.log(productsNow.value);

      // console.log('這個id 現在資料庫的庫存');
      // console.log(getNowStock(751));

      // console.log('買的產品的數量');
      // console.log(buyProducts.value);
      */

      // 用來put產品庫存的 [{},{},...]
      const updateStock = buyProducts.value.map((obj) => {
        return {
          documentId: getNowStock(obj.pid).documentId,
          stock: getNowStock(obj.pid).stock - Number(obj.quantity),
        };
      });

      // console.log('買的產品的id + 扣完的數量');
      // console.log(updateStock);

      for (let i = 0; i < updateStock.length; i++) {
        try {
          const doStock = await updateProduct(updateStock[i].documentId, {
            stock: updateStock[i].stock,
          });
          console.log(`第${i + 1}筆put成功`);
          // console.log(doStock);
        } catch (err: any) {
          const errorDetail = err.response?.data?.detail || err.message;
          console.log(`第${i + 1}筆put失敗`);
          console.error('API 串接出錯：', errorDetail);
          throw err;
        }
      }

      const userId = authStore.user!.id;
      // 刪除所有這個id的購物車
      try {
        const cartData = await getCart(); // 所有人 買的所有產品的物件 的陣列

        idCart.value = cartData.filter((obj: CartRule) => {
          if (Number(obj?.user?.id)) {
            return obj.user.id == userId;
          }
        });
      } catch (err: any) {
        const errorDetail = err.response?.data?.detail || err.message;
        console.error('API 串接出錯：', errorDetail);
        throw err;
      }

      for (let i = 0; i < idCart.value.length; i++) {
        try {
          const deleteRes = await deleteCart(idCart.value[i].documentId);
          console.log(`第${i + 1}筆購物車刪除成功`);
          // console.log(deleteRes);
        } catch (err: any) {
          const errorDetail = err.response?.data?.detail || err.message;
          console.log(`第${i + 1}筆購物車刪除失敗`);
          console.error('delete串接出錯：', errorDetail);
          throw err;
        }
      }
      cartStore.items = [];
      console.log('購物車pinia已成功清空');
    }
  });

  // 清空pinia
  onUnmounted(() => {
    reset();
  });
</script>

<style>
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
