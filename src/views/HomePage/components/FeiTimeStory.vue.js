import { ref } from 'vue';
// 按鈕 hover 狀態
const isBrewingHovered = ref(false);
const isQuizHovered = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['bubble-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-wave-top']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "feitime-story-section relative w-full py-24 overflow-hidden bg-[#FFFEFB]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none z-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-full h-[400px]" },
    viewBox: "0 0 1920 400",
    preserveAspectRatio: "xMidYMid slice",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "flowing-highlight",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%",
    gradientUnits: "userSpaceOnUse",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #dccfc0; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.15; 1.15",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "5%",
    ...{ style: "stop-color: #f5e6d3; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.1; 1.2",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "10%",
    ...{ style: "stop-color: #fffef5; stop-opacity: 1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.05; 1.25",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "15%",
    ...{ style: "stop-color: #f5e6d3; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "0; 1.3",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "20%",
    ...{ style: "stop-color: #dccfc0; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "0.05; 1.35",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    stroke: "#A2AF9B",
    'stroke-width': "6",
    opacity: "0.3",
    fill: "none",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 0 200 L 250 200 L 270 140 L 290 260 L 310 200 L 520 200",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 1400 200 L 1610 200 L 1630 180 L 1650 220 L 1670 200 L 1920 200",
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    stroke: "url(#flowing-highlight)",
    'stroke-width': "6",
    fill: "none",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "flow-active flow-left" },
    d: "M 0 200 L 250 200 L 270 140 L 290 260 L 310 200 L 520 200",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "flow-active flow-right" },
    d: "M 1400 200 L 1610 200 L 1630 180 L 1650 220 L 1670 200 L 1920 200",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-[1200px] mx-auto px-6 md:px-12 relative z-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-container relative rounded-2xl p-8 md:p-16 border border-white/60 shadow-xl shadow-sage/10 overflow-hidden" },
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0061\u0063\u006b\u0067\u0072\u006f\u0075\u006e\u0064\u003a\u0020\u006c\u0069\u006e\u0065\u0061\u0072\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u0028\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0031\u0033\u0035\u0064\u0065\u0067\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0030\u002c\u0020\u0032\u0033\u0030\u002c\u0020\u0030\u002e\u0037\u0029\u0020\u0030\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0034\u0035\u002c\u0020\u0032\u0033\u0030\u002c\u0020\u0032\u0031\u0031\u002c\u0020\u0030\u002e\u0037\u0035\u0029\u0020\u0032\u0035\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0034\u0038\u002c\u0020\u0032\u0032\u0030\u002c\u0020\u0030\u002e\u0036\u0035\u0029\u0020\u0035\u0030\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0030\u002c\u0020\u0032\u0034\u0030\u002c\u0020\u0032\u0031\u0035\u002c\u0020\u0030\u002e\u0037\u0035\u0029\u0020\u0037\u0035\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0030\u002c\u0020\u0032\u0033\u0030\u002c\u0020\u0030\u002e\u0037\u0029\u0020\u0031\u0030\u0030\u0025\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0061\u0063\u006b\u0064\u0072\u006f\u0070\u002d\u0066\u0069\u006c\u0074\u0065\u0072\u003a\u0020\u0062\u006c\u0075\u0072\u0028\u0032\u0030\u0070\u0078\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "card-border-flow-svg" },
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "card-border-gradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #dccfc0; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.15; 1.15",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "5%",
    ...{ style: "stop-color: #f5e6d3; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.1; 1.2",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "10%",
    ...{ style: "stop-color: #fffef5; stop-opacity: 1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "-0.05; 1.25",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "15%",
    ...{ style: "stop-color: #f5e6d3; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "0; 1.3",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop, __VLS_intrinsics.stop)({
    offset: "20%",
    ...{ style: "stop-color: #dccfc0; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.animate)({
    attributeName: "offset",
    values: "0.05; 1.35",
    dur: "8s",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsics.filter, __VLS_intrinsics.filter)({
    id: "border-glow",
    x: "-100%",
    y: "-100%",
    width: "300%",
    height: "300%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feGaussianBlur)({
    stdDeviation: "3",
    result: "coloredBlur",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feMerge, __VLS_intrinsics.feMerge)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({
    in: "coloredBlur",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({
    in: "coloredBlur",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({
    in: "SourceGraphic",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "\u004d\u0020\u0030\u0020\u0035\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0030\u0020\u0031\u002e\u0035\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0030\u0020\u0030\u002c\u0020\u0031\u002e\u0035\u0020\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0039\u0038\u002e\u0035\u0020\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0031\u0030\u0030\u0020\u0030\u002c\u0020\u0031\u0030\u0030\u0020\u0031\u002e\u0035\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0031\u0030\u0030\u0020\u0035\u0030",
    fill: "none",
    stroke: "#A2AF9B",
    'stroke-width': "2",
    opacity: "0.3",
    'vector-effect': "non-scaling-stroke",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "\u004d\u0020\u0030\u0020\u0035\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0030\u0020\u0039\u0038\u002e\u0035\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0030\u0020\u0031\u0030\u0030\u002c\u0020\u0031\u002e\u0035\u0020\u0031\u0030\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0039\u0038\u002e\u0035\u0020\u0031\u0030\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0031\u0030\u0030\u0020\u0031\u0030\u0030\u002c\u0020\u0031\u0030\u0030\u0020\u0039\u0038\u002e\u0035\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0031\u0030\u0030\u0020\u0035\u0030",
    fill: "none",
    stroke: "#A2AF9B",
    'stroke-width': "2",
    opacity: "0.3",
    'vector-effect': "non-scaling-stroke",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "card-border-flow card-border-top" },
    d: "\u004d\u0020\u0030\u0020\u0035\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0030\u0020\u0031\u002e\u0035\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0030\u0020\u0030\u002c\u0020\u0031\u002e\u0035\u0020\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0039\u0038\u002e\u0035\u0020\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0031\u0030\u0030\u0020\u0030\u002c\u0020\u0031\u0030\u0030\u0020\u0031\u002e\u0035\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0031\u0030\u0030\u0020\u0035\u0030",
    fill: "none",
    stroke: "url(#card-border-gradient)",
    'stroke-width': "6",
    filter: "url(#border-glow)",
    'vector-effect': "non-scaling-stroke",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    ...{ class: "card-border-flow card-border-bottom" },
    d: "\u004d\u0020\u0030\u0020\u0035\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0030\u0020\u0039\u0038\u002e\u0035\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0030\u0020\u0031\u0030\u0030\u002c\u0020\u0031\u002e\u0035\u0020\u0031\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0039\u0038\u002e\u0035\u0020\u0031\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0051\u0020\u0031\u0030\u0030\u0020\u0031\u0030\u0030\u002c\u0020\u0031\u0030\u0030\u0020\u0039\u0038\u002e\u0035\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u004c\u0020\u0031\u0030\u0030\u0020\u0035\u0030",
    fill: "none",
    stroke: "url(#card-border-gradient)",
    'stroke-width': "6",
    filter: "url(#border-glow)",
    'vector-effect': "non-scaling-stroke",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 pointer-events-none rounded-2xl" },
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0061\u0063\u006b\u0067\u0072\u006f\u0075\u006e\u0064\u003a\u0020\u006c\u0069\u006e\u0065\u0061\u0072\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u0028\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u006f\u0020\u0062\u006f\u0074\u0074\u006f\u006d\u0020\u0072\u0069\u0067\u0068\u0074\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0030\u002e\u0032\u0035\u0029\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0067\u0062\u0061\u0028\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0032\u0035\u0035\u002c\u0020\u0030\u002e\u0030\u0035\u0029\u0020\u0037\u0030\u0025\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0070\u0061\u0072\u0065\u006e\u0074\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col md:flex-row gap-16 items-center relative z-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full md:w-1/2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative w-full aspect-[4/5] overflow-hidden rounded-lg group" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-cover bg-center grayscale-[10%] transition-transform duration-700 group-hover:scale-105" },
    ...{ style: ({
            backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')`,
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-4 border border-white/20 pointer-events-none" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full md:w-1/2 flex flex-col gap-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[#6B7F6E] tracking-[0.3em] uppercase text-xs font-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-4xl md:text-5xl font-serif text-[#4A3728] leading-tight" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-16 h-1 bg-[#DCCFC0]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-gray-600 font-light leading-relaxed text-base" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-4" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    to: "/coffeeLabT1-T",
    ...{ class: "bubble-button-container group" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    to: "/coffeeLabT1-T",
    ...{ class: "bubble-button-container group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ mouseenter: {} },
    { onMouseenter: (...[$event]) => {
            __VLS_ctx.isBrewingHovered = true;
            // @ts-ignore
            [isBrewingHovered,];
        } });
const __VLS_7 = ({ mouseleave: {} },
    { onMouseleave: (...[$event]) => {
            __VLS_ctx.isBrewingHovered = false;
            // @ts-ignore
            [isBrewingHovered,];
        } });
const { default: __VLS_8 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bubble-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 200 200",
    ...{ class: "bubble-svg" },
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "liquid-brewing",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #8b6f4b; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: "stop-color: #4a3728; stop-opacity: 0.95" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.radialGradient, __VLS_intrinsics.radialGradient)({
    id: "bubble-shine-brewing",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "50%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0.25" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.clipPath, __VLS_intrinsics.clipPath)({
    id: "bubble-clip-brewing",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "82",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "85",
    fill: "rgba(255, 255, 255, 0.15)",
    stroke: "#B8A07E",
    'stroke-width': "3",
    opacity: "0.7",
    ...{ class: "bubble-outline" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    'clip-path': "url(#bubble-clip-brewing)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "18",
    y: "140",
    width: "164",
    height: "60",
    fill: "url(#liquid-brewing)",
    ...{ class: "liquid-fill" },
    ...{ class: ({ 'liquid-active': __VLS_ctx.isBrewingHovered }) },
});
// @ts-ignore
[isBrewingHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 18 140 Q 40 137, 60 140 T 100 140 T 140 140 T 182 140",
    fill: "url(#liquid-brewing)",
    ...{ class: "liquid-wave-top" },
    ...{ class: ({ 'wave-active': __VLS_ctx.isBrewingHovered }) },
});
// @ts-ignore
[isBrewingHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "100",
    cy: "140",
    rx: "75",
    ry: "8",
    fill: "#B8A07E",
    opacity: "0.3",
    ...{ class: "liquid-surface" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.foreignObject, __VLS_intrinsics.foreignObject)({
    x: "30",
    y: "20",
    width: "140",
    height: "140",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    xmlns: "http://www.w3.org/1999/xhtml",
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0069\u0073\u0070\u006c\u0061\u0079\u003a\u0020\u0066\u006c\u0065\u0078\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u006f\u006e\u0074\u0065\u006e\u0074\u003a\u0020\u0063\u0065\u006e\u0074\u0065\u0072\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u006c\u0069\u0067\u006e\u002d\u0069\u0074\u0065\u006d\u0073\u003a\u0020\u0063\u0065\u006e\u0074\u0065\u0072\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0077\u0069\u0064\u0074\u0068\u003a\u0020\u0031\u0030\u0030\u0025\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0065\u0069\u0067\u0068\u0074\u003a\u0020\u0031\u0030\u0030\u0025\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined icon-brewing" },
    ...{ style: ({
            fontSize: '72px',
            color: __VLS_ctx.isBrewingHovered ? '#8B6F4B' : '#D4C5B0',
            opacity: __VLS_ctx.isBrewingHovered ? '1' : '0.5',
            transition: 'all 0.5s ease',
        }) },
});
// @ts-ignore
[isBrewingHovered, isBrewingHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "60",
    cy: "60",
    r: "35",
    fill: "url(#bubble-shine-brewing)",
    ...{ class: "bubble-highlight" },
});
if (__VLS_ctx.isBrewingHovered) {
    // @ts-ignore
    [isBrewingHovered,];
    __VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
        ...{ class: "rising-bubbles" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "70",
        cy: "160",
        r: "3",
        fill: "#B8A07E",
        opacity: "0.7",
        ...{ class: "bubble-rise-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "100",
        cy: "165",
        r: "2.5",
        fill: "#B8A07E",
        opacity: "0.6",
        ...{ class: "bubble-rise-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "130",
        cy: "158",
        r: "3.5",
        fill: "#B8A07E",
        opacity: "0.7",
        ...{ class: "bubble-rise-3" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-[#8B6F4B] font-bold text-center mt-3" },
});
var __VLS_3;
var __VLS_4;
const __VLS_9 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    to: "/coffee-id-test",
    ...{ class: "bubble-button-container group" },
}));
const __VLS_11 = __VLS_10({
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    to: "/coffee-id-test",
    ...{ class: "bubble-button-container group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_14;
const __VLS_15 = ({ mouseenter: {} },
    { onMouseenter: (...[$event]) => {
            __VLS_ctx.isQuizHovered = true;
            // @ts-ignore
            [isQuizHovered,];
        } });
const __VLS_16 = ({ mouseleave: {} },
    { onMouseleave: (...[$event]) => {
            __VLS_ctx.isQuizHovered = false;
            // @ts-ignore
            [isQuizHovered,];
        } });
const { default: __VLS_17 } = __VLS_12.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bubble-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 200 200",
    ...{ class: "bubble-svg" },
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "liquid-quiz",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #a8c5a3; stop-opacity: 0.85" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: "stop-color: #8faf8a; stop-opacity: 0.9" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.radialGradient, __VLS_intrinsics.radialGradient)({
    id: "bubble-shine-quiz",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "50%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0.25" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: "stop-color: #ffffff; stop-opacity: 0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.clipPath, __VLS_intrinsics.clipPath)({
    id: "bubble-clip-quiz",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "82",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "85",
    fill: "rgba(255, 255, 255, 0.15)",
    stroke: "#A8C5A3",
    'stroke-width': "3",
    opacity: "0.7",
    ...{ class: "bubble-outline" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
    'clip-path': "url(#bubble-clip-quiz)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "18",
    y: "145",
    width: "164",
    height: "55",
    fill: "url(#liquid-quiz)",
    ...{ class: "liquid-fill" },
    ...{ class: ({ 'liquid-active': __VLS_ctx.isQuizHovered }) },
});
// @ts-ignore
[isQuizHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 18 145 Q 40 142, 60 145 T 100 145 T 140 145 T 182 145",
    fill: "url(#liquid-quiz)",
    ...{ class: "liquid-wave-top" },
    ...{ class: ({ 'wave-active': __VLS_ctx.isQuizHovered }) },
});
// @ts-ignore
[isQuizHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "100",
    cy: "145",
    rx: "75",
    ry: "8",
    fill: "#B8D4B3",
    opacity: "0.3",
    ...{ class: "liquid-surface" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.foreignObject, __VLS_intrinsics.foreignObject)({
    x: "30",
    y: "20",
    width: "140",
    height: "140",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    xmlns: "http://www.w3.org/1999/xhtml",
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0069\u0073\u0070\u006c\u0061\u0079\u003a\u0020\u0066\u006c\u0065\u0078\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u006f\u006e\u0074\u0065\u006e\u0074\u003a\u0020\u0063\u0065\u006e\u0074\u0065\u0072\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u006c\u0069\u0067\u006e\u002d\u0069\u0074\u0065\u006d\u0073\u003a\u0020\u0063\u0065\u006e\u0074\u0065\u0072\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0077\u0069\u0064\u0074\u0068\u003a\u0020\u0031\u0030\u0030\u0025\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0065\u0069\u0067\u0068\u0074\u003a\u0020\u0031\u0030\u0030\u0025\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined icon-quiz" },
    ...{ style: ({
            fontSize: '72px',
            color: __VLS_ctx.isQuizHovered ? '#7A9F75' : '#B8D4B3',
            opacity: __VLS_ctx.isQuizHovered ? '1' : '0.5',
            transition: 'all 0.5s ease',
        }) },
});
// @ts-ignore
[isQuizHovered, isQuizHovered,];
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "60",
    cy: "60",
    r: "35",
    fill: "url(#bubble-shine-quiz)",
    ...{ class: "bubble-highlight" },
});
if (__VLS_ctx.isQuizHovered) {
    // @ts-ignore
    [isQuizHovered,];
    __VLS_asFunctionalElement(__VLS_intrinsics.g, __VLS_intrinsics.g)({
        ...{ class: "rising-bubbles" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "65",
        cy: "165",
        r: "3",
        fill: "#B8D4B3",
        opacity: "0.7",
        ...{ class: "bubble-rise-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "100",
        cy: "168",
        r: "2.5",
        fill: "#B8D4B3",
        opacity: "0.6",
        ...{ class: "bubble-rise-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "135",
        cy: "162",
        r: "3.5",
        fill: "#B8D4B3",
        opacity: "0.7",
        ...{ class: "bubble-rise-3" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-[#7A9F75] font-bold text-center mt-3" },
});
var __VLS_12;
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['feitime-story-section']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-24']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#FFFEFB]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-active']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-left']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-active']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-right']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['card-container']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['md:p-16']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/60']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sage/10']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['card-border-flow-svg']} */ ;
/** @type {__VLS_StyleScopedClasses['card-border-flow']} */ ;
/** @type {__VLS_StyleScopedClasses['card-border-top']} */ ;
/** @type {__VLS_StyleScopedClasses['card-border-flow']} */ ;
/** @type {__VLS_StyleScopedClasses['card-border-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-16']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[4/5]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['grayscale-[10%]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#6B7F6E]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.3em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-serif']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#4A3728]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#DCCFC0]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-light']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-svg']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-wave-top']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-surface']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-brewing']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['rising-bubbles']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8B6F4B]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-svg']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-wave-top']} */ ;
/** @type {__VLS_StyleScopedClasses['wave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['liquid-surface']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-quiz']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['rising-bubbles']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-rise-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#7A9F75]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
