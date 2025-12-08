<template>
  <main class="font-wenkai min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
    <section class="mx-auto py-10 w-2/3">
      <!-- Title -->
      <h2
        class="relative text-center font-shizuru text-3xl font-bold p-6 bg-[rgba(238,238,238,0.9)] rounded-2xl border-[5px] border-dotted border-[#dccfc0]"
      >
        Coffee ID TEST
      </h2>

      <!-- 動畫背景 -->
      <div class="w-[80%] mx-auto flex justify-center rounded-2xl bg-cover bg-bottom bg-slide mt-8">
        <img src=".\assets\img\coffeeWalk.gif" class="invert" alt="Coffee Walk Animation" />
      </div>

      <!-- Intro Text -->
      <div class="flex flex-col items-center gap-8 mt-8">
        <p class="text-center leading-relaxed">
          每一杯咖啡，
          <br />
          都藏著你的生活節奏、情緒與偏好。
          <br />
          Coffee ID 不是標籤，
          <br />
          而是一張屬於你的風味名片。
          <br />
          現在，就從這裡開始。
        </p>

        <!-- Button -->
        <button
          @click="startTest"
          class="relative bg-[#a2af9b] text-2xl py-2 px-8 rounded-full hover:cursor-pointer"
        >
          開始測驗
        </button>
        <button
          @click="backToHomePage"
          class="relative bg-[#DCCFC0] text-2xl py-2 px-8 rounded-full hover:cursor-pointer"
        >
          回到首頁
        </button>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'CoffeeIDTest',
    methods: {
      startTest() {
        // 添加開始測驗的邏輯
        this.$router.push('/coffee-id');
      },
    },
  };
</script>

<style scoped>
  /* 動畫背景 */
  @keyframes bgSlide {
    0% {
      background-image: url('.\assets\img\cafe.jpg');
    }
    20% {
      background-image: url('.\assets\img\cafe.jpg');
    }
    23% {
      background-image: url('.\assets\img\mountain.jpg');
    }
    43% {
      background-image: url('.\assets\img\mountain.jpg');
    }
    56% {
      background-image: url('.\assets\img\escalator.png');
    }
    73% {
      background-image: url('.\assets\img\escalator.png');
    }
    77% {
      background-image: url('.\assets\img\campus.jpg');
    }
    93% {
      background-image: url('.\assets\img\campus.jpg');
    }
    100% {
      background-image: url('.\assets\img\cafe.jpg');
    }
  }

  .bg-slide {
    animation: bgSlide 12s infinite;
  }
</style>

<!-- 全局樣式：移除 #app 的 padding -->
<style>
  #app {
    padding: 0 !important;
    margin: 0;
    min-height: 100vh;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-image: url('.\assets\img\bgImage.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
