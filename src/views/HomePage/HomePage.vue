<template>
  <!-- Hero Section -->
  <header class="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center"
      style="
        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuByFTzzJ81p7RzkNWZOaoxxB24NpVW0UPgbPrSQfcMZN-auzDFNc15BUoryqmXvz1WcGUNtOoLfvikXYFnwbkbZ26wLGz3CLkO0PvhjoEkOllEd9SiuIb5oeysjFF6-EnVLildq_HzWbECJzB5BDoz8JXRVjFkODz4bt7VXrQYGGagCnUf8CaPtWXw-tx2AEeFgpE6nYKpdNBB7BHcs2H4ixzdoAPlDNb5V0_ytM9mX8bJfQgfP9ccmTT9xwhYinqz8uS8dY340RJfT');
      "
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
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-wide mb-6">
          Your Moment,
          <br />
          Perfectly
          <span class="italic">Brewed</span>
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
  <section class="w-full py-24 bg-white dark:bg-background-dark">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <!-- 標題區 -->
      <div class="flex flex-col items-center justify-center mb-16 text-center">
        <span class="text-sage tracking-[0.3em] text-xs uppercase mb-4 font-jp">
          FeiTime Selection
        </span>
        <h2 class="text-3xl font-serif text-text-main dark:text-white tracking-widest">推薦商品</h2>
        <div class="w-12 h-px bg-latte mt-6 mb-4"></div>
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
          <span class="text-4xl">⚠️</span>
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div
          v-for="product in products"
          :key="product.id"
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
            <!-- 產品名稱 -->
            <h3
              class="text-base font-medium text-text-main dark:text-white tracking-wide group-hover:text-sage transition-colors font-serif"
            >
              {{ product.name }}
            </h3>

            <!-- 風味標籤 - 動態顏色 -->
            <span
              v-if="product.flavor_type"
              :class="getFlavorStyle(product.flavor_type)"
              class="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full"
            >
              {{ getFlavorLabel(product.flavor_type) }}
            </span>

            <!-- 產品價格 -->
            <span class="text-lg font-semibold text-text-main dark:text-white">
              ${{ product.price }}
            </span>
          </div>
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
  <section
    class="bg-sage text-text-dark font-display flex items-center justify-center py-8 px-4 lg:py-12 lg:px-8 overflow-x-hidden transition-colors duration-300"
  >
    <div
      class="w-full max-w-[1200px] bg-[#FAF9EE] rounded-4xl overflow-hidden flex flex-col relative"
    >
      <!-- Header Section with Vinyl and Video -->
      <div
        class="relative z-10 w-full flex flex-col lg:flex-row p-8 lg:px-10 lg:py-6 gap-8 lg:gap-20 items-center"
      >
        <!-- Vinyl Record -->
        <div class="flex-shrink-0 flex items-center justify-center relative p-8 lg:p-12">
          <div class="relative animate-float">
            <div
              class="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full vinyl-grooves shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-spin-slow border-[4px] border-[#171412] flex items-center justify-center"
            >
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none"
              ></div>
              <div
                class="w-1/3 h-1/3 bg-[#FAF9EE] rounded-full flex items-center justify-center border-[10px] lg:border-[12px] border-[#DCCFC0] shadow-inner relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBteaN7aB0pLpMDyJk4fzaQtafUJ7ahpVwP8inuf8EjmBmRXGRBJWWGZjdMNLZxg4phgC4Yv76T6YX5YwT0SERj4j5T3x1xM6YQRe5YbaQbAe5z8y-e4-hVp2vtV8vxcA6wrRoUYD8-aREdpDo22IcK6PGN2WZeVuJmKy1v22FETrjKYzx8FraKQ8LlrauHPsXfRiR0oAp_jQ2Kji9YaWcXzJW11CoB8OOJ1F6FEgDOs1lilPufqqWrWtSrw0dteT4Mp5lHt-Kf_Su')] bg-cover bg-center opacity-40 mix-blend-multiply"
                ></div>
                <div class="w-3 h-3 bg-[#171412] rounded-full z-10"></div>
                <span
                  class="absolute bottom-1.5 text-[5px] lg:text-[7px] uppercase font-bold tracking-widest text-[#171412]"
                >
                  {{ currentVideo?.title || '' }}
                </span>
              </div>
            </div>
            <div
              class="absolute -top-2 -right-6 w-14 h-36 border-l-8 border-t-8 border-[#171412]/20 rounded-tl-3xl pointer-events-none hidden lg:block origin-top-right rotate-12"
            ></div>
          </div>
        </div>

        <!-- Video and AI DJ Panel -->
        <div class="flex-1 w-full flex flex-col gap-5 justify-center">
          <!-- Video Player -->
          <div
            class="w-full relative shadow-xl rounded-2xl overflow-hidden bg-black aspect-video ring-1 ring-black/5"
          >
            <!-- YouTube Iframe - 當有音樂時顯示 -->
            <iframe
              v-if="embedUrl && !musicLoading && !musicError"
              :src="embedUrl"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>

            <!-- Loading State -->
            <div
              v-else-if="musicLoading"
              class="absolute inset-0 flex items-center justify-center bg-gray-900"
            >
              <div class="flex flex-col items-center gap-4">
                <div
                  class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"
                ></div>
                <p class="text-white text-sm">正在為您尋找音樂...</p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="musicError"
              class="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur"
            >
              <div class="text-center p-6">
                <span class="material-symbols-outlined text-red-400 text-5xl mb-2">error</span>
                <p class="text-white text-sm mb-4">{{ musicError }}</p>
                <button
                  v-if="selectedFlavor"
                  @click="selectFlavor(selectedFlavor)"
                  class="px-4 py-2 bg-white/20 rounded-lg text-white text-xs hover:bg-white/30 transition"
                >
                  重試
                </button>
              </div>
            </div>

            <!-- Default State - 原本的預設畫面 -->
            <div v-else class="group">
              <div
                class="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBteaN7aB0pLpMDyJk4fzaQtafUJ7ahpVwP8inuf8EjmBmRXGRBJWWGZjdMNLZxg4phgC4Yv76T6YX5YwT0SERj4j5T3x1xM6YQRe5YbaQbAe5z8y-e4-hVp2vtV8vxcA6wrRoUYD8-aREdpDo22IcK6PGN2WZeVuJmKy1v22FETrjKYzx8FraKQ8LlrauHPsXfRiR0oAp_jQ2Kji9YaWcXzJW11CoB8OOJ1F6FEgDOs1lilPufqqWrWtSrw0dteT4Mp5lHt-Kf_Su')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div
                class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4"
              >
                <h3 class="text-white text-base font-medium tracking-wide truncate pr-8">
                  選擇風味開始播放
                </h3>
              </div>
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class="w-14 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300"
                >
                  <span class="material-symbols-outlined text-white text-2xl">play_arrow</span>
                </div>
              </div>
            </div>

            <!-- Video Title Overlay - 當有影片時顯示 -->
            <div
              v-if="currentVideo && !musicLoading && !musicError"
              class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4"
            >
              <h3 class="text-white text-base font-medium tracking-wide truncate pr-8">
                {{ currentVideo.title }}
              </h3>
              <p class="text-white/70 text-xs mt-1">{{ currentVideo.channelTitle }}</p>
            </div>
          </div>

          <!-- AI DJ Panel -->
          <div
            class="glass-panel p-3 lg:p-4 rounded-xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-row items-center justify-between gap-4 w-full"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="w-10 h-10 rounded-full bg-sage flex-shrink-0 flex items-center justify-center text-white shadow-md relative"
              >
                <span
                  v-if="!musicError && !musicLoading"
                  class="absolute inset-0 rounded-full bg-sage animate-ping opacity-20"
                ></span>
                <span class="material-symbols-outlined text-xl">
                  {{ musicError ? 'error' : 'smart_toy' }}
                </span>
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wider text-sage whitespace-nowrap"
                  >
                    AI DJ
                  </span>
                  <span
                    v-if="!musicError && !musicLoading"
                    class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  ></span>
                </div>
                <span class="text-sm font-bold text-[#171412] leading-tight truncate">
                  推薦：{{ aiRecommendation }}
                </span>
              </div>
            </div>
            <button
              @click="nextRecommendation"
              :disabled="musicLoading || !selectedFlavor || musicError !== null"
              class="flex items-center justify-center gap-2 bg-[#171412] text-[#FAF9EE] px-4 py-2 rounded-lg hover:bg-[#DCCFC0] hover:text-[#171412] transition-all duration-300 shadow-md hover:shadow-lg group flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="text-xs font-bold tracking-wide hidden sm:inline">Next</span>
              <span
                class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform"
              >
                skip_next
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Coffee Flavor Selection -->
      <div class="relative z-10 w-full p-8 lg:px-10 lg:py-6">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          <div class="flex flex-col items-start gap-2 min-w-[200px] shrink-0">
            <h2 class="text-[#171412] text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
              今天我想
              <br />
              選擇的風味是:
            </h2>
            <div class="flex items-center gap-2">
              <span class="h-1 w-6 bg-[#A2AF9B] rounded-full"></span>
              <p class="text-[#A2AF9B] text-xs font-medium">AI 將為您調配專屬歌單</p>
            </div>
          </div>

          <!-- Flavor Buttons -->
          <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            <button
              v-for="flavor in flavors"
              :key="flavor.id"
              @click="selectFlavor(flavor)"
              :class="[
                'group relative h-28 sm:h-32 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1',
                selectedFlavor?.id === flavor.id ? 'ring-2 ring-sage/50' : '',
              ]"
            >
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                :style="{ backgroundImage: `url('${flavor.image}')` }"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"
              ></div>
              <div class="absolute inset-0 p-3 flex flex-col justify-end items-start text-left">
                <h3 class="text-white text-base font-bold leading-none mb-0.5">
                  {{ flavor.name }}
                </h3>
                <span class="text-white/80 text-[10px]">{{ flavor.description }}</span>
              </div>
              <div
                class="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-sage group-hover:scale-110 transition-all"
              >
                <span class="material-symbols-outlined text-xs">{{ flavor.icon }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="text-center mt-6">
          <p class="text-[10px] text-[#171412]/40 font-mono">
            Powered by Coffee & Beats AI Engine v2.0
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- FeiTime Story 區塊 -->
  <section class="w-full py-24 bg-white dark:bg-background-dark relative overflow-hidden">
    <!-- 裝飾背景 -->
    <div
      class="absolute top-0 right-0 w-1/3 h-full bg-latte/10 -skew-x-12 translate-x-12 z-0 pointer-events-none"
    ></div>

    <div class="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
      <div class="flex flex-col md:flex-row gap-16 items-center">
        <!-- 左側圖片 -->
        <div class="w-full md:w-1/2">
          <div class="relative w-full aspect-[4/5] bg-mist overflow-hidden rounded-sm">
            <div
              class="absolute inset-0 bg-cover bg-center grayscale-[20%]"
              :style="{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSZT1BaAbZzl3rsjfSWyDnDIcbBqbxNlreb9h9o56h__stP18vLJ8-W3BwH8vSzQ-R5Efe9JfhnecFrwMArBLqbw-gwTMw33uQ_19qti3axO6wrVRaSJozFAVoZ0kiHaeXW_0r2-aA_HBAAvn337dcOA6U4IM8qXSBI6Uz0TXa-m5NjEszpc0C6eOj2Kt4gMKNjUeadUGts3ks1QlYlfEHok_RmnYrwGL425HMjF2vPQ19c7tfEC4iR6edG3PPtyB0vZVvimyJFRAL')`,
              }"
            ></div>
            <div class="absolute inset-4 border border-white/30"></div>
          </div>
        </div>

        <!-- 右側文字內容 -->
        <div class="w-full md:w-1/2 flex flex-col gap-8">
          <!-- 標題區 -->
          <div class="flex flex-col gap-4">
            <span class="text-sage tracking-[0.2em] uppercase text-xs font-jp">FeiTime Story</span>
            <h2 class="text-4xl font-serif text-text-main dark:text-white leading-tight">
              Quiet Moments,
              <br />
              Crafted with
              <span class="italic text-sage">Care</span>
            </h2>
          </div>

          <div class="w-16 h-px bg-latte"></div>

          <!-- 文字段落 -->
          <p class="text-text-sub font-light leading-relaxed text-sm md:text-base">
            In the hustle of modern life, we believe coffee is more than just caffeine—it's a
            ritual, a pause, a moment of connection with oneself. FeiTime began with a simple
            desire: to bring the tranquility of a Japanese tea house to the world of specialty
            coffee.
          </p>
          <p class="text-text-sub font-light leading-relaxed text-sm md:text-base">
            We meticulously source beans that tell a story of their origin, roasting them to
            highlight their natural elegance rather than masking it.
          </p>

          <!-- 最新文章列表 -->
          <div class="flex flex-col gap-4 mt-4">
            <h4 class="text-sm font-medium uppercase tracking-widest text-text-main">
              Latest Journals
            </h4>
            <ul class="space-y-4">
              <li>
                <a
                  class="group flex items-center justify-between border-b border-mist pb-2 hover:border-sage transition-colors"
                  href="#"
                >
                  <span
                    class="text-sm font-light text-text-sub group-hover:text-text-main transition-colors"
                  >
                    The Art of Pour Over: A Beginner's Guide
                  </span>
                  <span
                    class="material-symbols-outlined text-sage text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  >
                    arrow_forward
                  </span>
                </a>
              </li>
              <li>
                <a
                  class="group flex items-center justify-between border-b border-mist pb-2 hover:border-sage transition-colors"
                  href="#"
                >
                  <span
                    class="text-sm font-light text-text-sub group-hover:text-text-main transition-colors"
                  >
                    Understanding Roast Profiles
                  </span>
                  <span
                    class="material-symbols-outlined text-sage text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  >
                    arrow_forward
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 閱讀完整故事按鈕 -->
          <a
            class="inline-flex items-center gap-2 text-sage text-xs tracking-[0.2em] uppercase font-medium mt-6 hover:text-secondary transition-colors"
            href="#"
          >
            Read Full Story
            <span class="material-symbols-outlined text-sm">arrow_right_alt</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';

  // ============================================
  // 1. 型別定義
  // ============================================
  interface Track {
    title: string;
  }

  interface Flavor {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
  }

  interface Product {
    id: number;
    name: string;
    price: number;
    flavor_type?: string;
    img?: {
      id: number;
      url: string;
    }[];
  }

  interface YouTubeVideo {
    videoId: string;
    title: string;
    channelTitle: string;
    thumbnail: string;
    embedUrl: string;
  }

  interface RecommendationResponse {
    success: boolean;
    flavor: string;
    recommendation: string;
    videos: YouTubeVideo[];
    message?: string;
  }

  // ============================================
  // 2. 推薦產品相關 - 狀態
  // ============================================
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  // 風味對照表
  const flavorMap: Record<string, string> = {
    Fruity: '果香清爽',
    Floral: '花香明亮',
    Nutty: '堅果巧克力',
    Bold: '濃郁厚實',
  };

  // 風味顏色對照表
  const flavorStyles: Record<string, string> = {
    Fruity: 'bg-orange-100 text-orange-700 border border-orange-200',
    Floral: 'bg-purple-100 text-purple-700 border border-purple-200',
    Nutty: 'bg-amber-100 text-amber-800 border border-amber-200',
    Bold: 'bg-stone-600 text-stone-200 border border-stone-300',
  };

  // ============================================
  // 3. 推薦產品相關 - 方法
  // ============================================
  const fetchProducts = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await fetch('/api/featured/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      products.value = data;

      console.log('✅ 成功載入精選產品:', products.value);
    } catch (err: any) {
      console.error('❌ 載入產品失敗:', err);
      error.value = '載入產品失敗，請稍後再試';
    } finally {
      loading.value = false;
    }
  };

  const getImageUrl = (product: Product): string => {
    if (product.img && product.img.length > 0 && product.img[0]?.url) {
      return product.img[0].url;
    }
    return 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400';
  };

  const getFlavorLabel = (flavorType: string): string => {
    return flavorMap[flavorType] || flavorType;
  };

  const getFlavorStyle = (flavorType: string): string => {
    return flavorStyles[flavorType] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  // ============================================
  // 4. 風味歌曲相關 - 狀態
  // ============================================
  const selectedFlavor = ref<Flavor | null>(null);

  // 音樂推薦狀態
  const currentVideos = ref<YouTubeVideo[]>([]);
  const currentVideoIndex = ref<number>(0);
  const musicLoading = ref<boolean>(false);
  const musicError = ref<string | null>(null);
  const aiRecommendation = ref<string>('選擇風味，開始音樂之旅');

  // 計算屬性
  const currentVideo = computed(() => {
    if (currentVideos.value.length === 0) return null;
    return currentVideos.value[currentVideoIndex.value];
  });

  const embedUrl = computed(() => {
    return currentVideo.value?.embedUrl || '';
  });

  const flavors = ref<Flavor[]>([
    {
      id: 'fruity',
      name: '果香',
      description: '明亮活潑',
      icon: 'nutrition',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAs5_eiBULKYULpv6uIa5YmjBvpy4GXwjEw_ZnQWzQJ3OK2SYZFpIQAML2Q3MApz1Cgj9DiU60i91ih_2jx8gqlpYQV7sk8jJX5lsq_wtFIF5QekdCNpxEw_M5ayWBGWd8GoME6z4rWZ07J5BnM7M_4ubH-P_e4M075-G2P-lReIoCsS9CuAagShZVZKSPD3HVSDyAGi0PgRZb0_fl1EGjyYEHRIpjo6pcI49CYM6dL0DMyA6SI2eeYyOJWkEDvLcw3ZZJY--j9kplC',
    },
    {
      id: 'floral',
      name: '花香',
      description: '優雅細緻',
      icon: 'local_florist',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuByQDN_KK0xVafJKgQ3pjv95oWg8wTfjwiA8c7zWpFvZwujBraPIxaL1B_4gjLbAfXwfKvZD1xLWf_CjJqPpTSVCcp7tcrrS9BXEtdB6Fom2stufzC9TR-9XUq7CgVhsLdWiMHNDaxH_FjA39QcO68qboOiM8yFta4fPnM9xS1AJ55uBr2r_nxyPfXmVNM_fCiO5pBtyyF35Lqouu41sOIW0pFv85lT0LG3eX4PJKeoWhq19XzTYEVzAJkgpF-gr9M1cW8reLWeDcUD',
    },
    {
      id: 'nutty',
      name: '堅果',
      description: '溫暖醇厚',
      icon: 'grain',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDjBmSF9hipLOW2XFeAglDRn-e8_r0rvnR5hdOyrdbHORbsiyRxY6CW-eAEFvcIPBLywdixvGvYhiCIrZtmz_BADv5aODFqu8x6al8oj4MzQS4QzzglVjzr24UXfYHOtZIuKgoWMzeMtnQ9qsL5cP5YCXPi6DIYvnNA7ECe9-Qf--Chq1iyz2Ii5E9ZSIIrw_amiYzC3wErLRc7n9q9FcQBE5udYr312CxoCiXWKotYhOH11AQ3mJ71Fv-Exckl3jqzOwQJ7TrKrOWl',
    },
    {
      id: 'chocolate',
      name: '巧克力',
      description: '濃郁深沉',
      icon: 'cake',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Uxgwhq-w3KtqGHgQsjam8og3F4G3jWee7zqGGj_hvA9EfnJTj6FO9VHomGAEMIBI1c__hZOuEDHNS_xkWIdsLqdsOjdjcLpUsfmwQ87c_euolvkMaMasBHqPvJAXS_6HK6-2kYPG9uTksDhSt8DcDxHx9ZkKyvBLgLhQApB1tY0PKBese6FdEmc7TWGkVsTkpf4Zv744h5CFEQhgWBgmoklztEecT4nhEI_FeA7STklAy6KKAT8lQhf5LIe0TanYz0hvCidBkb9l',
    },
  ]);

  // ============================================
  // 5. 風味歌曲相關 - 方法
  // ============================================

  /**
   * 選擇風味並取得音樂推薦
   */
  const selectFlavor = async (flavor: Flavor): Promise<void> => {
    selectedFlavor.value = flavor;
    console.log('🎵 Selected flavor:', flavor.name);

    try {
      musicLoading.value = true;
      musicError.value = null;

      console.log('🎵 Requesting music for flavor:', flavor.name);

      const response = await fetch('/api/music/flavor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flavorId: flavor.id,
          flavorName: flavor.name,
          description: flavor.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch music recommendations');
      }

      const data: RecommendationResponse = await response.json();
      console.log('✅ Received music response:', data);

      if (data.success && data.videos.length > 0) {
        currentVideos.value = data.videos;
        currentVideoIndex.value = 0;
        aiRecommendation.value = data.recommendation;
      } else {
        throw new Error(data.message || '暫時無法找到相關音樂');
      }
    } catch (err: any) {
      console.error('❌ Music recommendation error:', err);
      musicError.value = err.message || '無法取得推薦，請稍後再試';

      // 清空影片列表
      currentVideos.value = [];
      aiRecommendation.value = '選擇風味，開始音樂之旅';
    } finally {
      musicLoading.value = false;
    }
  };

  /**
   * 取得下一個推薦（Next 按鈕）
   */
  const nextRecommendation = async (): Promise<void> => {
    // 先切換到下一個影片（如果有的話）
    if (currentVideoIndex.value < currentVideos.value.length - 1) {
      currentVideoIndex.value++;
      console.log(
        `⏭️ Switching to next video (${currentVideoIndex.value + 1}/${currentVideos.value.length})`
      );
      return;
    }

    // 如果已經是最後一個，則向後端請求新的推薦
    if (!selectedFlavor.value) {
      console.warn('⚠️ No flavor selected');
      return;
    }

    try {
      musicLoading.value = true;
      musicError.value = null;

      console.log('🔄 Requesting random music for:', selectedFlavor.value.name);

      const response = await fetch('/api/music/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentFlavorName: selectedFlavor.value.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch random recommendations');
      }

      const data: RecommendationResponse = await response.json();
      console.log('✅ Received random music:', data);

      if (data.success && data.videos.length > 0) {
        currentVideos.value = data.videos;
        currentVideoIndex.value = 0;
        aiRecommendation.value = data.recommendation || aiRecommendation.value;
      } else {
        throw new Error(data.message || '暫時無法找到更多音樂');
      }
    } catch (err: any) {
      console.error('❌ Next recommendation error:', err);
      musicError.value = '無法取得更多推薦';
    } finally {
      musicLoading.value = false;
    }
  };

  // ============================================
  // 6. 生命週期
  // ============================================
  onMounted(() => {
    fetchProducts();
  });
</script>

<style scoped>
  .vinyl-grooves {
    background: repeating-radial-gradient(#1c1816, #1c1816 2px, #2a2624 3px, #2a2624 4px);
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
