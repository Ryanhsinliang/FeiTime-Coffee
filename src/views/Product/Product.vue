<template>
  <div class="font-wenkai text-[#222222]">
    <div v-show="sortTopbar" class="top-find-bar">
      <div class="mb-[12px] mx-[3%] flex justify-center relative">
        <div
          class="relative lg:justify-center lg:w-[70%] md:w-[80%] md:justify-center w-[94%] flex justify-start"
        >
          <input
            class="border-2 border-solid border-[#8f745c] lg:text-[24px] lg:py-[12px] lg:px-[24px] lg:rounded-[12px] md:text-[20px] md:py-[8px] md:px-[24px] md:rounded-[12px] text-[20px] py-[8px] px-[18px] rounded-[8px] w-[90%]"
            type="search"
            placeholder="喝一杯靜謐的午後時光"
          />
          <div class="sort">
            <div class="sort-list">
              <img class="IC-sort" src="./assets/sort.svg" alt="" />
              <select id="sort-page">
                <option value="">排序</option>
                <option value="">價錢</option>
                <option value="">熱門度</option>
                <option value="">甜味</option>
                <option value="">酸味</option>
                <option value="">口感</option>
                <option value="">餘韻</option>
                <option value="">澄澈度</option>
              </select>
            </div>
            <p v-if="sortHe" class="oriru" @click="sortChange">↓高到低</p>
            <p v-else class="noboru" @click="sortChange">↑低到高</p>
          </div>
        </div>
      </div>

      <div class="find">
        <div class="filter">
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
              <p class="list" tabindex="0">淺焙</p>
              <p class="list" tabindex="0">中焙</p>
              <p class="list" tabindex="0">深焙</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">風格</p>
            <div class="type-list">
              <p class="list" tabindex="0">果香明亮</p>
              <p class="list" tabindex="0">清爽茶感</p>
              <p class="list" tabindex="0">甜感平衡</p>
              <p class="list" tabindex="0">可可堅果</p>
              <p class="list" tabindex="0">濃厚飽滿</p>
              <p class="list" tabindex="0">酒香發酵</p>
            </div>
          </div>
          <div class="filter-type">
            <p class="filter-word" tabindex="0">產地</p>
            <div class="type-list">
              <p class="list" tabindex="0">肯亞</p>
              <p class="list" tabindex="0">哥倫比亞</p>
              <p class="list" tabindex="0">瓜地馬拉</p>
              <p class="list" tabindex="0">巴西</p>
              <p class="list" tabindex="0">哥斯大黎加</p>
              <p class="list" tabindex="0">印尼</p>
              <p class="list" tabindex="0">薩爾瓦多</p>
              <p class="list" tabindex="0">衣索比亞</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="somaho-up" :class="rotation" @click="sortBarSwitch">
      <i class="fa-solid fa-angle-up"></i>
    </div>

    <div
      class="grid lg:grid-cols-3 lg:mx-[3%] lg:w-[94%] lg:gap-[80px] lg:pt-[258px] md:mx-[6%] md:w-[88%] md:gap-[60px] md:grid-cols-2 md:pt-[272px] mx-[6%] w-[88%] gap-[60px] grid-cols-1"
      :class="topBarSapce"
    >
      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>USA USA</p>
            <h3 class="text-[28px] font-bold">CoffeeCoffeeCoffee</h3>
            <p>$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.2.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>臺灣</p>
            <h3 class="text-[28px] font-bold">阿里山好喝咖啡</h3>
            <p>$ 599</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.3.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>日本</p>
            <h3 class="text-[28px] font-bold">茶の凪</h3>
            <p>¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.2.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>臺灣</p>
            <h3 class="text-[28px] font-bold">阿里山好喝咖啡</h3>
            <p>$ 599</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.3.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>茶の凪</p>
            <h3 class="text-[28px] font-bold">日本</h3>
            <p>¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>USA USA</p>
            <h3 class="text-[28px] font-bold">CoffeeCoffeeCoffee</h3>
            <p>$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>USA USA</p>
            <h3 class="text-[28px] font-bold">CoffeeCoffeeCoffee</h3>
            <p>$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>USA USA</p>
            <h3 class="text-[28px] font-bold">CoffeeCoffeeCoffee</h3>
            <p>$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>USA USA</p>
            <h3 class="text-[28px] font-bold">CoffeeCoffeeCoffee</h3>
            <p>$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="relative">
          <img class="w-[100%]" src="./assets/ex.3.png" alt="圖片加載中..." />
          <div
            class="flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%]"
          >
            <p>日本</p>
            <h3 class="text-[28px] font-bold">茶の凪</h3>
            <p>¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortHe: true, // 調整【排序】高到低 還是 低到高 按鈕的參數
        sortTopbar: true, // 手機板 控制topbar是否顯示的參數
        rotation: null, // 手機板 旋轉開合按鈕的參數
        topBarSapce: 'pt-[500px]', // 手機板 更改商品卡 grid 的上距的參數
      };
    },
    methods: {
      sortChange() {
        // 切換【排序】高到低 還是 低到高
        this.sortHe = !this.sortHe;
      },
      sortBarSwitch() {
        // 手機板 切換topbar
        // 附加旋轉按鈕
        // 附加更改商品卡 grid 的上距 避免留白
        this.sortTopbar = !this.sortTopbar;
        if (!this.sortTopbar) {
          this.rotation = 'rotate-180';
          this.topBarSapce = 'pt-[50px]';
        } else {
          this.rotation = null;
          this.topBarSapce = 'pt-[500px]';
        }
      },
    },
  };
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

  .find {
    margin-left: 16.95%;
    margin-right: 16.95%;
    width: 70%;
    display: flex;
    white-space: nowrap;
  }

  .filter {
    display: flex;
    padding: 0 16px;
    width: 70%;
  }

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

  .sort {
    display: flex;
    position: absolute;
    top: calc(100% + 8px);
    right: 24px;
    white-space: nowrap;
  }

  .sort-list {
    display: flex;
    background-color: var(--main-color);
    padding: 0 12px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 8px;
  }

  .IC-sort {
    width: 32px;
    background-color: var(--main-color);
  }

  #sort-page {
    background-color: var(--main-color);
    padding-left: 16px;
    padding-right: 8px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .noboru {
    border-radius: 4px;
    background-color: #bdeda4;
    line-height: 32px;
    padding: 0 6px;
  }

  .oriru {
    border-radius: 4px;
    background-color: #a4e9e2;
    line-height: 32px;
    padding: 0 6px;
  }

  #circle {
    display: none;
  }

  #circle:checked + .maru {
    left: 20px;
    background-color: #bdeda4;
  }

  .somaho-up {
    display: none;
  }

  @media (768px <= width < 1024px) {
    .filter {
      width: 80%;
    }

    .find {
      margin-left: 12.4%;
      margin-right: 12.4%;
    }

    .sort {
      top: calc(100% + 64px);
      left: 24px;
    }

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
