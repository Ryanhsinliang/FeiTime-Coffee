import { useAuthStore } from '../store/auth';
const authStore = useAuthStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.authStore.banner) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([
                'banner-container',
                __VLS_ctx.authStore.banner.type === 'error' ? 'bg-red-500' : 'bg-amber-500',
            ]) },
    });
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.authStore.banner.message);
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.authStore.clearBanner) },
        ...{ class: "close-btn" },
    });
    // @ts-ignore
    [authStore,];
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['banner-container']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
