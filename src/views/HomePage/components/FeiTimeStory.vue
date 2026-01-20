<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import homeStoryImage from '@/views/HomePage/assets/home-story.webp';

  // 按鈕 hover 狀態
  const isBrewingHovered = ref(false);
  const isQuizHovered = ref(false);

  // 香氣粒子系統
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    blur: number;
  }

  const particles = ref<Particle[]>([]);

  // 生成香氣粒子
  const generateParticles = () => {
    const particleCount = 20;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        blur: Math.random() * 2 + 1,
      });
    }

    particles.value = newParticles;
  };

  onMounted(() => {
    generateParticles();
  });
</script>

<template>
  <section class="feitime-story-section relative w-full py-24 overflow-hidden bg-[#FFFEFB]">
    <!-- 背景漸變動畫層 -->
    <div class="absolute inset-0 opacity-30">
      <div class="gradient-orb gradient-orb-1"></div>
      <div class="gradient-orb gradient-orb-2"></div>
      <div class="gradient-orb gradient-orb-3"></div>
    </div>

    <!-- 心電圖漸變線條 -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <svg
        class="w-full h-[400px]"
        viewBox="0 0 1920 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- 漸變色定義 -->
          <linearGradient id="ecg-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #dccfc0; stop-opacity: 0.2" />
            <stop offset="50%" style="stop-color: #b8a07e; stop-opacity: 0.6" />
            <stop offset="100%" style="stop-color: #dccfc0; stop-opacity: 0.2" />
          </linearGradient>

          <linearGradient id="ecg-gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #a8c5a3; stop-opacity: 0.2" />
            <stop offset="50%" style="stop-color: #8faf8a; stop-opacity: 0.6" />
            <stop offset="100%" style="stop-color: #a8c5a3; stop-opacity: 0.2" />
          </linearGradient>
        </defs>

        <!-- 左側心電圖 -->
        <g class="ecg-line ecg-left">
          <path
            d="M 0 200 L 250 200 L 270 140 L 290 260 L 310 200 L 520 200"
            stroke="url(#ecg-gradient-left)"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <!-- 右側心電圖 -->
        <g class="ecg-line ecg-right">
          <path
            d="M 1400 200 L 1610 200 L 1630 180 L 1650 220 L 1670 200 L 1920 200"
            stroke="url(#ecg-gradient-right)"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>

    <!-- 香氣粒子層 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="aroma-particle"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
          filter: `blur(${particle.blur}px)`,
        }"
      ></div>
    </div>

    <!-- 主要內容區 -->
    <div class="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
      <div class="card-container relative rounded-3xl p-8 md:p-16 overflow-hidden group">
        <!-- 卡片背景 - 毛玻璃效果 -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#FFFAF0]/80 via-[#FFF8E7]/75 to-[#F5E6D3]/80 backdrop-blur-xl"
        ></div>

        <!-- 柔和光暈邊框 -->
        <div class="absolute inset-0 rounded-3xl glow-border"></div>

        <!-- 邊緣光點 -->
        <div class="corner-light corner-light-tl"></div>
        <div class="corner-light corner-light-tr"></div>
        <div class="corner-light corner-light-bl"></div>
        <div class="corner-light corner-light-br"></div>

        <!-- 內容區 -->
        <div class="flex flex-col md:flex-row gap-16 items-center relative z-10">
          <!-- 左側圖片 -->
          <div class="w-full md:w-1/2">
            <div class="image-wrapper relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
              <!-- 圖片容器 -->
              <div class="relative w-full h-full overflow-hidden">
                <div
                  class="absolute inset-0 bg-cover bg-center"
                  :style="{
                    backgroundImage: `url(${homeStoryImage})`,
                    backgroundPosition: 'center 30%',
                    filter: 'grayscale(10%) brightness(0.95)',
                  }"
                ></div>

                <!-- 圖片光暈效果 -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[#4A3728]/20 to-transparent"
                ></div>
              </div>

              <!-- 裝飾邊框 -->
              <div
                class="absolute inset-4 border-2 border-white/30 rounded-xl pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- 右側內容 -->
          <div class="w-full md:w-1/2 flex flex-col gap-8">
            <!-- 標題區 -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-[#6B7F6E] tracking-[0.3em] uppercase text-xs font-bold">
                  FeiTime 故事
                </span>
                <div class="flex-1 h-px bg-gradient-to-r from-[#DCCFC0] to-transparent"></div>
              </div>

              <h2
                class="text-4xl md:text-5xl font-serif text-[#4A3728] leading-tight animate-fade-in"
              >
                靜謐時光，
                <br />
                用心釀造咖啡體驗
              </h2>
            </div>

            <!-- 裝飾分隔線 -->
            <div class="flex items-center gap-3">
              <div class="w-12 h-1 bg-[#DCCFC0] rounded-full glow-line"></div>
              <div class="w-6 h-1 bg-[#DCCFC0]/60 rounded-full glow-line"></div>
              <div class="w-3 h-1 bg-[#DCCFC0]/30 rounded-full"></div>
            </div>

            <!-- 描述文字 -->
            <p class="text-gray-600 font-light leading-relaxed text-base">
              踏上專屬您的咖啡旅程，透過互動體驗深入了解手沖咖啡的迷人世界。
              無論是模擬沖煮過程，還是探索個人風味偏好，FeiTime 為您打造全新的客製化咖啡體驗。
            </p>

            <!-- 液態氣泡按鈕區 -->
            <div class="grid grid-cols-2 gap-4 md:gap-8 mt-4">
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
                    <foreignObject x="0" y="0" width="200" height="200">
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          width: 200px;
                          height: 200px;
                          position: relative;
                        "
                      >
                        <span
                          class="material-symbols-outlined icon-brewing"
                          :style="{
                            fontSize: '72px',
                            color: isBrewingHovered ? '#8B6F4B' : '#D4C5B0',
                            opacity: isBrewingHovered ? '1' : '0.5',
                            transition: 'all 0.5s ease',
                            display: 'block',
                            lineHeight: '1',
                            transform: 'translateY(-20px)',
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
                <h3 class="text-[#8B6F4B] font-bold text-center mt-2 text-xs md:text-base">
                  咖啡沖煮模擬器
                </h3>
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
                    <foreignObject x="0" y="0" width="200" height="200">
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          width: 200px;
                          height: 200px;
                          position: relative;
                        "
                      >
                        <span
                          class="material-symbols-outlined icon-quiz"
                          :style="{
                            fontSize: '72px',
                            color: isQuizHovered ? '#7A9F75' : '#B8D4B3',
                            opacity: isQuizHovered ? '1' : '0.5',
                            transition: 'all 0.5s ease',
                            display: 'block',
                            lineHeight: '1',
                            transform: 'translateY(-20px)',
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
                <h3 class="text-[#7A9F75] font-bold text-center mt-2 text-xs md:text-base">
                  咖啡小測驗
                </h3>
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
     心電圖漸變線條動畫
     ============================================ */
  .ecg-line {
    animation: ecgPulse 3s ease-in-out infinite;
  }

  .ecg-left {
    animation-delay: 0s;
  }

  .ecg-right {
    animation-delay: 1.5s;
  }

  @keyframes ecgPulse {
    0%,
    100% {
      opacity: 0.6;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }

  /* ============================================
     背景漸變動畫球體
     ============================================ */
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: float 20s ease-in-out infinite;
  }

  .gradient-orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(220, 207, 192, 0.3) 0%, transparent 70%);
    top: -10%;
    left: -5%;
    animation-delay: 0s;
  }

  .gradient-orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(162, 175, 155, 0.25) 0%, transparent 70%);
    bottom: -15%;
    right: -10%;
    animation-delay: -7s;
  }

  .gradient-orb-3 {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(245, 230, 211, 0.3) 0%, transparent 70%);
    top: 40%;
    left: 50%;
    animation-delay: -14s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  /* ============================================
     香氣粒子動畫
     ============================================ */
  .aroma-particle {
    position: absolute;
    background: radial-gradient(circle, rgba(220, 207, 192, 0.6) 0%, transparent 70%);
    border-radius: 50%;
    animation: aromaFloat linear infinite;
    pointer-events: none;
  }

  @keyframes aromaFloat {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) translateX(calc(var(--random) * 50px)) scale(0.3);
      opacity: 0;
    }
  }

  /* ============================================
     卡片樣式
     ============================================ */
  .card-container {
    position: relative;
    transition: all 0.5s ease;
  }

  .card-container:hover {
    transform: translateY(-8px);
  }

  /* 柔和光暈邊框 */
  .glow-border {
    border: 2px solid transparent;
    background: linear-gradient(
        90deg,
        rgba(220, 207, 192, 0.5),
        rgba(255, 255, 255, 0.9),
        rgba(162, 175, 155, 0.6),
        rgba(255, 255, 255, 0.9),
        rgba(245, 230, 211, 0.5),
        rgba(255, 255, 255, 0.9),
        rgba(220, 207, 192, 0.5)
      )
      border-box;
    background-size: 300% 100%;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: borderShine 18s linear infinite;
  }

  @keyframes borderShine {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }

  /* 邊緣光點 */
  .corner-light {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, rgba(220, 207, 192, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    animation: cornerGlow 2s ease-in-out infinite;
    z-index: 5;
  }

  .corner-light-tl {
    top: -4px;
    left: -4px;
    animation-delay: 0s;
  }

  .corner-light-tr {
    top: -4px;
    right: -4px;
    animation-delay: 0.5s;
  }

  .corner-light-bl {
    bottom: -4px;
    left: -4px;
    animation-delay: 1s;
  }

  .corner-light-br {
    bottom: -4px;
    right: -4px;
    animation-delay: 1.5s;
  }

  @keyframes cornerGlow {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
  }

  /* ============================================
     圖片樣式
     ============================================ */
  .image-wrapper {
    box-shadow: 0 20px 60px rgba(74, 55, 40, 0.15);
  }

  /* ============================================
     文字裝飾
     ============================================ */
  .glow-line {
    animation: lineGlow 2s ease-in-out infinite;
  }

  @keyframes lineGlow {
    0%,
    100% {
      box-shadow: 0 0 5px rgba(220, 207, 192, 0.3);
    }
    50% {
      box-shadow: 0 0 15px rgba(220, 207, 192, 0.6);
    }
  }

  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ============================================
     液態氣泡按鈕樣式(保留原有)
     ============================================ */
  .bubble-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  @media (min-width: 768px) {
    .bubble-button-container {
      padding: 1rem;
    }
  }

  .bubble-button-container:hover {
    background: rgba(107, 127, 110, 0.05);
  }

  .bubble-wrapper {
    width: 100px;
    height: 100px;
    transition: transform 0.3s ease;
  }

  @media (min-width: 768px) {
    .bubble-wrapper {
      width: 140px;
      height: 140px;
    }
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
     字體樣式
     ============================================ */
  .font-serif {
    font-family: 'Noto Serif TC', serif;
  }
</style>
