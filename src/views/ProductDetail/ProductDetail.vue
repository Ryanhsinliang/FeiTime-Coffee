<template>
  <div v-if="loading">載入中...</div>
  <div v-else-if="error">{{ error }}</div>
  <main class="relative" v-else-if="product">
    <!-- Product Guide Section -->
    <section class="flex flex-col lg:flex-row justify-center relative min-h-[42vw]">
      <!-- Photo Gallery -->
      <div
        class="w-full lg:w-1/2 bg-[#f3eeea] relative"
        v-if="product.img && product.img.length > 0"
      >
        <img
          :src="product.img[currentIndex].formats.large.url"
          :alt="product.name"
          class="object-cover aspect-[4/3] w-full h-full"
        />

        <!-- Navigation Buttons -->
        <button
          @click="prevPhoto"
          v-if="product.img.length > 1"
          type="button"
          class="absolute top-1/2 left-2.5 -translate-y-1/2"
        >
          <i class="fa-solid fa-chevron-left text-[#d4b396] text-[45px] opacity-50"></i>
        </button>
        <button
          @click="nextPhoto"
          v-if="product.img.length > 1"
          type="button"
          class="absolute top-1/2 right-2.5 -translate-y-1/2"
        >
          <i class="fa-solid fa-chevron-right text-[#d4b396] text-[45px] opacity-50"></i>
        </button>

        <div
          class="w-[60px] h-5 bg-[#d9cfc7] absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-[20px] opacity-50 flex justify-center items-center gap-2"
        >
          <div
            v-for="(dot, index) in product.img"
            :key="index"
            class="w-2 h-2 rounded-full"
            :class="index === currentIndex ? 'bg-[#141e0e]' : 'bg-[#a2af9b]'"
          ></div>
        </div>
      </div>

      <!-- Product Form -->
      <form class="py-24 px-28 bg-[#f9f8f6] w-full lg:w-1/2 text-[#6d654f]">
        <p id="origin">{{ product.origin }}</p>
        <h2 class="text-4xl py-4 font-semibold">{{ product.name }}</h2>
        <p id="price" class="text-lg font-semibold">{{ `$${price}` }}</p>

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
          <select
            v-model.number="weight"
            name="weight"
            id="weight"
            class="border border-gray-300 px-3 py-2 rounded w-1/2"
          >
            <option value="100">100g</option>
            <option value="250">250g</option>
            <option value="500">500g</option>
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
          <p v-show="showRoast" class="py-2">{{ roastText }}</p>
          <button
            type="button"
            @click="toggleProcess"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            處理方式
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showProcess" class="py-2">{{ processingText }}</p>
          <button
            type="button"
            @click="toggleFlavor"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            風味特性
            <i class="fa-solid fa-plus"></i>
          </button>
          <p v-show="showFlavor" class="py-2">
            {{ product.flavor_type }}+{{ product.flavor_tags.map((tag) => tag.name).join('、') }}
          </p>
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
            @click="addToCart"
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
      <img class="w-full aspect-[9/4] object-cover" src="./assets/coffee_banner.jpg" alt="" />
    </section>

    <!-- Quote Section -->
    <section>
      <p class="bg-[#eeeeee] text-[#6d654f] text-3xl text-center py-48">
        品味高海拔的清新果香,讓每一口都回到自然的純粹
      </p>
    </section>

    <!-- Product Details -->
    <section class="bg-[#eeeeee]">
      <!-- First Detail Block -->
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 px-20 pb-12 lg:py-0">
          <h3 class="text-3xl text-[#6d654f]">{{ product.name }}</h3>
          <p class="text-lg text-[#808080] pt-10">
            {{ product.description }}
          </p>
          <!-- <p class="text-lg text-[#808080] pt-4">
            無論手沖還是義式沖煮,都能呈現均衡香氣與圓潤口感,特別適合喜歡酸度柔和、香氣明亮且口感平衡的咖啡愛好者。
          </p> -->
        </div>
        <video src="./assets/video.mp4" autoplay muted loop class="w-full lg:w-1/2"></video>
      </div>
    </section>

    <!-- Recommend Products Section -->
    <section class="bg-[#eeeeee] py-[100px] min-h-[750px] overflow-hidden w-full">
      <h2 class="py-10 text-center text-3xl text-[#6d654f]">推薦商品</h2>
      <div
        class="cursor-pointer flex gap-12 w-max animate-[scroll_80s_linear_infinite] [will-change:transform] hover:[animation-play-state:paused]"
      >
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
        >
          <img
            src="./assets/coffee_bag.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
        >
          <img
            src="./assets/coffee_bag.png"
            alt="coffee_bag"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>

        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
        >
          <img
            src="./assets/coffee_bag.png"
            alt="orange"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
        <a
          href="#"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
        >
          <img
            src="./assets/coffee_bag.png"
            alt="coffee_bag"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            src="./assets/coffee_cup.png"
            alt="coffee_cup"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <p
            class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          >
            阿拉比卡．Arabica
          </p>
        </a>
      </div>
    </section>

    <!-- <div v-if="loading">載入中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="product">
      <h3>{{ product.name }}</h3>
      <p>產品編號: {{ product.pid }}</p>
      <p>產地: {{ product.origin }}</p>
      <p>處理法: {{ product.processing }}</p>
      <p>烘焙度: {{ product.roast }}</p>
      <p>風味: {{ product.flavor_type }}</p>
      <p>
        風味標籤：
        {{ product.flavor_tags.map((tag) => tag.name).join('、') }}
      </p>
      <p>價格: ${{ product.price }}</p>
      <p>庫存: {{ product.stock }}</p>
      <p>{{ product.description }}</p>
    </div> -->
    <!-- 確認 product 有 img 陣列且至少有一張圖片才顯示輪播區塊。 -->
    <!-- <div v-if="product.img && product.img.length > 0">
      <img :src="product.img[currentIndex].formats.large.url" :alt="product.name" />
      <button @click="prevPhoto" class="nav-btn prev-btn" v-if="product.img.length > 1">◀</button>
      <button @click="nextPhoto" class="nav-btn next-btn" v-if="product.img.length > 1">▶</button>
    </div> -->
  </main>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { callProducts } from '@/services/ProductDetail';
  import type { ProductRequest } from '@/services/ProductDetail';
  import { callSingleProduct } from '@/services/ProductDetail';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  // product.value 可以是 ProductRequest 型別，也可以是 null，還沒拿到商品資料時，先設為空
  const product = ref<ProductRequest | null>(null);
  const loading = ref(false);
  const error = ref<string>('');

  onMounted(async () => {
    loading.value = true;
    try {
      const pid = route.params.pid as string; // 從路由取得 pid
      const res = await callSingleProduct(pid);

      // 判斷回傳的是陣列還是物件
      if (Array.isArray(res.data)) {
        product.value = res.data[0]; // 如果是陣列，取第一筆
      } else {
        product.value = res.data; // 如果是物件，直接使用
      }

      console.log('✅ 成功載入商品:', product.value);
    } catch (err: any) {
      console.error('❌ API載入失敗', err);
      error.value = err.message || '載入失敗';
    } finally {
      loading.value = false;
    }
  });

  // 圖片點擊輪播
  const currentIndex = ref(0);
  const prevPhoto = () => {
    currentIndex.value =
      currentIndex.value > 0 ? currentIndex.value - 1 : product.value.img.length - 1;
  };
  const nextPhoto = () => {
    currentIndex.value =
      currentIndex.value < product.value.img.length - 1 ? currentIndex.value + 1 : 0;
  };

  // 重量對應價格
  const weight = ref(250);
  const price = computed(() => {
    if (weight.value === 100) {
      return product.value.price / 2;
    } else if (weight.value === 250) {
      return product.value.price;
    } else if (weight.value === 500) {
      return product.value.price * 2;
    } else {
      return 0;
    }
  });

  // 加入收藏與購物車提示
  const isheartOpen = ref(true);
  const toggleHeart = () => {
    isheartOpen.value = !isheartOpen.value;
    alert(isheartOpen.value ? '已從收藏移除' : '已加入收藏');
  };
  const addToCart = () => {
    alert('已加入購物車');
  };

  // 商品資訊欄位展開
  const showRoast = ref(false);
  const showFlavor = ref(false);
  const showProcess = ref(false);
  const toggleRoast = () => {
    showRoast.value = !showRoast.value;
  };
  const toggleFlavor = () => {
    showFlavor.value = !showFlavor.value;
  };
  const toggleProcess = () => {
    showProcess.value = !showProcess.value;
  };

  // 資料庫中英切換
  const roastText = computed(() => {
    const roastMap: Record<string, string> = {
      Light: '淺焙 | 口感輕盈，香氣明亮清爽',
      Medium: '中焙 | 口感平衡，香氣溫潤適中',
      Dark: '深焙 | 口感濃郁，香氣深沉厚重',
    };
    return product.value ? roastMap[product.value.roast] || product.value.roast : '';
  });
  const processingText = computed(() => {
    const processingMap: Record<string, string> = {
      Washed: '水洗處理',
      Natural: '日曬處理',
      Honey: '蜜處理',
      Anaerobic: '厭氧發酵',
    };
    return product.value ? processingMap[product.value.processing] || product.value.processing : '';
  });
</script>

<style>
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
