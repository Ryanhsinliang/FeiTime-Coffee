<template>
  <div class="font-wenkai text-[#222222]">
    <div v-show="sortTopbar" class="top-find-bar">
      <div class="mb-[12px] mx-[3%] flex justify-center relative">
        <div
          class="relative lg:justify-center lg:w-[70%] md:w-[80%] md:justify-center w-[94%] flex justify-start"
        >
          <input
            v-model="findWord"
            @keyup.enter="find(findWord)"
            class="border-2 border-solid border-[#8f745c] lg:text-[24px] lg:py-[12px] lg:px-[24px] lg:rounded-[12px] lg:w-[100%] md:text-[20px] md:py-[8px] md:px-[24px] md:rounded-[12px] md:w-[100%] text-[20px] py-[8px] px-[18px] rounded-[8px] w-[90%]"
            type="search"
            placeholder="喝一杯靜謐的午後時光"
          />
          <div
            class="sort flex absolute md:top-[calc(100%+64px)] md:left-[24px] whitespace-nowrap lg:top-[calc(100%+8px)] lg:right-[24px] lg:left-auto"
          >
            <div
              class="sort-list flex bg-[var(--main-color)] px-[12px] rounded-[8px] overflow-hidden mr-[8px]"
            >
              <img class="IC-sort w-[32px] bg-[var(--main-color)]" src="./assets/sort.svg" alt="" />
              <select
                v-model="sortWhich"
                @change="takeSort"
                id="sort-page"
                class="bg-[var(--main-color)] pl-[16px] pr-[8px] cursor-pointer shrink-0"
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
              class="oriru rounded-[4px] bg-[#bdeda4] leading-8 px-[6px]"
              @click="sortChange"
            >
              ↓高到低
            </p>
            <p
              v-else
              class="noboru rounded-[4px] bg-[#a4e9e2] leading-8 px-[6px]"
              @click="sortChange"
            >
              ↑低到高
            </p>
          </div>
        </div>
      </div>

      <div class="find lg:mx-[16.95%] md:mx-[12.4%] w-[70%] flex whitespace-nowrap">
        <div class="filter px-[16px] flex lg:w-[70%] md:w-[80%]">
          <div class="filter-type">
            <p class="filter-word" tabindex="0">焙度</p>
            <div class="type-list">
              <p @click="goProduct('roast', 'Light')" class="list" tabindex="0" value="Light">
                淺焙
              </p>
              <p @click="goProduct('roast', 'Medium')" class="list" tabindex="0" value="Medium">
                中焙
              </p>
              <p @click="goProduct('roast', 'Dark')" class="list" tabindex="0" value="Dark">深焙</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">風味</p>
            <div class="type-list">
              <p
                @click="goProduct('flavor_type', 'Fruity')"
                class="list"
                tabindex="0"
                value="Fruity"
              >
                果香清爽
              </p>
              <p @click="goProduct('flavor_type', 'Nutty')" class="list" tabindex="0" value="Nutty">
                堅果巧克力
              </p>
              <p @click="goProduct('flavor_type', 'Bold')" class="list" tabindex="0" value="Bold">
                濃郁厚實
              </p>
              <p
                @click="goProduct('flavor_type', 'Floral')"
                class="list"
                tabindex="0"
                value="Floral"
              >
                花香明亮
              </p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">工法</p>
            <div class="type-list">
              <p
                @click="goProduct('processing', 'Washed')"
                class="list"
                tabindex="0"
                value="Washed"
              >
                水洗
              </p>
              <p
                @click="goProduct('processing', 'Natural')"
                class="list"
                tabindex="0"
                value="Natural"
              >
                日曬
              </p>
              <p @click="goProduct('processing', 'Honey')" class="list" tabindex="0" value="Honey">
                蜜處理
              </p>
              <p
                @click="goProduct('processing', 'Wet-Hulled')"
                class="list"
                tabindex="0"
                value="Wet-Hulled"
              >
                厭氧
              </p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">產地</p>
            <div class="big-list">
              <p
                @click="goProduct('origin', 'Ethiopia')"
                class="list"
                tabindex="0"
                value="Ethiopia"
              >
                衣索比亞
              </p>
              <p @click="goProduct('origin', 'Kenya')" class="list" tabindex="0" value="Kenya">
                肯亞
              </p>
              <p @click="goProduct('origin', 'Rwanda')" class="list" tabindex="0" value="Rwanda">
                盧安達
              </p>
              <p @click="goProduct('origin', 'Burundi')" class="list" tabindex="0" value="Burundi">
                布隆迪
              </p>
              <p
                @click="goProduct('origin', 'Colombia')"
                class="list"
                tabindex="0"
                value="Colombia"
              >
                哥倫比亞
              </p>
              <p @click="goProduct('origin', 'Brazil')" class="list" tabindex="0" value="Brazil">
                巴西
              </p>
              <p
                @click="goProduct('origin', 'Guatemala')"
                class="list"
                tabindex="0"
                value="Guatemala"
              >
                瓜地馬拉
              </p>
              <p
                @click="goProduct('origin', 'Costa Rica')"
                class="list"
                tabindex="0"
                value="Costa Rica"
              >
                哥斯大黎加
              </p>
              <p
                @click="goProduct('origin', 'El Salvador')"
                class="list"
                tabindex="0"
                value="El Salvador"
              >
                薩爾瓦多
              </p>
              <p @click="goProduct('origin', 'Panama')" class="list" tabindex="0" value="Panama">
                巴拿馬
              </p>
              <p
                @click="goProduct('origin', 'Indonesia')"
                class="list"
                tabindex="0"
                value="Indonesia"
              >
                印尼
              </p>
              <p @click="goProduct('origin', 'Vietnam')" class="list" tabindex="0" value="Vietnam">
                越南
              </p>
              <p @click="goProduct('origin', 'India')" class="list" tabindex="0" value="India">
                印度
              </p>
              <p
                @click="goProduct('origin', 'Thailand')"
                class="list"
                tabindex="0"
                value="Thailand"
              >
                泰國
              </p>
              <p
                @click="goProduct('origin', 'Papua New Guinea')"
                class="list"
                tabindex="0"
                value="Papua New Guinea"
              >
                巴布亞紐幾內亞
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="somaho-up none" :class="rotation" @click="sortBarSwitch">
      <i class="fa-solid fa-angle-up"></i>
    </div>

    <div
      class="grid lg:grid-cols-3 lg:mx-[3%] lg:w-[94%] lg:gap-[80px] lg:pt-[258px] md:mx-[6%] md:w-[88%] md:gap-[60px] md:grid-cols-2 md:pt-[272px] mx-[6%] w-[88%] gap-[60px] grid-cols-1"
      :class="topBarSapce"
    >
      <!-- card start -->
      <router-link
        :to="{ name: 'ProductDetail', params: { pid: p.pid } }"
        v-for="p in product"
        :key="p.pid"
      >
        <div class="relative">
          <img
            v-if="p.img && p.img.length > 0"
            class="w-[100%] aspect-[1/1.2] object-cover object-center"
            :src="p.img[0].formats.large.url"
            :alt="p.name"
          />

          <img v-else src="" alt="暫無圖片" />

          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%] opacity-[0.75]"
          >
            <p class="bg-[var(--soft-brown)] py-[2px] px-[8px] rounded-[8px]">{{ p.origin }}</p>
            <h3
              class="text-[28px] font-bold bg-[var(--main-color)] py-[2px] px-[8px] my-[12px] rounded-[8px]"
            >
              {{ p.name }}
            </h3>
            <p class="bg-[var(--light-gray)] py-[2px] px-[8px] rounded-[8px]">$ {{ p.price }}</p>
          </div>
        </div>
      </router-link>
      <!-- card end -->
    </div>
  </div>

  <!-- 等API.get時顯示 -->
  <div v-show="loading" class="flex w-full justify-center mb-[100px]">
    <img class="w-[35%]" src="./assets/w.png" alt="正在為您準備咖啡清單..." />
  </div>

  <!-- input搜尋不到才顯示 -->
  <div v-show="cannotFind" class="flex w-full justify-center mb-[100px]">
    <img class="w-[35%]" src="./assets/sagashinai.png" alt="找不到符合的商品" />
  </div>
</template>

<script setup lang="ts">
  import { getProducts } from '../../services/product';
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  // 手機板 切換topbar 、旋轉按鈕 、更改商品卡 grid 的上距 避免留白
  const sortTopbar = ref(true);
  const rotation = ref('');
  const topBarSapce = ref('pt-[500px]');
  const sortBarSwitch = () => {
    sortTopbar.value = !sortTopbar.value;
    if (!sortTopbar.value) {
      rotation.value = 'rotate-180';
      topBarSapce.value = 'pt-[50px]';
    } else {
      rotation.value = '';
      topBarSapce.value = 'pt-[550px]';
    }
  };

  interface DataRule {
    // 設定data規格
    id: number;
    pid: number;
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

  // 前端路由
  const router = useRouter();
  const goProduct = (type: string, val: string) => {
    router.push({
      path: '/product',
      query: { [type]: val }, // 把網址變成類似 ?origin=Brazil 這樣的型式
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
      first();
    },
    { immediate: true } // 載入頁面時 馬上執行一次來顯示全部產品
  );
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

  body {
    background-color: var(--main-color);
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

  .top-find-bar {
    background-image: url(./assets/find-bg2.png);
    background-position: right center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 40px;
    padding-bottom: 24px;
    width: 100%;
    position: fixed;
    z-index: 2;
  }

  /* .find {
    margin-left: 16.95%;
    margin-right: 16.95%;
    width: 70%;
    display: flex;
    white-space: nowrap;
  } */

  /* .filter {
    display: flex;
    padding: 0 16px;
    width: 70%;
  } */

  .filter-type {
    font-size: 20px;
    padding: 4px 12px;
    background-color: var(--soft-brown);
    border-radius: 12px;
    margin-left: 8px;
    margin-right: 8px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .type-list {
    display: none;
  }

  .filter-type:focus-within {
    background-color: var(--heavy-brown);
  }

  .filter-type:focus-within .type-list {
    display: flex;
    flex-direction: column;
    background-color: var(--soft-brown);
    border-radius: 16px;
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 0px 24px;
    z-index: 2;
  }

  .big-list {
    display: none;
  }

  .filter-type:focus-within .big-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background-color: var(--soft-brown);
    border-radius: 16px;
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 0px 24px;
    z-index: 2;
  }

  .list {
    margin: 12px;
    padding: 12px 24px;
    border-bottom: 2px solid transparent;
  }

  .list:hover {
    border-bottom: 2px solid var(--heavy-brown);
    color: var(--heavy-brown);
  }

  .list:focus {
    background-color: var(--heavy-brown);
    border-bottom: 2px solid transparent;
    color: #222222;
    border-radius: 16px;
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.35);
  }

  /* .sort {
    display: flex;
    position: absolute;
    top: calc(100% + 8px);
    right: 24px;
    white-space: nowrap;
  } */

  /* .sort-list {
    display: flex;
    background-color: var(--main-color);
    padding: 0 12px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 8px;
  } */

  /* .IC-sort {
    width: 32px;
    background-color: var(--main-color);
  } */

  /* #sort-page {
    background-color: var(--main-color);
    padding-left: 16px;
    padding-right: 8px;
    cursor: pointer;
    flex-shrink: 0;
  } */

  /* .noboru {
    border-radius: 4px;
    background-color: #bdeda4;
    line-height: 32px;
    padding: 0 6px;
  } */

  /* .oriru {
    border-radius: 4px;
    background-color: #a4e9e2;
    line-height: 32px;
    padding: 0 6px;
  } */

  /* .somaho-up {
    display: none;
  } */

  @media (768px <= width < 1024px) {
    /* .filter {
      width: 80%;
    } */

    /* .find {
      margin-left: 12.4%;
      margin-right: 12.4%;
    } */

    /* .sort {
      top: calc(100% + 64px);
      left: 24px;
    } */

    .top-find-bar {
      padding-bottom: 72px;
    }
  }

  @media (width < 768px) {
    .find {
      width: 88%;
      margin-left: 6%;
      margin-right: 6%;
      margin-top: 100px;
    }

    .filter {
      width: 100%;
      padding: 0;
      display: block;
      border-radius: 8px;
      overflow: hidden;
    }

    .filter-type {
      margin: 0;
      border-radius: 0px;
      padding: 0 12px;
      flex-direction: column;
      line-height: 48px;
    }

    .filter-type:focus-within .type-list {
      width: 100%;
      position: static;
      left: 0;
      transform: translateX(0);
      margin-bottom: 8px;
    }

    .filter-type:focus-within .big-list {
      grid-template-columns: repeat(4, 1fr);
      position: static;
      left: 0;
      transform: translateX(0);
      margin-bottom: 8px;
    }

    .list {
      padding: 0 24px;
      margin: 0;
    }

    .filter-word {
      width: 100%;
      border-top: 2px solid var(--heavy-brown);
    }

    #first-noline {
      border-top: 2px solid transparent;
    }

    .sort {
      top: calc(100% + 20px);
      left: 0;
    }

    .top-find-bar {
      padding-bottom: 60px;
    }

    #sort-page {
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 20px;
    }

    .sort-list {
      margin-right: 24px;
    }

    .noboru {
      font-size: 20px;
      line-height: 54px;
      padding: 0 8px;
    }

    .oriru {
      font-size: 20px;
      line-height: 54px;
      padding: 0 8px;
    }

    .somaho-up {
      display: inline-block;
      position: fixed;
      top: 72px;
      right: 8px;
      z-index: 3;
      font-size: 32px;
      line-height: 32px;
      padding: 12px 14px;
      background-color: var(--green-gray);
      border-radius: 100%;
      cursor: pointer;
      /* transform: rotate(180deg); */
    }
  }
</style>
