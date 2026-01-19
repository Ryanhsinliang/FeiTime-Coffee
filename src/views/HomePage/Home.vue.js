import { ref } from 'vue';
import AtroposComponent from 'atropos/element';
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_export = (await import('vue')).defineComponent({
    setup() {
        const showVideo = ref(false);
        const videoUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
        // 新增狀態：追蹤按鈕是否已觸發
        const isActivated = ref(false);
        if (!customElements.get('atropos-component')) {
            customElements.define('atropos-component', AtroposComponent);
        }
        const playVideo = () => {
            showVideo.value = true;
        };
        // 關鍵新方法：處理 Atropos 容器的點擊事件
        const handleAtroposActivation = () => {
            if (isActivated.value) {
                // 如果已經播放，則不處理（防止重複點擊）
                return;
            } // 設置為已啟動
            isActivated.value = true; // 觸發你想要的按鈕事件
            playVideo();
        };
        return { showVideo, playVideo, videoUrl, handleAtroposActivation };
    },
});
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        const showVideo = ref(false);
        const videoUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
        // 新增狀態：追蹤按鈕是否已觸發
        const isActivated = ref(false);
        if (!customElements.get('atropos-component')) {
            customElements.define('atropos-component', AtroposComponent);
        }
        const playVideo = () => {
            showVideo.value = true;
        };
        // 關鍵新方法：處理 Atropos 容器的點擊事件
        const handleAtroposActivation = () => {
            if (isActivated.value) {
                // 如果已經播放，則不處理（防止重複點擊）
                return;
            } // 設置為已啟動
            isActivated.value = true; // 觸發你想要的按鈕事件
            playVideo();
        };
        return { showVideo, playVideo, videoUrl, handleAtroposActivation };
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['my-atropos']} */ ;
/** @type {__VLS_StyleScopedClasses['my-atropos']} */ ;
/** @type {__VLS_StyleScopedClasses['my-atropos']} */ ;
/** @type {__VLS_StyleScopedClasses['my-atropos']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen flex items-center justify-center bg-gray-900" },
});
if (!__VLS_ctx.showVideo) {
    // @ts-ignore
    [showVideo,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-shadow" },
    });
    const __VLS_0 = {}.AtroposComponent;
    /** @type {[typeof __VLS_components.AtroposComponent, typeof __VLS_components.atroposComponent, typeof __VLS_components.AtroposComponent, typeof __VLS_components.atroposComponent, ]} */ ;
    // @ts-ignore
    AtroposComponent;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        ...{ class: "my-atropos" },
        activeOffset: (40),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        ...{ class: "my-atropos" },
        activeOffset: (40),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (__VLS_ctx.handleAtroposActivation) });
    const { default: __VLS_7 } = __VLS_3.slots;
    // @ts-ignore
    [handleAtroposActivation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "atropos-inner flex items-center justify-center w-full h-full rounded-xl" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "neon-bg rounded-xl" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (() => { }) },
        ...{ class: "btn-text" },
    });
    var __VLS_3;
    var __VLS_4;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full max-w-3xl aspect-video" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.iframe, __VLS_intrinsics.iframe)({
        width: "100%",
        height: "100%",
        src: (__VLS_ctx.videoUrl),
        title: "FeiTime",
        frameborder: "0",
        allow: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u0063\u0063\u0065\u006c\u0065\u0072\u006f\u006d\u0065\u0074\u0065\u0072\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u0075\u0074\u006f\u0070\u006c\u0061\u0079\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0063\u006c\u0069\u0070\u0062\u006f\u0061\u0072\u0064\u002d\u0077\u0072\u0069\u0074\u0065\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0065\u0064\u002d\u006d\u0065\u0064\u0069\u0061\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0067\u0079\u0072\u006f\u0073\u0063\u006f\u0070\u0065\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0070\u0069\u0063\u0074\u0075\u0072\u0065\u002d\u0069\u006e\u002d\u0070\u0069\u0063\u0074\u0075\u0072\u0065\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
        allowfullscreen: true,
    });
    // @ts-ignore
    [videoUrl,];
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['card-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['my-atropos']} */ ;
/** @type {__VLS_StyleScopedClasses['atropos-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['neon-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-video']} */ ;
export default {};
