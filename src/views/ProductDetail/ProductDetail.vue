<template>
  <!-- Loading status -->
  <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
    <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
    <p>載入產品中...</p>
  </div>
  <!-- Error status -->
  <div v-else-if="error">{{ error }}</div>

  <!-- Product information -->
  <main class="relative" v-else-if="product">
    <!-- Product Guide Section -->
    <section class="flex flex-col lg:flex-row justify-center relative min-h-[825px]">
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
            v-for="(_, index) in product.img"
            :key="index"
            class="w-2 h-2 rounded-full"
            :class="index === currentIndex ? 'bg-[#141e0e]' : 'bg-[#a2af9b]'"
          ></div>
        </div>
      </div>

      <!-- Product Form -->
      <form class="py-20 bg-[#f9f8f6] w-full lg:w-1/2 lg:pb-12 text-[#6d654f]">
        <div class="w-3/4 lg:w-1/2 mx-auto">
          <p id="origin">{{ originText }} • Single Origin</p>
          <h2 class="text-3xl lg:text-4xl pt-3 font-semibold">{{ product.name }}</h2>
          <h3 class="pt-2 pb-4">{{ product.english_name }}</h3>
          <p id="price" class="text-xl font-semibold">{{ `$${price}` }}</p>

          <div class="py-4">
            <label for="quantity" class="block font-semibold">數量</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value="1"
              :min="1"
              :max="product.stock"
              class="border border-gray-300 px-3 py-2 rounded w-1/2"
              v-model.number="quantity"
            />
            <p v-if="isSoldOut" class="text-red-500 font-semibold">已售完</p>
            <p v-else-if="isLowStock" class="text-red-500 font-semibold">
              剩餘庫存：{{ product.stock }}
            </p>
            <p v-else>目前庫存：{{ product.stock }}</p>
          </div>

          <div>
            <p class="block font-semibold">重量</p>
            <p class="pt-1">{{ product.weight }}</p>
          </div>

          <div class="py-4">
            <button
              type="button"
              @click="toggleRoast"
              class="w-full py-3 flex justify-between font-semibold"
            >
              烘焙度
              <i :class="showRoast ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
            </button>
            <p v-show="showRoast" class="pb-2">{{ roastText }}</p>
            <button
              type="button"
              @click="toggleProcess"
              class="w-full py-3 flex justify-between font-semibold"
            >
              處理方式
              <i :class="showProcess ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
            </button>
            <p v-show="showProcess" class="pb-2">{{ processingText }}</p>
            <button
              type="button"
              @click="toggleFlavor"
              class="w-full py-3 flex justify-between font-semibold"
            >
              風味特性
              <i :class="showFlavor ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
            </button>
            <p v-show="showFlavor" class="pb-2">
              {{ descriptionFlavor }}
              <br />
              核心風味：{{ flavorTagsText.join('、') }}
            </p>
          </div>

          <div class="flex gap-3">
            <button
              @click="addToCart"
              :disabled="isSoldOut"
              type="button"
              class="bg-[#ABB7A5] hover:bg-[#dccfc0] text-white text-sm p-4 rounded-md w-1/2 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              加到購物車
            </button>
            <button
              type="button"
              :disabled="isSoldOut"
              @click="buyNow"
              class="bg-[#ABB7A5] hover:bg-[#dccfc0] text-white text-sm p-4 rounded-md w-1/2 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              立即購買
            </button>
          </div>
        </div>
      </form>
    </section>

    <!-- Banner Image -->
    <section>
      <img class="w-full aspect-[9/4] object-cover" src="./assets/coffee_banner.jpg" alt="" />
    </section>

    <section>
      <p class="bg-[#eeeeee] text-[#6d654f] font-semibold text-4xl text-center py-48 px-4">
        精選豆款搭配黃金烘焙比例，展現最佳風味。
      </p>
    </section>

    <!-- Product Description -->
    <section class="bg-[#eeeeee]">
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 pb-12">
          <div class="w-3/4 mx-auto">
            <h3 class="text-3xl font-semibold text-[#6d654f]">{{ product.name }}</h3>
            <p class="pt-2 pb-4 text-[#808080]">{{ product.english_name }}</p>
            <p class="text-lg text-[#808080] pt-10">
              {{ descriptionBody }}
            </p>
            <p class="text-lg text-[#808080] pt-4">
              {{ descriptionBody2 }}
            </p>
          </div>
        </div>
        <video
          src="./assets/video.mp4"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          class="w-full lg:w-1/2"
        ></video>
      </div>
    </section>

    <!-- Recommend Products Section -->
    <section class="bg-[#eeeeee] py-[100px] min-h-[750px] overflow-hidden w-full">
      <div class="py-12 text-center">
        <p class="pb-2 text-center text-[#6d654f] font-semibold">Top Picks</p>
        <h2 class="text-center text-3xl lg:text-4xl font-semibold text-[#6d654f]">精選推薦</h2>
        <p class="pt-2 text-center text-[#6d654f]">為咖啡愛好者打造的精品豆款，品味升級首選。</p>
      </div>
      <div
        class="cursor-pointer flex gap-12 w-max animate-[scroll_70s_linear_infinite] [will-change:transform] hover:[animation-play-state:paused]"
      >
        <router-link
          v-for="item in recommendations"
          :key="item.pid"
          :to="`/product-detail/${item.pid}`"
          class="h-[375px] w-[250px] lg:h-[450px] lg:w-[300px] relative flex justify-center items-center group flex-shrink-0 shadow-lg"
        >
          <img
            :src="item.img[0]?.formats?.large?.url"
            :alt="item.name"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0"
          />
          <img
            :src="item.img[2]?.formats?.large?.url"
            :alt="item.name"
            class="aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <p class="absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold">
            {{ item.name }}
          </p>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { callSingleProduct, callRecommendations, cartGoPost } from '@/services/ProductDetail';
  import type { ProductRequest } from '@/services/ProductDetail';
  import { useCartStore } from '@/store/cart';
  import { useAuthStore } from '@/store/auth';

  // 1. 靜態對照表
  const originMap: Record<string, string> = {
    Ethiopia: '衣索比亞',
    Kenya: '肯亞',
    Rwanda: '盧安達',
    Burundi: '布隆迪',
    Colombia: '哥倫比亞',
    Brazil: '巴西',
    Guatemala: '瓜地馬拉',
    'Costa Rica': '哥斯大黎加',
    'El Salvador': '薩爾瓦多',
    Panama: '巴拿馬',
    Indonesia: '印尼',
    Vietnam: '越南',
    India: '印度',
    Thailand: '泰國',
    'Papua New Guinea': '巴布亞紐幾內亞',
  };

  const roastMap: Record<string, string> = {
    Light: '淺焙 ︱ 口感輕盈，香氣明亮清爽',
    Medium: '中焙 ︱ 口感平衡，香氣溫潤適中',
    Dark: '深焙 ︱ 口感濃郁，香氣深沉厚重',
  };

  const processingMap: Record<string, string> = {
    Washed: '水洗處理',
    Natural: '日曬處理',
    Honey: '蜜處理',
    Anaerobic: '厭氧發酵',
    'Wet-Hulled': '濕剝法（半水洗）',
    'Anaerobic Natural': '厭氧日曬',
    'Anaerobic Washed': '厭氧水洗',
    Monsooned: '季風處理',
  };

  const flavorTagsMap: Record<string, string> = {
    Fruity: '果香',
    Berry: '莓果',
    Tropical: '熱帶水果',
    Citrus: '柑橘',
    Sweet: '甜感',
    Fermented: '發酵',
    Winey: '酒香',
    Balanced: '平衡',
    Wild: '野性',
    Nutty: '堅果',
    Chocolate: '巧克力',
    Cocoa: '可可',
    Caramel: '焦糖',
    Smooth: '滑順',
    Heavy: '厚重',
    Earthy: '土壤',
    Woody: '木質',
    Spice: '香料',
    Herbal: '草本',
    Bitter: '苦感',
    Rich: '濃郁',
    Floral: '花香',
    Jasmine: '茉莉',
    'Tea-like': '茶感',
    Clean: '乾淨',
    Bright: '明亮酸質',
  };

  // 2. 組件狀態與邏輯

  const route = useRoute();
  const authStore = useAuthStore();

  const product = ref<ProductRequest | null>(null);
  const recommendations = ref<ProductRequest[]>([]);
  const loading = ref(false);
  const error = ref<string>('');

  // 呼叫 API
  async function loadProductData(pid: string) {
    loading.value = true;
    error.value = '';
    try {
      // 並行載入當前商品和推薦商品
      const [productRes, recommendationsRes] = await Promise.all([
        callSingleProduct(pid),
        callRecommendations(pid),
      ]);

      product.value = productRes.data;
      console.log('✅ 成功載入商品:', product.value);

      recommendations.value = recommendationsRes.data;
      console.log('✅ 推薦商品數量:', recommendations.value.length);

      // 重置圖片輪播索引、重置數量
      currentIndex.value = 0;
      quantity.value = 1;
    } catch (err: unknown) {
      console.error('❌ API載入失敗', err);
      error.value = '商品載入失敗';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    const pid = route.params.pid as string;
    loadProductData(pid);
  });

  // 監聽路由變化
  watch(
    () => route.params.pid,
    (newPid) => {
      if (newPid) {
        loadProductData(newPid as string);
      }
    }
  );

  // 圖片點擊輪播
  const currentIndex = ref(0);
  const prevPhoto = () => {
    if (!product.value?.img?.length) return;
    currentIndex.value =
      currentIndex.value > 0 ? currentIndex.value - 1 : product.value.img.length - 1;
  };
  const nextPhoto = () => {
    if (!product.value?.img?.length) return;
    currentIndex.value =
      currentIndex.value < product.value.img.length - 1 ? currentIndex.value + 1 : 0;
  };

  // 重量對應價格
  const quantity = ref(1);
  const price = computed(() => {
    if (!product.value) {
      return 0;
    }
    return product.value.price * quantity.value;
  });

  // 庫存顯示(無庫存/低庫存)
  const isSoldOut = computed(() => {
    if (!product.value) return false;
    return product.value.stock === 0;
  });
  const isLowStock = computed(() => {
    if (!product.value) return false;
    return product.value.stock > 0 && product.value.stock < 21;
  });

  // 防止使用者手動輸入違規數字
  watch(quantity, (newVal) => {
    if (!product.value) return;

    // 防止小數點
    if (!Number.isInteger(newVal)) {
      quantity.value = Math.floor(newVal);
    }

    if (newVal > product.value.stock) {
      quantity.value = product.value.stock;
    } else if (newVal < 1) {
      quantity.value = 1;
    }
  });

  // 加入購物車
  const cartStore = useCartStore();
  const addToCart = async () => {
    if (!product.value) return;

    // 準備加入購物車的商品資料 (包含當前選擇的數量)
    await cartStore.addItem({
      ...product.value,
      quantity: quantity.value,
    });
  };

  // 立即購買：檢驗登入狀態，導向結帳頁
  const router = useRouter();

  // 新增按下【 立即購買 】後會加入購物車 (柔+)
  const buyNow = async () => {
    // 防呆 防使用者在還沒渲染產品時就按
    if (!product.value) return;

    // 防呆 庫存不足
    if (product.value.stock < quantity.value) {
      alert('庫存不足');
      return;
    }

    // 防呆 先登入
    if (authStore.isLoggedIn == false) {
      router.push({ name: 'Login' });
      return;
    }

    // console.log('這個產品的詳細資料');
    // console.log(product.value);
    // console.log('使用者按了幾包');
    // console.log(quantity.value);

    const buy = {
      user: authStore.user!.id.toString(),
      product: product.value.id,
      quantity: Number(quantity.value),
      snapshot_image: product.value.img[0].formats.large.url,
      snapshot_name: product.value.name,
      snapshot_price: Number(product.value.price),
      snapshot_weight: product.value.weight,
      item_total: Number(product.value.price) * Number(quantity.value),
    };

    try {
      const response = await cartGoPost(buy);
      console.log(response);
    } catch (error) {
      console.error('購物車加入失敗', error);
      throw error;
    }

    router.push('/checkout');
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
  const originText = computed(() => {
    return product.value ? originMap[product.value.origin] || product.value.origin : '';
  });
  const roastText = computed(() => {
    return product.value ? roastMap[product.value.roast] || product.value.roast : '';
  });
  const processingText = computed(() => {
    return product.value ? processingMap[product.value.processing] || product.value.processing : '';
  });

  const flavorTagsText = computed(() => {
    if (!product.value?.flavor_tags) return [];
    return product.value.flavor_tags.map((tagObj) => {
      const tag = tagObj.name;
      return flavorTagsMap[tag] ?? tag;
    });
  });

  // 產品描述分段
  const descriptionLines = computed(() => {
    if (!product.value?.description) return [];
    return product.value.description.split('\n');
  });
  const descriptionFlavor = computed(() => {
    return descriptionLines.value[0] || '';
  });
  const descriptionBody = computed(() => {
    return descriptionLines.value.slice(1, 2).join('\n');
  });
  const descriptionBody2 = computed(() => {
    return descriptionLines.value.slice(2).join('\n');
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
