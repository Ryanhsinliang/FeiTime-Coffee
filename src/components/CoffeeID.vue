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
        class="w-1/2 mx-auto my-3 shadow-2xl hover:bg-white/20 transition-colors duration-500 rounded-2xl"
      />

      <h3 class="mx-auto my-3">推薦商品：</h3>
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
      @click="shareIdCard"
      :disabled="isSharing"
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
      @click="saveIdCard"
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
  <div
    v-if="showMenu"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="showMenu = false"
  >
    <div class="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-sm w-full shadow-2xl">
      <h3 class="text-2xl font-bold text-center mb-4 text-gray-800">分享到</h3>
      <div class="flex flex-col gap-3">
        <button
          @click="shareToFacebook"
          class="w-full py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
        >
          Facebook
        </button>
        <button
          @click="shareToLine"
          class="w-full py-3 px-4 bg-[#00B900] text-white rounded-lg hover:bg-[#00A000] transition-colors"
        >
          LINE
        </button>
        <button
          @click="shareToInstagram"
          class="w-full py-3 px-4 bg-[#ec28dc] text-white rounded-lg hover:bg-[#e071d7] transition-colors"
        >
          Instagram
        </button>
        <button
          @click="shareToX"
          class="w-full py-3 px-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A94DA] transition-colors"
        >
          X
        </button>
        <button
          @click="copyLink"
          class="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          複製連結
        </button>
        <button
          @click="showMenu = false"
          class="w-full py-3 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  </div>

  <!-- 提示訊息 -->
  <div
    v-if="hint.show"
    class="fixed top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-4 z-50 animate-fade-in"
  >
    <p class="text-gray-800">{{ hint.message }}</p>
  </div>
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
  import html2canvas from 'html2canvas';
  // import { blob } from 'stream/consumers';
  const persona = computed(() => getPersona(normalizedScores)!);

  // 卡片效果
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

    cardStyle.value = `
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
    cardStyle.value = `
        transform:
          perspective(1000px)
          rotateY(0deg)
          rotateX(0deg)
          translateY(0);
      `;
    glowStyle.value = '';
  }

  // 分享功能
  const isSharing = ref(false);
  const isSaving = ref(false);
  const isProcessing = ref(false);
  const showMenu = ref(false);
  const hint = ref({ show: true, message: '' });

  function showHint(message: string) {
    hint.value.message = message;
    hint.value.show = true;
    setTimeout(() => {
      hint.value.show = false;
    }, 2000);
  }

  const shareText = computed(() => {
    return `我的 Coffee ID 是 ${persona.value.name}！來看看你的風味測試結果吧！
       風味分數：
      酸味: ${normalizedScores.value.acidity}
      甜味: ${normalizedScores.value.sweetness}
      醇厚度: ${normalizedScores.value.body}
      餘韻: ${normalizedScores.value.aftertaste}
      澄澈度: ${normalizedScores.value.clarity}
      推薦商品: ${persona.value.beans.join(', ')}`;
  });

  async function idCardToImage(): Promise<Blob | null> {
    if (!idCard.value) return null;
    try {
      const originalStyle = cardStyle.value;
      cardStyle.value = '';

      const canvas = await html2canvas(idCard.value, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });
      cardStyle.value = originalStyle;
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    } catch (error) {
      console.log('CoffeeID截圖失敗', error);
      return null;
    }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  async function shareIdCard() {
    isSharing.value = true;
    showMenu.value = true;
    isSharing.value = false;
  }

  async function shareToFacebook() {
    isProcessing.value = true;
    showMenu.value = false;
    try {
      const imageblob = await idCardToImage();
      if (!imageblob) {
        showHint('圖片生成失敗');
        return;
      }
      const imageFile = new File([imageblob], 'coffee-id-card.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: '我的Coffee ID',
          text: shareText.value,
          files: [imageFile],
        });
        showHint('分享成功！');
      } else {
        const imageUrl = URL.createObjectURL(imageblob);
        const imageLink = document.createElement('a');
        imageLink.href = imageUrl;
        imageLink.download = `coffee-id-${persona.value.name}.png`;
        imageLink.click();
        URL.revokeObjectURL(imageUrl);
        await navigator.clipboard.writeText(shareText.value);

        showHint('現在開啟 Facebook～～');

        setTimeout(() => {
          window.open('https://www.facebook.com/', '_blank');
        }, 1500);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showHint('分享失敗，請稍後再試');
      }
    } finally {
      isProcessing.value = false;
    }
  }

  async function shareToLine() {
    isProcessing.value = true;
    showMenu.value = false;

    try {
      const imageblob = await idCardToImage();
      if (!imageblob) {
        showHint('圖片生成失敗');
        return;
      }

      // 1. 處理圖片下載 (因為無法直接把 Blob 塞進 LINE 連結)
      const imageUrl = URL.createObjectURL(imageblob);
      const imageLink = document.createElement('a');
      imageLink.href = imageUrl;
      imageLink.download = `coffee-id-${persona.value.name}.png`;
      document.body.appendChild(imageLink); // 相容性處理
      imageLink.click();
      document.body.removeChild(imageLink);

      // 2. 複製分享文字到剪貼簿 (讓使用者到 LINE 直接貼上)
      try {
        await navigator.clipboard.writeText(shareText.value);
        showHint('圖片已下載，文字已複製！');
      } catch (clipError) {
        console.error('剪貼簿功能失效', clipError);
      }

      // 3. 根據裝置跳轉 LINE
      setTimeout(() => {
        // 建議使用 LINE 官方的 Share 連結，相容性最高
        const encodedText = encodeURIComponent(shareText.value);
        const lineEndpoint = `https://social-plugins.line.me/lineit/share?text=${encodedText}`;

        if (isMobile) {
          // 行動裝置嘗試開啟 App
          window.location.href = lineEndpoint;
        } else {
          // 電腦版開啟新視窗
          window.open(lineEndpoint, '_blank');
        }

        URL.revokeObjectURL(imageUrl);
      }, 1200);
    } catch (error) {
      showHint('分享過程中發生錯誤');
      console.error(error);
    } finally {
      isProcessing.value = false;
    }
  }
  async function shareToInstagram() {
    isProcessing.value = true;
    showMenu.value = false;

    try {
      const imageblob = await idCardToImage();
      if (!imageblob) {
        showHint('圖片生成失敗');
        return;
      }
      const imageFile = new File([imageblob], 'coffee-id-card.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: '我的Coffee ID',
          text: shareText.value,
          files: [imageFile],
        });
        showHint('分享成功！');
      } else {
        const imageUrl = URL.createObjectURL(imageblob);
        const imageLink = document.createElement('a');
        imageLink.href = imageUrl;
        imageLink.download = `coffee-id-${persona.value.name}.png`;
        imageLink.click();
        URL.revokeObjectURL(imageUrl);

        await navigator.clipboard.writeText(shareText.value);
        showHint('開啟Instagram中～～');

        setTimeout(() => {
          if (isMobile) {
            window.location.href = 'instagram://';
          } else {
            window.open('https://www.instagram.com/', '_blank');
          }
        }, 1500);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showHint('分享失敗，請稍後再試～');
      }
    } finally {
      isProcessing.value = false;
    }
  }

  function shareToX() {
    const text = encodeURIComponent(
      `我的 Coffee ID 測試結果是「${persona.value.name}」！快來測試你的 Coffee ID！`
    );
    const componentUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${componentUrl}`,
      '_blank',
      'width=600,height=400'
    );
    showMenu.value = false;
    showHint('已開啟 Twitter 分享視窗');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showMenu.value = false;
      showHint('圖片連結已複製');
    } catch (error) {
      console.error('複製失敗:', error);
      showHint('複製失敗，請手動複製網址');
    }
  }
  // TODO:現在是直接儲存圖片，帶資料庫建好後要改成存到使用者帳號中
  async function saveIdCard() {
    isSaving.value = true;
    try {
      const imageblob = await idCardToImage();
      if (!imageblob) {
        throw new Error('無法生成圖片');
      }
      const imageUrl = URL.createObjectURL(imageblob);
      const imageLink = document.createElement('a');
      imageLink.href = imageUrl;
      imageLink.download = `coffee-id-${persona.value.name}-${Date.now()}.png`;
      document.body.appendChild(imageLink);
      imageLink.click();
      document.body.removeChild(imageLink);
      URL.revokeObjectURL(imageUrl);
      showHint('圖片已儲存！');
    } catch (error) {
      console.error('儲存失敗:', error);
      showHint('儲存失敗！');
    } finally {
      isSaving.value = false;
    }
  }
</script>

<style scoped></style>
