import { ref, onMounted } from 'vue';
import { PackageOpen } from 'lucide-vue-next';
import banner from '@/views/HomePage/assets/banner.webp';
import defaultProductImg from '@/views/HomePage/assets/default-product.webp';
// 引入 API Service
import { fetchFeaturedProducts } from '@/services/homePage/featuredProduct';
// 引入 HomePage 專屬型別與常數
import { flavorMap, flavorStyles } from '@/views/HomePage/type';
// 引入子元件
import FlavorMusicPlayer from '@/views/HomePage/components/FlavorMusicPlayer.vue';
import FeiTimeStory from '@/views/HomePage/components/FeiTimeStory.vue';
// ============================================
// 推薦產品相關 - 狀態
// ============================================
const products = ref([]);
const loading = ref(true);
const error = ref(null);
// ============================================
// 推薦產品相關 - 方法
// ============================================
const fetchProducts = async () => {
    try {
        loading.value = true;
        error.value = null;
        products.value = await fetchFeaturedProducts();
        console.log('✅ 成功載入精選產品:', products.value);
    }
    catch (err) {
        console.error('❌ 載入產品失敗:', err);
        error.value = err.message || '載入產品失敗，請稍後再試';
    }
    finally {
        loading.value = false;
    }
};
const getImageUrl = (product) => {
    if (product.img && product.img.length > 0 && product.img[0]?.url) {
        return product.img[0].url;
    }
    return defaultProductImg;
};
const getFlavorLabel = (flavorType) => {
    return flavorMap[flavorType] || flavorType;
};
const getFlavorStyle = (flavorType) => {
    return flavorStyles[flavorType] || 'bg-gray-100 text-gray-700 border border-gray-200';
};
// ============================================
// 生命週期
// ============================================
onMounted(() => {
    fetchProducts();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "relative w-full h-[94vh] min-h-[600px] overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 w-full h-full bg-cover bg-center" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.banner})` }) },
});
// @ts-ignore
[banner,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-black/30" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center text-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bg-background-light/90 backdrop-blur-md p-10 md:p-14 max-w-xl shadow-lg border-l-4 border-sage" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4 mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "h-px w-12 bg-sage" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-medium tracking-[0.2em] uppercase text-xs font-jp" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-cactus" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-base mb-8 leading-loose font-light" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-6" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/coffee-id-test",
    ...{ class: "group" },
}));
const __VLS_2 = __VLS_1({
    to: "/coffee-id-test",
    ...{ class: "group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "relative flex items-center justify-center h-14 px-10 bg-white/20 text-sage text-sm tracking-widest uppercase rounded-sm shadow-md backdrop-blur-sm overflow-hidden transition-colors duration-300" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-sage rounded-sm transition-all duration-300 group-hover:w-full group-hover:h-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-sage rounded-sm transition-all duration-300 group-hover:w-full group-hover:h-full" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "w-full py-24 bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-[1600px] mx-auto px-6 md:px-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-center justify-center mb-16 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sage tracking-[0.3em] text-xs uppercase mb-4 font-jp" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-3xl font-serif text-text-main tracking-widest" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-12 h-px bg-latte mt-6 mb-4" },
});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center min-h-[400px]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-text-sub" },
    });
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center min-h-[400px]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center gap-4 text-center" },
    });
    const __VLS_6 = {}.PackageOpen;
    /** @type {[typeof __VLS_components.PackageOpen, ]} */ ;
    // @ts-ignore
    PackageOpen;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        size: (64),
        ...{ class: "text-gray-400" },
    }));
    const __VLS_8 = __VLS_7({
        size: (64),
        ...{ class: "text-gray-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-text-sub" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.fetchProducts) },
        ...{ class: "px-6 py-2 bg-sage text-white rounded-sm hover:bg-sage/90 transition-colors" },
    });
    // @ts-ignore
    [fetchProducts,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" },
    });
    for (const [product] of __VLS_getVForSourceType((__VLS_ctx.products))) {
        // @ts-ignore
        [products,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (product.id),
            ...{ class: "group flex flex-col cursor-pointer" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "relative aspect-[3/4] overflow-hidden bg-mist mb-6 rounded-sm" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" },
            ...{ style: ({ backgroundImage: `url('${__VLS_ctx.getImageUrl(product)}')` }) },
        });
        // @ts-ignore
        [getImageUrl,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col gap-2 items-center text-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "text-base font-medium text-text-main tracking-wide group-hover:text-sage transition-colors font-serif" },
        });
        (product.name);
        if (product.flavor_type) {
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: (__VLS_ctx.getFlavorStyle(product.flavor_type)) },
                ...{ class: "inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full" },
            });
            // @ts-ignore
            [getFlavorStyle,];
            (__VLS_ctx.getFlavorLabel(product.flavor_type));
            // @ts-ignore
            [getFlavorLabel,];
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-lg font-semibold text-text-main" },
        });
        (product.price);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-16 flex justify-center" },
});
const __VLS_12 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    to: "/product",
    ...{ class: "group inline-flex items-center gap-3 text-text-main hover:text-sage transition-colors text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-sage pb-1" },
}));
const __VLS_14 = __VLS_13({
    to: "/product",
    ...{ class: "group inline-flex items-center gap-3 text-text-main hover:text-sage transition-colors text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-sage pb-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined text-base transition-transform group-hover:translate-x-1" },
});
var __VLS_15;
/** @type {[typeof FlavorMusicPlayer, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(FlavorMusicPlayer, new FlavorMusicPlayer({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {[typeof FeiTimeStory, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(FeiTimeStory, new FeiTimeStory({}));
const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[94vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/30']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background-light/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:p-14']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.2em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-jp']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-[1.1]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-cactus']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-loose']} */ ;
/** @type {__VLS_StyleScopedClasses['font-light']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-24']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.3em]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-jp']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-serif']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-latte']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['border-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-sage/90']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[3/4]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-mist']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:bg-black/5']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['font-serif']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-16']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.2em]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:translate-x-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
