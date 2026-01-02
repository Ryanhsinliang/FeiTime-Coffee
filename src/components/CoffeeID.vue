<template>
  <section
    ref="card"
    @mousemove="handleMove"
    @mouseleave="reset"
    :style="style"
    class="group relative mx-auto w-full max-w-3xl transform-gpu transition-transform duration-300 ease-out"
  >
    <!-- 亮光層 -->
    <div class="pointer-events-none absolute inset-0 rounded-2xl z-20" :style="glowStyle"></div>

    <!-- 卡片內容 -->
    <div
      class="relative z-10 w-full bg-[#DCCFC0]/60 backdrop-blur-md rounded-2xl p-5 min-h-[60vh] md:min-h-[70vh] shadow-lg flex flex-col gap-1"
    >
      <div class="p-5">
        <img class="h-10" src="" alt="" />
        <h2 class="text-3xl text-center">您的 Coffee ID card</h2>
      </div>

      <div
        class="w-full max-w-sm mx-auto aspect-square shadow-2xl hover:bg-white/20 transition-colors duration-500 rounded-2xl"
      >
        <canvas ref="radarCanvas" class="mx-auto"></canvas>
      </div>

      <h3 class="mx-auto text-2xl">您的風味測試結果屬於：</h3>
      <h4 class="mx-auto text-2xl">{{ persona.name }}</h4>
      <p class="mx-auto">{{ persona.description }}</p>

      <img
        :src="persona.image"
        alt=""
        class="w-1/2 mx-auto shadow-2xl hover:bg-white/20 transition-colors duration-500 rounded-2xl"
      />

      <h3 class="mx-auto">推薦商品：</h3>
      <div class="mx-auto flex justify-between gap-3">
        <a
          v-for="bean in persona.beans"
          :key="bean"
          href=""
          class="group/option relative flex items-center justify-center w-full sm:w-auto h-12 sm:h-14 px-4 sm:px-10 bg-white/20 text-white tracking-widest uppercase rounded-sm shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300"
        >
          {{ bean }}
          <span
            class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
          ></span>
          <span
            class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
          ></span>
        </a>
      </div>
    </div>
  </section>
  <section
    class="flex justify-around flex-wrap group relative mx-auto w-full max-w-3xl transform-gpu transition-transform duration-300 ease-out"
  >
    <button
      type="button"
      class="group/option relative flex items-center justify-center h-14 px-10 bg-white/20 text-white tracking-widest uppercase rounded-xl shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300 mt-3"
    >
      分享我的 Coffee ID
      <span
        class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
      ></span>
      <span
        class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
      ></span>
    </button>
    <button
      type="button"
      class="group/option relative flex items-center justify-center h-14 px-10 bg-white/20 text-white tracking-widest uppercase rounded-xl shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300 mt-3"
    >
      儲存我的 Coffee ID
      <span
        class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
      ></span>
      <span
        class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
      ></span>
    </button>
    <a
      href="/coffeeLabT1-T-P1"
      class="group/option relative flex items-center justify-center h-14 px-10 bg-white/20 text-white tracking-widest uppercase rounded-xl shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300 mt-3"
    >
      試試沖煮模擬器
      <span
        class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
      ></span>
      <span
        class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
      ></span>
    </a>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, watch } from 'vue';
  import {
    Chart,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import type { Scores } from '../views/CoffeeIdTest/type';

  const props = defineProps<{
    scores: Scores;
    answers?: any[];
    maxScores: Scores;
  }>();

  // 計算標準化分數
  const normalizedScores = computed(() => {
    return {
      acidity: Math.floor((props.scores.acidity / props.maxScores.acidity) * 100) || 0,
      sweetness: Math.floor((props.scores.sweetness / props.maxScores.sweetness) * 100) || 0,
      body: Math.floor((props.scores.body / props.maxScores.body) * 100) || 0,
      aftertaste: Math.floor((props.scores.aftertaste / props.maxScores.aftertaste) * 100) || 0,
      clarity: Math.floor((props.scores.clarity / props.maxScores.clarity) * 100) || 0,
    };
  });

  // 雷達圖
  Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const radarCanvas = ref<HTMLCanvasElement | null>(null);
  let radarChart: Chart | null = null;
  function renderRadar() {
    if (!radarCanvas.value) return;

    if (radarChart) {
      radarChart.destroy();
    }

    radarChart = new Chart(radarCanvas.value, {
      type: 'radar',
      data: {
        labels: ['酸味', '甜味', '醇厚度', '餘韻', '澄澈度'],
        datasets: [
          {
            label: 'Coffee Taste Score',
            data: [
              normalizedScores.value.acidity,
              normalizedScores.value.sweetness,
              normalizedScores.value.body,
              normalizedScores.value.aftertaste,
              normalizedScores.value.clarity,
            ],
            backgroundColor: 'rgba(162,175,155,0.4)',
            borderColor: 'rgba(91, 70, 54, 0.95)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(121,145,110,1)',
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { display: false, count: 5 },
            grid: { color: '#ccc' },
            angleLines: { color: '#bbb' },
            pointLabels: {
              font: { size: 14, weight: 'normal' },
              color: '#333',
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  watch(() => normalizedScores, renderRadar, { deep: true });

  onMounted(renderRadar);

  //拿到風味測試角色
  import { getPersona } from '@/utils/getPersona';
  const persona = computed(() => getPersona(normalizedScores)!);

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
        rgba(255,255,255,0.25),
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

<style scoped></style>
