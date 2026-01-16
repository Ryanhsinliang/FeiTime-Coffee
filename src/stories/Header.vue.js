import MyButton from './Button.vue';
import './header.css';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "storybook-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    fill: "none",
    'fill-rule': "evenodd",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",
    fill: "#FFF",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",
    fill: "#555AB9",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",
    fill: "#91BAF8",
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
if (__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "welcome" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (__VLS_ctx.user.name);
    // @ts-ignore
    [user,];
}
if (__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    /** @type {[typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
        size: "small",
        label: "Log out",
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        size: "small",
        label: "Log out",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.user))
                    return;
                __VLS_ctx.$emit('logout');
                // @ts-ignore
                [$emit,];
            } });
    var __VLS_2;
    var __VLS_3;
}
if (!__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    /** @type {[typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
        size: "small",
        label: "Log in",
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClick': {} },
        size: "small",
        label: "Log in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.user))
                    return;
                __VLS_ctx.$emit('login');
                // @ts-ignore
                [$emit,];
            } });
    var __VLS_9;
    var __VLS_10;
}
if (!__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    /** @type {[typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
        primary: true,
        size: "small",
        label: "Sign up",
    }));
    const __VLS_15 = __VLS_14({
        ...{ 'onClick': {} },
        primary: true,
        size: "small",
        label: "Sign up",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_18;
    const __VLS_19 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.user))
                    return;
                __VLS_ctx.$emit('createAccount');
                // @ts-ignore
                [$emit,];
            } });
    var __VLS_16;
    var __VLS_17;
}
/** @type {__VLS_StyleScopedClasses['storybook-header']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
