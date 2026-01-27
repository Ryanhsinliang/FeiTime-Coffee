<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PackageOpen } from 'lucide-vue-next';
  import banner from '@/views/HomePage/assets/banner.webp';
  import defaultProductImg from '@/views/HomePage/assets/default-product.webp';

  // 引入 API Service
  import { fetchFeaturedProducts, type Product } from '@/services/homePage/featuredProduct';

  // 引入 HomePage 專屬型別與常數
  import { flavorMap, flavorStyles } from '@/views/HomePage/type';

  // 引入子元件
  import FlavorMusicPlayer from '@/views/HomePage/components/FlavorMusicPlayer.vue';
  import FeiTimeStory from '@/views/HomePage/components/FeiTimeStory.vue';

  // ============================================
  // 推薦產品相關 - 狀態
  // ============================================
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  // ============================================
  // 推薦產品相關 - 方法
  // ============================================
  const fetchProducts = async () => {
    try {
      loading.value = true;
      error.value = null;

      products.value = await fetchFeaturedProducts();
    } catch (err: any) {
      console.error('❌ 載入產品失敗:', err);
      error.value = err.message || '載入產品失敗，請稍後再試';
    } finally {
      loading.value = false;
    }
  };

  const getImageUrl = (product: Product): string => {
    if (product.img && product.img.length > 0 && product.img[0]?.url) {
      return product.img[0].url;
    }
    return defaultProductImg;
  };

  const getFlavorLabel = (flavorType: string): string => {
    return flavorMap[flavorType] || flavorType;
  };

  const getFlavorStyle = (flavorType: string): string => {
    return flavorStyles[flavorType] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  // ============================================
  // 生命週期
  // ============================================
  onMounted(() => {
    fetchProducts();
  });
</script>

<template>
  <!-- Hero Section -->
  <header class="relative w-full h-[94vh] min-h-[600px] overflow-hidden">
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${banner})` }"
    >
      <div class="absolute inset-0 bg-black/30"></div>
    </div>
    <div
      class="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center text-white"
    >
      <div
        class="bg-background-light/90 backdrop-blur-md p-10 md:p-14 max-w-xl shadow-lg border-l-4 border-sage"
      >
        <!-- 小標 -->
        <div class="flex items-center gap-4 mb-6">
          <span class="h-px w-12 bg-sage"></span>
          <span class="font-medium tracking-[0.2em] uppercase text-xs font-jp">
            Discover Your Taste
          </span>
        </div>

        <!-- 標題 -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide mb-6">
          <span class="font-cactus">
            為每一刻，
            <br />
            沖一杯好時光。
          </span>
        </h1>

        <!-- 文字描述 -->
        <p class="text-base mb-8 leading-loose font-light">
          Every cup tells a story. Find the coffee that resonates with your rhythm and ritual.
        </p>

        <!-- 按鈕 -->
        <div class="flex flex-wrap gap-6">
          <RouterLink to="/coffee-id-test" class="group">
            <button
              class="relative flex items-center justify-center h-14 px-10 bg-white/20 text-sage text-sm tracking-widest uppercase rounded-sm shadow-md backdrop-blur-sm overflow-hidden transition-colors duration-300"
            >
              開始 Coffee ID 測驗

              <!-- 四邊角動畫 -->
              <span
                class="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-sage rounded-sm transition-all duration-300 group-hover:w-full group-hover:h-full"
              ></span>

              <span
                class="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-sage rounded-sm transition-all duration-300 group-hover:w-full group-hover:h-full"
              ></span>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>

  <!-- 推薦商品區塊-->
  <section class="w-full py-24 bg-white">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <!-- 標題區 -->
      <div class="flex flex-col items-center gap-3 text-center mb-16">
        <div class="flex items-center gap-3">
          <div class="h-px w-8 lg:w-12 bg-gradient-to-r from-transparent to-sage"></div>
          <span class="text-sage tracking-[0.3em] uppercase text-xs font-bold">
            FeiTime Selection
          </span>
          <div class="h-px w-8 lg:w-12 bg-gradient-to-l from-transparent to-sage"></div>
        </div>
        <h2 class="text-3xl lg:text-4xl font-serif text-text-main leading-tight">推薦商品</h2>
        <p class="text-sm lg:text-base text-text-main/60 max-w-2xl leading-relaxed">
          精選高品質咖啡豆，為您帶來獨特的風味體驗
        </p>
      </div>

      <!-- Loading 狀態 -->
      <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
        <div class="flex flex-col items-center gap-4">
          <div
            class="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="text-text-sub">載入產品中...</p>
        </div>
      </div>

      <!-- Error 狀態 -->
      <div v-else-if="error" class="flex items-center justify-center min-h-[400px]">
        <div class="flex flex-col items-center gap-4 text-center">
          <PackageOpen :size="64" class="text-gray-400" />
          <p class="text-text-sub">{{ error }}</p>
          <button
            @click="fetchProducts"
            class="px-6 py-2 bg-sage text-white rounded-sm hover:bg-sage/90 transition-colors"
          >
            重試
          </button>
        </div>
      </div>

      <!-- 產品列表 -->
      <div v-else>
        <!-- 桌面版: Grid 佈局 -->
        <div class="hidden lg:grid lg:grid-cols-4 gap-8 lg:gap-12">
          <router-link
            v-for="product in products"
            :key="product.pid"
            :to="{ name: 'ProductDetail', params: { pid: product.pid } }"
            class="group flex flex-col cursor-pointer"
          >
            <!-- 產品圖片 -->
            <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
              <div
                class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                :style="{ backgroundImage: `url('${getImageUrl(product)}')` }"
              ></div>
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"
              ></div>
            </div>

            <!-- 產品資訊 -->
            <div class="flex flex-col gap-2 items-center text-center">
              <h3
                class="text-base font-medium text-text-main tracking-wide group-hover:text-sage transition-colors font-serif"
              >
                {{ product.name }}
              </h3>

              <span
                v-if="product.flavor_type"
                :class="getFlavorStyle(product.flavor_type)"
                class="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full"
              >
                {{ getFlavorLabel(product.flavor_type) }}
              </span>

              <span class="text-lg font-semibold text-text-main">${{ product.price }}</span>
            </div>
          </router-link>
        </div>

        <!-- 平板和手機版: 水平滾動佈局 -->
        <div
          class="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 md:-mx-12 md:px-12"
        >
          <router-link
            v-for="product in products"
            :key="product.pid"
            :to="{ name: 'ProductDetail', params: { pid: product.pid } }"
            class="group flex flex-col cursor-pointer flex-shrink-0 w-[70vw] sm:w-[45vw] snap-start"
          >
            <!-- 產品圖片 -->
            <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
              <div
                class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                :style="{ backgroundImage: `url('${getImageUrl(product)}')` }"
              ></div>
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"
              ></div>
            </div>

            <!-- 產品資訊 -->
            <div class="flex flex-col gap-2 items-center text-center">
              <h3
                class="text-base font-medium text-text-main tracking-wide group-hover:text-sage transition-colors font-serif"
              >
                {{ product.name }}
              </h3>

              <span
                v-if="product.flavor_type"
                :class="getFlavorStyle(product.flavor_type)"
                class="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full"
              >
                {{ getFlavorLabel(product.flavor_type) }}
              </span>

              <span class="text-lg font-semibold text-text-main">${{ product.price }}</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 查看更多 -->
      <div class="mt-16 flex justify-center">
        <RouterLink
          to="/product"
          class="group inline-flex items-center gap-3 text-text-main hover:text-sage transition-colors text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-sage pb-1"
        >
          瀏覽所有商品
          <span
            class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
          >
            arrow_forward
          </span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 風味歌曲區塊 -->
  <FlavorMusicPlayer />

  <!-- FeiTime Story 區塊 -->
  <FeiTimeStory />
</template>
