import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import defaultAlbum from '@/views/HomePage/assets/default-album-cover.webp';
import flavorFloral from '@/views/HomePage/assets/flavor-floral.webp';
import flavorChocolate from '@/views/HomePage/assets/flavor-chocolate.webp';
import flavorFruity from '@/views/HomePage/assets/flavor-fruity.webp';
import flavorNutty from '@/views/HomePage/assets/flavor-nutty.webp';
import { getMusicByFlavor, getRandomMusic, } from '@/services/homePage/flavorMusic';
import feiDJ from '@/views/HomePage/assets/fei-DJ.webp';
// ============================================
// 狀態管理
// ============================================
const selectedFlavor = ref(null);
// 音樂推薦狀態
const currentVideos = ref([]);
const currentVideoIndex = ref(0);
const musicLoading = ref(false);
const musicError = ref(null);
const aiRecommendation = ref('選擇風味，開始音樂之旅');
// YouTube 播放器狀態
const isPlaying = ref(false);
const vinylRotation = ref(0);
const lastPlaybackTime = ref(0);
const shouldAutoPlay = ref(false);
let animationFrameId = null;
let youtubePlayer = null;
let progressCheckInterval = null;
// 風味列表
const flavors = ref([
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
    if (currentVideos.value.length === 0)
        return null;
    return currentVideos.value[currentVideoIndex.value];
});
const embedUrl = computed(() => {
    if (!currentVideo.value)
        return '';
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
    }
    else {
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
    if (!youtubePlayer || !youtubePlayer.getCurrentTime)
        return;
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
                }
                else {
                    vinylRotation.value = (vinylRotation.value - angleDiff + 360) % 360;
                }
            }
            lastPlaybackTime.value = currentTime;
        }
    }
    catch (err) {
        console.warn('⚠️ Error checking playback progress:', err);
    }
};
// ============================================
// YouTube API 初始化
// ============================================
const initYouTubeAPI = () => {
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => {
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
            if (iframe && window.YT && window.YT.Player) {
                try {
                    youtubePlayer = new window.YT.Player(iframe, {
                        events: {
                            onStateChange: (event) => {
                                const wasPlaying = isPlaying.value;
                                isPlaying.value = event.data === 1;
                                if (isPlaying.value && !wasPlaying) {
                                    lastPlaybackTime.value = youtubePlayer?.getCurrentTime() || 0;
                                }
                            },
                            onReady: (event) => {
                                console.log('✅ YouTube player ready');
                                progressCheckInterval = window.setInterval(checkPlaybackProgress, 500);
                                // 如果標記為應自動播放，則自動播放
                                if (shouldAutoPlay.value) {
                                    console.log('🎵 Auto-playing video...');
                                    try {
                                        event.target.playVideo();
                                        shouldAutoPlay.value = false;
                                    }
                                    catch (err) {
                                        console.warn('⚠️ Auto-play failed:', err);
                                    }
                                }
                            },
                        },
                    });
                }
                catch (err) {
                    console.error('❌ Failed to initialize YouTube player:', err);
                }
            }
        }, 1000);
    }
});
// ============================================
// 音樂推薦方法
// ============================================
const selectFlavor = async (flavor) => {
    selectedFlavor.value = flavor;
    try {
        musicLoading.value = true;
        musicError.value = null;
        isPlaying.value = false;
        lastPlaybackTime.value = 0;
        shouldAutoPlay.value = true;
        const data = await getMusicByFlavor({
            flavorId: flavor.id,
            flavorName: flavor.name,
            description: flavor.description,
        });
        if (data.success && data.videos.length > 0) {
            currentVideos.value = data.videos;
            currentVideoIndex.value = 0;
            aiRecommendation.value = data.recommendation;
        }
        else {
            shouldAutoPlay.value = false;
            throw new Error(data.message || '暫時無法找到相關音樂');
        }
    }
    catch (err) {
        console.error('❌ Music recommendation error:', err);
        musicError.value = err instanceof Error ? err.message : '無法取得推薦，請稍後再試';
        currentVideos.value = [];
        aiRecommendation.value = '選擇風味，開始音樂之旅';
        shouldAutoPlay.value = false;
    }
    finally {
        musicLoading.value = false;
    }
};
const nextRecommendation = async () => {
    // 如果還有下一首歌曲在當前列表中
    if (currentVideoIndex.value < currentVideos.value.length - 1) {
        currentVideoIndex.value++;
        isPlaying.value = false;
        lastPlaybackTime.value = 0;
        shouldAutoPlay.value = true;
        return;
    }
    // 需要獲取新的音樂推薦
    if (!selectedFlavor.value)
        return;
    try {
        musicLoading.value = true;
        musicError.value = null;
        shouldAutoPlay.value = true;
        const data = await getRandomMusic({
            currentFlavorName: selectedFlavor.value.name,
        });
        if (data.success && data.videos.length > 0) {
            currentVideos.value = data.videos;
            currentVideoIndex.value = 0;
            isPlaying.value = false;
            lastPlaybackTime.value = 0;
            aiRecommendation.value = data.recommendation || aiRecommendation.value;
        }
        else {
            shouldAutoPlay.value = false;
            throw new Error(data.message || '暫時無法找到更多音樂');
        }
    }
    catch (err) {
        console.error('❌ Next recommendation error:', err);
        musicError.value = '無法取得更多推薦';
        shouldAutoPlay.value = false;
    }
    finally {
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-shine']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-1']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-2']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-3']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "bg-sage text-text-dark font-display flex items-center justify-center py-8 px-4 lg:py-12 lg:px-8 overflow-x-hidden transition-colors duration-300" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full max-w-[1200px] bg-[#FAF9EE] rounded-4xl overflow-hidden flex flex-col relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 w-full flex flex-col lg:flex-row p-8 lg:px-10 lg:py-6 gap-8 lg:gap-20 items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-shrink-0 flex items-center justify-center relative p-8 lg:p-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative animate-float" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "vinyl-disc relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full shadow-[0_25px_60px_rgba(162,175,155,0.5)] border-[3px] border-[#A2AF9B]/40 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm" },
    ...{ style: ({ transform: `rotate(${__VLS_ctx.vinylRotation}deg)` }) },
});
// @ts-ignore
[vinylRotation,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 rounded-full bg-gradient-to-br from-[#E8F5E9]/30 via-transparent to-[#C8D6C5]/20" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "liquid-container absolute inset-0 rounded-full overflow-hidden" },
    ...{ class: ({ 'liquid-container-active': __VLS_ctx.isPlaying }) },
    ...{ style: ({ transform: `rotate(-${__VLS_ctx.vinylRotation}deg)` }) },
});
// @ts-ignore
[vinylRotation, isPlaying,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "liquid-body" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "liquid-wave" },
    viewBox: "0 0 300 300",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "liquidGradient",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: rgba(162, 175, 155, 0.7); stop-opacity: 1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "50%",
    ...{ style: "stop-color: rgba(182, 195, 175, 0.6); stop-opacity: 1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: "stop-color: rgba(139, 158, 135, 0.8); stop-opacity: 1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "wave-path wave-back" },
    d: "M0,150 Q75,130 150,150 T300,150 L300,300 L0,300 Z",
    fill: "url(#liquidGradient)",
    opacity: "0.6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "wave-path wave-front" },
    d: "M0,150 Q75,170 150,150 T300,150 L300,300 L0,300 Z",
    fill: "url(#liquidGradient)",
    opacity: "0.8",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "liquid-shine" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bubble bubble-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bubble bubble-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bubble bubble-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 pointer-events-none" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 300 300",
    ...{ class: "w-full h-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    id: "circlePath",
    d: "M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0",
});
__VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    ...{ class: "circular-text" },
    fill: "#A2AF9B",
    'font-size': "16",
    'font-weight': "bold",
    'letter-spacing': "8",
    'font-family': "serif",
});
__VLS_asFunctionalElement(__VLS_intrinsics.textPath, __VLS_intrinsics.textPath)({
    href: "#circlePath",
    startOffset: "0%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-1/3 h-1/3 rounded-full flex items-center justify-center border-[8px] lg:border-[10px] border-[#A2AF9B]/60 shadow-[0_0_20px_rgba(162,175,155,0.4),inset_0_2px_10px_rgba(0,0,0,0.1)] relative overflow-hidden backdrop-blur-sm z-10 bg-[#FAF9EE]/90" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" },
    ...{ style: ({
            backgroundImage: __VLS_ctx.currentVideo?.thumbnail
                ? `url('${__VLS_ctx.currentVideo.thumbnail}')`
                : `url('${__VLS_ctx.defaultAlbum}')`,
        }) },
});
// @ts-ignore
[currentVideo, currentVideo, defaultAlbum,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-3 h-3 lg:w-4 lg:h-4 bg-[#A2AF9B] rounded-full shadow-inner" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 rounded-full opacity-30 mix-blend-overlay pointer-events-none" },
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0061\u0063\u006b\u0067\u0072\u006f\u0075\u006e\u0064\u003a\u0020\u0072\u0061\u0064\u0069\u0061\u006c\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u0028\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0063\u0069\u0072\u0063\u006c\u0065\u0020\u0061\u0074\u0020\u0033\u0030\u0025\u0020\u0033\u0030\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0030\u002e\u0033\u0029\u0020\u0030\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0070\u0061\u0072\u0065\u006e\u0074\u0020\u0035\u0030\u0025\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute -top-2 -right-6 w-14 h-36 border-l-8 border-t-8 border-[#A2AF9B]/40 rounded-tl-3xl pointer-events-none hidden lg:block origin-top-right rotate-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 w-full flex flex-col gap-5 justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full relative shadow-xl rounded-2xl overflow-hidden bg-black aspect-video ring-1 ring-black/5" },
});
if (__VLS_ctx.embedUrl && !__VLS_ctx.musicLoading && !__VLS_ctx.musicError) {
    // @ts-ignore
    [embedUrl, musicLoading, musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.iframe, __VLS_intrinsics.iframe)({
        src: (__VLS_ctx.embedUrl),
        ...{ class: "w-full h-full" },
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true,
    });
    // @ts-ignore
    [embedUrl,];
}
else if (__VLS_ctx.musicLoading) {
    // @ts-ignore
    [musicLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 flex items-center justify-center bg-gray-900" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center gap-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-48 h-16 overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-full h-full" },
        viewBox: "0 0 200 60",
        xmlns: "http://www.w3.org/2000/svg",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "ecgGradient",
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.stop)({
        offset: "0%",
        ...{ style: "stop-color: #4ade80; stop-opacity: 0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.stop)({
        offset: "50%",
        ...{ style: "stop-color: #4ade80; stop-opacity: 1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.stop)({
        offset: "100%",
        ...{ style: "stop-color: #4ade80; stop-opacity: 0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        ...{ class: "ecg-line" },
        d: "M0,30 L40,30 L45,10 L50,50 L55,30 L60,30 L65,25 L70,35 L75,30 L200,30",
        fill: "none",
        stroke: "url(#ecgGradient)",
        'stroke-width': "2",
        'stroke-linecap': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-white text-sm" },
    });
}
else if (__VLS_ctx.musicError) {
    // @ts-ignore
    [musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center p-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-red-400 text-5xl mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-white text-sm mb-4" },
    });
    (__VLS_ctx.musicError);
    // @ts-ignore
    [musicError,];
    if (__VLS_ctx.selectedFlavor) {
        // @ts-ignore
        [selectedFlavor,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.embedUrl && !__VLS_ctx.musicLoading && !__VLS_ctx.musicError))
                        return;
                    if (!!(__VLS_ctx.musicLoading))
                        return;
                    if (!(__VLS_ctx.musicError))
                        return;
                    if (!(__VLS_ctx.selectedFlavor))
                        return;
                    __VLS_ctx.selectFlavor(__VLS_ctx.selectedFlavor);
                    // @ts-ignore
                    [selectedFlavor, selectFlavor,];
                } },
            ...{ class: "px-4 py-2 bg-white/20 rounded-lg text-white text-xs hover:bg-white/30 transition" },
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500" },
        ...{ style: ({
                backgroundImage: `url('${__VLS_ctx.currentVideo?.thumbnail || __VLS_ctx.defaultAlbum}')`,
            }) },
    });
    // @ts-ignore
    [currentVideo, defaultAlbum,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-white text-base font-medium tracking-wide truncate pr-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-14 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-white text-2xl" },
    });
}
if (__VLS_ctx.currentVideo && !__VLS_ctx.musicLoading && !__VLS_ctx.musicError) {
    // @ts-ignore
    [currentVideo, musicLoading, musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none p-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-white text-base font-medium tracking-wide truncate pr-8" },
    });
    (__VLS_ctx.currentVideo.title);
    // @ts-ignore
    [currentVideo,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-white/70 text-xs mt-1" },
    });
    (__VLS_ctx.currentVideo.channelTitle);
    // @ts-ignore
    [currentVideo,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "glass-panel p-3 lg:p-4 rounded-xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-row items-center justify-between gap-4 w-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 flex-1 min-w-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-10 h-10 rounded-full bg-sage flex-shrink-0 flex items-center justify-center text-white shadow-md relative" },
});
if (!__VLS_ctx.musicError && !__VLS_ctx.musicLoading) {
    // @ts-ignore
    [musicLoading, musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 rounded-full bg-sage animate-ping opacity-20" },
    });
}
if (!__VLS_ctx.musicError && !__VLS_ctx.musicLoading) {
    // @ts-ignore
    [musicLoading, musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.feiDJ),
        ...{ class: "w-6 h-6 object-contain" },
        alt: "Fei DJ",
    });
    // @ts-ignore
    [feiDJ,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-xl text-[#171412]" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col min-w-0 flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[10px] font-bold uppercase tracking-wider text-sage whitespace-nowrap" },
});
if (!__VLS_ctx.musicError && !__VLS_ctx.musicLoading) {
    // @ts-ignore
    [musicLoading, musicError,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm font-bold text-[#171412] leading-tight truncate" },
});
(__VLS_ctx.aiRecommendation);
// @ts-ignore
[aiRecommendation,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.nextRecommendation) },
    disabled: (__VLS_ctx.musicLoading || !__VLS_ctx.selectedFlavor || __VLS_ctx.musicError !== null),
    ...{ class: "flex items-center justify-center gap-2 bg-[#DCCFC0] text-[#171412] px-4 py-2 rounded-lg hover:bg-[#C4B5A0] hover:shadow-lg transition-all duration-300 shadow-md group flex-shrink-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none hover:disabled:bg-gray-200" },
});
// @ts-ignore
[musicLoading, musicError, selectedFlavor, nextRecommendation,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold tracking-wide hidden sm:inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined text-lg group-hover:group-enabled:translate-x-1 transition-transform" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 w-full p-8 lg:px-10 lg:py-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-start gap-2 min-w-[200px] shrink-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-[#171412] text-2xl lg:text-3xl font-bold tracking-tight leading-tight" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "h-1 w-6 bg-[#A2AF9B] rounded-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[#A2AF9B] text-xs font-medium" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4" },
});
for (const [flavor] of __VLS_getVForSourceType((__VLS_ctx.flavors))) {
    // @ts-ignore
    [flavors,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectFlavor(flavor);
                // @ts-ignore
                [selectFlavor,];
            } },
        key: (flavor.id),
        ...{ class: ([
                'group relative h-28 sm:h-32 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1',
                __VLS_ctx.selectedFlavor?.id === flavor.id ? 'ring-2 ring-sage/50' : '',
            ]) },
    });
    // @ts-ignore
    [selectedFlavor,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" },
        ...{ style: ({ backgroundImage: `url('${flavor.image}')` }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 p-3 flex flex-col justify-end items-start text-left" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-white text-base font-bold leading-none mb-0.5" },
    });
    (flavor.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-white/80 text-[10px]" },
    });
    (flavor.description);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-sage group-hover:scale-110 transition-all" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-xs" },
    });
    (flavor.icon);
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center mt-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[10px] text-[#171412]/40 font-mono" },
});
/** @type {__VLS_StyleScopedClasses['bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#FAF9EE]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-20']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:p-12']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float']} */ ;
/** @type {__VLS_StyleScopedClasses['vinyl-disc']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[220px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[220px]']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-[260px]']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:h-[260px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-[280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:h-[280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_25px_60px_rgba(162,175,155,0.5)]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[3px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#A2AF9B]/40']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-[#E8F5E9]/30']} */ ;
/** @type {__VLS_StyleScopedClasses['via-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['to-[#C8D6C5]/20']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-container-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-body']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-wave']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-path']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-back']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-path']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-front']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-shine']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-3']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-text']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1/3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:border-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#A2AF9B]/60']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_0_20px_rgba(162,175,155,0.4),inset_0_2px_10px_rgba(0,0,0,0.1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#FAF9EE]/90']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['mix-blend-multiply']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
/** @type {__VLS_StyleScopedClasses['mix-blend-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['-right-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-36']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#A2AF9B]/40']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tl-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:block']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-top-right']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-video']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-black/5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['ecg-line']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/70']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-8']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-90']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-100']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/70']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/70']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-ping']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#171412]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#171412]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#DCCFC0]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#171412]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#C4B5A0]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:disabled:bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:group-enabled:translate-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#171412]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-28']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:-translate-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/80']} */ ;
/** @type {__VLS_StyleScopedClasses['via-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#171412]/40']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
