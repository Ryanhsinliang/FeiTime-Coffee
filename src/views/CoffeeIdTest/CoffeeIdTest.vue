<template>
  <section class="w-full min-h-screen relative font-cactus flex items-center justify-center">
    <div class="absolute inset-0 -z-10">
      <img :src="currentBg" class="w-full h-full object-cover" alt="背景" />
      <img
        :src="nextBg"
        class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
        :style="{ opacity: nextBgOpacity }"
        alt="背景"
      />
    </div>
    <div
      ref="card"
      @mousemove="handleMove"
      @mouseleave="reset"
      class="group mx-auto py-6 px-6 w-2/3 md:w-1/2 lg:w-1/3 relative z-10 rounded-xl bg-white/10 backdrop-blur-md shadow-lg transform-gpu transition-transform duration-300 ease-out"
      :style="style"
    >
      <div class="pointer-events-none absolute inset-0 rounded-xl z-20" :style="glowStyle"></div>
      <div class="flex-col bg-background-light/90 backdrop-blur-md shadow-lg border-sage z-10">
        <div class="w-[80%] mx-auto flex justify-center rounded-2xl bg-cover bg-bottom mt-8">
          <img :src="coffeeWalk" class="invert" alt="Coffee Walk Animation" />
        </div>
        <div class="flex flex-col items-center gap-8 mt-8 p-5">
          <p class="text-center leading-relaxed text-white">
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
            class="group/option relative overflow-hidden text-center leading-normal p-5 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 cursor-pointer transition-all duration-300"
          >
            開始測驗
            <span
              class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover:scale-100"
            ></span>
            <span
              class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover:scale-100"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import bgImage from './assets/img/bgImage.jpg';
  import coffeeWalk from './assets/img/coffeeWalk.gif';
  import cafe from './assets/img/cafe.jpg';
  import mountain from './assets/img/mountain.jpg';
  import escalator from './assets/img/escalator.png';
  import campus from './assets/img/campus.jpg';

  const router = useRouter();

  // 開始測驗
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
      nextBgOpacity.value = 1;

      setTimeout(() => {
        currentBg.value = newBg;
        nextBgOpacity.value = 0;
        index++;
        setTimeout(changeBg, 1500);
      }, 500);
    }

    changeBg();
  });

  // 卡片效果
  const card = ref<HTMLElement | null>(null);
  const style = ref('');

  const glowStyle = ref('');

  function handleMove(e: MouseEvent) {
    if (!card.value) return;

    const rect = card.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 4;

    style.value = `
    transform:
      perspective(1000px)
      rotateY(${rotateY}deg)
      rotateX(${rotateX}deg)
      translateY(-4px);
  `;

    glowStyle.value = `
    background:
      radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(255,255,255,0.28),
        transparent 45%
      );
  `;
  }

  function reset() {
    style.value = `
    transform:
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      translateY(0);
  `;
    glowStyle.value = '';
  }
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
