<template>
  <DEFAULT_MIN_VERSION>
    <section
      class="w-full max-w-3xl mx-auto bg-[rgba(238,238,238,0.8)] rounded-2xl p-5 min-h-[60vh] md:min-h-[70vh] shadow-lg flex flex-col gap-6"
    >
      <div class="p-5">
        <img class="h-10" src="" alt="" />
        <h2 class="text-3xl text-center">您的Coffee ID card</h2>
      </div>
      <div class="w-full max-w-sm mx-auto aspect-square">
        <canvas ref="radarCanvas" class="mx-auto"></canvas>
      </div>
      <h3 class="mx-auto text-2xl">您的風味測試結果屬於：</h3>
      <h4 class="mx-auto text-2xl">{{ persona.name }}</h4>
      <p class="mx-auto">{{ persona.description }}</p>
      <img :src="persona.image" alt="" class="w-1/2 mx-auto" />
      <h3 class="mx-auto">推薦商品：</h3>

      <div class="mx-auto flex justify-between gap-3">
        <a
          href=""
          v-for="bean in persona.beans"
          :key="bean"
          　class="p-2 rounded-md bg-[rgb(162,175,155)] hover:bg-[#dccfc0]"
        >
          {{ bean }}
        </a>
      </div>
    </section>
  </DEFAULT_MIN_VERSION>
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
  const props = defineProps<{ scores: Scores; answers?: any[]; maxScores: Scores }>();
  const normalizedScores = computed(() => {
    return {
      acidity: Math.floor((props.scores.acidity / props.maxScores.acidity) * 100),
      sweetness: Math.floor((props.scores.sweetness / props.maxScores.sweetness) * 100),
      body: Math.floor((props.scores.body / props.maxScores.body) * 100),
      aftertaste: Math.floor((props.scores.aftertaste / props.maxScores.aftertaste) * 100),
      clarity: Math.floor((props.scores.clarity / props.maxScores.clarity) * 100),
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
            label: 'Coffee Profile',
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
            ticks: { display: false },
            grid: { color: '#ccc' },
            angleLines: { color: '#bbb' },
            pointLabels: {
              font: { size: 14, weight: 'bold' },
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
</script>

<style scoped></style>
