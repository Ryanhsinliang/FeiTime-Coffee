<template>
  <div class="font-wenkai text-[#222222]">
    <div class="mt-[100px] mb-[80px] mx-[3%] flex flex-col items-center">
      <input
        class="border-2 border-solid border-[var(--soft-brown)] lg:w-[70%] lg:text-[24px] lg:py-[12px] lg:px-[24px] lg:rounded-[12px] md:w-[70%] md:text-[20px] md:py-[8px] md:px-[24px] md:rounded-[12px] w-[88%] text-[20px] py-[8px] px-[18px] rounded-[8px]"
        type="search"
        placeholder="喝一杯靜謐的午後時光"
      />
      <div class="filter">
        <div class="filter-type">
          <p class="filter-word" tabindex="0">類別</p>
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
    <div class="sort">
      <img class="IC-sort" src="./assets/sort.svg" alt="" />
      <select id="sort-page">
        <option value="">篩選</option>
        <option value="">價錢</option>
        <option value="">熱門度</option>
        <option value="">甜味</option>
        <option value="">酸味</option>
        <option value="">口感</option>
        <option value="">餘韻</option>
        <option value="">澄澈度</option>
      </select>
    </div>

    <div
      class="grid lg:grid-cols-3 lg:mx-[3%] lg:w-[94%] lg:gap-[80px] md:mx-[6%] md:w-[88%] md:gap-[60px] md:grid-cols-2 mx-[6%] w-[88%] gap-[60px] grid-cols-1"
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
  export default {};
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

  /* select {
    移除原生的箭頭和外觀 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  } */

  input:focus {
    outline: none;
    box-shadow: none;
  }

  .filter {
    display: flex;
    padding: 0 10px;
    padding-top: 12px;
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
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 12px;
    display: flex;
  }

  .IC-sort {
    width: 32px;
  }

  #sort-page {
    background-color: var(--main-color);
    padding: 0 8px;
    cursor: pointer;
  }

  .kara {
    padding: 2px;
    margin-left: 12px;
    margin-right: 12px;
    border-radius: 2px;
    background-color: var(--green-gray);
  }

  @media (768px <= width < 1024px) {
  }

  @media (width < 768px) {
  }
</style>
