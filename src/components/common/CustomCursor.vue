<template>
  <div v-if="isDesktop" class="cursor-container">
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
  const isDesktop = ref(false);

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

    // 更完整的檢測
    const isClickable =
      target.closest('a, button, input, select, textarea, [role="button"], [onclick]') ||
      target.classList.contains('cursor-pointer') ||
      target.hasAttribute('data-clickable');

    isHover.value = !!isClickable;
  };

  // 檢測是否為桌面裝置（有精準的指標裝置）
  const checkIsDesktop = () => {
    // 改進：使用 any-pointer: fine 以支援像 Surface Pro 這種混合裝置
    // 或是如果檢測不到，則用 User Agent 判斷非行動裝置也視為桌機
    const hasFine = window.matchMedia('(any-pointer: fine)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 只要有精細指標，或者"不是"行動裝置，都算桌機 (Surface Pro 通常 matchMedia 結果不穩，但 UA 是 Windows)
    return hasFine || !isMobile;
  };

  onMounted(() => {
    isDesktop.value = checkIsDesktop();

    // 只在桌面裝置上啟用自訂游標
    if (isDesktop.value) {
      window.addEventListener('mousemove', updateMouse);
      window.addEventListener('mouseover', handleOver);
      
      // 強制隱藏原生游標
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      
      // 額外加強：對所有元素強制繼承 cursor: none
      const style = document.createElement('style');
      style.id = 'cursor-style';
      style.innerHTML = `
        * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  });

  onUnmounted(() => {
    if (isDesktop.value) {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleOver);
      
      // 復原
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      
      const style = document.getElementById('cursor-style');
      if (style) style.remove();
    }
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

  /* 移除靜態的全域隱藏，改由 JS 控制 */
  /* :global(*) {
    cursor: none !important;
  } */
  :global(a),
  :global(button) {
    cursor: inherit; /* 改為繼承，讓 style.cursor 生效 */
  }
</style>
