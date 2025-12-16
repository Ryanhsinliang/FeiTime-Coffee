<template>
  <main class="relative">
    <!-- Product Guide Section -->
    <section class="flex flex-col lg:flex-row justify-center relative min-h-[600px]">
      <!-- Photo Gallery -->
      <div class="w-full lg:w-1/2 bg-[#f3eeea] relative max-h-[800px]">
        <img
          :src="currentPhoto.image"
          alt=""
          class="object-cover aspect-square w-full max-h-[800px]"
        />

        <!-- Navigation Buttons -->
        <button @click="prevPhoto" type="button" class="absolute top-1/2 left-2.5 -translate-y-1/2">
          <i class="fa-solid fa-chevron-left text-[#d4b396] text-[45px] opacity-50"></i>
        </button>
        <button
          @click="nextPhoto"
          type="button"
          class="absolute top-1/2 right-2.5 -translate-y-1/2"
        >
          <i class="fa-solid fa-chevron-right text-[#d4b396] text-[45px] opacity-50"></i>
        </button>

        <!-- Image Dots -->
        <div
          class="w-[60px] h-5 bg-[#d9cfc7] absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-[20px] opacity-50 flex justify-center items-center gap-2"
        >
          <div
            v-for="(dot, index) in photos"
            :key="index"
            class="w-2 h-2 rounded-full transition-colors"
            :class="index === currentIndex ? 'bg-[#141e0e]' : 'bg-[#a2af9b]'"
          ></div>
        </div>
      </div>

      <!-- Product Form -->
      <form class="p-[5vw] bg-[#f9f8f6] w-full lg:w-1/2 text-[#6d654f]">
        <p id="origin">衣索比亞(產地)</p>
        <h2 class="text-4xl py-4 font-semibold">阿拉比卡．Arabica Classic</h2>
        <p id="price" class="text-lg font-semibold">$400(價格)</p>

        <div class="py-4">
          <label for="quantity" class="block font-semibold">數量</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value="1"
            min="1"
            class="border border-gray-300 px-3 py-2 rounded w-1/2"
          />
        </div>

        <div>
          <label for="weight" class="block font-semibold">重量</label>
          <select name="weight" id="weight" class="border border-gray-300 px-3 py-2 rounded w-1/2">
            <option value="">100g</option>
            <option value="">250g</option>
            <option value="">500g</option>
          </select>
        </div>

        <div class="py-4">
          <button
            type="button"
            @click="toggleRoast"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            烘焙度
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showRoast" class="py-2">淺中焙｜保留花果香與自然甜感</p>
          <button
            type="button"
            @click="toggleBeans"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            豆種組合
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showBeans" class="py-2">100% 原生種 Arabica</p>
          <button
            type="button"
            @click="toggleProcess"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            處理方式
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showProcess" class="py-2">水洗處理｜風味乾淨、澄澈</p>
          <button
            type="button"
            @click="toggleFlavor"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            風味特性
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showFlavor" class="py-2">果酸 / 花香 / 清爽 / 平衡 / 細緻</p>
        </div>

        <div>
          <button
            @click="toggleHeart"
            v-show="isheartOpen"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 rounded"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
          <button
            @click="toggleHeart"
            v-show="!isheartOpen"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 rounded"
          >
            <i class="fa-solid fa-heart"></i>
          </button>
          <button
            @click="addtoCart"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 mx-2 rounded"
          >
            加到購物車
          </button>
          <button type="submit" class="bg-[#6d654f] text-white text-sm p-3.5 rounded w-24">
            立即購買
          </button>
        </div>
      </form>
    </section>

    <!-- Banner Image -->
    <section>
      <img
        class="w-full aspect-[2/1] object-cover h-[750px]"
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </section>

    <!-- Quote Section -->
    <section>
      <p class="bg-[#eeeeee] text-[#6d654f] text-3xl text-center py-44">
        品味高海拔的清新果香,讓每一口都回到自然的純粹
      </p>
    </section>

    <!-- Product Details -->
    <section class="bg-[#eeeeee]">
      <!-- First Detail Block -->
      <div class="flex flex-col lg:flex-row min-h-[400px]">
        <div class="w-full lg:w-[55%] px-[8vw] pb-[5vw] lg:pb-0 pt-8 lg:pt-0">
          <h3 class="text-3xl text-[#6d654f]">阿拉比卡 Classic</h3>
          <p class="text-lg text-[#808080] pt-10">
            阿拉比卡 Classic
            產自高海拔精品產區,酸度適中、口感圓潤,帶有柔和果香與花香。經過水洗處理,淺中焙烘焙方式,完美保留豆子的清新與細膩層次。
          </p>
          <p class="text-lg text-[#808080] pt-4">
            無論手沖還是義式沖煮,都能呈現均衡香氣與圓潤口感,特別適合喜歡酸度柔和、香氣明亮且口感平衡的咖啡愛好者。
          </p>
        </div>
        <video src="./assets/video.mp4" autoplay muted loop class="w-full lg:w-[45%]"></video>
      </div>

      <!-- Second Detail Block -->
      <div class="mt-28 flex flex-col lg:flex-row min-h-[400px]">
        <img
          class="object-cover w-full lg:w-[45%]"
          src="./assets/coffee_bean.jpg"
          alt="coffee_bean"
        />
        <div class="w-full lg:w-[55%] p-[10vw]">
          <img src="./assets/Flavor_Wheel.png" alt="" />
        </div>
      </div>
    </section>

    <!-- Hot Products Section -->
    <section class="bg-[#eeeeee] py-[100px] h-[600px]">
      <h2 class="p-10 text-center text-3xl text-[#6d654f]">推薦商品</h2>
      <div class="flex gap-[2vw] mx-auto px-2vw">
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="max-h-[450px] w-full max-w-[300px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
      </div>
    </section>

    <!-- Question Button -->
    <div>
      <i
        class="fa-solid fa-comment-dots fixed bottom-[30px] right-[30px] text-[30px] text-[#dccfc0] bg-white rounded-full p-5 shadow-lg cursor-pointer"
      ></i>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        currentIndex: 0,
        photos: [
          { name: 'bag', image: '/src/views/ProductDetail/assets/coffee_bag2.png' },
          {
            name: 'beans',
            image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308',
          },
          {
            name: 'cup',
            image:
              'https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        ],
        isheartOpen: true,

        showRoast: false,
        showFlavor: false,
        showBeans: false,
        showProcess: false,
        roast: {
          title: '烘焙方式',
          content: '淺中焙｜保留花果香與自然甜感',
        },
        beans: { title: '豆種組合', content: '100% 原生種 Arabica' },
        process: {
          title: '處理方式',
          content: '水洗處理｜風味乾淨、澄澈',
        },
        flavor: {
          title: '風味特性',
          content: '果酸 / 花香 / 清爽 / 平衡 / 細緻',
        },
      };
    },

    computed: {
      currentPhoto() {
        return this.photos[this.currentIndex];
      },
    },

    methods: {
      prevPhoto() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.photos.length - 1;
      },
      nextPhoto() {
        this.currentIndex = this.currentIndex < this.photos.length - 1 ? this.currentIndex + 1 : 0;
      },
      toggleHeart() {
        this.isheartOpen = !this.isheartOpen;
        alert(this.isheartOpen ? '已從收藏移除' : '已加入收藏');
      },
      addtoCart() {
        alert('已加入購物車');
      },

      toggleRoast() {
        this.showRoast = !this.showRoast;
      },
      toggleFlavor() {
        this.showFlavor = !this.showFlavor;
      },
      toggleBeans() {
        this.showBeans = !this.showBeans;
      },
      toggleProcess() {
        this.showProcess = !this.showProcess;
      },
    },
  };
</script>
