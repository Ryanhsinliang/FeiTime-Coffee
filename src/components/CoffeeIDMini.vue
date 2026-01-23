<template>
  <div
    v-if="persona"
    class="w-full h-full flex flex-col items-center bg-gradient-to-br from-[#DCCFC0]/40 to-[#a2af9b]/30 rounded-xl p-4"
  >
    <!-- 縮小版雷達圖（上方） -->
    <div class="w-full max-w-[180px] aspect-square shrink-0">
      <canvas ref="radarCanvas"></canvas>
    </div>

    <!-- 名稱與描述（中間） -->
    <div class="flex flex-col items-center text-center px-4 py-3 flex-1">
      <p class="text-xs text-primary/40 mb-1">您的風味屬於</p>
      <h4 class="text-lg font-bold text-primary/80 mb-0.5">{{ persona.name }}</h4>
      <p class="text-xs text-primary/50 mb-2">{{ persona.en }}</p>
      <p class="text-sm text-primary/60 leading-relaxed">{{ persona.description }}</p>
    </div>

    <!-- Persona 圖片（下方） -->
    <div class="w-full max-w-[160px] shrink-0">
      <img
        :src="persona.image"
        :alt="persona.name"
        class="w-full h-auto object-contain rounded-xl shadow-md"
      />
    </div>
  </div>

  <!-- 無結果時顯示佔位符 -->
  <div
    v-else
    class="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-white/30 to-white/10 rounded-xl"
  >
    <span class="material-symbols-outlined text-7xl text-primary/20 font-extralight mb-2">
      psychology_alt
    </span>
    <p
      class="group text-sm text-primary/40 flex items-center gap-1 cursor-pointer hover:text-primary/70 transition-all"
      @click="goToQuiz"
    >
      前往 Coffee ID 測驗來了解你的偏好吧:D
      <span
        class="material-symbols-outlined text-sm group-hover:scale-110 transition-transform"
      >
        open_in_new
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Chart,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    ChartData,
  } from 'chart.js';
  import { useCoffeeResultStore } from '@/store/coffeeResult';
  import { getPersona } from '@/utils/getPersona';

  const router = useRouter();
  const coffeeResultStore = useCoffeeResultStore();

  const goToQuiz = () => {
    router.push('/coffee-id-test-card');
  };

  const normalizedScores = computed(() => {
    return (
      coffeeResultStore.normalizedScores || {
        acidity: 0,
        sweetness: 0,
        body: 0,
        aftertaste: 0,
        clarity: 0,
      }
    );
  });

  const hasValidScores = computed(() => {
    const scores = normalizedScores.value;
    return (
      scores.acidity > 0 ||
      scores.sweetness > 0 ||
      scores.body > 0 ||
      scores.aftertaste > 0 ||
      scores.clarity > 0
    );
  });

  const persona = computed(() => {
    if (!hasValidScores.value) return null;
    return getPersona({ value: normalizedScores.value });
  });

  Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

  const radarCanvas = ref<HTMLCanvasElement | null>(null);
  let radarChart: Chart | null = null;

  const chartData = computed<ChartData<'radar'>>(() => {
    return {
      labels: ['酸', '甜', '醇', '韻', '淨'],
      datasets: [
        {
          label: 'Coffee Score',
          data: [
            normalizedScores.value.acidity,
            normalizedScores.value.sweetness,
            normalizedScores.value.body,
            normalizedScores.value.aftertaste,
            normalizedScores.value.clarity,
          ],
          backgroundColor: 'rgba(162,175,155,0.4)',
          borderColor: 'rgba(91, 70, 54, 0.95)',
          borderWidth: 1.5,
          pointBackgroundColor: 'rgba(121,145,110,1)',
          pointRadius: 2,
        },
      ],
    };
  });

  const initChart = () => {
    if (!radarCanvas.value || !hasValidScores.value) return;
    if (radarChart) radarChart.destroy();
    radarChart = new Chart(radarCanvas.value, {
      type: 'radar',
      data: chartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { display: false, count: 5 },
            grid: { color: 'rgba(204, 204, 204, 0.5)' },
            angleLines: { color: 'rgba(187, 187, 187, 0.5)' },
            pointLabels: { font: { size: 12 }, color: '#555' },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  };

  watch(
    [chartData, hasValidScores],
    () => {
      nextTick(() => {
        if (hasValidScores.value) {
          initChart();
        }
      });
    },
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => {
      if (hasValidScores.value) {
        initChart();
      }
    });
  });
</script>
