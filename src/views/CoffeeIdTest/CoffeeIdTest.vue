<template>
  <h2
    class="w-2/3 mx-auto my-8 relative text-center font-shizuru text-3xl font-bold p-6 bg-[rgb(238,238,238)] rounded-2xl ]"
  >
    Coffee ID TEST
  </h2>
  <main class="w-full min-h-screen relative font-wenkai">
    <div class="absolute inset-0 -z-10">
      <img :src="currentBg" class="w-full h-full object-cover" alt="背景" />
      <img
        :src="nextBg"
        class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
        :style="{ opacity: nextBgOpacity }"
        alt="背景"
      />
    </div>
    <section class="mx-auto py-10 w-2/3 relative z-10">
      <!-- 動畫背景 -->
      <div class="w-[80%] mx-auto flex justify-center rounded-2xl bg-cover bg-bottom mt-8">
        <img :src="coffeeWalk" class="invert" alt="Coffee Walk Animation" />
      </div>
    </section>
    <section>
      <div class="flex flex-col items-center gap-8 mt-8 bg-[rgba(220,207,192,1)] p-5">
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

        <button
          @click="startTest"
          class="relative bg-[#a2af9b] text-2xl py-2 px-8 rounded-full hover:cursor-pointer"
        >
          開始測驗
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  // 匯入背景圖與動畫圖
  import bgImage from './assets/img/bgImage.jpg';
  import coffeeWalk from './assets/img/coffeeWalk.gif';
  import cafe from './assets/img/cafe.jpg';
  import mountain from './assets/img/mountain.jpg';
  import escalator from './assets/img/escalator.png';
  import campus from './assets/img/campus.jpg';

  // 取得 router
  const router = useRouter();

  // 開始測驗函式
  function startTest() {
    router.push('/coffee-id-test-card');
  } // 控制動畫背景切換
  const currentBg = ref(bgImage);
  const bgSequence = [cafe, cafe, mountain, mountain, escalator, escalator, campus, campus, cafe];

  let index = 0;
  const nextBg = ref(bgSequence[0]);
  const nextBgOpacity = ref(0);
  onMounted(() => {
    function changeBg() {
      const newBg = bgSequence[index % bgSequence.length];
      nextBg.value = newBg;
      nextBgOpacity.value = 1; // 觸發淡入

      setTimeout(() => {
        currentBg.value = newBg; // 完成切換
        nextBgOpacity.value = 0; // 淡出下一張
        index++;
        setTimeout(changeBg, 1500); // 調整每張持續時間
      }, 500); // 500ms 淡入淡出時間
    }

    changeBg();
  });
</script>

<style scoped>
  main > div > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<style></style>
