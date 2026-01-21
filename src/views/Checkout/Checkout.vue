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
              class="cursor-pointer flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px] mb-[12px] md:mb-0 lg:mb-0 mx-auto md:mx-[12px] lg:mx-[12px] w-[200px] md:w-[100%] lg:w-[100%]"
            >
              <i class="fa-solid fa-truck text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">宅配取貨</p>
              <p class="text-[#666666]">約3~5個工作天</p>
            </div>
            <!-- 店icon
            <div
              class="cursor-pointer flex flex-col items-center border-2 border-[--green-gray] rounded-[16px] pb-[12px] pt-[20px] mb-[12px] md:mb-0 lg:mb-0 mx-auto md:mx-[12px] lg:mx-[12px] w-[200px] md:w-[50%] lg:w-[50%]"
            >
              <i class="fa-solid fa-shop text-[--green-gray] text-[36px]"></i>
              <p class="text-[#222222] font-[600] py-[8px] text-[20px]">來店取貨</p>
              <p class="text-[#666666]">約3~5小時</p>
            </div> -->
          </div>
        </div>

        <!-- 【 2 】 收件人資訊 -->
        <div class="mb-[28px]">
          <h2 class="text-2xl font-semibold mb-[20px]">收件人資訊</h2>
          <label for="name" class="block">姓名</label>
          <input
            v-model="form.recipient_name"
            type="text"
            id="name"
            placeholder="姓名"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="phone" class="block">手機號碼</label>
          <input
            v-model="form.recipient_phone"
            type="tel"
            id="phone"
            placeholder="電話"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="address" class="block">收件人地址</label>
          <input
            v-model="form.recipient_address"
            type="text"
            id="address"
            placeholder="收件地址"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="remark" class="block">備註</label>
          <input
            v-model="form.customer_note"
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
              v-model="form.payment_method"
              value="linepay"
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
              v-model="form.payment_method"
              value="paypay"
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
              v-model="form.payment_method"
              value="card"
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
              v-model="form.payment_method"
              value="convenience"
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
              v-model="form.payment_method"
              value="myself"
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
              <div
                v-for="list in memberBuyArr"
                :key="list.id"
                class="flex flex-col md:flex-row lg:flex-row my-[20px]"
              >
                <img
                  :src="list.snapshot_image"
                  :alt="list.product.name"
                  class="w-[64px] h-full aspect-square object-cover rounded-xl"
                />
                <div class="mx-0 md:mx-[16px] lg:mx-[16px] w-full">
                  <div class="flex"></div>
                  <h3>{{ list.product.name }}</h3>
                  <p class="text-sm mt-0 md:mt-[8px] lg:mt-[8px]">{{ list.product.weight }}</p>
                </div>
                <div class="shrink-0">
                  <div>$&nbsp;{{ list.product.price }}</div>
                  <div class="text-left md:text-right lg:text-right">{{ list.quantity }}件</div>
                </div>
              </div>
              <!-- v-for結束 -->
            </div>

            <!-- 產品小計 -->
            <div
              class="bg-[--soft-brown] px-[24px] py-[18px] rounded-[24px] mb-[24px] shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              <div class="flex justify-between text-[20px]">
                <p class="">商品金額</p>
                <p id="price" class="">$&nbsp;{{ productTotal }}</p>
              </div>

              <div class="flex justify-between text-[20px]">
                <p>運費</p>
                <p id="shippingFee">$&nbsp;250</p>
              </div>

              <div class="flex justify-between my-4 text-[24px] font-bold">
                <p>總金額</p>
                <p>$&nbsp;{{ fontAmount }}</p>
              </div>
            </div>
          </div>
        </section>

        <button
          @click="formPost"
          type="button"
          class="ml-0 md:ml-[25%] lg:ml-[25%] w-[100%] md:w-[50%] lg:w-[50%] p-[12px] rounded-md mt-2 mb-4 bg-[--green-gray] text-white font-bold text-[20px]"
        >
          確認送出訂單
        </button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getCart, formGoPost, productsGet } from '@/services/checkout';
  import { orderList } from '@/store/order';

  const router = useRouter();

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

  interface GivePiniaRule {
    pid: number;
    quantity: number;
    snapshot_name: string;
    snapshot_price: number;
    snapshot_image: string;
    snapshot_weight: string;
    item_total: number;
  }

  const memberBuyArr = ref<CartRule[]>([]); // 裝有同一個id的人買的所有產品物件 的陣列
  const productTotal = ref(0); // 全部商品價錢
  const fontAmount = ref(0); // 總價錢
  const postProducts = ref<GivePiniaRule[]>([]); // 裝有把所有訂單物件的陣列 [{},{},...]

  // 【 渲染畫面 + 抓取資料 】 抓DB購物車的資料 渲染畫面 並計算價錢 準備給後端
  onMounted(async () => {
    // 打API拿這個user.id的人 買的所有產品的物件 的陣列

    const buyId = 26; // 假參數 之後用user.id 到時候把參數放進()
    const cartData = await getCart(); // 所有人 買的所有產品的物件 的陣列
    const idCart = cartData.filter((obj: CartRule) => {
      if (Number(obj?.user?.id)) {
        return obj.user.id == buyId;
      }
    }); // 篩選出 所有user.id是buyId 的物件 的陣列 [{},{},...]

    memberBuyArr.value = idCart;

    // 依照post需求 做一個符合他規範的 [{},{}...]
    postProducts.value = idCart.map((obj: CartRule) => {
      return {
        pid: obj.product.id.toString(),
        quantity: obj.quantity,
        snapshot_name: obj.product.name,
        snapshot_price: obj.product.price,
        snapshot_image: obj.snapshot_image,
        snapshot_weight: obj.product.weight,
        item_total: Number(obj.quantity) * Number(obj.product.price),
      };
    });

    // 總價錢 (不含運)
    const totalCost = memberBuyArr.value.reduce((sum, obj) => {
      return sum + Number(obj.product.price) * Number(obj.quantity);
    }, 0);
    productTotal.value = totalCost;

    if (productTotal.value < 350) {
      alert('沒有訂單');
      return;
      // 防呆 總金額會 >= 最低價產品的價格
    } else {
      fontAmount.value = productTotal.value + 250;
      // 運費 250
    }

    // console.log(memberBuyArr.value);
    // console.log(postProducts.value);
  });

  // 【 串linepay 】
  const linepayUrl = import.meta.env.VITE_LINK;
  const useLinePay = async () => {
    try {
      // 防呆
      if (memberBuyArr.value.length === 0) {
        alert('購物車沒有物品QAQ');
        return;
      }

      // 把資料給後端
      const response = await axios.post(`${linepayUrl}/api/linepay/gobuy`, {
        amount: fontAmount.value,
        productName: 'FeiTime 咖啡購物',
        products: memberBuyArr.value, // 整包丟給後端
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

  // 【 檢查庫存 】
  interface AllProductRule {
    // 設定data規格
    id: number;
    pid: string;
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
  }
  const productsNow = ref<LittleProductRule[]>([]); // 打get 整理後的產品[{},{},...]

  // 判斷庫存的函數
  const stockHave = (id: number, quantity: number, jsonArr: LittleProductRule[]) => {
    const buy = jsonArr.filter((obj: LittleProductRule) => {
      return obj.id == id;
    });
    if (quantity <= Number(buy[0].stock)) {
      return true;
    } else {
      return false;
    }
  };

  // 給 後端 > DB 的訂單資料
  const form = reactive({
    order_items: postProducts.value,
    subtotal: productTotal.value, // 只有商品的價錢
    shipping_fee: 250, //運費
    total_amount: fontAmount.value, // 總價錢
    order_status: 'pending', // 訂單狀態 (待處理)
    payment_status: 'unpaid', // 付款狀態 (未付款)
    payment_method: '', // 付款方式
    recipient_name: '',
    recipient_phone: '',
    recipient_address: '',
    customer_note: '',
    shipping_method: '', // 配送方式
  });

  // 【 POST + 導到linepay 、成功頁 、 失敗頁 】
  const formPost = async () => {
    // 定義手機號碼的 正則表達式
    const phoneRegex = /^09\d{8}$/;
    if (form.recipient_name == '') {
      alert('請填寫姓名');
      return;
    } else if (form.recipient_phone == '') {
      alert('請填寫電話');
      return;
    } else if (!phoneRegex.test(form.recipient_phone)) {
      alert('電話格式錯誤');
      return;
    } else if (form.recipient_address == '') {
      alert('請填寫收件人地址');
      return;
    } else if (form.payment_method == '') {
      alert('請選擇付款方式');
      return;
    }

    // 確保在送出前 是最新的資料
    form.subtotal = productTotal.value;
    form.total_amount = fontAmount.value;
    form.order_items = postProducts.value;

    if (!form.order_items) {
      alert('購物車是空的');
      return;
    }

    // productsNow.value 打get 從所有產品 抓出我要的資訊[{},{},...]
    try {
      const res = await productsGet(); // 能抓到所有產品

      // 從所有產品 抓出我要的資訊 組成一個小物件
      productsNow.value = res.map((obj: AllProductRule) => {
        return {
          id: obj.id,
          pid: obj.pid,
          name: obj.name,
          stock: Number(obj.stock),
        };
      });
    } catch (err: any) {
      const errorDetail = err.response?.data?.detail || err.message;
      console.error('API 串接出錯：', errorDetail);
      throw err;
    }

    // 檢查庫存
    for (let i = 0; i < postProducts.value.length; i++) {
      if (
        stockHave(postProducts.value[i].pid, postProducts.value[i].quantity, productsNow.value) ==
        false
      ) {
        alert('庫存不足');
        return;
      }
    }

    try {
      const result = await formGoPost(form);
      console.log('訂單建立成功');
      // console.log(result);
      // console.log(postProducts.value);

      // 把資料存入pinia
      const orderStore = orderList();
      orderStore.orderAfter(result.data); // DB>後端 回傳的訂單資料
      orderStore.productAfter(postProducts.value); // 買的產品資料

      if (form.payment_method == 'linepay') {
        await useLinePay();
      } else {
        router.push('/payment-success');
      }
    } catch (error) {
      console.error('送出失敗', error);

      router.push('/payment-cancel');
    }
  };
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
