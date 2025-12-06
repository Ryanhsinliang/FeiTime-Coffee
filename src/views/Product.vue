<template>
  <div id="vueapp">
    <div class="product-serve">
      <input class="find" type="text" placeholder="喝一杯靜謐的午後時光" />
      <div class="find-filter">
        <!-- category start -->
        <div class="category">
          <div class="category-word">
            <i class="fa-solid fa-store IC-filter-list"></i>
            <p>類別</p>
          </div>
          <select class="category-choose">
            <option
              disabled
              selected
              value=""
              class="disabled-word category-bg"
            >
              請選擇
            </option>
            <option class="category-bg" value="coffee-beans">精選咖啡豆</option>
            <option class="category-bg" value="drip-coffee">輕巧濾掛包</option>
            <option class="category-bg" value="appliance">精良器具</option>
          </select>
        </div>
        <!-- category end -->

        <!-- roast start -->
        <div class="roast">
          <div class="roast-word">
            <i class="fa-solid fa-fire IC-filter-list"></i>
            <p>焙度</p>
          </div>
          <select class="roast-choose">
            <option disabled selected value="" class="disabled-word roast-bg">
              請選擇
            </option>
            <option class="roast-bg" value="light-roast">淺焙</option>
            <option class="roast-bg" value="medium-roast">中焙</option>
            <option class="roast-bg" value="medium-dark-roast">中深焙</option>
            <option class="roast-bg" value="dark-roast">深焙</option>
          </select>
        </div>
        <!-- roast end -->

        <!-- source start -->
        <div class="source">
          <div class="source-word">
            <i class="fa-solid fa-earth-americas IC-filter-list"></i>
            <p>產地</p>
          </div>

          <select class="source-choose">
            <option disabled selected value="" class="disabled-word source-bg">
              請選擇
            </option>
            <option class="source-bg" value="Ethiopia">衣索比亞</option>
            <option class="source-bg" value="Kenya">肯亞</option>
            <option class="source-bg" value="Colombia">哥倫比亞</option>
            <option class="source-bg" value="Guatemala">瓜地馬拉</option>
            <option class="source-bg" value="Brazil">巴西</option>
            <option class="source-bg" value="Costa-Rica">哥斯大黎加</option>
            <option class="source-bg" value="Indonesia">印尼</option>
            <option class="source-bg" value="El-Salvador">薩爾瓦多</option>
          </select>
        </div>
        <!-- source end -->

        <!-- processing start -->
        <div class="flavor">
          <div class="flavor-word">
            <i class="fa-solid fa-mug-hot IC-filter-list"></i>
            <p>風味</p>
          </div>
          <select class="flavor-choose">
            <option disabled selected value="" class="disabled-word flavor-bg">
              請選擇
            </option>
            <option class="flavor-bg" value="orange">柑橘</option>
            <option class="flavor-bg" value="flower">花香</option>
            <option class="flavor-bg" value="friut">果香</option>
            <option class="flavor-bg" value="chocolate">巧克力</option>
            <option class="flavor-bg" value="nut">堅果</option>
            <option class="flavor-bg" value="liquor">酒香</option>
          </select>
        </div>
        <!-- processing end -->

        <!-- money-area start -->
        <div class="money-area">
          <div class="money-area-word">
            <i class="fa-solid fa-money-bill-1-wave IC-filter-list"></i>
            <p>價錢區間</p>
          </div>
          <select class="money-area-choose">
            <option
              disabled
              selected
              value=""
              class="disabled-word money-area-bg"
            >
              請選擇
            </option>
            <option class="money-area-bg" value="">~1000</option>
            <option class="money-area-bg" value="">1000~3000</option>
            <option class="money-area-bg" value="">3000~7000</option>
            <option class="money-area-bg" value="">7000~</option>
          </select>
        </div>
        <!-- money-area end -->
      </div>
    </div>
    <div class="sort">
      <div class="sort-set">
        <label class="sort-title" for="hot-sale">
          <i class="fa-solid fa-star IC-sort"></i>
          <p>熱門商品</p>
        </label>
        <div class="radio-center">
          <input class="sort-radio" id="hot-sale" name="sort" type="radio" />
        </div>
      </div>

      <div class="sort-set">
        <label class="sort-title" for="low-to-high">
          <i class="fa-solid fa-arrow-trend-up IC-sort"></i>
          <p>價錢低到高</p>
        </label>
        <div class="radio-center">
          <input class="sort-radio" id="low-to-high" name="sort" type="radio" />
        </div>
      </div>

      <div class="sort-set">
        <label class="sort-title" for="high-to-low">
          <i class="fa-solid fa-arrow-trend-down IC-sort"></i>
          <p>價錢高到低</p>
        </label>
        <div class="radio-center">
          <input class="sort-radio" id="high-to-low" name="sort" type="radio" />
        </div>
      </div>
    </div>

    <div class="product-pic-area">
      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">USA USA</p>
            <h3 class="product-name">CoffeeCoffeeCoffee</h3>
            <p class="price">$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex2.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">臺灣</p>
            <h3 class="product-name">阿里山好喝咖啡</h3>
            <p class="price">$ 599</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex2.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">臺灣</p>
            <h3 class="product-name">阿里山好喝咖啡</h3>
            <p class="price">$ 599</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">USA USA</p>
            <h3 class="product-name">Coffee Coffee Coffee</h3>
            <p class="price">$ 70</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
          </div>
        </div>
      </a>
      <!-- card end -->

      <!-- card start -->
      <a href="#" target="_blank">
        <!-- 待放網址 -->
        <div class="product-card">
          <img class="product-pic" src="./pic/ex3.jpg" alt="圖片加載中..." />
          <div class="product-word">
            <p class="country">日本</p>
            <h3 class="product-name">茶の凪</h3>
            <p class="price">¥ 9800</p>
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
    font-family: "LXGW WenKai TC";
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

  /* select {  移除下拉式選單三角形
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  } */

  /* 加入自己做的三角形 的方法
  padding: 8px 30px 8px 10px;   右側留空給箭頭 
  background: url('arrow-down.svg') no-repeat right center;  自訂箭頭 
  background-size: 16px 16px;     調整大小 
  border: 1px solid #ccc;
  border-radius: 4px; */

  select:focus {
    outline: none;
    box-shadow: none;
  }

  input:focus {
    outline: none;
    box-shadow: none;
  }

  .disabled-word {
    color: var(--light-gray);
  }

  .product-serve {
    margin-top: 100px;
    margin-bottom: 80px;
    margin-left: 3%;
    margin-right: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .find {
    display: block;
    border: 2px solid var(--green-gray);
    width: 70%;
    font-size: 24px;
    padding: 12px 24px;
    border-radius: 12px;
  }

  .find-filter {
    margin-top: 12px;
    display: flex;
  }

  .IC-filter-list {
    line-height: 30px;
    padding-right: 8px;
  }

  .category {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .category-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #cfbde8;
  }

  .category-choose {
    border: 4px solid #cfbde8;
    padding: 0 4px;
  }

  .category-bg {
    background-color: #cfbde8;
  }

  .roast {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .roast-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: var(--soft-brown);
  }

  .roast-choose {
    border: 4px solid var(--soft-brown);
    padding: 0 4px;
  }

  .roast-bg {
    background-color: var(--soft-brown);
  }

  .source {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .source-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: var(--green-gray);
    color: #000000;
  }

  .source-choose {
    border: 4px solid var(--green-gray);
    padding-left: 4px;
    padding-right: 4px;
  }

  .source-bg {
    background-color: var(--green-gray);
  }

  .flavor {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .flavor-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #d8c2c3;
  }

  .flavor-choose {
    border: 4px solid #d8c2c3;
    padding-left: 4px;
    padding-right: 4px;
  }

  .flavor-bg {
    background-color: #d8c2c3;
  }

  .money-area {
    padding: 4px 24px;
    display: flex;
    font-size: 20px;
    flex-direction: column;
  }

  .money-area-word {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 10px;
    background-color: #c4ced6;
  }

  .money-area-choose {
    border: 4px solid #c4ced6;
    padding-left: 4px;
    padding-right: 4px;
  }

  .money-area-bg {
    background-color: #c4ced6;
  }

  .sort {
    display: flex;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 12px;
    font-size: 20px;
  }

  .sort-set {
    display: flex;
  }

  .sort-title {
    display: flex;
    margin-right: 4px;
  }

  .IC-sort {
    line-height: 30px;
    margin-right: 4px;
  }

  .radio-center {
    display: flex;
    align-items: center;
  }

  .sort-radio {
    margin-right: 24px;
    width: 20px;
    height: 20px;
    accent-color: #a2af9b;
  }

  .product-pic-area {
    display: grid;
    margin: 0 3%;
    width: 94%;
    gap: 80px;
    grid-template-columns: repeat(3, 1fr);
    /* background-color: #aaaaaa; */
  }

  .product-card {
    position: relative;
  }

  .product-pic {
    width: 100%;
  }

  .product-word {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
  }

  .product-name {
    font-size: 28px;
    font-weight: 700;
  }

  @media (768px <= width < 1024px) {
    .find {
      font-size: 20px;
      padding: 8px 18px;
      border-radius: 8px;
    }

    .category {
      padding: 4px 12px;
    }

    .roast {
      padding: 4px 12px;
    }

    .source {
      padding: 4px 12px;
    }

    .flavor {
      padding: 4px 12px;
    }

    .money-area {
      padding: 4px 12px;
    }

    .sort {
      margin-left: 6%;
      margin-right: 6%;
    }

    .product-pic-area {
      margin: 0 6%;
      width: 88%;
      gap: 60px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (width < 768px) {
    .find {
      width: 88%;
      font-size: 20px;
      padding: 8px 18px;
      border-radius: 8px;
    }

    .find-filter {
      flex-direction: column;
      width: 88%;
    }

    .category {
      padding: 4px 12px;
    }

    .roast {
      padding: 4px 12px;
    }

    .source {
      padding: 4px 12px;
    }

    .flavor {
      padding: 4px 12px;
    }

    .money-area {
      padding: 4px 12px;
    }

    .sort {
      margin-left: 6%;
      margin-right: 6%;
    }

    .product-pic-area {
      margin: 0 6%;
      width: 88%;
      gap: 60px;
      grid-template-columns: repeat(1, 1fr);
    }

    .sort {
      flex-direction: column;
    }

    .product-word {
      font-size: 24px;
    }

    .product-name {
      font-size: 32px;
    }
  }
</style>
