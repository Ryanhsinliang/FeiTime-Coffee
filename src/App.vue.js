import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AIChatBall from './components/common/AIChatBall.vue';
import CustomCursor from './components/common/CustomCursor.vue';
import GlobalBanner from './components/GlobalBanner.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
// 取得當前路由
const route = useRoute();
// 判斷是否顯示 Header/Footer
const showHeaderFooter = computed(() => route.name !== 'Intro');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof GlobalBanner, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GlobalBanner, new GlobalBanner({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen flex flex-col" },
});
/** @type {[typeof CustomCursor, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(CustomCursor, new CustomCursor({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
if (__VLS_ctx.showHeaderFooter) {
    // @ts-ignore
    [showHeaderFooter,];
    /** @type {[typeof Header, typeof Header, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(Header, new Header({}));
    const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-1" },
});
const __VLS_15 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
if (__VLS_ctx.showHeaderFooter) {
    // @ts-ignore
    [showHeaderFooter,];
    /** @type {[typeof Footer, typeof Footer, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(Footer, new Footer({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
if (__VLS_ctx.showHeaderFooter) {
    // @ts-ignore
    [showHeaderFooter,];
    /** @type {[typeof AIChatBall, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(AIChatBall, new AIChatBall({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
