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
  import feiDJ from '@/views/HomePage/assets/fei-DJ.webp';
  import type { Flavor } from '@/views/HomePage/type';

  // ============================================
  // YouTube IFrame API 類型定義
  // ============================================
  interface YTPlayer {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    loadVideoById(videoId: string): void;
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): number;
    destroy(): void;
  }

  interface YTPlayerEvent {
    target: YTPlayer;
    data: number;
  }

  interface YTPlayerOptions {
    height: string;
    width: string;
    videoId: string;
    playerVars?: {
      autoplay?: 0 | 1;
      controls?: 0 | 1;
      rel?: 0 | 1;
      modestbranding?: 0 | 1;
      playsinline?: 0 | 1;
    };
    events: {
      onStateChange?: (event: YTPlayerEvent) => void;
      onReady?: (event: YTPlayerEvent) => void;
      onError?: (event: any) => void;
    };
  }

  interface YT {
    Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  }

  interface WindowWithYT extends Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }

  declare const window: WindowWithYT;

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
  const isFetchingNext = ref<boolean>(false); // 正在獲取下一輪推薦

  // YouTube 播放器狀態
  const isPlaying = ref<boolean>(false);
  const vinylRotation = ref<number>(0);
  const lastPlaybackTime = ref<number>(0);
  const ytAPIReady = ref<boolean>(false);
  const playerReady = ref<boolean>(false);
  const isLoadingVideo = ref<boolean>(false);
  const isMobileDevice = ref<boolean>(false);
  const userInteracted = ref<boolean>(false);
  const isMouseMoving = ref<boolean>(false);
  let mouseIdleTimer: number | null = null;

  let animationFrameId: number | null = null;
  let youtubePlayer: YTPlayer | null = null;
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
      icon: 'deployed_code',
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

  // ============================================
  // 黑膠旋轉動畫
  // ============================================
  const rotateVinyl = () => {
    // 只有在播放且不在 loading 狀態時才旋轉
    if (isPlaying.value && !musicLoading.value) {
      vinylRotation.value = (vinylRotation.value + 0.5) % 360;
      // 液體容器不旋轉，始終保持在底部
      animationFrameId = requestAnimationFrame(rotateVinyl);
    }
  };

  watch(isPlaying, (newValue) => {
    if (newValue && !musicLoading.value) {
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

  // 監聽 musicLoading 變化，確保 loading 時停止旋轉
  watch(musicLoading, (newValue) => {
    if (newValue && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else if (!newValue && isPlaying.value && !animationFrameId) {
      rotateVinyl();
    }
  });

  // ============================================
  // 播放進度檢查 - 檢測快進/後退並調整黑膠角度
  // ============================================
  const checkPlaybackProgress = () => {
    if (!isPlayerAvailable()) return;

    try {
      const currentTime = youtubePlayer!.getCurrentTime();

      if (currentTime && lastPlaybackTime.value > 0) {
        // 計算時間差（秒）
        const timeDiff = currentTime - lastPlaybackTime.value;

        // 如果時間差大於 1.5 秒（考慮到 500ms 檢查間隔），認為是快進/後退
        if (Math.abs(timeDiff) > 1.5) {
          // 根據時間差計算角度變化
          // 設定：1 秒 = 36 度（可以調整這個比例來改變轉動幅度）
          const angleDelta = timeDiff * 36;

          // 調整黑膠角度 - 確保結果始終為正數（0-359）
          vinylRotation.value = (((vinylRotation.value + angleDelta) % 360) + 360) % 360;

          // 液體容器不調整角度，始終保持在底部（0度）
        }
      }

      // 更新時間記錄
      if (currentTime) {
        lastPlaybackTime.value = currentTime;
      }
    } catch (err) {
      console.warn('⚠️ Error checking playback progress:', err);
    }
  };

  // ============================================
  // YouTube API 初始化與等待
  // ============================================
  const waitForYouTubeAPI = (): Promise<void> => {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        ytAPIReady.value = true;
        resolve();
      } else {
        window.onYouTubeIframeAPIReady = () => {
          ytAPIReady.value = true;
          resolve();
        };
      }
    });
  };

  const initYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  };

  // 檢測是否為移動裝置
  const detectMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // ============================================
  // 播放器管理 - 完全重構版本
  // ============================================

  // 檢查播放器是否真正可用
  const isPlayerAvailable = (): boolean => {
    return !!(
      youtubePlayer &&
      playerReady.value &&
      typeof youtubePlayer.loadVideoById === 'function' &&
      typeof youtubePlayer.playVideo === 'function' &&
      typeof youtubePlayer.pauseVideo === 'function'
    );
  };

  const destroyPlayer = () => {
    if (progressCheckInterval) {
      clearInterval(progressCheckInterval);
      progressCheckInterval = null;
    }

    if (youtubePlayer) {
      try {
        if (typeof youtubePlayer.destroy === 'function') {
          youtubePlayer.destroy();
        }
      } catch (err) {
        console.warn('⚠️ Error destroying player:', err);
      } finally {
        youtubePlayer = null;
        playerReady.value = false;
      }
    }
  };

  const initializePlayer = async (videoId: string) => {
    if (!window.YT || !window.YT.Player) {
      console.error('❌ YouTube API not ready');
      return;
    }

    if (!videoId) {
      console.error('❌ No video ID provided');
      return;
    }

    try {
      // 確保容器存在
      const container = document.getElementById('youtube-player-container');
      if (!container) {
        console.error('❌ Player container not found');
        return;
      }

      // 清空容器
      container.innerHTML = '<div id="youtube-player"></div>';

      // 等待一小段時間確保 DOM 已更新
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 再次檢查容器
      const playerElement = document.getElementById('youtube-player');
      if (!playerElement) {
        console.error('❌ Player element not found after DOM update');
        return;
      }

      youtubePlayer = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: isMobileDevice.value ? 0 : 1, // 移動裝置不自動播放，改用手動觸發
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1, // iOS 需要這個參數避免全螢幕播放
        },
        events: {
          onStateChange: (event: YTPlayerEvent) => {
            const stateNames: Record<number, string> = {
              '-1': 'unstarted',
              '0': 'ended',
              '1': 'playing',
              '2': 'paused',
              '3': 'buffering',
              '5': 'cued',
            };

            // YouTube Player States
            // -1: unstarted
            // 0: ended
            // 1: playing
            // 2: paused
            // 3: buffering
            // 5: video cued

            const wasPlaying = isPlaying.value;

            // 更新播放狀態
            isPlaying.value = event.data === 1;

            // 更新 loading 狀態
            // 只在 buffering 時顯示 loading，unstarted 不算（避免初始化時閃爍）
            if (event.data === 3) {
              isLoadingVideo.value = true;
            } else if (event.data === 1 || event.data === 2 || event.data === 5) {
              // playing, paused, or cued - 清除 loading
              isLoadingVideo.value = false;
            }

            // 當開始播放時，初始化播放時間
            if (event.data === 1 && !wasPlaying) {
              lastPlaybackTime.value = event.target.getCurrentTime() || 0;
            }

            // 當暫停時
            if (event.data === 2) {
            }

            // 如果影片結束，自動播放下一首
            if (event.data === 0) {
              isPlaying.value = false;
              setTimeout(() => nextRecommendation(), 1000);
            }
          },
          onReady: (event: YTPlayerEvent) => {
            // 關鍵修復：先更新播放器引用
            youtubePlayer = event.target;

            // 等待一小段時間確保播放器完全附加到 DOM
            setTimeout(() => {
              // 再次確認播放器仍然存在
              if (!youtubePlayer) {
                console.error('❌ Player lost after onReady');
                return;
              }

              // 現在才設置 playerReady，確保其他代碼不會過早調用 API
              playerReady.value = true;

              // 移動裝置需要手動觸發播放
              if (isMobileDevice.value && userInteracted.value) {
                try {
                  youtubePlayer.playVideo();
                } catch (err) {
                  console.warn('⚠️ Auto-play blocked on mobile:', err);
                }
              }

              // 開始進度檢查
              if (progressCheckInterval) {
                clearInterval(progressCheckInterval);
              }
              progressCheckInterval = window.setInterval(checkPlaybackProgress, 500);
            }, 200);
          },
          onError: (event: any) => {
            console.error('❌ YouTube player error:', event.data);
            const errorMessages: Record<number, string> = {
              2: '無效的影片 ID',
              5: 'HTML5 播放器錯誤',
              100: '影片不存在或已被刪除',
              101: '影片所有者不允許嵌入',
              150: '影片所有者不允許嵌入',
            };
            musicError.value = errorMessages[event.data] || '影片載入失敗，請重試';
            playerReady.value = false;
            isLoadingVideo.value = false;

            // 自動跳到下一首
            setTimeout(() => nextRecommendation(), 2000);
          },
        },
      });
    } catch (err) {
      console.error('❌ Failed to initialize YouTube player:', err);
      musicError.value = '播放器初始化失敗';
      playerReady.value = false;
      isLoadingVideo.value = false;
    }
  };

  // ============================================
  // 切換影片 - 核心改進
  // ============================================
  const loadVideo = async (videoId: string) => {
    if (!videoId) {
      console.error('❌ No video ID provided');
      return;
    }

    musicError.value = null;

    // 如果播放器已經存在且準備好，直接切換影片
    if (isPlayerAvailable()) {
      try {
        // 先重置播放時間，但保持旋轉角度
        lastPlaybackTime.value = 0;

        // 等待下一個 tick 確保 DOM 已更新
        await new Promise((resolve) => setTimeout(resolve, 50));

        // 再次檢查播放器是否仍然可用
        if (!isPlayerAvailable()) {
          throw new Error('Player no longer available');
        }

        // 使用 loadVideoById 並自動播放
        youtubePlayer!.loadVideoById(videoId);

        // 移動裝置需要手動觸發播放
        if (isMobileDevice.value) {
          // 等待影片載入完成後再播放
          setTimeout(() => {
            if (isPlayerAvailable()) {
              try {
                youtubePlayer!.playVideo();
              } catch (err) {
                console.warn('⚠️ Failed to trigger playback:', err);
              }
            }
          }, 500);
        }

        // onStateChange 會處理所有狀態更新

        return;
      } catch (err) {
        console.error('❌ Failed to load video, reinitializing player:', err);
        // 如果切換失敗，銷毀並重建播放器
        destroyPlayer();
      }
    }

    // 如果播放器不存在或出錯，重新初始化
    isLoadingVideo.value = true;
    isPlaying.value = false;
    lastPlaybackTime.value = 0;

    destroyPlayer();

    await waitForYouTubeAPI();
    await new Promise((resolve) => setTimeout(resolve, 300));

    initializePlayer(videoId);
  };

  // ============================================
  // 監聽當前影片變化
  // ============================================
  watch(currentVideo, async (newVideo, oldVideo) => {
    if (newVideo && newVideo.videoId !== oldVideo?.videoId) {
      await loadVideo(newVideo.videoId);
    }
  });

  // ============================================
  // 音樂推薦方法
  // ============================================
  const selectFlavor = async (flavor: Flavor): Promise<void> => {
    selectedFlavor.value = flavor;

    // 標記使用者已互動（用於移動裝置播放）
    userInteracted.value = true;

    try {
      musicLoading.value = true;
      musicError.value = null;

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
        throw new Error(data.message || '暫時無法找到相關音樂');
      }
    } catch (err) {
      console.error('❌ Music recommendation error:', err);
      musicError.value = err instanceof Error ? err.message : '無法取得推薦,請稍後再試';
      currentVideos.value = [];
      aiRecommendation.value = '選擇風味，開始音樂之旅';
    } finally {
      musicLoading.value = false;
    }
  };

  const nextRecommendation = async (): Promise<void> => {
    // 清除之前的錯誤，允許重試
    musicError.value = null;

    // 如果還有下一首歌曲在當前列表中
    if (currentVideoIndex.value < currentVideos.value.length - 1) {
      // 直接切換到下一首
      currentVideoIndex.value++;
      return;
    }

    // 需要獲取新的音樂推薦
    if (!selectedFlavor.value) {
      console.warn('⚠️ No flavor selected');
      return;
    }

    // 防止重複請求
    if (isFetchingNext.value) {
      console.warn('⚠️ Already fetching next recommendations');
      return;
    }

    try {
      isFetchingNext.value = true;
      musicError.value = null;

      const data = await getRandomMusic({
        currentFlavorName: selectedFlavor.value.name,
      });

      if (data.success && data.videos.length > 0) {
        currentVideos.value = data.videos;
        currentVideoIndex.value = 0;
        aiRecommendation.value = data.recommendation || aiRecommendation.value;
      } else {
        throw new Error(data.message || '暫時無法找到更多音樂');
      }
    } catch (err) {
      console.error('❌ Next recommendation error:', err);
      musicError.value = '無法取得更多推薦';
    } finally {
      isFetchingNext.value = false;
    }
  };

  // ============================================
  // 滑鼠移動處理 - 移動時暫停波浪動畫，靜止後恢復
  // ============================================
  const handlePlayerMouseMove = () => {
    isMouseMoving.value = true;

    if (mouseIdleTimer) {
      clearTimeout(mouseIdleTimer);
    }

    // 滑鼠靜止 200ms 後恢復動畫
    mouseIdleTimer = window.setTimeout(() => {
      isMouseMoving.value = false;
    }, 200);
  };

  // ============================================
  // 生命週期
  // ============================================
  onMounted(async () => {
    // 檢測是否為移動裝置
    isMobileDevice.value = detectMobileDevice();

    initYouTubeAPI();
    await waitForYouTubeAPI();
  });

  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (mouseIdleTimer) {
      clearTimeout(mouseIdleTimer);
    }
    destroyPlayer();
  });
</script>

<template>
  <section
    class="bg-[#FAF9EE] text-text-dark font-display flex items-center justify-center py-8 px-4 lg:py-12 lg:px-8 overflow-x-hidden transition-colors duration-300"
  >
    <div
      class="w-full max-w-[1200px] bg-[#FAF9EE] rounded-4xl overflow-hidden flex flex-col relative"
    >
      <!-- Header Section with Vinyl and Video -->
      <div
        class="relative z-10 w-full flex flex-col lg:flex-row p-8 lg:px-10 lg:py-6 gap-8 lg:gap-20 items-center"
        data-no-sparkles
        @mousemove="handlePlayerMouseMove"
        @mouseleave="isMouseMoving = false"
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

              <!-- 液體容器 - 固定在底部不旋轉，反向抵消黑膠旋轉 -->
              <div
                class="liquid-container absolute inset-0 rounded-full overflow-hidden"
                :class="{ 'liquid-container-active': isPlaying && !isMouseMoving }"
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
            <!-- YouTube Player Container -->
            <div
              v-show="!musicLoading && !musicError && currentVideo"
              id="youtube-player-container"
              class="w-full h-full"
            >
              <div id="youtube-player" class="w-full h-full"></div>
            </div>

            <!-- Loading State -->
            <div
              v-if="musicLoading || isLoadingVideo"
              class="absolute inset-0 flex items-center justify-center bg-gray-900 z-10"
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
                <p class="text-white text-sm">
                  {{ musicLoading ? '正在為您尋找音樂...' : '載入影片中...' }}
                </p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="musicError"
              class="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur z-10"
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

            <!-- Default State - 未選擇風味時只顯示圖片 -->
            <div v-else-if="!currentVideo">
              <div
                class="absolute inset-0 bg-cover bg-center"
                :style="{ backgroundImage: `url('${defaultAlbum}')` }"
              ></div>
              <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p class="text-white/70 text-sm">請先選擇風味</p>
              </div>
            </div>
          </div>

          <!-- AI DJ Panel -->
          <div
            class="glass-panel p-3 lg:p-4 rounded-xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-row items-center justify-between gap-4 w-full"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center text-white shadow-md"
              >
                <img :src="feiDJ" class="w-6 h-6 object-contain" alt="Fei DJ" />
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wider text-sage whitespace-nowrap"
                  >
                    FEI DJ
                  </span>
                  <!-- 修復1&2：狀態指示器 - 紅色=未播放/暫停，黃色=loading，綠色=播放中 -->
                  <span
                    v-if="!musicError"
                    class="w-1.5 h-1.5 rounded-full animate-pulse"
                    :class="{
                      'bg-red-500': !isPlaying && !musicLoading && !isLoadingVideo,
                      'bg-yellow-500': musicLoading || isLoadingVideo,
                      'bg-green-500': isPlaying && !musicLoading && !isLoadingVideo,
                    }"
                  ></span>
                </div>
                <span class="text-sm font-bold text-[#171412] leading-tight truncate">
                  推薦: {{ aiRecommendation }}
                </span>
              </div>
            </div>
            <button
              @click="nextRecommendation"
              :disabled="musicLoading || isFetchingNext || !selectedFlavor"
              class="flex items-center justify-center gap-2 bg-[#DCCFC0] text-[#171412] px-4 py-2 rounded-lg hover:bg-[#C4B5A0] hover:shadow-lg transition-all duration-300 shadow-md group flex-shrink-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none hover:disabled:bg-gray-200"
            >
              <span class="text-xs font-bold tracking-wide hidden sm:inline">Next</span>
              <span
                class="material-symbols-outlined text-lg group-hover:group-enabled:translate-x-1 transition-transform"
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
            <h2 class="text-[#171412] text-2xl lg:text-3xl font-bold tracking-tight leading-tight font-notoserif">
              今天我想
              <br />
              選擇的風味是:
            </h2>
            <div class="flex items-center gap-2">
              <span class="h-1 w-6 bg-[#A2AF9B] rounded-full"></span>
              <p class="text-[#A2AF9B] text-xs font-medium">DJ 將為您調配專屬歌單</p>
            </div>
          </div>

          <!-- Flavor Buttons -->
          <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            <button
              v-for="flavor in flavors"
              :key="flavor.id"
              @click="selectFlavor(flavor)"
              :class="[
                'group relative h-28 sm:h-32 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-[shadow,transform] duration-500 hover:-translate-y-1 isolate',
                selectedFlavor?.id === flavor.id ? 'ring-2 ring-amber-300/50' : '',
              ]"
            >
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
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
                class="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
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

  /* 液體容器 - JavaScript 控制反向旋轉 */
  .liquid-container {
    transform-origin: center center;
    /* 不使用 transition，避免快進時液體快速旋轉 */
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
