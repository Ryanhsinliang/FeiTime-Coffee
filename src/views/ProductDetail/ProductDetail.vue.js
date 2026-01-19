import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { callSingleProduct, callRecommendations } from '@/services/ProductDetail';
// 1. 靜態對照表
const originMap = {
    Ethiopia: '衣索比亞',
    Kenya: '肯亞',
    Rwanda: '盧安達',
    Burundi: '布隆迪',
    Colombia: '哥倫比亞',
    Brazil: '巴西',
    Guatemala: '瓜地馬拉',
    'Costa Rica': '哥斯大黎加',
    'El Salvador': '薩爾瓦多',
    Panama: '巴拿馬',
    Indonesia: '印尼',
    Vietnam: '越南',
    India: '印度',
    Thailand: '泰國',
    'Papua New Guinea': '巴布亞紐幾內亞',
};
const roastMap = {
    Light: '淺焙 ︱ 口感輕盈，香氣明亮清爽',
    Medium: '中焙 ︱ 口感平衡，香氣溫潤適中',
    Dark: '深焙 ︱ 口感濃郁，香氣深沉厚重',
};
const processingMap = {
    Washed: '水洗處理',
    Natural: '日曬處理',
    Honey: '蜜處理',
    Anaerobic: '厭氧發酵',
    'Wet-Hulled': '濕剝法（半水洗）',
    'Anaerobic Natural': '厭氧日曬',
    'Anaerobic Washed': '厭氧水洗',
    Monsooned: '季風處理',
};
const flavorTagsMap = {
    Fruity: '果香',
    Berry: '莓果',
    Tropical: '熱帶水果',
    Citrus: '柑橘',
    Sweet: '甜感',
    Fermented: '發酵',
    Winey: '酒香',
    Balanced: '平衡',
    Wild: '野性',
    Nutty: '堅果',
    Chocolate: '巧克力',
    Cocoa: '可可',
    Caramel: '焦糖',
    Smooth: '滑順',
    Heavy: '厚重',
    Earthy: '土壤',
    Woody: '木質',
    Spice: '香料',
    Herbal: '草本',
    Bitter: '苦感',
    Rich: '濃郁',
    Floral: '花香',
    Jasmine: '茉莉',
    'Tea-like': '茶感',
    Clean: '乾淨',
    Bright: '明亮酸質',
};
// 2. 組件狀態與邏輯
const route = useRoute();
const product = ref(null);
const recommendations = ref([]);
const loading = ref(false);
const error = ref('');
// 呼叫 API
async function loadProductData(pid) {
    loading.value = true;
    error.value = '';
    try {
        // 並行載入當前商品和推薦商品
        const [productRes, recommendationsRes] = await Promise.all([
            callSingleProduct(pid),
            callRecommendations(pid),
        ]);
        product.value = productRes.data;
        console.log('✅ 成功載入商品:', product.value);
        recommendations.value = recommendationsRes.data;
        console.log('✅ 推薦商品數量:', recommendations.value.length);
        // 重置圖片輪播索引、重置數量
        currentIndex.value = 0;
        quantity.value = 1;
    }
    catch (err) {
        console.error('❌ API載入失敗', err);
        error.value = '商品載入失敗';
    }
    finally {
        loading.value = false;
    }
}
onMounted(() => {
    const pid = route.params.pid;
    loadProductData(pid);
});
// 監聽路由變化
watch(() => route.params.pid, (newPid) => {
    if (newPid) {
        loadProductData(newPid);
    }
});
// 圖片點擊輪播
const currentIndex = ref(0);
const prevPhoto = () => {
    if (!product.value?.img?.length)
        return;
    currentIndex.value =
        currentIndex.value > 0 ? currentIndex.value - 1 : product.value.img.length - 1;
};
const nextPhoto = () => {
    if (!product.value?.img?.length)
        return;
    currentIndex.value =
        currentIndex.value < product.value.img.length - 1 ? currentIndex.value + 1 : 0;
};
// 重量對應價格
const quantity = ref(1);
const price = computed(() => {
    if (!product.value) {
        return 0;
    }
    return product.value.price * quantity.value;
});
// 庫存顯示(無庫存/低庫存)
const isSoldOut = computed(() => {
    if (!product.value)
        return false;
    return product.value.stock === 0;
});
const isLowStock = computed(() => {
    if (!product.value)
        return false;
    return product.value.stock > 0 && product.value.stock < 21;
});
// 防止使用者手動輸入違規數字
watch(quantity, (newVal) => {
    if (!product.value)
        return;
    if (newVal > product.value.stock) {
        quantity.value = product.value.stock;
    }
    else if (newVal < 1) {
        quantity.value = 1;
    }
});
// TODO:加入購物車
const addToCart = () => {
    alert('已加入購物車');
};
// TODO:立即購買：檢驗登入狀態，並導向結帳頁
const router = useRouter();
const buyNow = () => {
    if (!product.value)
        return;
    // 導向結帳頁面
    router.push('/Checkout');
};
// 商品資訊欄位展開
const showRoast = ref(false);
const showFlavor = ref(false);
const showProcess = ref(false);
const toggleRoast = () => {
    showRoast.value = !showRoast.value;
};
const toggleFlavor = () => {
    showFlavor.value = !showFlavor.value;
};
const toggleProcess = () => {
    showProcess.value = !showProcess.value;
};
// 資料庫中英切換
const originText = computed(() => {
    return product.value ? originMap[product.value.origin] || product.value.origin : '';
});
const roastText = computed(() => {
    return product.value ? roastMap[product.value.roast] || product.value.roast : '';
});
const processingText = computed(() => {
    return product.value ? processingMap[product.value.processing] || product.value.processing : '';
});
const flavorTagsText = computed(() => {
    if (!product.value?.flavor_tags)
        return [];
    return product.value.flavor_tags.map((tagObj) => {
        const tag = tagObj.name;
        return flavorTagsMap[tag] ?? tag;
    });
});
// 產品描述分段
const descriptionLines = computed(() => {
    if (!product.value?.description)
        return [];
    return product.value.description.split('\n');
});
const descriptionFlavor = computed(() => {
    return descriptionLines.value[0] || '';
});
const descriptionBody = computed(() => {
    return descriptionLines.value.slice(1, 2).join('\n');
});
const descriptionBody2 = computed(() => {
    return descriptionLines.value.slice(2).join('\n');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center min-h-[400px] flex-col gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
else if (__VLS_ctx.product) {
    // @ts-ignore
    [product,];
    __VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "flex flex-col lg:flex-row justify-center relative min-h-[825px]" },
    });
    if (__VLS_ctx.product.img && __VLS_ctx.product.img.length > 0) {
        // @ts-ignore
        [product, product,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-full lg:w-1/2 bg-[#f3eeea] relative" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: (__VLS_ctx.product.img[__VLS_ctx.currentIndex].formats.large.url),
            alt: (__VLS_ctx.product.name),
            ...{ class: "object-cover aspect-[4/3] w-full h-full" },
        });
        // @ts-ignore
        [product, product, currentIndex,];
        if (__VLS_ctx.product.img.length > 1) {
            // @ts-ignore
            [product,];
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.prevPhoto) },
                type: "button",
                ...{ class: "absolute top-1/2 left-2.5 -translate-y-1/2" },
            });
            // @ts-ignore
            [prevPhoto,];
            __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                ...{ class: "fa-solid fa-chevron-left text-[#d4b396] text-[45px] opacity-50" },
            });
        }
        if (__VLS_ctx.product.img.length > 1) {
            // @ts-ignore
            [product,];
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.nextPhoto) },
                type: "button",
                ...{ class: "absolute top-1/2 right-2.5 -translate-y-1/2" },
            });
            // @ts-ignore
            [nextPhoto,];
            __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                ...{ class: "fa-solid fa-chevron-right text-[#d4b396] text-[45px] opacity-50" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-[60px] h-5 bg-[#d9cfc7] absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-[20px] opacity-50 flex justify-center items-center gap-2" },
        });
        for (const [_, index] of __VLS_getVForSourceType((__VLS_ctx.product.img))) {
            // @ts-ignore
            [product,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (index),
                ...{ class: "w-2 h-2 rounded-full" },
                ...{ class: (index === __VLS_ctx.currentIndex ? 'bg-[#141e0e]' : 'bg-[#a2af9b]') },
            });
            // @ts-ignore
            [currentIndex,];
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ class: "py-24 px-32 bg-[#f9f8f6] w-full lg:w-1/2 lg:pb-12 text-[#6d654f]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "origin",
    });
    (__VLS_ctx.originText);
    // @ts-ignore
    [originText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-4xl pt-3 font-semibold" },
    });
    (__VLS_ctx.product.name);
    // @ts-ignore
    [product,];
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "pt-2 pb-4" },
    });
    (__VLS_ctx.product.english_name);
    // @ts-ignore
    [product,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "price",
        ...{ class: "text-xl font-semibold" },
    });
    (`$${__VLS_ctx.price}`);
    // @ts-ignore
    [price,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "quantity",
        ...{ class: "block font-semibold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        type: "number",
        name: "quantity",
        id: "quantity",
        value: "1",
        min: (1),
        max: (__VLS_ctx.product.stock),
        ...{ class: "border border-gray-300 px-3 py-2 rounded w-1/2" },
    });
    (__VLS_ctx.quantity);
    // @ts-ignore
    [product, quantity,];
    if (__VLS_ctx.isSoldOut) {
        // @ts-ignore
        [isSoldOut,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-red-500 font-semibold" },
        });
    }
    else if (__VLS_ctx.isLowStock) {
        // @ts-ignore
        [isLowStock,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-red-500 font-semibold" },
        });
        (__VLS_ctx.product.stock);
        // @ts-ignore
        [product,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.product.stock);
        // @ts-ignore
        [product,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "block font-semibold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "pt-1" },
    });
    (__VLS_ctx.product.weight);
    // @ts-ignore
    [product,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleRoast) },
        type: "button",
        ...{ class: "w-1/2 py-2 flex justify-between font-semibold" },
    });
    // @ts-ignore
    [toggleRoast,];
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: (__VLS_ctx.showRoast ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down') },
    });
    // @ts-ignore
    [showRoast,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "pb-2" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showRoast) }, null, null);
    // @ts-ignore
    [showRoast,];
    (__VLS_ctx.roastText);
    // @ts-ignore
    [roastText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleProcess) },
        type: "button",
        ...{ class: "w-1/2 py-2 flex justify-between font-semibold" },
    });
    // @ts-ignore
    [toggleProcess,];
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: (__VLS_ctx.showProcess ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down') },
    });
    // @ts-ignore
    [showProcess,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "pb-2" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showProcess) }, null, null);
    // @ts-ignore
    [showProcess,];
    (__VLS_ctx.processingText);
    // @ts-ignore
    [processingText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleFlavor) },
        type: "button",
        ...{ class: "w-1/2 py-2 flex justify-between font-semibold" },
    });
    // @ts-ignore
    [toggleFlavor,];
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: (__VLS_ctx.showFlavor ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down') },
    });
    // @ts-ignore
    [showFlavor,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "pb-2" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showFlavor) }, null, null);
    // @ts-ignore
    [showFlavor,];
    (__VLS_ctx.descriptionFlavor);
    // @ts-ignore
    [descriptionFlavor,];
    __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
    (__VLS_ctx.flavorTagsText.join('、'));
    // @ts-ignore
    [flavorTagsText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.addToCart) },
        disabled: (__VLS_ctx.isSoldOut),
        type: "button",
        ...{ class: "bg-[#6d654f] text-white text-sm p-3.5 mr-2 rounded-md w-32 font-bold hover:bg-[#ABB7A5] disabled:bg-gray-400 disabled:cursor-not-allowed" },
    });
    // @ts-ignore
    [isSoldOut, addToCart,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.buyNow) },
        type: "button",
        disabled: (__VLS_ctx.isSoldOut),
        ...{ class: "bg-[#6d654f] text-white text-sm p-3.5 rounded-md w-32 font-bold hover:bg-[#ABB7A5] disabled:bg-gray-400 disabled:cursor-not-allowed" },
    });
    // @ts-ignore
    [isSoldOut, buyNow,];
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        ...{ class: "w-full aspect-[9/4] object-cover" },
        src: "./assets/coffee_banner.jpg",
        alt: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "bg-[#eeeeee] text-[#6d654f] font-semibold text-4xl text-center py-48" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "bg-[#eeeeee]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col lg:flex-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full lg:w-1/2 px-20 pb-12 lg:py-0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-3xl font-semibold text-[#6d654f]" },
    });
    (__VLS_ctx.product.name);
    // @ts-ignore
    [product,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-lg text-[#808080] pt-10" },
    });
    (__VLS_ctx.descriptionBody);
    // @ts-ignore
    [descriptionBody,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-lg text-[#808080] pt-4" },
    });
    (__VLS_ctx.descriptionBody2);
    // @ts-ignore
    [descriptionBody2,];
    __VLS_asFunctionalElement(__VLS_intrinsics.video, __VLS_intrinsics.video)({
        src: "./assets/video.mp4",
        autoplay: true,
        muted: true,
        loop: true,
        ...{ class: "w-full lg:w-1/2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "bg-[#eeeeee] py-[100px] min-h-[750px] overflow-hidden w-full" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "py-10 text-center text-3xl font-semibold text-[#6d654f]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "cursor-pointer flex gap-12 w-max animate-[scroll_80s_linear_infinite] [will-change:transform] hover:[animation-play-state:paused]" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.recommendations))) {
        // @ts-ignore
        [recommendations,];
        const __VLS_0 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            key: (item.pid),
            to: (`/product-detail/${item.pid}`),
            ...{ class: "h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0" },
        }));
        const __VLS_2 = __VLS_1({
            key: (item.pid),
            to: (`/product-detail/${item.pid}`),
            ...{ class: "h-[450px] w-[300px] relative flex justify-center items-center group flex-shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_5 } = __VLS_3.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: (item.img[0]?.formats?.large?.url),
            alt: (item.name),
            ...{ class: "aspect-[2/3] w-full object-cover absolute top-0 left-0" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: (item.img[2]?.formats?.large?.url),
            alt: (item.name),
            ...{ class: "aspect-[2/3] w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "absolute top-[100%] left-0 right-0 text-left p-2 text-[#6d654f] font-semibold" },
        });
        (item.name);
        var __VLS_3;
    }
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['border-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[825px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#f3eeea]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[4/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#d4b396]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[45px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#d4b396]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[45px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#d9cfc7]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-24']} */ ;
/** @type {__VLS_StyleScopedClasses['px-32']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#f9f8f6]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:pb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[9/4]']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#eeeeee]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-48']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#eeeeee]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-20']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#808080]']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#808080]']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#eeeeee]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[750px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-max']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-[scroll_80s_linear_infinite]']} */ ;
/** @type {__VLS_StyleScopedClasses['[will-change:transform]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:[animation-play-state:paused]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[450px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[300px]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[2/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[2/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-1000']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6d654f]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
