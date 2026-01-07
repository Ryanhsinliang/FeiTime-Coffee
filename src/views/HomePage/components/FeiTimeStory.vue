<script setup lang="ts">
  import { ref } from 'vue';

  // 按鈕 hover 狀態
  const isBrewingHovered = ref(false);
  const isQuizHovered = ref(false);
</script>

<template>
  <section class="feitime-story-section relative w-full py-24 overflow-hidden bg-[#FFFEFB]">
    <!-- 背景能量線 SVG -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <svg
        class="w-full h-[400px]"
        viewBox="0 0 1920 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- 流動高光漸層 - 更短更集中 -->
          <linearGradient
            id="flowing-highlight"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" style="stop-color: #dccfc0; stop-opacity: 0">
              <animate
                attributeName="offset"
                values="-0.15; 1.15"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="5%" style="stop-color: #f5e6d3; stop-opacity: 0.9">
              <animate
                attributeName="offset"
                values="-0.1; 1.2"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="10%" style="stop-color: #fffef5; stop-opacity: 1">
              <animate
                attributeName="offset"
                values="-0.05; 1.25"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="15%" style="stop-color: #f5e6d3; stop-opacity: 0.9">
              <animate attributeName="offset" values="0; 1.3" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="20%" style="stop-color: #dccfc0; stop-opacity: 0">
              <animate
                attributeName="offset"
                values="0.05; 1.35"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <!-- 背景線（固定） -->
        <g
          stroke="#A2AF9B"
          stroke-width="6"
          opacity="0.3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M 0 200 L 250 200 L 270 140 L 290 260 L 310 200 L 520 200" />
          <path d="M 1400 200 L 1610 200 L 1630 180 L 1650 220 L 1670 200 L 1920 200" />
        </g>

        <!-- 高光流動線 -->
        <g
          stroke="url(#flowing-highlight)"
          stroke-width="6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- 左側心電圖 -->
          <path
            class="flow-active flow-left"
            d="M 0 200 L 250 200 L 270 140 L 290 260 L 310 200 L 520 200"
          />

          <!-- 右側心電圖 -->
          <path
            class="flow-active flow-right"
            d="M 1400 200 L 1610 200 L 1630 180 L 1650 220 L 1670 200 L 1920 200"
          />
        </g>
      </svg>
    </div>

    <!-- 卡片內容 -->
    <div class="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
      <div
        class="card-container relative rounded-2xl p-8 md:p-16 border border-white/60 shadow-xl shadow-sage/10 overflow-hidden"
        style="
          background: linear-gradient(
            135deg,
            rgba(255, 250, 230, 0.7) 0%,
            rgba(245, 230, 211, 0.75) 25%,
            rgba(255, 248, 220, 0.65) 50%,
            rgba(250, 240, 215, 0.75) 75%,
            rgba(255, 250, 230, 0.7) 100%
          );
          backdrop-filter: blur(20px);
        "
      >
        <!-- 卡片邊框流動效果 SVG -->
        <svg
          class="card-border-flow-svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- 柔和發光濾鏡 -->
            <filter id="border-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- 背景固定邊框 -->
          <rect
            x="1"
            y="1"
            width="1198"
            height="798"
            fill="none"
            stroke="#A2AF9B"
            stroke-width="2"
            opacity="0.3"
            vector-effect="non-scaling-stroke"
          />

          <!-- 上路徑：左中→左上→上邊→右上→右中 -->
          <!-- 左中到左上（垂直向上） -->
          <line
            class="card-path-upper card-path-left-up"
            x1="0"
            y1="400"
            x2="0"
            y2="0"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            pathLength="100"
          />

          <!-- 上邊（水平向右） -->
          <line
            class="card-path-upper card-path-top"
            x1="0"
            y1="0"
            x2="1200"
            y2="0"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            pathLength="100"
          />

          <!-- 右上到右中（垂直向下） -->
          <line
            class="card-path-upper card-path-right-down"
            x1="1200"
            y1="0"
            x2="1200"
            y2="400"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            pathLength="100"
          />

          <!-- 下路徑：左中→左下→下邊→右下→右中 -->
          <!-- 左中到左下（垂直向下） -->
          <line
            class="card-path-lower card-path-left-down"
            x1="0"
            y1="400"
            x2="0"
            y2="800"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            pathLength="100"
          />

          <!-- 下邊（水平向右） -->
          <line
            class="card-path-lower card-path-bottom"
            x1="0"
            y1="800"
            x2="1200"
            y2="800"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
          />

          <!-- 右下到右中（垂直向上） -->
          <line
            class="card-path-lower card-path-right-up"
            x1="1200"
            y1="800"
            x2="1200"
            y2="400"
            stroke="#D4A574"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
          />
        </svg>

        <!-- 卡片玻璃高光層 -->
        <div
          class="absolute inset-0 pointer-events-none rounded-2xl"
          style="
            background: linear-gradient(
              to bottom right,
              rgba(255, 255, 255, 0.25),
              rgba(255, 255, 255, 0.05) 70%,
              transparent
            );
          "
        ></div>

        <div class="flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div class="w-full md:w-1/2">
            <div class="relative w-full aspect-[4/5] overflow-hidden rounded-lg group">
              <div
                class="absolute inset-0 bg-cover bg-center grayscale-[10%] transition-transform duration-700 group-hover:scale-105"
                :style="{
                  backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')`,
                }"
              ></div>
              <div class="absolute inset-4 border border-white/20 pointer-events-none"></div>
            </div>
          </div>

          <div class="w-full md:w-1/2 flex flex-col gap-8">
            <div class="space-y-4">
              <span class="text-[#6B7F6E] tracking-[0.3em] uppercase text-xs font-bold">
                FeiTime 故事
              </span>
              <h2 class="text-4xl md:text-5xl font-serif text-[#4A3728] leading-tight">
                靜謐時光，
                <br />
                用心釀造咖啡體驗
              </h2>
            </div>

            <div class="w-16 h-1 bg-[#DCCFC0]"></div>

            <p class="text-gray-600 font-light leading-relaxed text-base">
              踏上專屬您的咖啡旅程，透過互動體驗深入了解手沖咖啡的迷人世界。
              無論是模擬沖煮過程，還是探索個人風味偏好，FeiTime 為您打造全新的客製化咖啡體驗。
            </p>

            <!-- 液態氣泡按鈕區 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <!-- 咖啡沖煮模擬器 - 液態氣泡 -->
              <router-link
                to="/coffeeLabT1-T"
                class="bubble-button-container group"
                @mouseenter="isBrewingHovered = true"
                @mouseleave="isBrewingHovered = false"
              >
                <div class="bubble-wrapper">
                  <svg viewBox="0 0 200 200" class="bubble-svg" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="liquid-brewing" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #8b6f4b; stop-opacity: 0.9" />
                        <stop offset="100%" style="stop-color: #4a3728; stop-opacity: 0.95" />
                      </linearGradient>
                      <radialGradient id="bubble-shine-brewing">
                        <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 0.5" />
                        <stop offset="50%" style="stop-color: #ffffff; stop-opacity: 0.25" />
                        <stop offset="100%" style="stop-color: #ffffff; stop-opacity: 0" />
                      </radialGradient>
                      <clipPath id="bubble-clip-brewing">
                        <circle cx="100" cy="100" r="82" />
                      </clipPath>
                    </defs>

                    <!-- 氣泡外框 -->
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="rgba(255, 255, 255, 0.15)"
                      stroke="#B8A07E"
                      stroke-width="3"
                      opacity="0.7"
                      class="bubble-outline"
                    />

                    <!-- 液體層 -->
                    <g clip-path="url(#bubble-clip-brewing)">
                      <rect
                        x="18"
                        y="140"
                        width="164"
                        height="60"
                        fill="url(#liquid-brewing)"
                        class="liquid-fill"
                        :class="{ 'liquid-active': isBrewingHovered }"
                      />
                      <path
                        d="M 18 140 Q 40 137, 60 140 T 100 140 T 140 140 T 182 140"
                        fill="url(#liquid-brewing)"
                        class="liquid-wave-top"
                        :class="{ 'wave-active': isBrewingHovered }"
                      />
                      <ellipse
                        cx="100"
                        cy="140"
                        rx="75"
                        ry="8"
                        fill="#B8A07E"
                        opacity="0.3"
                        class="liquid-surface"
                      />
                    </g>

                    <!-- 圖標 - Material Symbol -->
                    <foreignObject x="30" y="20" width="140" height="140">
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          width: 100%;
                          height: 100%;
                        "
                      >
                        <span
                          class="material-symbols-outlined icon-brewing"
                          :style="{
                            fontSize: '72px',
                            color: isBrewingHovered ? '#8B6F4B' : '#D4C5B0',
                            opacity: isBrewingHovered ? '1' : '0.5',
                            transition: 'all 0.5s ease',
                          }"
                        >
                          coffee_maker
                        </span>
                      </div>
                    </foreignObject>

                    <!-- 高光 -->
                    <circle
                      cx="60"
                      cy="60"
                      r="35"
                      fill="url(#bubble-shine-brewing)"
                      class="bubble-highlight"
                    />

                    <!-- 小氣泡 -->
                    <g v-if="isBrewingHovered" class="rising-bubbles">
                      <circle
                        cx="70"
                        cy="160"
                        r="3"
                        fill="#B8A07E"
                        opacity="0.7"
                        class="bubble-rise-1"
                      />
                      <circle
                        cx="100"
                        cy="165"
                        r="2.5"
                        fill="#B8A07E"
                        opacity="0.6"
                        class="bubble-rise-2"
                      />
                      <circle
                        cx="130"
                        cy="158"
                        r="3.5"
                        fill="#B8A07E"
                        opacity="0.7"
                        class="bubble-rise-3"
                      />
                    </g>
                  </svg>
                </div>
                <h3 class="text-[#8B6F4B] font-bold text-center mt-3">咖啡沖煮模擬器</h3>
              </router-link>

              <!-- 咖啡小測驗 - 液態氣泡 -->
              <router-link
                to="/coffee-id-test"
                class="bubble-button-container group"
                @mouseenter="isQuizHovered = true"
                @mouseleave="isQuizHovered = false"
              >
                <div class="bubble-wrapper">
                  <svg viewBox="0 0 200 200" class="bubble-svg" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="liquid-quiz" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #a8c5a3; stop-opacity: 0.85" />
                        <stop offset="100%" style="stop-color: #8faf8a; stop-opacity: 0.9" />
                      </linearGradient>
                      <radialGradient id="bubble-shine-quiz">
                        <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 0.5" />
                        <stop offset="50%" style="stop-color: #ffffff; stop-opacity: 0.25" />
                        <stop offset="100%" style="stop-color: #ffffff; stop-opacity: 0" />
                      </radialGradient>
                      <clipPath id="bubble-clip-quiz">
                        <circle cx="100" cy="100" r="82" />
                      </clipPath>
                    </defs>

                    <!-- 氣泡外框 -->
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="rgba(255, 255, 255, 0.15)"
                      stroke="#A8C5A3"
                      stroke-width="3"
                      opacity="0.7"
                      class="bubble-outline"
                    />

                    <!-- 液體層 -->
                    <g clip-path="url(#bubble-clip-quiz)">
                      <rect
                        x="18"
                        y="145"
                        width="164"
                        height="55"
                        fill="url(#liquid-quiz)"
                        class="liquid-fill"
                        :class="{ 'liquid-active': isQuizHovered }"
                      />
                      <path
                        d="M 18 145 Q 40 142, 60 145 T 100 145 T 140 145 T 182 145"
                        fill="url(#liquid-quiz)"
                        class="liquid-wave-top"
                        :class="{ 'wave-active': isQuizHovered }"
                      />
                      <ellipse
                        cx="100"
                        cy="145"
                        rx="75"
                        ry="8"
                        fill="#B8D4B3"
                        opacity="0.3"
                        class="liquid-surface"
                      />
                    </g>

                    <!-- 圖標 - Material Symbol -->
                    <foreignObject x="30" y="20" width="140" height="140">
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          width: 100%;
                          height: 100%;
                        "
                      >
                        <span
                          class="material-symbols-outlined icon-quiz"
                          :style="{
                            fontSize: '72px',
                            color: isQuizHovered ? '#7A9F75' : '#B8D4B3',
                            opacity: isQuizHovered ? '1' : '0.5',
                            transition: 'all 0.5s ease',
                          }"
                        >
                          psychology_alt
                        </span>
                      </div>
                    </foreignObject>

                    <!-- 高光 -->
                    <circle
                      cx="60"
                      cy="60"
                      r="35"
                      fill="url(#bubble-shine-quiz)"
                      class="bubble-highlight"
                    />

                    <!-- 小氣泡 -->
                    <g v-if="isQuizHovered" class="rising-bubbles">
                      <circle
                        cx="65"
                        cy="165"
                        r="3"
                        fill="#B8D4B3"
                        opacity="0.7"
                        class="bubble-rise-1"
                      />
                      <circle
                        cx="100"
                        cy="168"
                        r="2.5"
                        fill="#B8D4B3"
                        opacity="0.6"
                        class="bubble-rise-2"
                      />
                      <circle
                        cx="135"
                        cy="162"
                        r="3.5"
                        fill="#B8D4B3"
                        opacity="0.7"
                        class="bubble-rise-3"
                      />
                    </g>
                  </svg>
                </div>
                <h3 class="text-[#7A9F75] font-bold text-center mt-3">咖啡小測驗</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* ============================================
     心電圖流動動畫 - 完整時間軸（18秒循環）

     時間軸設計：
     0-3秒：左側心電圖高光流動
     3-5秒：卡片左側邊框（左中→左上/左下）垂直段，上下同時
     5-8秒：卡片上下邊框（左→右）水平段，上下同時
     8-10秒：卡片右側邊框（右上/右下→右中）垂直段，上下同時
     10-12秒：右側心電圖高光流動
     12-18秒：暫停等待
     ============================================ */
  .flow-active {
    /* 高光長度設定 */
    stroke-dasharray: 520 0;
    animation: energy-move 3s linear forwards;
    animation-play-state: paused;
    animation-delay: 0s;
  }

  @keyframes energy-move {
    from {
      stroke-dashoffset: 520;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  /* 左側心電圖：0-3秒 */
  .flow-left {
    animation-name: energy-move-left;
    animation-duration: 18s;
    animation-iteration-count: infinite;
  }

  @keyframes energy-move-left {
    0% {
      stroke-dasharray: 520 0;
      stroke-dashoffset: 520;
      opacity: 1;
    }
    16.67% {
      stroke-dasharray: 520 0;
      stroke-dashoffset: 0;
      opacity: 1;
    }
    16.68% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  /* 右側心電圖：10-12秒 */
  .flow-right {
    animation-name: energy-move-right;
    animation-duration: 18s;
    animation-iteration-count: infinite;
  }

  @keyframes energy-move-right {
    0% {
      stroke-dasharray: 520 0;
      stroke-dashoffset: 520;
      opacity: 0;
    }
    55.54% {
      /* 10秒 */
      opacity: 0;
    }
    55.55% {
      stroke-dasharray: 520 0;
      stroke-dashoffset: 520;
      opacity: 1;
    }
    66.67% {
      /* 12秒 */
      stroke-dasharray: 520 0;
      stroke-dashoffset: 0;
      opacity: 1;
    }
    66.68% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  /* ============================================
     卡片邊框流動動畫 - 上下雙路徑系統

     路徑流向：
     上路徑：左中(0,400) → 左上(0,0) → 右上(1200,0) → 右中(1200,400)
     下路徑：左中(0,400) → 左下(0,800) → 右下(1200,800) → 右中(1200,400)

     時間軸：
     0-3秒：左側心電圖
     3-5秒：左中到轉角（左上/左下）- 垂直段
     5-8秒：轉角到轉角（上邊/下邊）- 水平段
     8-10秒：轉角到右中（右上/右下到右中）- 垂直段
     10-12秒：右側心電圖
     12-18秒：暫停
     ============================================ */
  .card-border-flow-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  /* ========== 上路徑動畫 ========== */

  /* 左中到左上 (3-5秒，垂直向上) */
  .card-path-left-up {
    stroke-dasharray: 30 200;
    stroke-dashoffset: 30;
    opacity: 0;
    animation: pathLeftUp 18s linear infinite;
  }

  @keyframes pathLeftUp {
    0% {
      stroke-dashoffset: 30;
      opacity: 0;
    }
    16.66% {
      /* 3秒 */
      stroke-dashoffset: 30;
      opacity: 0;
    }
    16.67% {
      stroke-dashoffset: 30;
      opacity: 1;
    }
    27.77% {
      /* 5秒 */
      stroke-dashoffset: -70;
      opacity: 1;
    }
    27.78% {
      opacity: 0;
      stroke-dashoffset: -70;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 30;
    }
  }

  /* 上邊 (5-8秒，水平向右) */
  .card-path-top {
    stroke-dasharray: 300 1200;
    stroke-dashoffset: 1500;
    opacity: 0;
    animation: pathTop 18s linear infinite;
  }

  @keyframes pathTop {
    0% {
      stroke-dashoffset: 1500;
      opacity: 0;
    }
    27.76% {
      /* 5秒 */
      stroke-dashoffset: 1500;
      opacity: 0;
    }
    27.77% {
      stroke-dashoffset: 1500;
      opacity: 1;
    }
    44.44% {
      /* 8秒 */
      stroke-dashoffset: 0;
      opacity: 1;
    }
    44.45% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 1500;
    }
  }

  /* 右上到右中 (8-10秒，垂直向下) */
  .card-path-right-down {
    stroke-dasharray: 120 400;
    stroke-dashoffset: 520;
    opacity: 0;
    animation: pathRightDown 18s linear infinite;
  }

  @keyframes pathRightDown {
    0% {
      stroke-dashoffset: 520;
      opacity: 0;
    }
    44.43% {
      /* 8秒 */
      stroke-dashoffset: 520;
      opacity: 0;
    }
    44.44% {
      stroke-dashoffset: 520;
      opacity: 1;
    }
    55.55% {
      /* 10秒 */
      stroke-dashoffset: 0;
      opacity: 1;
    }
    55.56% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 520;
    }
  }

  /* ========== 下路徑動畫 ========== */

  /* 左中到左下 (3-5秒，垂直向下) */
  .card-path-left-down {
    stroke-dasharray: 30 200;
    stroke-dashoffset: 30;
    opacity: 0;
    animation: pathLeftDown 18s linear infinite;
  }

  @keyframes pathLeftDown {
    0% {
      stroke-dashoffset: 30;
      opacity: 0;
    }
    16.66% {
      /* 3秒 */
      stroke-dashoffset: 30;
      opacity: 0;
    }
    16.67% {
      stroke-dashoffset: 30;
      opacity: 1;
    }
    27.77% {
      /* 5秒 */
      stroke-dashoffset: -70;
      opacity: 1;
    }
    27.78% {
      opacity: 0;
      stroke-dashoffset: -70;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 30;
    }
  }

  /* 下邊 (5-8秒，水平向右) */
  .card-path-bottom {
    stroke-dasharray: 300 1200;
    stroke-dashoffset: 1500;
    opacity: 0;
    animation: pathBottom 18s linear infinite;
  }

  @keyframes pathBottom {
    0% {
      stroke-dashoffset: 1500;
      opacity: 0;
    }
    27.76% {
      /* 5秒 */
      stroke-dashoffset: 1500;
      opacity: 0;
    }
    27.77% {
      stroke-dashoffset: 1500;
      opacity: 1;
    }
    44.44% {
      /* 8秒 */
      stroke-dashoffset: 0;
      opacity: 1;
    }
    44.45% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 1500;
    }
  }

  /* 右下到右中 (8-10秒，垂直向上) */
  .card-path-right-up {
    stroke-dasharray: 120 400;
    stroke-dashoffset: 520;
    opacity: 0;
    animation: pathRightUp 18s linear infinite;
  }

  @keyframes pathRightUp {
    0% {
      stroke-dashoffset: 520;
      opacity: 0;
    }
    44.43% {
      /* 8秒 */
      stroke-dashoffset: 520;
      opacity: 0;
    }
    44.44% {
      stroke-dashoffset: 520;
      opacity: 1;
    }
    55.55% {
      /* 10秒 */
      stroke-dashoffset: 0;
      opacity: 1;
    }
    55.56% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0;
      stroke-dashoffset: 520;
    }
  }

  /* ============================================
     液態氣泡按鈕樣式
     ============================================ */
  .bubble-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  .bubble-button-container:hover {
    background: rgba(107, 127, 110, 0.05);
  }

  .bubble-wrapper {
    width: 140px;
    height: 140px;
    transition: transform 0.3s ease;
  }

  .bubble-button-container:hover .bubble-wrapper {
    transform: translateY(-5px);
  }

  .bubble-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 8px 16px rgba(162, 175, 155, 0.15));
    animation: bubbleFloat 4s ease-in-out infinite;
  }

  @keyframes bubbleFloat {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-8px) scale(1.02);
    }
  }

  /* 氣泡外框 */
  .bubble-outline {
    transition: all 0.3s ease;
  }

  .bubble-button-container:hover .bubble-outline {
    stroke-width: 4;
    opacity: 0.9;
  }

  /* 液體波動 */
  .liquid-fill {
    transition: all 0.5s ease;
    transform-origin: center bottom;
  }

  .liquid-fill.liquid-active {
    animation: liquidPulse 1.5s ease-in-out infinite;
  }

  @keyframes liquidPulse {
    0%,
    100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1.05);
    }
  }

  .liquid-wave-top {
    transition: all 0.3s ease;
  }

  .liquid-wave-top.wave-active {
    animation: waveTopMove 1.2s ease-in-out infinite;
  }

  @keyframes waveTopMove {
    0%,
    100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-2px);
    }
    75% {
      transform: translateY(2px);
    }
  }

  /* 液面光澤 */
  .liquid-surface {
    animation: liquidShimmer 3s ease-in-out infinite;
  }

  @keyframes liquidShimmer {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* 氣泡高光 */
  .bubble-highlight {
    animation: highlightMove 6s ease-in-out infinite;
  }

  @keyframes highlightMove {
    0%,
    100% {
      transform: translate(0, 0);
      opacity: 0.6;
    }
    50% {
      transform: translate(10px, 5px);
      opacity: 0.8;
    }
  }

  /* 小氣泡上升 */
  .bubble-rise-1 {
    animation: bubbleRise 2s ease-in-out infinite;
  }

  .bubble-rise-2 {
    animation: bubbleRise 2.3s ease-in-out infinite;
    animation-delay: 0.3s;
  }

  .bubble-rise-3 {
    animation: bubbleRise 1.8s ease-in-out infinite;
    animation-delay: 0.6s;
  }

  @keyframes bubbleRise {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-50px);
      opacity: 0;
    }
  }

  /* ============================================
     其他樣式
     ============================================ */
  .font-serif {
    font-family: 'Noto Serif TC', serif;
  }

  /* 卡片容器 */
  .card-container {
    position: relative;
  }
</style>
