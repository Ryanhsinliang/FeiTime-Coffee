<template>
  <main class="relative">
    <!-- Product Guide Section -->
    <section class="flex flex-col lg:flex-row justify-center relative min-h-[600px]">
      <!-- Photo Gallery -->
      <div class="w-full lg:w-1/2 bg-[#f3eeea] relative max-h-[600px]">
        <img
          :src="currentPhoto.image"
          alt=""
          class="object-cover aspect-square w-full max-h-[600px]"
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
        <h2 class="text-4xl py-4">阿拉比卡．Arabica Classic</h2>
        <p id="price">$400(價格)</p>

        <div class="py-4">
          <label for="quantity" class="block">數量</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value="1"
            min="1"
            class="border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label for="weight" class="block">重量</label>
          <select name="weight" id="weight" class="border border-gray-300 px-3 py-2 rounded w-full">
            <option value="">100g</option>
            <option value="">250g</option>
            <option value="">500g</option>
          </select>
        </div>

        <div class="py-4">
          <label for="grind" class="block">研磨度</label>
          <select name="grind" id="grind" class="border border-gray-300 px-3 py-2 rounded w-full">
            <option value="">整豆</option>
            <option value="">手沖研磨</option>
            <option value="">義式研磨</option>
          </select>
        </div>

        <div>
          <button
            @click="toggleHeart"
            v-show="isheartOpen"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
          <button
            @click="toggleHeart"
            v-show="!isheartOpen"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5"
          >
            <i class="fa-solid fa-heart"></i>
          </button>
          <button
            @click="addtoCart"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 mx-2"
          >
            加到購物車
          </button>
          <button type="submit" class="bg-[#6d654f] text-white text-sm p-3.5">立即購買</button>
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
        <img class="w-full lg:w-[45%]" src="./assets/coffee_bean.jpg" alt="coffee_bean" />
        <div class="w-full lg:w-[55%] p-[10vw]">
          <div>
            <button
              class="text-base px-3 border-r cursor-pointer transition-colors"
              :class="activeTab === 'roast' ? 'text-[#6d654f]' : 'text-[#abaaaa] border-[#abaaaa]'"
              @click="activeTab = 'roast'"
            >
              烘焙方式
            </button>
            <button
              class="text-base px-3 border-r cursor-pointer transition-colors"
              :class="activeTab === 'beans' ? 'text-[#6d654f]' : 'text-[#abaaaa] border-[#abaaaa]'"
              @click="activeTab = 'beans'"
            >
              豆種組合
            </button>
            <button
              class="text-base px-3 cursor-pointer transition-colors"
              :class="activeTab === 'flavor' ? 'text-[#6d654f]' : 'text-[#abaaaa]'"
              @click="activeTab = 'flavor'"
            >
              風味特性
            </button>
          </div>

          <hr class="my-4 border-[#6d654f] w-2/3" />

          <div class="mt-8">
            <p v-if="activeTab !== 'flavor'" class="text-2xl text-[#6d654f]">
              {{ menuData[activeTab].content }}
            </p>
            <ul v-else class="text-2xl text-[#6d654f]">
              <li v-for="item in menuData[activeTab].content" :key="item" class="mb-2">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Products Section -->
    <section class="bg-[#eeeeee] py-[100px]">
      <h2 class="p-10 text-center text-3xl text-[#6d654f]">熱門商品</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5vw] max-w-[1400px] mx-auto px-8"
      >
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="min-w-full aspect-[2/3] w-full object-cover"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="min-w-full aspect-[2/3] w-full object-cover"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="min-w-full aspect-[2/3] w-full object-cover"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="min-w-full aspect-[2/3] w-full object-cover"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img
            src="./assets/orange.png"
            alt="orange"
            class="min-w-full aspect-[2/3] w-full object-cover"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
        <div
          class="h-[600px] w-full max-w-[400px] mx-auto relative flex justify-center items-center group"
        >
          <img src="./assets/Jasmine.png" alt="Jasmine" class="w-[200px] aspect-square" />
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
          { name: 'bag', image: '@/views/ProductDetail/assets/coffee_bag2.png' },
          {
            name: 'beans',
            image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308',
          },
          { name: 'flower', image: '@/assets/coffee_cup2.jpg' },
        ],
        isheartOpen: true,
        activeTab: 'roast',
        menuData: {
          roast: { title: '烘焙方式', content: '淺中焙 / 手沖烘焙' },
          beans: { title: '豆種組合', content: '原生種 Arabica' },
          flavor: { title: '風味特性', content: ['果香', '花香', '圓潤平衡'] },
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
        alert(this.isheartOpen ? '已從最愛移除' : '已加入最愛');
      },
      addtoCart() {
        alert('已加入購物車');
      },
    },
  };
</script>
