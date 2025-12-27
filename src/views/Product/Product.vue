<template>
  <div class="font-wenkai text-[#222222]">
    <div v-show="sortTopbar" class="top-find-bar">
      <div class="mb-[12px] mx-[3%] flex justify-center relative">
        <div
          class="relative lg:justify-center lg:w-[70%] md:w-[80%] md:justify-center w-[94%] flex justify-start"
        >
          <input
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
                id="sort-page"
                class="bg-[var(--main-color)] pl-[16px] pr-[8px] cursor-pointer shrink-0"
              >
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
            <p class="filter-word" tabindex="0" id="first-noline">類別</p>
            <div class="type-list">
              <p class="list" tabindex="0">咖啡豆</p>
              <p class="list" tabindex="0">濾掛包</p>
              <p class="list" tabindex="0">器具</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">焙度</p>
            <div class="type-list">
              <p @click="getcoffee('Light')" class="list" tabindex="0" value="Light">淺焙</p>
              <p @click="getcoffee('Medium')" class="list" tabindex="0" value="Medium">中焙</p>
              <p @click="getcoffee('Dark')" class="list" tabindex="0" value="Dark">深焙</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">風味</p>
            <div class="type-list">
              <p class="list" tabindex="0" value="">果香清爽</p>
              <p class="list" tabindex="0" value="">堅果巧克力</p>
              <p class="list" tabindex="0" value="">濃郁厚實</p>
              <p class="list" tabindex="0" value="">花香明亮</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">工法</p>
            <div class="type-list">
              <p class="list" tabindex="0" value="Washed">水洗</p>
              <p class="list" tabindex="0" value="Natural">日曬</p>
              <p class="list" tabindex="0" value="Honey">蜜處理</p>
              <p class="list" tabindex="0" value="Wet-Hulled">厭氧</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">產地</p>
            <div class="big-list">
              <p class="list" tabindex="0" value="Ethiopia">衣索比亞</p>
              <p class="list" tabindex="0" value="Kenya">肯亞</p>
              <p class="list" tabindex="0" value="Rwanda">盧安達</p>
              <p class="list" tabindex="0" value="Burundi">布隆迪</p>
              <p class="list" tabindex="0" value="Colombia">哥倫比亞</p>
              <p class="list" tabindex="0" value="Brazil">巴西</p>
              <p class="list" tabindex="0" value="Guatemala">瓜地馬拉</p>
              <p class="list" tabindex="0" value="Costa Rica">哥斯大黎加</p>
              <p class="list" tabindex="0" value="El Salvador">薩爾瓦多</p>
              <p class="list" tabindex="0" value="Panama">巴拿馬</p>
              <p class="list" tabindex="0" value="Indonesia">印尼</p>
              <p class="list" tabindex="0" value="Vietnam">越南</p>
              <p class="list" tabindex="0" value="India">印度</p>
              <p class="list" tabindex="0" value="Thailand">泰國</p>
              <p class="list" tabindex="0" value="Papua New Guinea">巴布亞紐幾內亞</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="somaho-up none" :class="rotation" @click="sortBarSwitch">
      <i class="fa-solid fa-angle-up"></i>
    </div>
    <div v-if="loading">
      <p>正在為您準備咖啡清單...</p>
    </div>
    <div v-else>
      <div
        class="grid lg:grid-cols-3 lg:mx-[3%] lg:w-[94%] lg:gap-[80px] lg:pt-[258px] md:mx-[6%] md:w-[88%] md:gap-[60px] md:grid-cols-2 md:pt-[272px] mx-[6%] w-[88%] gap-[60px] grid-cols-1"
        :class="topBarSapce"
      >
        <!-- card start -->
        <!-- {{ p.img[0].formats.large.url }} -->
        <a href="#" target="_blank" v-for="p in product" :key="p.pid">
          <!-- 待放網址 -->
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
        </a>
        <!-- card end -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getProducts } from '../../services/product';
  import { ref, reactive, onMounted } from 'vue';

  // 調整【排序】高到低 還是 低到高 按鈕
  const sortHe = ref(true);
  const sortChange = () => {
    sortHe.value = !sortHe.value;
  };

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

  const product = ref([]); // 放資料的容器
  const loading = ref(false); // API載入狀況參數
  const err = ref(''); // 放錯誤訊息的容易

  // API(get)函數
  const getcoffee = async (roastType?: string) => {
    // roastType 參數
    // ? 可帶可不帶
    // : string  TS的規範 規定roastType要是字串
    try {
      loading.value = true;
      err.value = ''; // 每次重新請求前清空錯誤
      const res = await getProducts(roastType);

      if (res && res.data) {
        product.value = res.data;
      } else {
        product.value = res;
      }
    } catch (error) {
      err.value = (error as Error).message;
      console.error('API 串接出錯：', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await getcoffee();
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
