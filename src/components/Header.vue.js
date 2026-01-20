import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
/* ===== Menu Data ===== */
const links = [
    { name: 'Shop', zh: '商店', max: '商店', to: '/product' },
    { name: 'Story', zh: '故事', max: '故事', to: '/about' },
    { name: 'CoffeeIDTest', zh: 'CoffeeID測驗', max: 'CoffeeID測驗', to: '/coffee-id-test' },
    {
        name: 'CoffeeSimulator',
        zh: '咖啡沖煮模擬器',
        max: '咖啡沖煮模擬器',
        to: '/coffeeLabT1-T-P1',
    },
];
const shopSubLinks = [
    { name: '單品咖啡豆', to: '/product/beans' },
    { name: '濾掛咖啡', to: '/product/drip' },
    { name: '沖煮器具', to: '/product/tools' },
];
/* ===== State ===== */
const hoveredLink = ref(null);
const mobileOpen = ref(false);
const mobileSubOpen = ref(false);
const toggleMobileSubmenu = (name) => {
    if (name === 'Shop')
        mobileSubOpen.value = !mobileSubOpen.value;
};
/* ===== Scroll Effect ===== */
const scrollY = ref(0);
// 🔥 使用 computed 自動計算 banner 高度（94vh）
const bannerHeight = computed(() => window.innerHeight * 0.94);
const onScroll = () => {
    scrollY.value = window.scrollY;
};
onMounted(() => {
    // 🔥 初始化當前滾動位置
    scrollY.value = window.scrollY;
    window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
/* ===== Styles ===== */
const textColorStyle = computed(() => {
    const t = Math.min(scrollY.value / (bannerHeight.value || 1), 1);
    const r = Math.round(26 + (250 - 26) * t);
    const g = Math.round(30 + (249 - 30) * t);
    const b = Math.round(23 + (238 - 23) * t);
    return { color: `rgb(${r}, ${g}, ${b})` };
});
const navClasses = computed(() => [
    scrollY.value < bannerHeight.value ? 'bg-[#A2AF9B]/40' : 'bg-[#A2AF9B]/90',
]);
const underlineStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
        return { backgroundColor: '#CDBE9A', height: '1.5px', opacity: 0.95 };
    }
    return { backgroundColor: '#FAF9EE', height: '1px', opacity: 1 };
});
const dropdownBgStyle = computed(() => {
    if (scrollY.value < bannerHeight.value) {
        return { backgroundColor: `rgba(162, 175, 155, 1)` };
    }
    else {
        return { backgroundColor: `rgba(162, 175, 155, 0.9)` };
    }
});
/* ===== Utils ===== */
const isActive = (link) => route.path === link.to;
const activeStyle = { fontWeight: '700' };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: (__VLS_ctx.navClasses) },
    ...{ class: "sticky top-0 z-50 w-full border-b border-[#DCCFC0]/40 backdrop-blur-lg transition-colors duration-300" },
});
// @ts-ignore
[navClasses,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "px-6 xl:px-12 flex items-center justify-between max-w-[1600px] mx-auto h-16" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/home",
    ...{ class: "flex items-center gap-2 flex-shrink-0" },
}));
const __VLS_2 = __VLS_1({
    to: "/home",
    ...{ class: "flex items-center gap-2 flex-shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "/icons/feitime-logo.png",
    alt: "FeiTime Logo",
    ...{ class: "w-12 h-12 lg:w-16 lg:h-16 object-cover" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl lg:text-2xl font-serif font-medium tracking-wide" },
    ...{ style: (__VLS_ctx.textColorStyle) },
});
// @ts-ignore
[textColorStyle,];
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden lg:flex flex-1 justify-center gap-6 xl:gap-12 relative px-4" },
});
for (const [link] of __VLS_getVForSourceType((__VLS_ctx.links))) {
    // @ts-ignore
    [links,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (link.name),
        ...{ class: "relative group text-sm xl:text-base tracking-widest uppercase font-jp whitespace-nowrap" },
    });
    const __VLS_6 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        ...{ 'onMouseenter': {} },
        ...{ 'onMouseleave': {} },
        to: (link.to),
        ...{ class: "relative block px-2 py-1" },
        ...{ style: ([__VLS_ctx.textColorStyle, __VLS_ctx.isActive(link) ? __VLS_ctx.activeStyle : {}]) },
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onMouseenter': {} },
        ...{ 'onMouseleave': {} },
        to: (link.to),
        ...{ class: "relative block px-2 py-1" },
        ...{ style: ([__VLS_ctx.textColorStyle, __VLS_ctx.isActive(link) ? __VLS_ctx.activeStyle : {}]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ mouseenter: {} },
        { onMouseenter: (...[$event]) => {
                __VLS_ctx.hoveredLink = link.name;
                // @ts-ignore
                [textColorStyle, isActive, activeStyle, hoveredLink,];
            } });
    const __VLS_13 = ({ mouseleave: {} },
        { onMouseleave: (...[$event]) => {
                __VLS_ctx.hoveredLink = null;
                // @ts-ignore
                [hoveredLink,];
            } });
    const { default: __VLS_14 } = __VLS_9.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "invisible" },
    });
    (link.max);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 flex items-center justify-center transition-opacity duration-200" },
        ...{ class: (__VLS_ctx.hoveredLink === link.name || __VLS_ctx.isActive(link) ? 'opacity-0' : 'opacity-100') },
    });
    // @ts-ignore
    [isActive, hoveredLink,];
    (link.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 flex items-center justify-center transition-opacity duration-200" },
        ...{ class: (__VLS_ctx.hoveredLink === link.name || __VLS_ctx.isActive(link) ? 'opacity-100' : 'opacity-0') },
    });
    // @ts-ignore
    [isActive, hoveredLink,];
    (link.zh);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" },
        ...{ style: (__VLS_ctx.underlineStyle) },
    });
    // @ts-ignore
    [underlineStyle,];
    var __VLS_9;
    var __VLS_10;
    if (link.name === 'Shop') {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute top-full left-0 mt-1 w-36 backdrop-blur-xl rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0" },
            ...{ style: (__VLS_ctx.dropdownBgStyle) },
        });
        // @ts-ignore
        [dropdownBgStyle,];
        for (const [sub] of __VLS_getVForSourceType((__VLS_ctx.shopSubLinks))) {
            // @ts-ignore
            [shopSubLinks,];
            const __VLS_15 = {}.RouterLink;
            /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
            // @ts-ignore
            RouterLink;
            // @ts-ignore
            const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
                ...{ 'onClick': {} },
                key: (sub.name),
                to: (sub.to),
                ...{ class: "block px-4 py-2 text-sm text-left transition-colors duration-200 rounded hover:bg-white/20" },
                ...{ style: ({ color: __VLS_ctx.textColorStyle.color }) },
            }));
            const __VLS_17 = __VLS_16({
                ...{ 'onClick': {} },
                key: (sub.name),
                to: (sub.to),
                ...{ class: "block px-4 py-2 text-sm text-left transition-colors duration-200 rounded hover:bg-white/20" },
                ...{ style: ({ color: __VLS_ctx.textColorStyle.color }) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            let __VLS_20;
            const __VLS_21 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!(link.name === 'Shop'))
                            return;
                        __VLS_ctx.mobileOpen = false;
                        // @ts-ignore
                        [textColorStyle, mobileOpen,];
                    } });
            const { default: __VLS_22 } = __VLS_18.slots;
            (sub.name);
            var __VLS_18;
            var __VLS_19;
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 lg:gap-4 flex-shrink-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden lg:flex items-center gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined" },
    ...{ style: (__VLS_ctx.textColorStyle) },
});
// @ts-ignore
[textColorStyle,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined" },
    ...{ style: (__VLS_ctx.textColorStyle) },
});
// @ts-ignore
[textColorStyle,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.mobileOpen = !__VLS_ctx.mobileOpen;
            // @ts-ignore
            [mobileOpen, mobileOpen,];
        } },
    ...{ class: "lg:hidden material-symbols-outlined text-3xl" },
    ...{ style: (__VLS_ctx.textColorStyle) },
});
// @ts-ignore
[textColorStyle,];
const __VLS_23 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    name: "slide-fade",
}));
const __VLS_25 = __VLS_24({
    name: "slide-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_28 } = __VLS_26.slots;
if (__VLS_ctx.mobileOpen) {
    // @ts-ignore
    [mobileOpen,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "lg:hidden backdrop-blur-xl border-t border-[#DCCFC0]/50" },
        ...{ style: (__VLS_ctx.dropdownBgStyle) },
    });
    // @ts-ignore
    [dropdownBgStyle,];
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.links))) {
        // @ts-ignore
        [links,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (link.name),
        });
        const __VLS_29 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            ...{ 'onClick': {} },
            to: (link.to),
            ...{ class: "block px-6 py-4 text-lg font-jp border-b border-[#DCCFC0]/30" },
            ...{ style: (__VLS_ctx.textColorStyle) },
        }));
        const __VLS_31 = __VLS_30({
            ...{ 'onClick': {} },
            to: (link.to),
            ...{ class: "block px-6 py-4 text-lg font-jp border-b border-[#DCCFC0]/30" },
            ...{ style: (__VLS_ctx.textColorStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        let __VLS_34;
        const __VLS_35 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.mobileOpen))
                        return;
                    __VLS_ctx.toggleMobileSubmenu(link.name);
                    // @ts-ignore
                    [textColorStyle, toggleMobileSubmenu,];
                } });
        const { default: __VLS_36 } = __VLS_32.slots;
        (link.zh);
        var __VLS_32;
        var __VLS_33;
        const __VLS_37 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        Transition;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            name: "expand-height",
        }));
        const __VLS_39 = __VLS_38({
            name: "expand-height",
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        const { default: __VLS_42 } = __VLS_40.slots;
        if (link.name === 'Shop' && __VLS_ctx.mobileSubOpen) {
            // @ts-ignore
            [mobileSubOpen,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "overflow-hidden" },
            });
            for (const [sub] of __VLS_getVForSourceType((__VLS_ctx.shopSubLinks))) {
                // @ts-ignore
                [shopSubLinks,];
                const __VLS_43 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
                // @ts-ignore
                RouterLink;
                // @ts-ignore
                const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
                    ...{ 'onClick': {} },
                    key: (sub.name),
                    to: (sub.to),
                    ...{ class: "block px-10 py-3 text-base border-b border-[#DCCFC0]/20" },
                }));
                const __VLS_45 = __VLS_44({
                    ...{ 'onClick': {} },
                    key: (sub.name),
                    to: (sub.to),
                    ...{ class: "block px-10 py-3 text-base border-b border-[#DCCFC0]/20" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_44));
                let __VLS_48;
                const __VLS_49 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!(__VLS_ctx.mobileOpen))
                                return;
                            if (!(link.name === 'Shop' && __VLS_ctx.mobileSubOpen))
                                return;
                            __VLS_ctx.mobileOpen = false;
                            // @ts-ignore
                            [mobileOpen,];
                        } });
                const { default: __VLS_50 } = __VLS_46.slots;
                (sub.name);
                var __VLS_46;
                var __VLS_47;
            }
        }
        var __VLS_40;
    }
}
var __VLS_26;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#DCCFC0]/40']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-serif']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['font-jp']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['invisible']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-bottom-1']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['invisible']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:visible']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#DCCFC0]/50']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-jp']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#DCCFC0]/30']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#DCCFC0]/20']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
