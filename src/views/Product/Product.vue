<template>
  <div 作用="全域設定" class="font-wenkai text-[#705944] bg-[--main-color]">
    <!-- 【 1 】 標頭 -->
    <header class="px-[24px] py-[48px]">
      <!-- border-2 border-black -->
      <h2 class="text-[32px] font-bold">精選單品咖啡豆</h2>
      <p class="text-[20px]">
        我們親自走訪產地，為您挑選最優質的咖啡豆，每一批次皆由資深烘豆師精心烘焙，呈現最完美的風味層次
      </p>
    </header>

    <!-- 2+3的div -->
    <div class="flex pb-[64px]">
      <!-- 【 2 】 左側篩選選單 -->
      <nav
        :class="have"
        class="px-[24px] w-[80%] md:w-[25%] lg:w-[25%] my-[24px] absolute md:static lg:static z-[2] bg-[--main-color] shadow-2xl md:shadow-none lg:md:shadow-none"
      >
        <div
          class="px-[8px] py-[4px] my-[12px] bg-[--soft-brown] text-right inline-block text-[20px] rounded-[8px]"
          @click="(getcoffee({}), reset())"
        >
          清空
        </div>
        <!-- 焙度 -->
        <div>
          <h3 class="text-[24px] font-[600]">焙度</h3>
          <div class="mt-[8px]">
            <input
              type="radio"
              id="Light"
              name="pFilter"
              value="Light"
              v-model="filterData.roast"
              @click="goProduct('roast', 'Light')"
            />
            <label class="ml-[8px] text-[20px]" for="Light" @click="goProduct('roast', 'Light')">
              淺焙
            </label>
          </div>
          <div class="mt-[8px]">
            <input
              type="radio"
              id="Medium"
              name="pFilter"
              value="Medium"
              v-model="filterData.roast"
              @click="goProduct('roast', 'Medium')"
            />
            <label class="ml-[8px] text-[20px]" for="Medium" @click="goProduct('roast', 'Medium')">
              中焙
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Dark"
              name="pFilter"
              value="Dark"
              v-model="filterData.roast"
              @click="goProduct('roast', 'Dark')"
            />
            <label class="ml-[8px] text-[20px]" for="Dark" @click="goProduct('roast', 'Dark')">
              深焙
            </label>
          </div>
        </div>

        <!-- 風味 -->
        <div class="my-[24px]">
          <h3 class="text-[24px] font-[600]">風味</h3>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Fruity"
              name="pFilter"
              value="Fruity"
              v-model="filterData.flavor_type"
              @click="goProduct('flavor_type', 'Fruity')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Fruity"
              @click="goProduct('flavor_type', 'Fruity')"
            >
              果香清爽
            </label>
          </div>
          <div class="mt-[8px]">
            <input
              type="radio"
              id="Nutty"
              name="pFilter"
              value="Nutty"
              v-model="filterData.flavor_type"
              @click="goProduct('flavor_type', 'Nutty')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Nutty"
              @click="goProduct('flavor_type', 'Nutty')"
            >
              堅果巧克力
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Bold"
              name="pFilter"
              value="Bold"
              v-model="filterData.flavor_type"
              @click="goProduct('flavor_type', 'Bold')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Bold"
              @click="goProduct('flavor_type', 'Bold')"
            >
              濃郁厚實
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Floral"
              name="pFilter"
              value="Floral"
              v-model="filterData.flavor_type"
              @click="goProduct('flavor_type', 'Floral')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Floral"
              @click="goProduct('flavor_type', 'Floral')"
            >
              花香明亮
            </label>
          </div>
        </div>

        <!-- 處理法 -->
        <div class="my-[24px]">
          <h3 class="text-[24px] font-[600]">處理法</h3>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Washed"
              name="pFilter"
              value="Washed"
              v-model="filterData.processing"
              @click="goProduct('processing', 'Washed')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Washed"
              @click="goProduct('processing', 'Washed')"
            >
              水洗
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Natural"
              name="pFilter"
              value="Natural"
              v-model="filterData.processing"
              @click="goProduct('processing', 'Natural')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Natural"
              @click="goProduct('processing', 'Natural')"
            >
              日曬
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Honey"
              name="pFilter"
              value="Honey"
              v-model="filterData.processing"
              @click="goProduct('processing', 'Honey')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Honey"
              @click="goProduct('processing', 'Honey')"
            >
              蜜處理
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Wet-Hulled"
              name="pFilter"
              value="Wet-Hulled"
              v-model="filterData.processing"
              @click="goProduct('processing', 'Wet-Hulled')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Wet-Hulled"
              @click="goProduct('processing', 'Wet-Hulled')"
            >
              厭氧
            </label>
          </div>
        </div>

        <!-- 產地 -->
        <div class="my-[24px]">
          <h3 class="text-[24px] font-[600]">產地</h3>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Ethiopia"
              name="pFilter"
              value="Ethiopia"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Ethiopia')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Ethiopia"
              @click="goProduct('origin', 'Ethiopia')"
            >
              衣索比亞
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Kenya"
              name="pFilter"
              value="Kenya"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Kenya')"
            />
            <label class="ml-[8px] text-[20px]" for="Kenya" @click="goProduct('origin', 'Kenya')">
              肯亞
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Rwanda"
              name="pFilter"
              value="Rwanda"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Rwanda')"
            />
            <label class="ml-[8px] text-[20px]" for="Rwanda" @click="goProduct('origin', 'Rwanda')">
              盧安達
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Burundi"
              name="pFilter"
              value="Burundi"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Burundi')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Burundi"
              @click="goProduct('origin', 'Burundi')"
            >
              布隆迪
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Colombia"
              name="pFilter"
              value="Colombia"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Colombia')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Colombia"
              @click="goProduct('origin', 'Colombia')"
            >
              哥倫比亞
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Brazil"
              name="pFilter"
              value="Brazil"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Brazil')"
            />
            <label class="ml-[8px] text-[20px]" for="Brazil" @click="goProduct('origin', 'Brazil')">
              巴西
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Guatemala"
              name="pFilter"
              value="Guatemala"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Guatemala')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Guatemala"
              @click="goProduct('origin', 'Guatemala')"
            >
              瓜地馬拉
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Costa Rica"
              name="pFilter"
              value="Costa Rica"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Costa Rica')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Costa Rica"
              @click="goProduct('origin', 'Costa Rica')"
            >
              哥斯大黎加
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="El Salvador"
              name="pFilter"
              value="El Salvador"
              v-model="filterData.origin"
              @click="goProduct('origin', 'El Salvador')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="El Salvador"
              @click="goProduct('origin', 'El Salvador')"
            >
              薩爾瓦多
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Panama"
              name="pFilter"
              value="Panama"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Panama')"
            />
            <label class="ml-[8px] text-[20px]" for="Panama" @click="goProduct('origin', 'Panama')">
              巴拿馬
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Indonesia"
              name="pFilter"
              value="Indonesia"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Indonesia')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Indonesia"
              @click="goProduct('origin', 'Indonesia')"
            >
              印尼
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Vietnam"
              name="pFilter"
              value="Vietnam"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Vietnam')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Vietnam"
              @click="goProduct('origin', 'Vietnam')"
            >
              越南
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="India"
              name="pFilter"
              value="India"
              v-model="filterData.origin"
              @click="goProduct('origin', 'India')"
            />
            <label class="ml-[8px] text-[20px]" for="India" @click="goProduct('origin', 'India')">
              印度
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Thailand"
              name="pFilter"
              value="Thailand"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Thailand')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Thailand"
              @click="goProduct('origin', 'Thailand')"
            >
              泰國
            </label>
          </div>

          <div class="mt-[8px]">
            <input
              type="radio"
              id="Papua New Guinea"
              name="pFilter"
              value="Papua New Guinea"
              v-model="filterData.origin"
              @click="goProduct('origin', 'Papua New Guinea')"
            />
            <label
              class="ml-[8px] text-[20px]"
              for="Papua New Guinea"
              @click="goProduct('origin', 'Papua New Guinea')"
            >
              巴布亞紐幾內亞
            </label>
          </div>
        </div>
      </nav>
      <!-- 【>】  -->
      <div
        class="inline-block md:hidden lg:hidden rounded-full px-[17px] py-[12px] bg-[--soft-brown] z-[3] absolute"
        :class="navHe"
        @click="navSwitch"
      >
        <i class="fa-solid fa-angle-up text-[#222222]"></i>
      </div>

      <!-- 【 3 】 搜尋欄 + 排序 和 產品卡片 -->
      <main class="w-[100%] md:w-[75%] lg:w-[75%]">
        <!-- 搜尋欄 + 排序 -->
        <div
          class="flex flex-col md:flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <!-- 搜尋欄 -->

          <input
            v-model="findWord"
            @keyup.enter="find(findWord)"
            class="border-2 border-solid border-[#8f745c] rounded-[8px] w-[90%] lg:w-[60%] text-[24px] py-[4px] px-[8px] my-[40px] mx-[24px]"
            placeholder="喝一杯靜謐的午後時光"
          />

          <!-- 排序 -->
          <div class="flex mx-[24px] mb-[32px] md:mb-[32px] lg:mb-0">
            <div
              class="flex bg-[var(--main-color)] px-[12px] rounded-[8px] overflow-hidden mr-[8px]"
            >
              <img class="IC-sort w-[32px] bg-[var(--main-color)]" src="./assets/sort.svg" alt="" />
              <select
                v-model="sortWhich"
                @change="takeSort"
                id="sort-page"
                class="bg-[var(--main-color)] pl-[16px] pr-[8px] cursor-pointer shrink-0 text-[#222222]"
              >
                <!-- change 是DOM原生事件 當 <select> 中的 <option> 更動時觸發  -->
                <option value="">排序</option>
                <option value="price">價錢</option>
                <option value="popularity">熱門度</option>
                <option value="sweetness">甜味</option>
                <option value="acidity">酸味</option>
                <option value="body">口感</option>
                <option value="aftertaste">餘韻</option>
                <option value="clarity">澄澈度</option>
              </select>
            </div>
            <p
              v-if="sortHe"
              class="oriru rounded-[4px] bg-[--heavy-brown] leading-8 px-[6px] text-[#222222]"
              @click="sortChange"
            >
              ↓高到低
            </p>
            <p
              v-else
              class="noboru rounded-[4px] bg-[--soft-brown] leading-8 px-[6px] text-[#222222]"
              @click="sortChange"
            >
              ↑低到高
            </p>
          </div>
        </div>
        <!-- 產品區 -->
        <div class="grid mx-[24px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">
          <!-- 產品卡片 -->
          <router-link
            v-for="p in product"
            :key="p.pid"
            :to="`/product-detail/${p.pid}`"
            class="px-[20px] bg-white rounded-[12px] relative"
          >
            <img
              class="aspect-[4/3] object-cover object-center rounded-[12px] mt-[20px]"
              :src="p.img[0].formats.large.url"
              :alt="p.name"
            />
            <!-- 文字 -->
            <div class="my-[16px]">
              <div class="flex">
                <p>{{ p.origin }}</p>
                <p>．</p>
                <p>{{ p.roast }}</p>
              </div>
              <p class="text-[24px] font-[600] my-[4px]">{{ p.name }}</p>
              <p>{{ p.flavor_type }}</p>
            </div>
            <!-- 價錢 -->
            <p class="text-[20px] font-[600] mt-[48px] mb-[16px]">NT$ {{ p.price }}</p>
            <!-- 加入購物車按紐 -->
            <div
              class="rounded-full bg-[#222222] inline-block px-[17px] py-[12px] absolute text-white font-bold bottom-[16px] right-[20px] z-10"
              @click.stop.prevent=""
            >
              <!-- 使用.stop.prevent 讓事件止於【 + 】不要擴散到跳轉 -->
              <i class="fa-solid fa-plus"></i>
            </div>
          </router-link>
          <!-- 產品卡片結束 -->
          <div v-show="cannotFind">查無商品，請確認關鍵字</div>
        </div>
      </main>
    </div>
    <!-- 2+3的div 結束 -->
  </div>
  <!-- 全域設定結束 -->

  <div v-show="cannotFind"></div>
</template>

<script setup lang="ts">
  import { getProducts } from '../../services/product';
  import { ref, reactive, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useCartStore } from '@/store/cart';

  const cartStore = useCartStore();
  const addToCart = cartStore.addItem;

  // 手機板 側邊選單開關
  const he = ref(true); // 定義 true 為【 > 】
  const navHe = ref('rotate-90 left-[8px] top-[250px]'); // 初始【 > 】
  const have = ref('hidden  md:block lg:block');
  const navSwitch = () => {
    he.value = !he.value;
    if (he.value) {
      navHe.value = 'rotate-90 left-[8px] top-[250px]'; //【 < 】
      have.value = 'hidden  md:block lg:block';
    } else {
      navHe.value = 'rotate-[270deg] left-[calc(80%-24px)]'; //【 > 】
      have.value = 'block md:block lg:block';
    }
  };

  interface DataRule {
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
  }

  const productCopy = ref<DataRule[]>([]); // 備份資料 【排序】功能使用
  const product = ref<DataRule[]>([]);
  // <DataRule[]>	為TS語法 規範 productCopy 、product 是符合 DataRule 規格的陣列

  const loading = ref(true); // 用來調整讀取中圖片是否呈現
  const err = ref(''); // 放錯誤訊息

  // API(get)函數
  const getcoffee = async (filterData: any = {}) => {
    // filterData是參數 它是一個物件
    // : any  為TS的語法 代表不限制物件裡面的型別
    try {
      err.value = ''; // 每次重新請求前清空錯誤
      const res = await getProducts(filterData);
      const apiFormData = res.data || res;

      product.value = apiFormData;
      productCopy.value = [...apiFormData]; // 預先準備一個備份資料 之後排序、搜尋時使用
      if (productCopy.value) {
        loading.value = false;
      }
    } catch (error) {
      loading.value = false; // 發生錯誤時也要關閉 loading
      err.value = (error as Error).message;
      console.error('API 串接出錯：', error);
    }
  };

  // 排序相關
  const sortWhich = ref(''); // 雙向綁定下拉式選單用的變數 依據它來決定現在要排序什麼
  const sortHe = ref(true); // 決定高到低 還是 低到高 的參數 預設true是 高到低
  const doSort = () => {
    // 切換 高到低 低到高 的函數 我選擇在前端做
    if (!sortWhich.value) return; // 如果沒有sortWhich.value 就不做以下的事 相當於if(sortWhich.value){...} 但這樣比較簡潔

    const field = sortWhich.value as keyof DataRule; // 取出這次要排序的東西 例如價錢
    // as keyof DataRule  保證 field 一定是 DataRule 裡的其中一個 並且用對應的型別
    const sorted = [...productCopy.value].sort((a, b) => {
      // [...productCopy.value] 是把元陣列炸開再裝進另一個陣列 這樣不會修改到初始資料

      // 在JS sort()中的callback 可帶兩個參數a b 表示隨機取樣比對時的那兩個元素
      let vA = Number(a[field]) || 0; // a 為陣列中的其中一個元素 在這就是其中一包商品的物件 a[field] 就像object.price的意思
      let vB = Number(b[field]) || 0; // b 同理 a
      let result;
      if (sortHe.value === true) {
        // 依據 sortHe 來調整是 高到低 還是 低到高
        result = vB - vA; // 高到低
      } else {
        result = vA - vB; // 低到高
      }
      return result;
    });
    product.value = sorted; // 把這一次排序的陣列 放到product 讓它來渲染畫面
  };

  const takeSort = async () => {
    // 當使用下拉式選單 執行排序的函數
    if (!sortWhich.value) return;

    try {
      await getcoffee({ sort: [`${sortWhich.value}:desc`] }); // 抓取一個依照 sortWhich 高到低排序的產品陣列 sortWhich可能是 價錢、人氣度...
      // 依照 getcoffee () 抓到的資料會丟進 product 這個ref()變數
      productCopy.value = [...product.value]; // 用 productCopy 抓取 product 但怕共享同一個陣列 所以先炸開再用[] 確保它是新的陣列
      sortHe.value = true; // 預設抓完後是 高到低
      doSort(); // 執行一次排序來渲染頁面
      console.log('選單觸發成功，目前資料類別：', sortWhich.value);
    } catch (err) {
      console.error('選單排序失敗', err);
    }
  };

  const sortChange = () => {
    // 切換頁面 高到低 低到高 的函數
    sortHe.value = !sortHe.value;
    doSort();
  };

  // 搜尋相關
  const findWord = ref(''); // 雙向綁定輸入框的變數
  const cannotFind = ref(false); // 製作變數來控制【搜尋不到】的CSS樣式是否生成 預設先不要出現
  const find = (word: string) => {
    product.value = [...productCopy.value];
    const allCoffee = [...product.value]; // 複製一份全部產品的陣列
    const found = allCoffee.filter((obj) => {
      return obj.name.includes(word);
    });
    product.value = found;
    if (found.length == 0) {
      cannotFind.value = true;
    } else {
      cannotFind.value = false;
    }
  };

  // 記錄打勾狀態 用於清空
  const filterData = reactive({
    roast: '',
    flavor_type: '',
    processing: '',
    origin: '',
  });

  // 清空
  const reset = () => {
    findWord.value = '';
    filterData.roast = '';
    filterData.flavor_type = '';
    filterData.processing = '';
    filterData.origin = '';
  };

  onMounted(async () => {
    await getcoffee({});
  });

  // 前端路由
  const router = useRouter();
  const goProduct = (type: string, val: string) => {
    router.push({
      path: '/product',
      query: { [type]: val },
    });
  };

  const route = useRoute();
  const first = () => {
    // 把網址上的參數 (route.query) 帶到 API 函數
    // 預留一個地方處理route.query (若之後需傳遞數字的話 要在這邊轉型)
    getcoffee(route.query);
  };
  watch(
    // 如果網址變了 (按了新按鈕)  要重新抓資料
    () => route.query, // watch要監視物件裡的值 需要套一層函數 否則它是監視整個物件 而非裡面的值
    () => {
      cannotFind.value = false;
      first();
    },
    { immediate: true } // 載入頁面時 馬上執行一次來顯示全部產品
  );
</script>

<style scoped>
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

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  select:focus {
    outline: none;
    box-shadow: none;
  }

  select {
    /* 移除原生的箭頭和外觀  */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input:focus {
    outline: none;
    box-shadow: none;
  }
</style>
