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
      <form class="py-24 px-32 bg-[#f9f8f6] w-full lg:w-1/2 lg:pb-12 text-[#6d654f]">
        <p id="origin">{{ originText }} • Single Origin</p>
        <h2 class="text-4xl pt-3 font-semibold">{{ product.name }}</h2>
        <h3 class="pt-2 pb-4">{{ product.english_name }}</h3>
        <p id="price" class="text-xl font-semibold">{{ `$${price}` }}</p>

        <div class="py-4">
          <label for="quantity" class="block font-semibold">數量</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value="1"
            min="1"
            class="border border-gray-300 px-3 py-2 rounded w-1/2"
            v-model.number="quantity"
          />
        </div>

        <div>
          <p class="block font-semibold">重量</p>
          <p class="pt-1">{{ product.weight }}</p>
        </div>

        <div class="py-4">
          <button
            type="button"
            @click="toggleRoast"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            烘焙度
            <i :class="showRoast ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </button>
          <p v-show="showRoast" class="pb-2">{{ roastText }}</p>
          <button
            type="button"
            @click="toggleProcess"
            class="w-1/2 py-2 flex justify-between font-semibold"
          >
            處理方式
            <i :class="showProcess ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </button>
          <p v-show="showProcess" class="pb-2">{{ processingText }}</p>
          <button
            type="button"
            @click="toggleFlavor"
            class="w-1/2 py-2 flex justify-between font-semibold"
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

        <div>
          <button
            @click="toggleHeart"
            v-show="!heartBtn"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 rounded hover:bg-[#ABB7A5]"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
          <button
            @click="toggleHeart"
            v-show="heartBtn"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 rounded hover:bg-[#ABB7A5]"
          >
            <i class="fa-solid fa-heart"></i>
          </button>
          <button
            @click="addToCart"
            type="button"
            class="bg-[#6d654f] text-white text-sm p-3.5 mx-2 rounded font-bold hover:bg-[#ABB7A5]"
          >
            加到購物車
          </button>
          <button
            type="submit"
            class="bg-[#6d654f] text-white text-sm p-3.5 rounded w-24 font-bold hover:bg-[#ABB7A5]"
          >
            立即購買
          </button>
        </div>
      </form>
    </section>

    <!-- Banner Image -->
    <section>
      <img class="w-full aspect-[9/4] object-cover" src="./assets/coffee_banner.jpg" alt="" />
    </section>

    <section>
      <p class="bg-[#eeeeee] text-[#6d654f] font-semibold text-4xl text-center py-48">
        源自高品質產地，香氣清晰口感純淨
      </p>
    </section>

    <!-- Product Description -->
    <section class="bg-[#eeeeee]">
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 px-20 pb-12 lg:py-0">
          <h3 class="text-3xl font-semibold text-[#6d654f]">{{ product.name }}</h3>
          <p class="text-lg text-[#808080] pt-10">
            {{ descriptionBody }}
          </p>
          <p class="text-lg text-[#808080] pt-4">
            {{ descriptionBody2 }}
          </p>
        </div>
        <video src="./assets/video.mp4" autoplay muted loop class="w-full lg:w-1/2"></video>
      </div>
    </section>

    <!-- Recommend Products Section -->
    <section class="bg-[#eeeeee] py-[100px] min-h-[750px] overflow-hidden w-full">
      <h2 class="py-10 text-center text-3xl font-semibold text-[#6d654f]">推薦商品</h2>
      <div
        class="cursor-pointer flex gap-12 w-max animate-[scroll_80s_linear_infinite] [will-change:transform] hover:[animation-play-state:paused]"
      >
        <router-link
          v-for="item in recommendations"
          :key="item.pid"
          :to="`/product-detail/${item.pid}`"
          class="h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0"
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
  import { useRoute } from 'vue-router';
  import { callSingleProduct, callRecommendations } from '@/services/ProductDetail';
  import type { ProductRequest } from '@/services/ProductDetail';

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

      // 重置圖片輪播索引
      currentIndex.value = 0;
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

  // 加入收藏與購物車提示
  const heartBtn = ref(false);
  const toggleHeart = () => {
    heartBtn.value = !heartBtn.value;
    alert(heartBtn.value ? '已加入收藏' : '已從收藏移除');
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
