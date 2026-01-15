<template>
  <div class="cursor-container">
    <div
      v-for="s in sparkles"
      :key="s.id"
      class="sparkle"
      :style="{
        left: s.x + 'px',
        top: s.y + 'px',
        opacity: s.opacity,
        '--drift-x': s.driftX + 'px',
        '--drift-y': s.driftY + 'px',
        '--sway': s.sway + 'px',
        '--duration': s.duration + 's',
      }"
    ></div>

    <div
      class="custom-cursor"
      :class="{ 'is-hovering': isHover }"
      :style="{ transform: `translate(${x}px, ${y}px)` }"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(20, 80, 50, 0.95)" />
            <stop offset="100%" stop-color="rgba(10, 40, 30, 0.85)" />
          </linearGradient>

          <linearGradient id="hover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(232, 215, 165, 0.95)" />
            <stop offset="100%" stop-color="rgba(218, 180, 120, 0.9)" />
          </linearGradient>
        </defs>

        <path
          class="cursor-path"
          d="M10 10 L50 90 L60 60 L90 50 Z"
          :fill="isHover ? 'url(#hover-grad)' : 'url(#glass-grad)'"
          stroke="rgba(255, 255, 255, 0.6)"
          :stroke-width="isHover ? '3.0' : '5.0'"
          stroke-linejoin="round"
        />
      </svg>

      <div v-if="isHover" class="hover-pulse"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const x = ref(-100);
  const y = ref(-100);
  const isHover = ref(false);
  const sparkles = ref([]);

  const updateMouse = (e) => {
    x.value = e.clientX;
    y.value = e.clientY;

    // 提高產生頻率
    if (Math.random() > 0.7) {
      const id = Math.random();

      // 雪花飄落效果：主要向下，帶有輕微的水平漂移
      const driftX = (Math.random() - 0.5) * 40; // 左右飄移 -20 ~ 20px
      const driftY = 50 + Math.random() * 80; // 向下飄落 50-130px
      const sway = (Math.random() - 0.5) * 30; // 左右搖擺幅度
      const duration = 1.2 + Math.random() * 0.8; // 持續時間 1.2-2.0s

      const s = {
        id,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        driftX,
        driftY,
        sway,
        duration,
      };
      sparkles.value.push(s);

      // 立即觸發動畫
      requestAnimationFrame(() => {
        s.opacity = 0;
      });

      setTimeout(() => {
        sparkles.value = sparkles.value.filter((item) => item.id !== id);
      }, duration * 1000 + 100);
    }
  };

  // 透過全局事件委託來精確捕捉 Hover 狀態
  const handleOver = (e) => {
    const target = e.target;
    if (!target) return;

    // 檢查元素本身或其父層是否為可點擊元件
    const isClickable =
      target.closest('a, button, input, select, [role="button"]') ||
      window.getComputedStyle(target).cursor === 'pointer';

    isHover.value = !!isClickable;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleOver);
    document.documentElement.style.cursor = 'none';
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse);
    window.removeEventListener('mouseover', handleOver);
    document.documentElement.style.cursor = 'auto';
  });
</script>

<style scoped>
  .cursor-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100000;
  }

  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    will-change: transform;
  }

  /* 當 isHover 觸發時的樣式變化 - 改為淡金色 */
  .custom-cursor.is-hovering {
    filter: drop-shadow(0 0 10px rgba(232, 215, 165, 0.9));
  }

  .custom-cursor.is-hovering svg {
    transform: scale(1.25);
    transition: transform 0.2s ease-out;
  }

  /* 只對顏色和線條粗細做過渡 */
  .cursor-path {
    transition: fill 0.3s ease, stroke-width 0.3s ease;
  }

  /* 脈衝光改為淡金色，透明度提高 */
  .hover-pulse {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    background: rgba(232, 215, 165, 0.35);
    border-radius: 50%;
    z-index: -1;
    pointer-events: none;
    animation: pulse 1.2s infinite ease-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.6);
      opacity: 1;
    }
    100% {
      transform: scale(2.8);
      opacity: 0;
    }
  }

  /* 雪花飄落效果 */
  .sparkle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(circle, white, rgba(232, 215, 165, 0.9));
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(232, 215, 165, 0.6);
    animation: snowfall var(--duration) ease-out forwards;
  }

  @keyframes snowfall {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    25% {
      transform: translate(calc(var(--sway) * 0.5), calc(var(--drift-y) * 0.25));
    }
    50% {
      transform: translate(var(--sway), calc(var(--drift-y) * 0.5));
      opacity: 0.8;
    }
    75% {
      transform: translate(calc(var(--sway) * 0.3), calc(var(--drift-y) * 0.75));
      opacity: 0.4;
    }
    100% {
      transform: translate(var(--drift-x), var(--drift-y));
      opacity: 0;
    }
  }

  /* 核心：徹底隱藏原生，但不影響 JS 偵測 */
  :global(*) {
    cursor: none !important;
  }
  :global(a),
  :global(button) {
    cursor: none !important;
  }
</style>
