<template>
  <div
    class="bg-cream font-display overflow-hidden text-coffee-dark relative flex h-screen w-full flex-col group/design-root"
  >
    <!-- 背景層 -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 mix-blend-multiply"
        style="
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7BgIUUVEAnEXLRFgWhsy5EcLAf-LOdf12IrgJ0Yq3TBbySJIEiyssXv0Ev3Z2AyK9y205mXaoDBDTdwu31RB2zCJVXsYRB7H3HCcVvyxSmY4Ok0WrBRBy1pAGbIcGaZguMD1EdmbCdsiKxw2gFhsUaaQZ-Yavz9I6MRCWhCVhl_1N7qGRSRuvVM8JJ-Sz61xcwbjLXp_OUp3JGAwUDeT2fK_aC9Y8SktqWrk3zL-QvV0ft9oPSzG_qohvGF4mR1RPBx06-mFyvjcO');
        "
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/50 to-cream/90"></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FAF9EE_100%)]"
      ></div>
    </div>

    <!-- 主內容 -->
    <div class="relative z-10 flex h-full grow flex-col justify-center items-center">
      <div class="flex flex-col items-center justify-center max-w-[960px] p-6 text-center">
        <!-- Coffee Icon Circle -->
        <div
          class="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(166,124,82,0.15)] animate-pulse"
        >
          <span class="material-symbols-outlined text-[40px] text-primary">coffee</span>
        </div>

        <!-- Title -->
        <div class="flex flex-col gap-3 mb-16">
          <h1
            class="text-coffee-dark text-5xl font-black leading-tight tracking-tight md:text-7xl drop-shadow-sm"
          >
            FeiTime
          </h1>
          <h2
            class="text-coffee-medium text-sm font-medium uppercase tracking-[0.25em] md:text-base"
          >
            Premium Roasts. Delivered.
          </h2>
        </div>

        <!-- Progress bar -->
        <div class="flex w-full max-w-[320px] flex-col gap-3">
          <div class="flex justify-between items-end px-1">
            <span class="text-xs font-bold text-primary uppercase tracking-widest">Brewing</span>
            <p class="text-coffee-medium text-xs font-mono leading-normal">64%</p>
          </div>
          <div class="h-1.5 w-full rounded-full bg-coffee-dark/10 backdrop-blur-sm">
            <div
              class="h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(166,124,82,0.6)]"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Skip Button -->
      <div class="absolute bottom-10 right-10 md:bottom-16 md:right-16">
        <button
          class="group flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-coffee-dark/10 bg-white/40 backdrop-blur-md h-12 px-6 hover:bg-white/80 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
          @click="skipIntro"
        >
          <span
            class="text-coffee-dark text-sm font-bold tracking-[0.05em] group-hover:text-primary transition-colors"
          >
            Skip Intro
          </span>
          <span
            class="material-symbols-outlined text-coffee-dark text-[18px] group-hover:text-primary transition-transform group-hover:translate-x-1"
          >
            &gt;
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  // 背景圖片網址
  const backgroundImage = ref(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7BgIUUVEAnEXLRFgWhsy5EcLAf-LOdf12IrgJ0Yq3TBbySJIEiyssXv0Ev3Z2AyK9y205mXaoDBDTdwu31RB2zCJVXsYRB7H3HCcVvyxSmY4Ok0WrBRBy1pAGbIcGaZguMD1EdmbCdsiKxw2gFhsUaaQZ-Yavz9I6MRCWhCVhl_1N7qGRSRuvVM8JJ-Sz61xcwbjLXp_OUp3JGAwUDeT2fK_aC9Y8SktqWrk3zL-QvV0ft9oPSzG_qohvGF4mR1RPBx06-mFyvjcO'
  );

  // Progress Bar 狀態
  const progress = ref(0);

  // 模擬進度增加
  onMounted(() => {
    const interval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += 1;
      } else {
        clearInterval(interval);
        // 進度完成可以導向下一頁或觸發事件
        router.push({ name: 'HomePage' });
      }
    }, 50);
  });

  // Skip Intro 按鈕事件
  const skipIntro = () => {
    progress.value = 100;
    // 可以導向首頁或其他頁面
    router.push({ name: 'HomePage' });
  };
</script>

<style>
  /* 如果有全域 Tailwind 配置，這裡可以空著 */
</style>
