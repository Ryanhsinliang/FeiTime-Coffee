<template>
  <div
    class="w-full flex flex-col bg-gradient-to-br from-[#f5f0e8]/60 to-[#e8dfd0]/40 rounded-xl p-5"
  >
    <!-- 頂部：標題 -->
    <div class="mb-4">
      <h4 class="text-base font-bold text-primary/80 truncate leading-tight">
        {{ log.title || '沖煮記錄' }}
      </h4>
    </div>

    <!-- 中間：五角圖與參數並排 -->
    <div class="flex gap-4 flex-1">
      <!-- 左側：五角圖 -->
      <div class="w-32 h-32 shrink-0">
        <canvas ref="radarCanvas"></canvas>
      </div>

      <!-- 右側：沖煮參數 -->
      <div class="flex-1 flex flex-col justify-center gap-3">
        <div class="flex items-center justify-between">
          <p class="text-xs text-primary/50">時間</p>
          <p class="text-base font-mono text-primary/70">{{ log.brew_time || '--' }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-primary/50">粉水比</p>
          <p class="text-base font-mono text-primary/70">{{ ratioDisplay }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-primary/50">萃取</p>
          <p
            class="text-base font-mono font-bold"
            :class="getExtractionColor(log.extraction_yield)"
          >
            {{ log.extraction_yield || '--' }}
          </p>
        </div>
        <!-- <div class="flex items-center justify-between">
          <p class="text-xs text-primary/50">均勻</p>
          <p class="text-base font-mono text-purple-700">{{ log.uniformity || '--' }}</p>
        </div> -->
      </div>
    </div>

    <!-- 咖啡小精靈的善意提醒（可展開收合） -->
    <div class="mt-4 pt-4 border-t border-primary/10">
      <button
        class="w-full flex items-center gap-2 text-left group"
        @click.stop="isExpanded = !isExpanded"
      >
        <div class="w-6 h-6 shrink-0">
          <CoffeeFairyIcon />
        </div>
        <p class="text-sm text-indigo-600 font-bold flex-1">小精靈提醒</p>
        <span
          v-if="hasFairyFeedback"
          class="material-symbols-outlined text-base text-primary/40 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
        >
          expand_more
        </span>
      </button>

      <!-- 展開的內容 -->
      <div
        v-if="hasFairyFeedback"
        class="overflow-hidden transition-all duration-300 ease-out"
        :class="isExpanded ? 'max-h-[500px] mt-3' : 'max-h-0'"
      >
        <p class="text-sm text-primary/60 leading-relaxed">
          {{ feedbackSummary }}
        </p>
        <p v-if="feedbackTastePrediction" class="text-xs text-orange-700 mt-2 italic">
          預測風味: {{ feedbackTastePrediction }}
        </p>
      </div>

      <!-- 無 AI 反饋時顯示烘焙資訊 -->
      <div v-if="!hasFairyFeedback" class="mt-2">
        <p class="text-sm text-primary/40">{{ log.bean_roast || '尚無提醒' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, nextTick, computed } from 'vue';
  import {
    Chart,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    type ChartData,
  } from 'chart.js';
  import type { BrewRecord } from '@/services/brewRecordService';
  import CoffeeFairyIcon from '@/components/common/CoffeeFairyIcon.vue';

  Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

  const props = defineProps<{
    log: BrewRecord;
  }>();

  const radarCanvas = ref<HTMLCanvasElement | null>(null);
  const isExpanded = ref(false);
  let radarChart: Chart | null = null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 解析 ai_feedback（可能是字串或物件）
  const parsedFeedback = computed(() => {
    const feedback = props.log.ai_feedback;
    if (!feedback) return null;

    // 如果是字串，嘗試解析為 JSON
    if (typeof feedback === 'string') {
      try {
        return JSON.parse(feedback);
      } catch {
        // 如果無法解析，當作純文字
        return { summary: feedback };
      }
    }

    // 如果已經是物件
    return feedback;
  });

  // 取得 summary
  const feedbackSummary = computed(() => {
    const parsed = parsedFeedback.value;
    if (!parsed) return '';
    return parsed.summary || '';
  });

  // 取得 taste_prediction
  const feedbackTastePrediction = computed(() => {
    const parsed = parsedFeedback.value;
    if (!parsed) return '';
    return parsed.taste_prediction || '';
  });

  // 是否有小精靈反饋
  const hasFairyFeedback = computed(() => {
    return !!feedbackSummary.value;
  });

  // 計算粉水比
  const ratioDisplay = computed(() => {
    if (!props.log.dose_weight || !props.log.total_water) return '--';
    const ratio = props.log.total_water / props.log.dose_weight;
    return `1:${ratio.toFixed(1)}`;
  });

  const getExtractionColor = (extraction: string | null) => {
    if (!extraction) return 'text-primary/50';
    const val = parseFloat(extraction);
    if (isNaN(val)) return 'text-primary/50';
    if (val > 0.25) return 'text-red-600';
    if (val < -0.25) return 'text-blue-600';
    return 'text-emerald-700';
  };

  const flavorData = computed(() => {
    const radar = props.log.flavor_radar;
    if (!radar) return [0, 0, 0, 0, 0];

    // 處理可能是字串的情況
    const parsed = typeof radar === 'string' ? JSON.parse(radar) : radar;

    return [
      parsed.sweetness || 0,
      parsed.acidity || 0,
      parsed.clarity || 0,
      parsed.body || 0,
      parsed.aftertaste || 0,
    ];
  });

  const chartData = computed<ChartData<'radar'>>(() => {
    return {
      labels: ['甜', '酸', '淨', '醇', '韻'],
      datasets: [
        {
          label: 'Flavor',
          data: flavorData.value,
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
          borderColor: '#8B4513',
          borderWidth: 2,
          pointBackgroundColor: '#8B4513',
          pointRadius: 3,
        },
      ],
    };
  });

  const initChart = () => {
    if (!radarCanvas.value) return;
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
            suggestedMax: 5,
            ticks: { display: false },
            grid: { color: 'rgba(139, 69, 19, 0.15)' },
            angleLines: { color: 'rgba(139, 69, 19, 0.15)' },
            pointLabels: { font: { size: 11 }, color: '#8d6e63' },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  };

  watch(
    () => props.log,
    () => {
      nextTick(() => initChart());
    },
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => initChart());
  });
</script>

<style scoped>
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 300,
      'GRAD' 0,
      'opsz' 20;
  }
</style>
