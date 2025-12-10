<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div v-if="!showVideo" class="relative">
      <div class="card-shadow"></div>

      <atropos-component class="my-atropos" :active-offset="40" @click="handleAtroposActivation">
        <div class="atropos-inner flex items-center justify-center w-full h-full rounded-xl">
          <div class="neon-bg rounded-xl"></div>
          <button @click.stop="() => {}" class="btn-text">前往FeiTime！😎</button>
        </div>
      </atropos-component>
    </div>

    <div v-else class="w-full max-w-3xl aspect-video">
      <iframe
        width="100%"
        height="100%"
        :src="videoUrl"
        title="FeiTime"
        frameborder="0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
        "
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import AtroposComponent from 'atropos/element';

  export default {
    setup() {
      const showVideo = ref(false);
      const videoUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
      // 新增狀態：追蹤按鈕是否已觸發
      const isActivated = ref(false);

      if (!customElements.get('atropos-component')) {
        customElements.define('atropos-component', AtroposComponent);
      }

      const playVideo = () => {
        showVideo.value = true;
      };

      // 關鍵新方法：處理 Atropos 容器的點擊事件
      const handleAtroposActivation = () => {
        if (isActivated.value) {
          // 如果已經播放，則不處理（防止重複點擊）
          return;
        } // 設置為已啟動

        isActivated.value = true; // 觸發你想要的按鈕事件

        playVideo();
      };

      return { showVideo, playVideo, videoUrl, handleAtroposActivation };
    },
  };
</script>

<style scoped>
  .my-atropos {
    width: 400px;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    z-index: 10;
  }

  /* 清掉 Atropos 內層背景 */
  .my-atropos,
  .my-atropos .atropos-scale,
  .my-atropos .atropos-rotate,
  .my-atropos .atropos-inner {
    background: transparent;
    border-radius: 16px;
  }

  /* 霓虹背景 */
  .neon-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(130deg, #4d9fff, #a83bff, #ff2ebd);
    background-size: 200% 200%;
    animation: neonGradient 3s ease infinite;
    border-radius: 16px;
    z-index: 1;
  }

  /* 按鈕文字 */
  .btn-text {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 10;
    position: relative;
    padding: 4rem 8rem;
  }

  /* 底層陰影 */
  .card-shadow {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    filter: blur(12px);
    z-index: 5;
  }

  /* 漸層動畫 */
  @keyframes neonGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
