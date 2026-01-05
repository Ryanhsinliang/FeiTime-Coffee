<script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  import defaultAlbum from '@/views/HomePage/assets/default-album-cover.webp';
  import flavorFloral from '@/views/HomePage/assets/flavor-floral.webp';
  import flavorChocolate from '@/views/HomePage/assets/flavor-chocolate.webp';
  import flavorFruity from '@/views/HomePage/assets/flavor-fruity.webp';
  import flavorNutty from '@/views/HomePage/assets/flavor-nutty.webp';
  import {
    getMusicByFlavor,
    getRandomMusic,
    type YouTubeVideo,
  } from '@/services/homePage/flavorMusic';
  import type { Flavor } from '@/views/HomePage/type';

  // ============================================
  // 狀態管理
  // ============================================
  const selectedFlavor = ref<Flavor | null>(null);

  // 音樂推薦狀態
  const currentVideos = ref<YouTubeVideo[]>([]);
  const currentVideoIndex = ref<number>(0);
  const musicLoading = ref<boolean>(false);
  const musicError = ref<string | null>(null);
  const aiRecommendation = ref<string>('選擇風味，開始音樂之旅');

  // YouTube 播放器狀態
  const isPlaying = ref<boolean>(false);
  const vinylRotation = ref<number>(0);
  const lastPlaybackTime = ref<number>(0);
  const shouldAutoPlay = ref<boolean>(false); // 新增：標記是否應自動播放
  let animationFrameId: number | null = null;
  let youtubePlayer: any = null;
  let progressCheckInterval: number | null = null;

  // 風味列表
  const flavors = ref<Flavor[]>([
    {
      id: 'fruity',
      name: '果香',
      description: '明亮活潑',
      icon: 'nutrition',
      image: flavorFruity,
    },
    {
      id: 'floral',
      name: '花香',
      description: '優雅細緻',
      icon: 'local_florist',
      image: flavorFloral,
    },
    {
      id: 'nutty',
      name: '堅果',
      description: '溫暖醇厚',
      icon: 'grain',
      image: flavorNutty,
    },
    {
      id: 'chocolate',
      name: '巧克力',
      description: '濃郁深沉',
      icon: 'cake',
      image: flavorChocolate,
    },
  ]);

  // ============================================
  // 計算屬性
  // ============================================
  const currentVideo = computed(() => {
    if (currentVideos.value.length === 0) return null;
    return currentVideos.value[currentVideoIndex.value];
  });

  const embedUrl = computed(() => {
    if (!currentVideo.value) return '';
    const videoId = currentVideo.value.videoId;
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  });

  // ============================================
  // 黑膠旋轉動畫
  // ============================================
  const rotateVinyl = () => {
    if (isPlaying.value) {
      vinylRotation.value = (vinylRotation.value + 0.5) % 360;
      animationFrameId = requestAnimationFrame(rotateVinyl);
    }
  };

  watch(isPlaying, (newValue) => {
    if (newValue) {
      if (!animationFrameId) {
        rotateVinyl();
      }
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  });

  // ============================================
  // 播放進度檢查
  // ============================================
  const checkPlaybackProgress = () => {
    if (!youtubePlayer || !youtubePlayer.getCurrentTime) return;

    try {
      const currentTime = youtubePlayer.getCurrentTime();
      const duration = youtubePlayer.getDuration();

      if (currentTime && duration && currentTime !== lastPlaybackTime.value) {
        const timeDiff = Math.abs(currentTime - lastPlaybackTime.value);

        if (timeDiff > 2) {
          const rotationPerSecond = 30;
          const angleDiff = timeDiff * rotationPerSecond;

          if (currentTime > lastPlaybackTime.value) {
            vinylRotation.value = (vinylRotation.value + angleDiff) % 360;
          } else {
            vinylRotation.value = (vinylRotation.value - angleDiff + 360) % 360;
          }
        }

        lastPlaybackTime.value = currentTime;
      }
    } catch (err) {
      console.warn('⚠️ Error checking playback progress:', err);
    }
  };

  // ============================================
  // YouTube API 初始化
  // ============================================
  const initYouTubeAPI = () => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        console.log('✅ YouTube IFrame API ready');
      };
    }
  };

  watch(embedUrl, (newUrl) => {
    if (progressCheckInterval) {
      clearInterval(progressCheckInterval);
      progressCheckInterval = null;
    }

    if (newUrl) {
      isPlaying.value = false;
      lastPlaybackTime.value = 0;

      setTimeout(() => {
        const iframe = document.querySelector('iframe');

        if (iframe && (window as any).YT && (window as any).YT.Player) {
          try {
            youtubePlayer = new (window as any).YT.Player(iframe, {
              events: {
                onStateChange: (event: any) => {
                  const wasPlaying = isPlaying.value;
                  isPlaying.value = event.data === 1;

                  if (isPlaying.value && !wasPlaying) {
                    lastPlaybackTime.value = youtubePlayer.getCurrentTime() || 0;
                  }
                },
                onReady: (event: any) => {
                  console.log('✅ YouTube player ready');
                  progressCheckInterval = window.setInterval(checkPlaybackProgress, 500);

                  // 如果標記為應自動播放，則自動播放
                  if (shouldAutoPlay.value) {
                    console.log('🎵 Auto-playing video...');
                    try {
                      event.target.playVideo();
                      shouldAutoPlay.value = false; // 重置標記
                    } catch (err) {
                      console.warn('⚠️ Auto-play failed:', err);
                    }
                  }
                },
              },
            });
          } catch (err) {
            console.error('❌ Failed to initialize YouTube player:', err);
          }
        }
      }, 1000);
    }
  });

  // ============================================
  // 音樂推薦方法
  // ============================================
  const selectFlavor = async (flavor: Flavor): Promise<void> => {
    selectedFlavor.value = flavor;

    try {
      musicLoading.value = true;
      musicError.value = null;
      isPlaying.value = false;
      lastPlaybackTime.value = 0;
      shouldAutoPlay.value = true; // 設定自動播放

      const data = await getMusicByFlavor({
        flavorId: flavor.id,
        flavorName: flavor.name,
        description: flavor.description,
      });

      if (data.success && data.videos.length > 0) {
        currentVideos.value = data.videos;
        currentVideoIndex.value = 0;
        aiRecommendation.value = data.recommendation;
      } else {
        shouldAutoPlay.value = false; // 失敗時取消自動播放
        throw new Error(data.message || '暫時無法找到相關音樂');
      }
    } catch (err: any) {
      console.error('❌ Music recommendation error:', err);
      musicError.value = err.message || '無法取得推薦，請稍後再試';
      currentVideos.value = [];
      aiRecommendation.value = '選擇風味，開始音樂之旅';
      shouldAutoPlay.value = false; // 失敗時取消自動播放
    } finally {
      musicLoading.value = false;
    }
  };

  const nextRecommendation = async (): Promise<void> => {
    // 如果還有下一首歌曲在當前列表中
    if (currentVideoIndex.value < currentVideos.value.length - 1) {
      currentVideoIndex.value++;
      isPlaying.value = false;
      lastPlaybackTime.value = 0;
      shouldAutoPlay.value = true; // 設定自動播放
      return;
    }

    // 需要獲取新的音樂推薦
    if (!selectedFlavor.value) return;

    try {
      musicLoading.value = true;
      musicError.value = null;
      shouldAutoPlay.value = true; // 設定自動播放

      const data = await getRandomMusic({
        currentFlavorName: selectedFlavor.value.name,
      });

      if (data.success && data.videos.length > 0) {
        currentVideos.value = data.videos;
        currentVideoIndex.value = 0;
        isPlaying.value = false;
        lastPlaybackTime.value = 0;
        aiRecommendation.value = data.recommendation || aiRecommendation.value;
      } else {
        shouldAutoPlay.value = false; // 失敗時取消自動播放
        throw new Error(data.message || '暫時無法找到更多音樂');
      }
    } catch (err: any) {
      console.error('❌ Next recommendation error:', err);
      musicError.value = '無法取得更多推薦';
      shouldAutoPlay.value = false; // 失敗時取消自動播放
    } finally {
      musicLoading.value = false;
    }
  };

  // ============================================
  // 生命週期
  // ============================================
  onMounted(() => {
    initYouTubeAPI();
  });

  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (progressCheckInterval) {
      clearInterval(progressCheckInterval);
    }
  });
</script>

<template>
  <section
    class="bg-sage text-text-dark font-display flex items-center justify-center py-8 px-4 lg:py-12 lg:px-8 overflow-x-hidden transition-colors duration-300"
  >
    <div
      class="w-full max-w-[1200px] bg-[#FAF9EE] rounded-4xl overflow-hidden flex flex-col relative"
    >
      <!-- Header Section with Vinyl and Video -->
      <div
        class="relative z-10 w-full flex flex-col lg:flex-row p-8 lg:px-10 lg:py-6 gap-8 lg:gap-20 items-center"
      >
        <!-- Vinyl Record -->
        <div class="flex-shrink-0 flex items-center justify-center relative p-8 lg:p-12">
          <div class="relative animate-float">
            <div
              class="vinyl-disc relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full shadow-[0_25px_60px_rgba(162,175,155,0.5)] border-[3px] border-[#A2AF9B]/40 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm"
              :style="{ transform: `rotate(${vinylRotation}deg)` }"
            >
              <!-- 黑膠容器背景 -->
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8F5E9]/30 via-transparent to-[#C8D6C5]/20"
              ></div>

              <!-- 液體容器 - 反向旋轉保持水平 -->
              <div
                class="liquid-container absolute inset-0 rounded-full overflow-hidden"
                :class="{ 'liquid-container-active': isPlaying }"
                :style="{ transform: `rotate(-${vinylRotation}deg)` }"
              >
                <!-- 液體本體 -->
                <div class="liquid-body">
                  <!-- 液體表面波動 -->
                  <svg class="liquid-wave" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop
                          offset="0%"
                          style="stop-color: rgba(162, 175, 155, 0.7); stop-opacity: 1"
                        />
                        <stop
                          offset="50%"
                          style="stop-color: rgba(182, 195, 175, 0.6); stop-opacity: 1"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: rgba(139, 158, 135, 0.8); stop-opacity: 1"
                        />
                      </linearGradient>
                    </defs>

                    <!-- 液體主體 -->
                    <path
                      class="wave-path wave-back"
                      d="M0,150 Q75,130 150,150 T300,150 L300,300 L0,300 Z"
                      fill="url(#liquidGradient)"
                      opacity="0.6"
                    />
                    <path
                      class="wave-path wave-front"
                      d="M0,150 Q75,170 150,150 T300,150 L300,300 L0,300 Z"
                      fill="url(#liquidGradient)"
                      opacity="0.8"
                    />
                  </svg>

                  <!-- 液體光澤 -->
                  <div class="liquid-shine"></div>

                  <!-- 液體氣泡 -->
                  <div class="bubble bubble-1"></div>
                  <div class="bubble bubble-2"></div>
                  <div class="bubble bubble-3"></div>
                </div>
              </div>

              <!-- FeiTime 環繞文字 -->
              <div class="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 300 300" class="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                    />
                  </defs>
                  <text
                    class="circular-text"
                    fill="#A2AF9B"
                    font-size="16"
                    font-weight="bold"
                    letter-spacing="8"
                    font-family="serif"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      FeiTime • It's Coffee Time •
                    </textPath>
                  </text>
                </svg>
              </div>

              <!-- 中心標籤 -->
              <div
                class="w-1/3 h-1/3 rounded-full flex items-center justify-center border-[8px] lg:border-[10px] border-[#A2AF9B]/60 shadow-[0_0_20px_rgba(162,175,155,0.4),inset_0_2px_10px_rgba(0,0,0,0.1)] relative overflow-hidden backdrop-blur-sm z-10 bg-[#FAF9EE]/90"
              >
                <!-- 專輯封面背景 -->
                <div
                  class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
                  :style="{
                    backgroundImage: currentVideo?.thumbnail
                      ? `url('${currentVideo.thumbnail}')`
                      : `url('${defaultAlbum}')`,
                  }"
                ></div>

                <!-- 中心圓點 -->
                <div class="relative z-10">
                  <div class="w-3 h-3 lg:w-4 lg:h-4 bg-[#A2AF9B] rounded-full shadow-inner"></div>
                </div>

                <!-- 標籤紋理 -->
                <div
                  class="absolute inset-0 rounded-full opacity-30 mix-blend-overlay pointer-events-none"
                  style="
                    background: radial-gradient(
                      circle at 30% 30%,
                      rgba(255, 255, 255, 0.3) 0%,
                      transparent 50%
                    );
                  "
                ></div>
              </div>
            </div>

            <!-- 唱針 -->
            <div
              class="absolute -top-2 -right-6 w-14 h-36 border-l-8 border-t-8 border-[#A2AF9B]/40 rounded-tl-3xl pointer-events-none hidden lg:block origin-top-right rotate-12"
            ></div>
          </div>
        </div>

        <!-- Video and AI DJ Panel -->
        <div class="flex-1 w-full flex flex-col gap-5 justify-center">
          <!-- Video Player -->
          <div
            class="w-full relative shadow-xl rounded-2xl overflow-hidden bg-black aspect-video ring-1 ring-black/5"
          >
            <!-- YouTube Iframe -->
            <iframe
              v-if="embedUrl && !musicLoading && !musicError"
              :src="embedUrl"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>

            <!-- Loading State -->
            <div
              v-else-if="musicLoading"
              class="absolute inset-0 flex items-center justify-center bg-gray-900"
            >
              <div class="flex flex-col items-center gap-6">
                <div class="relative w-48 h-16 overflow-hidden">
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 200 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color: #4ade80; stop-opacity: 0" />
                        <stop offset="50%" style="stop-color: #4ade80; stop-opacity: 1" />
                        <stop offset="100%" style="stop-color: #4ade80; stop-opacity: 0" />
                      </linearGradient>
                    </defs>
                    <path
                      class="ecg-line"
                      d="M0,30 L40,30 L45,10 L50,50 L55,30 L60,30 L65,25 L70,35 L75,30 L200,30"
                      fill="none"
                      stroke="url(#ecgGradient)"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p class="text-white text-sm">正在為您尋找音樂...</p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="musicError"
              class="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur"
            >
              <div class="text-center p-6">
                <span class="material-symbols-outlined text-red-400 text-5xl mb-2">error</span>
                <p class="text-white text-sm mb-4">{{ musicError }}</p>
                <button
                  v-if="selectedFlavor"
                  @click="selectFlavor(selectedFlavor)"
                  class="px-4 py-2 bg-white/20 rounded-lg text-white text-xs hover:bg-white/30 transition"
                >
                  重試
                </button>
              </div>
            </div>

            <!-- Default State -->
            <div v-else class="group">
              <div
                class="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                :style="{
                  backgroundImage: `url('${currentVideo?.thumbnail || defaultAlbum}')`,
                }"
              ></div>
              <div
                class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4"
              >
                <h3 class="text-white text-base font-medium tracking-wide truncate pr-8">
                  選擇風味開始播放
                </h3>
              </div>
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class="w-14 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300"
                >
                  <span class="material-symbols-outlined text-white text-2xl">play_arrow</span>
                </div>
              </div>
            </div>

            <!-- Video Title Overlay -->
            <div
              v-if="currentVideo && !musicLoading && !musicError"
              class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4"
            >
              <h3 class="text-white text-base font-medium tracking-wide truncate pr-8">
                {{ currentVideo.title }}
              </h3>
              <p class="text-white/70 text-xs mt-1">{{ currentVideo.channelTitle }}</p>
            </div>
          </div>

          <!-- AI DJ Panel -->
          <div
            class="glass-panel p-3 lg:p-4 rounded-xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-row items-center justify-between gap-4 w-full"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="w-10 h-10 rounded-full bg-sage flex-shrink-0 flex items-center justify-center text-white shadow-md relative"
              >
                <span
                  v-if="!musicError && !musicLoading"
                  class="absolute inset-0 rounded-full bg-sage animate-ping opacity-20"
                ></span>
                <span class="material-symbols-outlined text-xl text-[#171412]">
                  {{ musicError ? 'error' : 'smart_toy' }}
                </span>
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wider text-sage whitespace-nowrap"
                  >
                    AI DJ
                  </span>
                  <span
                    v-if="!musicError && !musicLoading"
                    class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  ></span>
                </div>
                <span class="text-sm font-bold text-[#171412] leading-tight truncate">
                  推薦:{{ aiRecommendation }}
                </span>
              </div>
            </div>
            <button
              @click="nextRecommendation"
              :disabled="musicLoading || !selectedFlavor || musicError !== null"
              class="flex items-center justify-center gap-2 bg-[#171412] text-[#FAF9EE] px-4 py-2 rounded-lg hover:bg-[#DCCFC0] hover:text-[#171412] transition-all duration-300 shadow-md hover:shadow-lg group flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="text-xs font-bold tracking-wide hidden sm:inline">Next</span>
              <span
                class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform"
              >
                skip_next
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Coffee Flavor Selection -->
      <div class="relative z-10 w-full p-8 lg:px-10 lg:py-6">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          <div class="flex flex-col items-start gap-2 min-w-[200px] shrink-0">
            <h2 class="text-[#171412] text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
              今天我想
              <br />
              選擇的風味是:
            </h2>
            <div class="flex items-center gap-2">
              <span class="h-1 w-6 bg-[#A2AF9B] rounded-full"></span>
              <p class="text-[#A2AF9B] text-xs font-medium">AI 將為您調配專屬歌單</p>
            </div>
          </div>

          <!-- Flavor Buttons -->
          <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            <button
              v-for="flavor in flavors"
              :key="flavor.id"
              @click="selectFlavor(flavor)"
              :class="[
                'group relative h-28 sm:h-32 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1',
                selectedFlavor?.id === flavor.id ? 'ring-2 ring-sage/50' : '',
              ]"
            >
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 rounded-xl"
                :style="{ backgroundImage: `url('${flavor.image}')` }"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"
              ></div>
              <div class="absolute inset-0 p-3 flex flex-col justify-end items-start text-left">
                <h3 class="text-white text-base font-bold leading-none mb-0.5">
                  {{ flavor.name }}
                </h3>
                <span class="text-white/80 text-[10px]">{{ flavor.description }}</span>
              </div>
              <div
                class="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-sage group-hover:scale-110 transition-all"
              >
                <span class="material-symbols-outlined text-xs">{{ flavor.icon }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="text-center mt-6">
          <p class="text-[10px] text-[#171412]/40 font-mono">
            Powered by Coffee & Beats AI Engine v2.0
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* 環繞文字樣式 */
  .circular-text {
    text-transform: uppercase;
    fill: #a2af9b;
    opacity: 0.8;
  }

  /* 液體容器 */
  .liquid-container {
    transition: transform 0.1s linear;
  }

  .liquid-body {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* 液體波浪 SVG */
  .liquid-wave {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  /* 波浪路徑 - 預設靜止 */
  .wave-path {
    transition: d 0.3s ease;
  }

  /* 後層波浪動畫 - 只在播放時啟動 */
  .liquid-container-active .wave-back {
    animation: wave-back 3s ease-in-out infinite;
  }

  /* 前層波浪動畫 - 只在播放時啟動 */
  .liquid-container-active .wave-front {
    animation: wave-front 2.5s ease-in-out infinite;
  }

  @keyframes wave-back {
    0%,
    100% {
      d: path('M0,150 Q75,130 150,150 T300,150 L300,300 L0,300 Z');
    }
    25% {
      d: path('M0,150 Q75,145 150,135 T300,150 L300,300 L0,300 Z');
    }
    50% {
      d: path('M0,150 Q75,155 150,165 T300,150 L300,300 L0,300 Z');
    }
    75% {
      d: path('M0,150 Q75,140 150,145 T300,150 L300,300 L0,300 Z');
    }
  }

  @keyframes wave-front {
    0%,
    100% {
      d: path('M0,150 Q75,170 150,150 T300,150 L300,300 L0,300 Z');
    }
    25% {
      d: path('M0,150 Q75,155 150,165 T300,150 L300,300 L0,300 Z');
    }
    50% {
      d: path('M0,150 Q75,165 150,140 T300,150 L300,300 L0,300 Z');
    }
    75% {
      d: path('M0,150 Q75,160 150,155 T300,150 L300,300 L0,300 Z');
    }
  }

  /* 液體光澤效果 */
  .liquid-shine {
    position: absolute;
    top: 45%;
    left: -10%;
    width: 120%;
    height: 30%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.3) 70%,
      transparent 100%
    );
    border-radius: 50%;
    filter: blur(8px);
    pointer-events: none;
  }

  /* 光澤動畫 - 只在播放時啟動 */
  .liquid-container-active .liquid-shine {
    animation: shine-move 4s ease-in-out infinite;
  }

  @keyframes shine-move {
    0%,
    100% {
      transform: translateX(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateX(10%) scale(1.1);
      opacity: 0.8;
    }
  }

  /* 液體氣泡 */
  .bubble {
    position: absolute;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }

  .bubble-1 {
    width: 8px;
    height: 8px;
    left: 35%;
    bottom: 10%;
  }

  .bubble-2 {
    width: 6px;
    height: 6px;
    left: 55%;
    bottom: 15%;
  }

  .bubble-3 {
    width: 10px;
    height: 10px;
    left: 45%;
    bottom: 5%;
  }

  /* 氣泡動畫 - 只在播放時啟動 */
  .liquid-container-active .bubble-1 {
    animation: bubble-rise 3s ease-in-out infinite;
  }

  .liquid-container-active .bubble-2 {
    animation: bubble-rise 3.5s ease-in-out infinite 0.5s;
  }

  .liquid-container-active .bubble-3 {
    animation: bubble-rise 4s ease-in-out infinite 1s;
  }

  @keyframes bubble-rise {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-120px) scale(0.5);
      opacity: 0;
    }
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .ecg-line {
    stroke-dasharray: 200;
    stroke-dashoffset: 400;
    animation: ecg-pulse 1.5s ease-in-out infinite;
  }

  @keyframes ecg-pulse {
    0% {
      stroke-dashoffset: 400;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>
