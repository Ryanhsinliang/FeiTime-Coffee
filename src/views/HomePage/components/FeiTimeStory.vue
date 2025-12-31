<script setup lang="ts">
  import { ref } from 'vue';

  const isBrewingHovered = ref(false);
  const isQuizHovered = ref(false);
</script>

<template>
  <section class="feitime-story-section">
    <div class="max-w-[1200px] mx-auto px-6 md:px-12">
      <!-- 立體玻璃卡片 -->
      <div class="glass-card-3d">
        <div class="flex flex-col md:flex-row gap-16 items-center">
          <!-- 左側圖片 -->
          <div class="w-full md:w-1/2">
            <div class="relative w-full aspect-[4/5] bg-mist overflow-hidden rounded-sm">
              <div
                class="absolute inset-0 bg-cover bg-center grayscale-[20%] transition-transform duration-700 hover:scale-105"
                :style="{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSZT1BaAbZzl3rsjfSWyDnDIcbBqbxNlreb9h9o56h__stP18vLJ8-W3BwH8vSzQ-R5Efe9JfhnecFrwMArBLqbw-gwTMw33uQ_19qti3axO6wrVRaSJozFAVoZ0kiHaeXW_0r2-aA_HBAAvn337dcOA6U4IM8qXSBI6Uz0TXa-m5NjEszpc0C6eOj2Kt4gMKNjUeadUGts3ks1QlYlfEHok_RmnYrwGL425HMjF2vPQ19c7tfEC4iR6edG3PPtyB0vZVvimyJFRAL')`,
                }"
              ></div>
              <div class="absolute inset-4 border border-white/30"></div>
            </div>
          </div>

          <!-- 右側文字標題 -->
          <div class="w-full md:w-1/2 flex flex-col gap-8">
            <!-- 標題區 -->
            <div class="flex flex-col gap-4">
              <span class="text-sage tracking-[0.2em] uppercase text-xs font-jp">FeiTime 故事</span>
              <h2 class="text-4xl font-notoserif text-text-main leading-tight">
                靜謐時光，
                <br />
                用心釀造咖啡體驗
              </h2>
            </div>

            <div class="w-16 h-px bg-latte"></div>

            <!-- 中文段落（文案）-->
            <p class="text-text-sub font-light leading-relaxed text-sm md:text-base">
              我們走遍咖啡產地，細心挑選每一顆豆子，帶回原始的風味。回到工作室，親手烘焙、調整火候，只為保留它最自然的香氣。FeiTime
              的咖啡，是我們對每一段時光的用心詮釋。
            </p>

            <!-- 互動體驗區 -->
            <div class="flex flex-col md:flex-row gap-12 mt-6">
              <!-- 咖啡沖煮模擬器按鈕 -->
              <router-link
                to="/coffeeLabT1-T-P1"
                class="flex-1 relative group"
                @mouseenter="isBrewingHovered = true"
                @mouseleave="isBrewingHovered = false"
              >
                <div class="relative px-4 py-6 overflow-hidden transition-all duration-300">
                  <!-- SVG 手沖咖啡動畫 -->
                  <div class="relative z-10 flex items-center justify-center mb-4">
                    <svg
                      viewBox="0 0 200 200"
                      class="w-32 h-32 md:w-36 md:h-36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        class="transition-transform duration-500"
                        :class="{ '-translate-y-1': isBrewingHovered }"
                      >
                        <path
                          d="M 80 40 L 70 60 L 130 60 L 120 40 Z"
                          fill="#6B7F6E"
                          class="transition-colors group-hover:fill-sage"
                        />
                        <ellipse cx="100" cy="40" rx="22" ry="6" fill="#556B58" />
                        <path
                          d="M 130 45 Q 145 50 145 60 Q 145 68 135 68"
                          stroke="#6B7F6E"
                          stroke-width="4"
                          fill="none"
                          stroke-linecap="round"
                          class="transition-colors group-hover:stroke-sage"
                        />
                        <path
                          d="M 70 52 L 50 58"
                          stroke="#6B7F6E"
                          stroke-width="5"
                          stroke-linecap="round"
                          class="transition-colors group-hover:stroke-sage"
                        />
                      </g>
                      <g v-if="isBrewingHovered">
                        <path
                          d="M 50 58 Q 48 75 50 90"
                          stroke="#B8A07E"
                          stroke-width="2"
                          fill="none"
                          opacity="0.8"
                          class="animate-water-flow"
                        />
                        <circle
                          cx="50"
                          cy="60"
                          r="1.5"
                          fill="#B8A07E"
                          opacity="0.6"
                          class="animate-water-drop"
                        />
                        <circle
                          cx="49"
                          cy="70"
                          r="1.5"
                          fill="#B8A07E"
                          opacity="0.5"
                          class="animate-water-drop-delay-1"
                        />
                        <circle
                          cx="50"
                          cy="80"
                          r="1.5"
                          fill="#B8A07E"
                          opacity="0.4"
                          class="animate-water-drop-delay-2"
                        />
                      </g>
                      <g
                        class="transition-transform duration-300"
                        :class="{ 'translate-y-0.5': isBrewingHovered }"
                      >
                        <path
                          d="M 30 95 L 40 125 L 60 125 L 70 95 Z"
                          fill="none"
                          stroke="#8B9A8E"
                          stroke-width="2"
                          class="transition-colors group-hover:stroke-sage/80"
                        />
                        <path
                          d="M 32 97 L 41 123 L 59 123 L 68 97 Z"
                          fill="#F5F1ED"
                          opacity="0.9"
                        />
                        <ellipse cx="50" cy="100" rx="16" ry="4" fill="#4A3728" opacity="0.8" />
                        <ellipse
                          cx="50"
                          cy="120"
                          rx="9"
                          ry="2"
                          fill="#4A3728"
                          opacity="0.6"
                          class="transition-all duration-500"
                          :class="{ '-translate-y-3 opacity-80': isBrewingHovered }"
                        />
                      </g>
                      <g>
                        <path
                          d="M 35 130 L 40 160 L 60 160 L 65 130 Z"
                          fill="#E8DED2"
                          stroke="#8B9A8E"
                          stroke-width="2"
                        />
                        <path
                          d="M 41 145 L 43 158 L 57 158 L 59 145 Z"
                          fill="#4A3728"
                          opacity="0.7"
                        />
                        <path
                          d="M 65 140 Q 75 145 75 150 Q 75 155 68 155"
                          stroke="#8B9A8E"
                          stroke-width="2.5"
                          fill="none"
                          stroke-linecap="round"
                        />
                      </g>
                      <g v-if="isBrewingHovered" opacity="0.4">
                        <path
                          d="M 45 155 Q 43 145 45 135"
                          stroke="#B8A07E"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                          class="animate-steam"
                        />
                        <path
                          d="M 50 157 Q 52 147 50 137"
                          stroke="#B8A07E"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                          class="animate-steam-delay-1"
                        />
                        <path
                          d="M 55 155 Q 57 145 55 135"
                          stroke="#B8A07E"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                          class="animate-steam-delay-2"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="relative z-10 text-center">
                    <div
                      class="text-sage font-medium text-base mb-1 transition-all duration-300 group-hover:scale-105"
                    >
                      咖啡沖煮模擬器
                    </div>
                    <div
                      class="text-xs text-text-sub font-light transition-opacity duration-300 group-hover:opacity-80"
                    >
                      搭配你的咖啡豆，生成專屬沖煮配方
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- 咖啡小測驗按鈕 -->
              <router-link
                to="/coffee-id-test"
                class="flex-1 relative group"
                @mouseenter="isQuizHovered = true"
                @mouseleave="isQuizHovered = false"
              >
                <div class="relative px-4 py-6 overflow-hidden transition-all duration-300">
                  <div class="relative z-10 flex items-center justify-center mb-4">
                    <svg
                      viewBox="0 0 200 200"
                      class="w-32 h-32 md:w-36 md:h-36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <ellipse cx="100" cy="130" rx="35" ry="8" fill="#4A3728" opacity="0.2" />
                        <path
                          d="M 70 100 L 75 135 L 125 135 L 130 100 Z"
                          fill="#E8DED2"
                          stroke="#B8A07E"
                          stroke-width="2.5"
                        />
                        <path
                          d="M 77 115 L 80 133 L 120 133 L 123 115 Z"
                          fill="#4A3728"
                          opacity="0.6"
                        />
                        <path
                          d="M 130 110 Q 145 115 145 125 Q 145 135 133 135"
                          stroke="#B8A07E"
                          stroke-width="3"
                          fill="none"
                          stroke-linecap="round"
                        />
                      </g>
                      <g
                        class="transition-all duration-500"
                        :class="{
                          'opacity-100 translate-y-0': isQuizHovered,
                          'opacity-0 -translate-y-4': !isQuizHovered,
                        }"
                      >
                        <path d="M 75 60 L 70 45 L 80 55 Z" fill="#B8A07E" />
                        <path d="M 125 60 L 130 45 L 120 55 Z" fill="#B8A07E" />
                        <circle cx="100" cy="75" r="22" fill="#B8A07E" />
                        <ellipse cx="92" cy="72" rx="3" ry="5" fill="#4A3728" />
                        <ellipse cx="108" cy="72" rx="3" ry="5" fill="#4A3728" />
                        <circle cx="100" cy="80" r="2" fill="#8B6F4B" />
                        <path
                          d="M 100 80 L 95 83 M 100 80 L 105 83"
                          stroke="#8B6F4B"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                        />
                        <line
                          x1="70"
                          y1="75"
                          x2="85"
                          y2="75"
                          stroke="#8B6F4B"
                          stroke-width="1"
                          opacity="0.6"
                        />
                        <line
                          x1="115"
                          y1="75"
                          x2="130"
                          y2="75"
                          stroke="#8B6F4B"
                          stroke-width="1"
                          opacity="0.6"
                        />
                      </g>
                      <g
                        class="transition-all duration-500"
                        :class="{
                          'opacity-0 scale-50': isQuizHovered,
                          'opacity-100 scale-100': !isQuizHovered,
                        }"
                      >
                        <text
                          x="85"
                          y="75"
                          font-size="28"
                          fill="#B8A07E"
                          font-weight="bold"
                          class="animate-float"
                        >
                          ?
                        </text>
                        <text
                          x="105"
                          y="70"
                          font-size="22"
                          fill="#B8A07E"
                          opacity="0.7"
                          font-weight="bold"
                          class="animate-float-delay"
                        >
                          ?
                        </text>
                      </g>
                      <g v-if="isQuizHovered" class="animate-pulse">
                        <path
                          d="M 130 80 Q 130 75 134 75 Q 138 75 138 80 Q 138 85 134 88 L 130 85 Q 126 85 126 80 Q 126 75 130 75 Q 134 75 134 80"
                          fill="#E8A3A3"
                          opacity="0.6"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="relative z-10 text-center">
                    <div
                      class="text-latte font-medium text-base mb-1 transition-all duration-300 group-hover:scale-105"
                    >
                      咖啡小測驗
                    </div>
                    <div
                      class="text-xs text-text-sub font-light transition-opacity duration-300 group-hover:opacity-80"
                    >
                      探索你的咖啡動物，找到專屬風格
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- 閱讀完整故事按鈕 -->
            <RouterLink
              to="/about"
              class="group inline-flex items-center gap-3 text-text-main hover:text-sage transition-colors text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-sage pb-1 mt-6"
            >
              閱讀完整故事
              <span
                class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
              >
                arrow_forward
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* ============================================
   FeiTime Story 區塊樣式 - 立體無框玻璃質感設計
   ============================================ */

  /* 整體區塊背景 - 使用較深的米色作為底色 */
  .feitime-story-section {
    width: 100%;
    padding: 6rem 0;
    background-color: #fffefbcb;
    position: relative;
    overflow: hidden;
  }

  /* 立體玻璃卡片 - 無外框設計 */
  .glass-card-3d {
    width: 100%;
    position: relative;
    border-radius: 32px;
    padding: 3rem 2rem;
    overflow: hidden;

    /* 半透明玻璃背景 - 內部漸變 */
    background: linear-gradient(
        135deg,
        rgba(250, 249, 238, 0.75) 0%,
        rgba(162, 175, 155, 0.55) 25%,
        rgba(220, 207, 192, 0.65) 50%,
        rgba(238, 238, 238, 0.7) 75%,
        rgba(250, 249, 238, 0.75) 100%
      ),
      rgba(255, 255, 255, 0.5);
    background-size: 200% 200%;
    animation: innerGlassFlow 15s ease infinite;

    /* 玻璃模糊效果 */
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);

    /* 立體陰影效果 - 創造浮空感 */
    box-shadow: 
    /* 主要陰影 - 柔和擴散 */ 0 30px 60px -15px rgba(162, 175, 155, 0.25),
      0 15px 35px -10px rgba(220, 207, 192, 0.2),
      /* 內陰影 - 增加深度 */ inset 0 1px 2px rgba(255, 255, 255, 0.9),
      inset 0 -1px 2px rgba(0, 0, 0, 0.05), /* 細微高光 */ 0 1px 3px rgba(255, 255, 255, 0.6);

    /* 輕微的 3D 變換 */
    transform: translateZ(0);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Hover 效果 - 增強立體感 */
  .glass-card-3d:hover {
    box-shadow: 0 35px 70px -15px rgba(162, 175, 155, 0.3),
      0 18px 40px -10px rgba(220, 207, 192, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.95),
      inset 0 -1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(255, 255, 255, 0.7);

    transform: translateY(-2px) translateZ(0);
  }

  /* 內部漸變流動動畫 */
  @keyframes innerGlassFlow {
    0% {
      background-position: 0% 50%;
    }
    33% {
      background-position: 100% 50%;
    }
    66% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* 頂部光澤效果 */
  .glass-card-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: 5%;
    right: 5%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.9) 20%,
      rgba(255, 255, 255, 0.9) 80%,
      transparent 100%
    );
    opacity: 0.6;
    border-radius: 2px;
  }

  /* 動態光澤移動效果 */
  .glass-card-3d::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at 25% 25%,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 50%
    );
    pointer-events: none;
    animation: glassLightMove 12s ease-in-out infinite;
  }

  /* 光澤移動動畫 */
  @keyframes glassLightMove {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0.4;
    }
    25% {
      transform: translate(15%, 10%) rotate(5deg);
      opacity: 0.6;
    }
    50% {
      transform: translate(10%, 15%) rotate(-5deg);
      opacity: 0.5;
    }
    75% {
      transform: translate(5%, 5%) rotate(3deg);
      opacity: 0.55;
    }
  }

  /* 響應式設計 */
  @media (min-width: 768px) {
    .glass-card-3d {
      padding: 4rem 3rem;
      border-radius: 36px;
    }
  }

  @media (max-width: 768px) {
    .feitime-story-section {
      padding: 4rem 0;
    }

    .glass-card-3d {
      border-radius: 24px;
    }
  }

  /* ============================================
   咖啡動畫效果
   ============================================ */

  /* 水流動畫 */
  @keyframes waterFlow {
    0% {
      opacity: 0;
      stroke-dasharray: 0, 100;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
      stroke-dasharray: 100, 0;
    }
  }
  .animate-water-flow {
    animation: waterFlow 1.5s ease-in-out infinite;
  }

  /* 水滴動畫 */
  @keyframes waterDrop {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }
  .animate-water-drop {
    animation: waterDrop 1.2s ease-in infinite;
  }
  .animate-water-drop-delay-1 {
    animation: waterDrop 1.2s ease-in infinite;
    animation-delay: 0.3s;
  }
  .animate-water-drop-delay-2 {
    animation: waterDrop 1.2s ease-in infinite;
    animation-delay: 0.6s;
  }

  /* 蒸氣動畫 */
  @keyframes steam {
    0% {
      opacity: 0.4;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-15px) scale(1.3);
    }
  }
  .animate-steam {
    animation: steam 2s ease-out infinite;
  }
  .animate-steam-delay-1 {
    animation: steam 2s ease-out infinite;
    animation-delay: 0.4s;
  }
  .animate-steam-delay-2 {
    animation: steam 2s ease-out infinite;
    animation-delay: 0.8s;
  }

  /* 漂浮動畫 */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  .animate-float {
    animation: float 2s ease-in-out infinite;
  }
  .animate-float-delay {
    animation: float 2s ease-in-out infinite;
    animation-delay: 0.5s;
  }
</style>
