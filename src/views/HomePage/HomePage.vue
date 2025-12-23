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

  <!-- Popular Products Section -->
  <section class="w-full py-24 bg-white dark:bg-background-dark">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <div class="flex flex-col items-center justify-center mb-16 text-center">
        <span class="text-sage tracking-[0.3em] text-xs uppercase mb-4 font-jp">
          FeiTime Selection
        </span>
        <h2 class="text-3xl font-serif text-text-main dark:text-white tracking-widest">熱門商品</h2>
        <div class="w-12 h-px bg-latte mt-6 mb-4"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Product 1 -->
        <div class="group flex flex-col cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
            <span
              class="absolute top-0 left-0 bg-sage text-white text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 z-20"
            >
              Popular
            </span>
            <div
              class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwuS6Bz97WmI0D322GqR_MVK5pGsW3BoSGHafZsWmJfRlk_NiQVv-LACkc45fsSXqLK_b5ak-YC38-C1FNvJLoY5ebng1DrrMV7FMhfv3L5bHUxJc8Vb9oeAtLKJO3cdiOCBdRMqarIdhhJ-V43pzfitfn-z5ZiSyI4KbSO0zVijSSm6fw-KwsP33yNEjwtxFLHO-Cf0qWvGCNaezQPXTAjS6oty900P8oqB0xCdC8OF8JwdKaVyqgFEeurb2HQrU-r3Tsn9Bieje2');
              "
            ></div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"
            ></div>
          </div>
          <div class="flex flex-col gap-1 items-center text-center">
            <h3
              class="text-base font-medium text-text-main dark:text-white tracking-wide group-hover:text-sage transition-colors font-serif"
            >
              Ethiopian Yirgacheffe
            </h3>
            <p class="text-xs text-text-sub dark:text-gray-400 tracking-wider uppercase">
              Floral &amp; Citrus
            </p>
            <span class="text-text-main font-normal mt-2">$22.00</span>
          </div>
        </div>
        <!-- Product 2 -->
        <div class="group flex flex-col cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
            <div
              class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAH8Go8s2qMjHoXOs4olaJwJY7LvbiqtzvnJSaOsaEpBvqkwMmMzux5F6hc-jHrbbPvnLwO3xl9SuxSxruPjU-ZJrcqzpnN6gAYeYysRf74KARJK_TI4UiAnldJsldEPhRr63NUIH2YWAQpEQlZs4HUAktA6OdaYWqFJJnMjeWP2y4JiwcDuAeGhLKPRyW_kXrNozArE1Jhvq_KUzZDgf0MkS3CSw4dMVLsLfIyy5WDuPg6mm5QMZk32C-RMKW4aTDfETUoMUir2s5U');
              "
            ></div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"
            ></div>
          </div>
          <div class="flex flex-col gap-1 items-center text-center">
            <h3
              class="text-base font-medium text-text-main dark:text-white tracking-wide group-hover:text-sage transition-colors font-serif"
            >
              Colombia Huila
            </h3>
            <p class="text-xs text-text-sub dark:text-gray-400 tracking-wider uppercase">
              Caramel &amp; Nutty
            </p>
            <span class="text-text-main font-normal mt-2">$19.50</span>
          </div>
        </div>
        <!-- Product 3 -->
        <div class="group flex flex-col cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
            <div
              class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx9MKuIwybtsi_IcZGC3qhNIK7qPWA8AoRnDYeWisb8gkjG6DuEBP55qDWJM3_9dyKsBFFkq4CXfqPP57aRymgjtTnknUqXDlezU94TdxQl2Ck1gyr0liRB2DvHQo674IWPtptPDYqt8kF_VAA9hQyYSFluvKjP9yd-4iJTc2zeSI6bFV6-G5ZPxxOTs_f-dhp-SKxHYpbf4VUzDjs9Y_I_pYCfDm2dWi_MI-fczAjIJ15xQ4vkRvR1VVdSW9QBu_FFZft0dt7vZy-');
              "
            ></div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"
            ></div>
          </div>
          <div class="flex flex-col gap-1 items-center text-center">
            <h3
              class="text-base font-medium text-text-main dark:text-white tracking-wide group-hover:text-sage transition-colors font-serif"
            >
              Espresso House Blend
            </h3>
            <p class="text-xs text-text-sub dark:text-gray-400 tracking-wider uppercase">
              Bold &amp; Smooth
            </p>
            <span class="text-text-main font-normal mt-2">$18.00</span>
          </div>
        </div>
        <!-- Product 4 -->
        <div class="group flex flex-col cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm">
            <span
              class="absolute top-0 right-0 bg-latte text-white text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 z-20"
            >
              New
            </span>
            <div
              class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL4NoC-i-w7LB2adlZxEuN_m0oDcpEpX9viXT_lmulE-Ee0-tvsINbmRNHAt1erG_o9rRacx7N4snMiVJFCPyfvvTkh_JrThH6zd_lgnkcnwT9Y4ELbNi2N-1CGw-BIC7oNnesylnsPBq6rY-e8dLviFhDGgDeFw-JGr4VUQ3f3-yobWmMbXHs953bYxqLjSrnI2kw6Zuuxx9truz0W5UtJufMtQ-msQmQmPvmdBTJRBEOLsrBZFEEkIaQhwtDEEQRdHtWyHLsvqAc');
              "
            ></div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"
            ></div>
          </div>
          <div class="flex flex-col gap-1 items-center text-center">
            <h3
              class="text-base font-medium text-text-main dark:text-white tracking-wide group-hover:text-sage transition-colors font-serif"
            >
              Decaf Night Roast
            </h3>
            <p class="text-xs text-text-sub dark:text-gray-400 tracking-wider uppercase">
              Rich &amp; Chocolaty
            </p>
            <span class="text-text-main font-normal mt-2">$19.00</span>
          </div>
        </div>
      </div>
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
  <!-- 心情選擇區 -->
  <section class="w-full py-24 bg-cream dark:bg-[#2a221b]">
    <div class="max-w-[1000px] mx-auto px-6 md:px-12 relative">
      <div
        class="bg-white dark:bg-background-dark/50 p-10 md:p-16 border border-sage/20 shadow-[0_8px_30px_rgb(162,175,155,0.12)] relative overflow-hidden"
      >
        <!-- 背景光暈裝飾 -->
        <div class="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <div
            class="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-sage/10 blur-[60px]"
          ></div>
          <div
            class="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-latte/20 blur-[50px]"
          ></div>
        </div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <!-- 左側文字區 -->
          <div class="w-full md:w-1/2 text-center md:text-left">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 border border-sage/20 mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
              <span class="text-[10px] uppercase tracking-[0.2em] text-sage font-medium">
                AI Mood Match
              </span>
            </div>
            <h2
              class="text-3xl md:text-4xl font-serif text-text-main dark:text-white tracking-widest leading-tight mb-6"
            >
              依照心情選擇
              <br />
              <span class="text-lg md:text-xl text-sage font-light italic mt-2 block font-serif">
                Curated by Atmosphere
              </span>
            </h2>
            <p class="text-text-sub font-light text-sm leading-loose mb-8">
              Don't know what to drink? Let our AI analyze your local weather, time of day, and
              current mood to recommend the perfect brew for this exact moment.
            </p>

            <div class="flex flex-col gap-3">
              <div
                class="flex items-center gap-4 text-xs text-text-sub/80 uppercase tracking-widest border-l-2 border-latte pl-4"
              >
                <span class="material-symbols-outlined text-lg text-sage">cloud_queue</span>
                <span>Taipei • Rainy • 22°C</span>
              </div>
              <div
                class="flex items-center gap-4 text-xs text-text-sub/80 uppercase tracking-widest border-l-2 border-latte pl-4"
              >
                <span class="material-symbols-outlined text-lg text-sage">schedule</span>
                <span>Afternoon • 14:30</span>
              </div>
            </div>
          </div>

          <!-- 右側心情選擇區 -->
          <div class="w-full md:w-1/2 flex flex-col items-center">
            <div class="relative w-full max-w-sm">
              <div
                class="bg-background-light dark:bg-white/5 border border-mist p-2 rounded-sm shadow-sm"
              >
                <div
                  class="border border-dashed border-sage/30 p-8 flex flex-col items-center gap-6 text-center bg-white dark:bg-transparent"
                >
                  <span class="material-symbols-outlined text-5xl text-sage/80 font-light">
                    sentiment_satisfied
                  </span>
                  <div class="space-y-2">
                    <h3
                      class="text-lg font-medium text-text-main dark:text-white tracking-wide font-jp"
                    >
                      How are you feeling?
                    </h3>
                    <p class="text-xs text-text-sub font-light">Select a keyword to start</p>
                  </div>

                  <!-- 心情按鈕列表 -->
                  <div class="grid grid-cols-2 gap-3 w-full">
                    <button
                      v-for="mood in moods"
                      :key="mood"
                      @click="selectMood(mood)"
                      :class="[
                        'py-3 px-2 border text-xs tracking-widest uppercase rounded-sm transition-all duration-300',
                        selectedMood === mood
                          ? 'bg-sage text-white border-sage'
                          : 'border-mist hover:border-sage hover:bg-sage hover:text-white',
                      ]"
                    >
                      {{ mood }}
                    </button>
                  </div>

                  <!-- 跳過按鈕 -->
                  <button
                    class="mt-4 text-xs text-sage border-b border-sage/50 pb-0.5 hover:text-dark-green transition-colors uppercase tracking-widest"
                  >
                    Skip to Full Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Coffee ID & Simulator Section -->
  <section class="w-full py-20 bg-background-light dark:bg-background-dark border-t border-mist/30">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <a
          class="group relative block h-80 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border-t-2 border-transparent hover:border-sage"
          href="#"
        >
          <div class="absolute top-6 left-6 z-10">
            <span class="material-symbols-outlined text-4xl text-sage mb-2 block">fingerprint</span>
            <h3
              class="text-xl font-medium tracking-widest text-text-main uppercase font-jp group-hover:text-sage transition-colors"
            >
              Coffee ID
            </h3>
            <p class="text-sm text-text-sub mt-2 max-w-[200px] font-light">
              Find your unique taste profile through our specialized quiz.
            </p>
          </div>
          <div class="absolute bottom-6 right-6 z-10">
            <span
              class="text-xs tracking-widest uppercase text-sage border-b border-sage/50 pb-0.5 group-hover:border-sage transition-all"
            >
              Start Quiz
            </span>
          </div>
          <div
            class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity duration-500"
          ></div>
        </a>

        <a
          class="group relative block h-80 overflow-hidden bg-sage/5 hover:bg-sage/10 transition-all duration-300 border-t-2 border-transparent hover:border-sage"
          href="#"
        >
          <div class="absolute top-6 left-6 z-10">
            <span class="material-symbols-outlined text-4xl text-sage mb-2 block">tune</span>
            <h3
              class="text-xl font-medium tracking-widest text-text-main uppercase font-jp group-hover:text-sage transition-colors"
            >
              沖煮模擬器
            </h3>
            <p class="text-sm text-text-sub mt-2 max-w-[200px] font-light">
              Interactive guide to perfect your daily brew ratios.
            </p>
          </div>
          <div class="absolute bottom-6 right-6 z-10">
            <span
              class="text-xs tracking-widest uppercase text-sage border-b border-sage/50 pb-0.5 group-hover:border-sage transition-all"
            >
              Try Simulator
            </span>
          </div>
          <div
            class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544652433-5c264c767425?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity duration-500 grayscale"
          ></div>
        </a>

        <a
          class="group relative block h-80 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border-t-2 border-transparent hover:border-sage"
          href="#"
        >
          <div class="absolute top-6 left-6 z-10">
            <span class="material-symbols-outlined text-4xl text-sage mb-2 block">public</span>
            <h3
              class="text-xl font-medium tracking-widest text-text-main uppercase font-jp group-hover:text-sage transition-colors"
            >
              產地地圖介紹
            </h3>
            <p class="text-sm text-text-sub mt-2 max-w-[200px] font-light">
              Explore the journey of our beans from farm to cup.
            </p>
          </div>
          <div class="absolute bottom-6 right-6 z-10">
            <span
              class="text-xs tracking-widest uppercase text-sage border-b border-sage/50 pb-0.5 group-hover:border-sage transition-all"
            >
              Explore Map
            </span>
          </div>
          <div
            class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524673450801-b586142c943b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity duration-500"
          ></div>
        </a>
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

<script setup>
  import { ref } from 'vue';

  // 可選心情列表
  const moods = ['Relaxed', 'Focused', 'Adventurous', 'Tired'];

  // 當前選擇的心情
  const selectedMood = ref(null);

  // 選擇心情函數
  const selectMood = (mood) => {
    selectedMood.value = mood;
  };
</script>

<style scoped>
  /* 你可以保留原本的 TailwindCSS class，不需要額外 CSS */
</style>
