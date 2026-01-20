<template>
  <section
    ref="idCard"
    @mousemove="handleMove"
    @mouseleave="reset"
    :style="cardStyle"
    class="group relative mx-auto w-full max-w-3xl transform-gpu transition-transform duration-300 ease-out"
  >
    <div class="pointer-events-none absolute inset-0 rounded-2xl z-20" :style="glowStyle"></div>
    <div
      class="relative z-10 w-full bg-[#DCCFC0]/60 backdrop-blur-md rounded-2xl p-5 min-h-[60vh] md:min-h-[70vh] shadow-lg flex flex-col gap-1"
    >
      <div class="p-5">
        <img class="h-10" src="" alt="" />
        <h2 class="text-3xl text-center font-cactus">您的 Coffee ID card</h2>
      </div>

      <div
        class="w-full max-w-sm mx-auto aspect-square shadow-2xl hover:bg-white/20 transition-colors duration-500 rounded-2xl"
      >
        <canvas ref="radarCanvas" class="mx-auto"></canvas>
      </div>

      <h3 class="mx-auto text-2xl font-cactus">您的風味測試結果屬於：</h3>
      <h4 class="mx-auto text-2xl font-bold">{{ persona?.name }}</h4>
      <p class="mx-auto px-6 text-center">{{ persona?.description }}</p>

      <img
        :src="persona?.image"
        alt="Persona Image"
        class="w-1/2 mx-auto my-3 shadow-2xl hover:bg-white/20 transition-colors duration-500 rounded-2xl"
      />

      <h3 class="mx-auto my-3">推薦商品：</h3>
      <div class="mx-auto flex flex-wrap justify-center gap-3 max-w-xl">
        <router-link
          v-for="(bean, index) in persona?.beans"
          :key="bean"
          :to="persona?.productPaths[index] || '#'"
          class="group/option relative inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-white/20 text-white text-sm sm:text-base tracking-wider uppercase rounded-sm shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300"
          style="white-space: nowrap"
        >
          {{ bean }}
          <span
            class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
          ></span>
          <span
            class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
          ></span>
        </router-link>
      </div>
    </div>
  </section>

  <section
    class="flex justify-around flex-wrap group relative mx-auto w-full max-w-3xl transform-gpu transition-transform duration-300 ease-out"
  >
    <button
      type="button"
      @click="handleMainShare"
      :disabled="isProcessing"
      class="group/option relative flex items-center justify-center h-14 px-10 bg-white/20 text-white tracking-widest uppercase rounded-xl shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300 mt-3"
    >
      {{ isProcessing ? '準備中...' : '分享我的 Coffee ID' }}
      <span
        class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
      ></span>
      <span
        class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
      ></span>
    </button>

    <button
      @click="saveIdCard"
      :disabled="isSaving"
      type="button"
      class="group/option relative flex items-center justify-center h-14 px-10 bg-white/20 text-white tracking-widest uppercase rounded-xl shadow-md backdrop-blur-sm overflow-hidden transition-all duration-300 mt-3"
    >
      {{ isSaving ? '儲存中...' : '儲存我的 Coffee ID' }}
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

  <div
    v-if="hint.show"
    class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-50"
  >
    {{ hint.message }}
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, watch, nextTick } from 'vue';
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
  import { useCoffeeResultStore } from '@/store/coffeeResult';
  import { getPersona } from '@/utils/getPersona';
  import html2canvas from 'html2canvas';

  const coffeeResultStore = useCoffeeResultStore();

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

  const persona = computed(() => {
    return getPersona({ value: normalizedScores.value });
  });

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
    if (radarChart) radarChart.destroy();

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
            pointLabels: { font: { size: 14 }, color: '#333' },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  watch(normalizedScores, renderRadar, { deep: true });
  onMounted(renderRadar);

  const idCard = ref<HTMLElement | null>(null);
  const cardStyle = ref('');
  const glowStyle = ref('');

  function handleMove(e: MouseEvent) {
    if (!idCard.value) return;
    const rect = idCard.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 4;

    cardStyle.value = `transform: perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px);`;
    glowStyle.value = `background: radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 45%);`;
  }

  function reset() {
    cardStyle.value = `transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0);`;
    glowStyle.value = '';
  }

  const isSaving = ref(false);
  const isProcessing = ref(false);
  const hint = ref({ show: false, message: '' });

  function showHint(message: string) {
    hint.value.message = message;
    hint.value.show = true;
    setTimeout(() => {
      hint.value.show = false;
    }, 3000);
  }

  const shareText = computed(() => {
    if (!persona.value) return '';
    return `我的 Coffee ID 是 ${persona.value.name}！
風味分數：酸:${normalizedScores.value.acidity}, 甜:${normalizedScores.value.sweetness}, 醇:${normalizedScores.value.body}...
來看看你的風味測試結果吧！`;
  });

  async function idCardToImage(): Promise<Blob | null> {
    if (!idCard.value) return null;
    const originalStyle = cardStyle.value;
    cardStyle.value = '';
    await nextTick();
    const canvas = await html2canvas(idCard.value, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
    cardStyle.value = originalStyle;
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
  }

  async function handleMainShare() {
    if (isProcessing.value) return;
    isProcessing.value = true;
    showHint('正在生成 Coffee ID 圖片...');

    try {
      const imageBlob = await idCardToImage();
      if (!imageBlob || !persona.value) throw new Error('生成失敗');

      const imageFile = new File([imageBlob], `coffee-id-${persona.value.name}.png`, {
        type: 'image/png',
      });

      if (navigator.share && navigator.canShare?.({ files: [imageFile] })) {
        await navigator.share({
          title: '我的 Coffee ID',
          text: shareText.value,
          files: [imageFile],
        });
      } else {
        const url = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `coffee-id-${persona.value.name}.png`;
        link.click();
        await navigator.clipboard.writeText(shareText.value);
        showHint('圖片已下載，文字已複製！');
      }
    } catch (error) {
      console.error(error);
      showHint('分享失敗，請點擊儲存圖片。');
    } finally {
      isProcessing.value = false;
    }
  }
  // 直接存圖片的功能
  // async function saveIdCard() {
  //   isSaving.value = true;
  //   try {
  //     const imageblob = await idCardToImage();
  //     if (!imageblob) {
  //       throw new Error('無法生成圖片');
  //     }
  //     const imageUrl = URL.createObjectURL(imageblob);
  //     const imageLink = document.createElement('a');
  //     imageLink.href = imageUrl;
  //     imageLink.download = `coffee-id-${persona.value.name}-${Date.now()}.png`;
  //     document.body.appendChild(imageLink);
  //     imageLink.click();
  //     document.body.removeChild(imageLink);
  //     URL.revokeObjectURL(imageUrl);
  //     showHint('圖片已儲存！');
  //   } catch (error) {
  //     console.error('儲存失敗:', error);
  //     showHint('儲存失敗！');
  //   } finally {
  //     isSaving.value = false;
  //   }
  // }
  async function saveIdCard() {
    if (isSaving.value || !persona.value) return;
    isSaving.value = true;
    try {
      await coffeeResultStore.saveToUserAccount({
        persona_name: persona.value.name,
        persona_image: persona.value.image,
        description: persona.value.description,
        normalizedScores: normalizedScores.value,
      });
      showHint('🎉 測驗結果已同步至您的個人帳號！');
    } catch (error: any) {
      showHint(`儲存失敗: ${error.message}`);
    } finally {
      isSaving.value = false;
    }
  }
</script>
