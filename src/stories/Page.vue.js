import { ref } from 'vue';
import MyHeader from './Header.vue';
import './page.css';
const user = ref(null);
const onLogin = () => {
    user.value = { name: 'Jane Doe' };
};
const onLogout = () => {
    user.value = null;
};
const onCreateAccount = () => {
    user.value = { name: 'Jane Doe' };
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({});
/** @type {[typeof MyHeader, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MyHeader, new MyHeader({
    ...{ 'onLogin': {} },
    ...{ 'onLogout': {} },
    ...{ 'onCreateAccount': {} },
    user: (__VLS_ctx.user),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onLogin': {} },
    ...{ 'onLogout': {} },
    ...{ 'onCreateAccount': {} },
    user: (__VLS_ctx.user),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_4;
const __VLS_5 = ({ login: {} },
    { onLogin: (__VLS_ctx.onLogin) });
const __VLS_6 = ({ logout: {} },
    { onLogout: (__VLS_ctx.onLogout) });
const __VLS_7 = ({ createAccount: {} },
    { onCreateAccount: (__VLS_ctx.onCreateAccount) });
// @ts-ignore
[user, onLogin, onLogout, onCreateAccount,];
var __VLS_2;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "storybook-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://componentdriven.org",
    target: "_blank",
    rel: "noopener noreferrer",
});
__VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://storybook.js.org/tutorials/",
    target: "_blank",
    rel: "noopener noreferrer",
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://storybook.js.org/docs",
    target: "_blank",
    rel: "noopener noreferrer",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tip-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "tip" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "10",
    height: "10",
    viewBox: "0 0 12 12",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    fill: "none",
    'fill-rule': "evenodd",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",
    id: "a",
    fill: "#999",
});
/** @type {__VLS_StyleScopedClasses['storybook-page']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
