<template>
  <div id="vueapp">
    <div class="mt-[100px] mb-[80px] mx-[3%] flex flex-col items-center">
      <input
        class="border-2 border-solid border-[var(--green-gray)] lg:w-[70%] lg:text-[24px] lg:py-[12px] lg:px-[24px] lg:rounded-[12px] md:w-[70%] md:text-[20px] md:py-[8px] md:px-[24px] md:rounded-[12px] w-[88%] text-[20px] py-[8px] px-[18px] rounded-[8px]"
        type="text"
        placeholder="喝一杯靜謐的午後時光"
      />
      <div
        class="mt-[12px] w-[88%] flex flex-col md:w-auto md:mx-0 md:flex-row lg:w-auto lg:mx-0 lg:flex-row lg:justify-center"
      >
        <!-- TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO   TODOTODO -->
        <!-- category start -->
        <div class="flex py-[4px] px-[24px] text-[20px] flex-col lg:w-[200px]">
          <div class="flex py-[4px] pl-[12px] pr-[10px] bg-[#cfbde8]">
            <i class="fa-solid fa-store pr-[8px] leading-[30px]"></i>
            <p>類別</p>
          </div>
          <select class="px-[4px] border-[#cfbde8] border-solid border-4">
            <option disabled selected value="" class="color-[var(--light-gray)] bg-[#cfbde8]">
              請選擇
            </option>
            <option class="bg-[#cfbde8]" value="coffee-beans">精選咖啡豆</option>
            <option class="bg-[#cfbde8]" value="drip-coffee">輕巧濾掛包</option>
            <option class="bg-[#cfbde8]" value="appliance">精良器具</option>
          </select>
        </div>
        <!-- category end -->

        <!-- roast start -->
        <div class="flex py-[4px] px-[24px] text-[20px] flex-col">
          <div class="flex py-[4px] pl-[12px] pr-[10px] bg-[var(--soft-brown)]">
            <i class="fa-solid fa-fire pr-[8px] leading-[30px]"></i>
            <p>焙度</p>
          </div>
          <select class="px-[4px] border-[var(--soft-brown)] border-solid border-4">
            <option
              disabled
              selected
              value=""
              class="color-[var(--light-gray)] bg-[var(--soft-brown)]"
            >
              請選擇
            </option>
            <option class="bg-[var(--soft-brown)]" value="light-roast">淺焙</option>
            <option class="bg-[var(--soft-brown)]" value="medium-roast">中焙</option>
            <option class="bg-[var(--soft-brown)]" value="medium-dark-roast">中深焙</option>
            <option class="bg-[var(--soft-brown)]" value="dark-roast">深焙</option>
          </select>
        </div>
        <!-- roast end -->

        <!-- source start -->
        <div class="flex py-[4px] px-[24px] text-[20px] flex-col">
          <div class="flex py-[4px] pl-[12px] pr-[10px] bg-[var(--green-gray)] text-black">
            <i class="fa-solid fa-earth-americas pr-[8px] leading-[30px]"></i>
            <p>產地</p>
          </div>

          <select class="px-[4px] border-[var(--green-gray)] border-solid border-4">
            <option
              disabled
              selected
              value=""
              class="color-[var(--light-gray)] bg-[var(--green-gray)]"
            >
              請選擇
            </option>
            <option class="bg-[var(--green-gray)]" value="Ethiopia">衣索比亞</option>
            <option class="bg-[var(--green-gray)]" value="Kenya">肯亞</option>
            <option class="bg-[var(--green-gray)]" value="Colombia">哥倫比亞</option>
            <option class="bg-[var(--green-gray)]" value="Guatemala">瓜地馬拉</option>
            <option class="bg-[var(--green-gray)]" value="Brazil">巴西</option>
            <option class="bg-[var(--green-gray)]" value="Costa-Rica">哥斯大黎加</option>
            <option class="bg-[var(--green-gray)]" value="Indonesia">印尼</option>
            <option class="bg-[var(--green-gray)]" value="El-Salvador">薩爾瓦多</option>
          </select>
        </div>
        <!-- source end -->

        <!-- processing start -->
        <div class="flex py-[4px] px-[24px] text-[20px] flex-col">
          <div class="flex py-[4px] pl-[12px] pr-[10px] bg-[#d8c2c3]">
            <i class="fa-solid fa-mug-hot pr-[8px] leading-[30px]"></i>
            <p>風味</p>
          </div>
          <select class="px-[4px] border-[#d8c2c3] border-solid border-4">
            <option disabled selected value="" class="color-[var(--light-gray)] bg-[#d8c2c3]">
              請選擇
            </option>
            <option class="bg-[#d8c2c3]" value="orange">柑橘</option>
            <option class="bg-[#d8c2c3]" value="flower">花香</option>
            <option class="bg-[#d8c2c3]" value="friut">果香</option>
            <option class="bg-[#d8c2c3]" value="chocolate">巧克力</option>
            <option class="bg-[#d8c2c3]" value="nut">堅果</option>
            <option class="bg-[#d8c2c3]" value="liquor">酒香</option>
          </select>
        </div>
        <!-- processing end -->

        <!-- money-area start -->
        <div class="flex py-[4px] px-[24px] text-[20px] flex-col">
          <div class="flex py-[4px] pl-[12px] pr-[10px] bg-[#c4ced6]">
            <i class="fa-solid fa-money-bill-1-wave pr-[8px] leading-[30px]"></i>
            <p>價錢區間</p>
          </div>
          <select class="px-[4px] border-[#c4ced6] border-solid border-4">
            <option disabled selected value="" class="color-[var(--light-gray)] bg-[#c4ced6]">
              請選擇
            </option>
            <option class="bg-[#c4ced6]" value="">~1000</option>
            <option class="bg-[#c4ced6]" value="">1000~3000</option>
            <option class="bg-[#c4ced6]" value="">3000~7000</option>
            <option class="bg-[#c4ced6]" value="">7000~</option>
          </select>
        </div>
        <!-- money-area end -->
      </div>
    </div>
    <div class="flex mx-[3%] mb-[12px] text-[20px]">
      <div class="flex">
        <label class="flex mr-[4px]" for="hot-sale">
          <i class="fa-solid fa-star mr-[4px] leading-[30px]"></i>
          <p>熱門商品</p>
        </label>
        <div class="flex items-center">
          <input
            class="mr-[24px] w-[20px] h-[20px] accent-[var(--soft-brown)]"
            id="hot-sale"
            name="sort"
            type="radio"
          />
        </div>
      </div>

      <div class="flex">
        <label class="flex mr-[4px]" for="low-to-high">
          <i class="fa-solid fa-arrow-trend-up mr-[4px] leading-[30px]"></i>
          <p>價錢低到高</p>
        </label>
        <div class="flex items-center">
          <input
            class="mr-[24px] w-[20px] h-[20px] accent-[var(--soft-brown)]"
            id="low-to-high"
            name="sort"
            type="radio"
          />
        </div>
      </div>

      <div class="flex">
        <label class="flex mr-[4px]" for="high-to-low">
          <i class="fa-solid fa-arrow-trend-down mr-[4px] leading-[30px]"></i>
          <p>價錢高到低</p>
        </label>
        <div class="flex items-center">
          <input
            class="mr-[24px] w-[20px] h-[20px] accent-[var(--soft-brown)]"
            id="high-to-low"
            name="sort"
            type="radio"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 mx-[3%] w-[94%] gap-[80px]">
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
    --light-gray: #eeeeee;
    /* 淡灰 */
  }

  * {
    font-family: 'LXGW WenKai TC';
    color: #222222;
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

  input:focus {
    outline: none;
    box-shadow: none;
  }

  /* .disabled-word {
  color: var(--light-gray);
} */
  /* color-[var(--light-gray)] */

  /* .product-serve {
    margin-top: 100px;
    margin-bottom: 80px;
    margin-left: 3%;
    margin-right: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
  } */

  /* .product-serve {
  @apply mt-[100px] mb-[80px] mx-[3%] flex flex-col items-center;
} */

  /* .find {
    border: 2px solid var(--green-gray);
    width: 70%;
    font-size: 24px;
    padding: 12px 24px;
    border-radius: 12px;
  } */

  /* .find {
  @apply border-2 border-solid border-[var(--green-gray)] w-[70%] text-[24px] py-[12px] px-[24px] rounded-[12px];
} */

  /* .find-filter {
    margin-top: 12px;
    display: flex;
  } */

  /* .find-filter {
  @apply mt-[12px] flex;
} */

  /* .IC-filter-list {
    line-height: 30px;
    padding-right: 8px;
  } */

  /* .IC-filter-list {
  @apply pr-[8px] leading-[30px];
} */

  /* .category {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  } */

  /* .category {
  @apply flex py-[4px] px-[24px] text-[20px] flex-col;
} */

  /* .category-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #cfbde8;
  } */

  /* .category-word {
  @apply flex py-[4px] pl-[12px] pr-[10px] bg-[#cfbde8];
} */

  /* .category-choose {
    border: 4px solid #cfbde8;
    padding: 0 4px;
  } */

  /* .category-choose {
  @apply px-[4px] border-[#cfbde8] border-solid border-4;
} */

  /* .category-bg {
    background-color: #cfbde8;
  } */

  /* .category-bg {
  @apply bg-[#cfbde8];
} */

  /* .roast {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  } */

  /* .roast {
  @apply flex py-[4px] px-[24px] text-[20px] flex-col;
} */

  /* .roast-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: var(--soft-brown);
  } */
  /* .roast-word {
  @apply flex py-[4px] pl-[12px] pr-[10px] bg-[var(--soft-brown)];
} */

  /* .roast-choose {
    border: 4px solid var(--soft-brown);
    padding: 0 4px;
  } */

  /* .roast-choose {
  @apply px-[4px] border-[var(--soft-brown)] border-solid border-4;
} */

  /* .roast-bg {
    background-color: var(--soft-brown);
  } */

  /* .roast-bg {
  @apply bg-[var(--soft-brown)];
} */

  /* .source {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  } */

  /* .source {
  @apply flex py-[4px] px-[24px] text-[20px] flex-col;
} */

  /* .source-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: var(--green-gray);
    color: #000000;
  } */
  /* .source-word {
  @apply flex py-[4px] pl-[12px] pr-[10px] bg-[var(--green-gray)] text-black;
} */

  /* .source-choose {
    border: 4px solid var(--green-gray);
    padding-left: 4px;
    padding-right: 4px;
  } */

  /* .source-choose {
  @apply px-[4px] border-[var(--green-gray)] border-solid border-4;
} */

  /* .source-bg {
    background-color: var(--green-gray);
  } */

  /* .source-bg {
  @apply bg-[var(--green-gray)];
} */

  /* .flavor {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  } */

  /* .flavor {
  @apply flex py-[4px] px-[24px] text-[20px] flex-col;
} */

  /* .flavor-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #d8c2c3;
  } */
  /* .flavor-word {
  @apply flex py-[4px] pl-[12px] pr-[10px] bg-[#d8c2c3];
} */

  /* .flavor-choose {
    border: 4px solid #d8c2c3;
    padding-left: 4px;
    padding-right: 4px;
  } */

  /* .flavor-choose {
  @apply px-[4px] border-[#d8c2c3] border-solid border-4;
} */

  /* .flavor-bg {
    background-color: #d8c2c3;
  } */

  /* .flavor-bg {
  @apply bg-[#d8c2c3];
} */

  /* .money-area {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  } */

  /* .money-area {
  @apply flex py-[4px] px-[24px] text-[20px] flex-col;
} */

  /* .money-area-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #c4ced6;
  } */

  /* .money-area-word {
  @apply flex py-[4px] pl-[12px] pr-[10px] bg-[#c4ced6];
} */

  /* .money-area-choose {
    border: 4px solid #c4ced6;
    padding-left: 4px;
    padding-right: 4px;
  } */

  /* .money-area-choose {
  @apply px-[4px] border-[#c4ced6] border-solid border-4;
} */

  /* .money-area-bg {
    background-color: #c4ced6;
  } */

  /* .money-area-bg {
  @apply bg-[#c4ced6];
} */

  /* .sort {
    display: flex;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 12px;
    font-size: 20px;
  } */

  /* .sort {
  @apply flex mx-[3%] mb-[12px] text-[20px];
} */

  /* .sort-set {
    display: flex;
  } */

  /* .sort-set {
  @apply flex;
} */

  /* .sort-title {
    display: flex;
    margin-right: 4px;
  } */

  /* .sort-title {
  @apply flex mr-[4px];
} */

  /* .IC-sort {
    line-height: 30px;
    margin-right: 4px;
  } */

  /* .IC-sort {
  @apply mr-[4px] leading-[30px];
} */

  /* .radio-center {
    display: flex;
    align-items: center;
  } */

  /* .radio-center {
  @apply flex items-center;
} */

  /* .sort-radio {
    margin-right: 24px;
    width: 20px;
    height: 20px;
    accent-color:var(--soft-brown);
  } */

  /* .sort-radio {
  @apply mr-[24px] w-[20px] h-[20px] accent-[var(--soft-brown)];
} */

  /* .product-pic-area {
    display: grid;
    margin: 0 3%;
    width: 94%;
    gap: 80px;
    grid-template-columns: repeat(3, 1fr);
  } */
  /* .product-pic-area {
  @apply grid grid-cols-3 mx-[3%] w-[94%] gap-[80px];
} */

  /* .product-card {
    position: relative;
  } */

  /* .product-card {
  @apply relative;
} */

  /* .product-pic {
    width: 100%;
  } */

  /* .product-pic {
  @apply w-[100%];
} */

  /* .product-word {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
  } */

  /* .product-word {
  @apply flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%];
} */

  /* .product-name {
    font-size: 28px;
    font-weight: 700;
  } */

  /* .product-name {
  @apply text-[28px] font-bold;
} */

  /* md:xxxxx max-lg:xxxxx */
  @media (768px <= width < 1024px) {
    /* .find {
      font-size: 20px;
      padding: 8px 18px;
      border-radius: 8px;
    } */

    /* .find {
    @apply text-[20px] py-[8px] px-[18px] rounded-[8px];
  } */

    /* .category {
      padding: 4px 12px;
    } */
    .category {
      @apply px-[12px];
    }

    /* .roast {
      padding: 4px 12px;
    } */
    .roast {
      @apply px-[12px];
    }

    /* .source {
      padding: 4px 12px;
    } */
    .source {
      @apply px-[12px];
    }

    /* .flavor {
      padding: 4px 12px;
    } */
    .flavor {
      @apply px-[12px];
    }

    /* .money-area {
      padding: 4px 12px;
    } */
    .money-area {
      @apply px-[12px];
    }

    /* .sort {
      margin-left: 6%;
      margin-right: 6%;
    } */
    .sort {
      @apply mx-[6%];
    }

    /* .product-pic-area {
      margin: 0 6%;
      width: 88%;
      gap: 60px;
      grid-template-columns: repeat(2, 1fr);
    } */

    .product-pic-area {
      @apply mx-[6%] w-[88%] gap-[60px] grid-cols-2;
    }
  }

  @media (width < 768px) {
    /* .find {
      width: 88%;
      font-size: 20px;
      padding: 8px 18px;
      border-radius: 8px;
    } */
    /* .find {
    @apply w-[88%] text-[20px] py-[8px] px-[18px] rounded-[8px];
  } */

    /* .find-filter {
      flex-direction: column;
      width: 88%;
    } */
    .find-filter {
      @apply w-[88%] flex-col;
    }

    /* .category {
      padding: 4px 12px;
    } */
    .category {
      @apply px-[12px];
    }

    /* .roast {
      padding: 4px 12px;
    } */
    .roast {
      @apply px-[12px];
    }

    /* .source {
      padding: 4px 12px;
    } */
    .source {
      @apply px-[12px];
    }

    /* .flavor {
      padding: 4px 12px;
    } */
    .flavor {
      @apply px-[12px];
    }

    /* .money-area {
      padding: 4px 12px;
    } */
    .money-area {
      @apply px-[12px];
    }

    /* .sort {
      margin-left: 6%;
      margin-right: 6%;
    } */

    .sort {
      @apply mx-[6%];
    }

    /* .product-pic-area {
      margin: 0 6%;
      width: 88%;
      gap: 60px;
      grid-template-columns: repeat(1, 1fr);
    } */

    .product-pic-area {
      @apply mx-[6%] w-[88%] gap-[60px] grid-cols-1;
    }

    /* .sort {
      flex-direction: column;
    } */

    .sort {
      @apply flex-col;
    }

    /* .product-word {
      font-size: 24px;
    } */
    .product-word {
      @apply text-[24px];
    }

    /* .product-name {
      font-size: 32px;
    } */
    .product-name {
      @apply text-[32px];
    }
  }
</style>
