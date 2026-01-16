import { computed } from 'vue';
const props = defineProps();
const orderedKeys = computed(() => {
    const fallback = ['Sweetness', 'Acidity', 'Clarity', 'Body', 'Aftertaste'];
    // 若外部傳入 scores 有缺 key，就依 fallback 補齊（避免雷達圖軸數錯亂）
    const keys = fallback.filter((k) => Object.prototype.hasOwnProperty.call(props.scores, k));
    return keys.length === 5 ? keys : fallback;
});
const ringLevels = [1, 2, 3, 4, 5];
const cx = 80;
const cy = 80;
const radius = 45;
const labelRadius = 64;
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function angleRad(idx) {
    // 0: top, clockwise
    return (Math.PI * 2 * idx) / orderedKeys.value.length - Math.PI / 2;
}
function pointAt(r, idx) {
    const a = angleRad(idx);
    return {
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a),
    };
}
function axisPoint(idx) {
    return pointAt(radius, idx);
}
function safeScore(key) {
    const v = Number(props.scores?.[key]);
    if (Number.isFinite(v))
        return clamp(v, 1, 5);
    return 1;
}
function dataPoint(idx) {
    const key = orderedKeys.value[idx] ?? '';
    const t = safeScore(key) / 5; // 1..5 映射到 0.2..1
    return pointAt(radius * t, idx);
}
function polygonPoints(points) {
    return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}
function polygonForLevel(level) {
    const t = clamp(level, 1, 5) / 5;
    const pts = orderedKeys.value.map((_, idx) => pointAt(radius * t, idx));
    return polygonPoints(pts);
}
const dataPolygon = computed(() => {
    const pts = orderedKeys.value.map((_, idx) => dataPoint(idx));
    return polygonPoints(pts);
});
function labelPoint(idx) {
    return pointAt(labelRadius, idx);
}
function labelAnchor(idx) {
    const a = angleRad(idx);
    const c = Math.cos(a);
    if (c > 0.35)
        return 'start';
    if (c < -0.35)
        return 'end';
    return 'middle';
}
function displayLabel(key) {
    return props.labelMap?.[key] ?? key;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-xl bg-[rgba(44,74,59,0.04)] p-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-full" },
    viewBox: "0 0 160 160",
    role: "img",
    'aria-label': "Flavor radar chart",
});
for (const [lvl] of __VLS_getVForSourceType((__VLS_ctx.ringLevels))) {
    // @ts-ignore
    [ringLevels,];
    __VLS_asFunctionalElement(__VLS_intrinsics.polygon)({
        key: (lvl),
        points: (__VLS_ctx.polygonForLevel(lvl)),
        fill: "none",
        stroke: "rgba(39,60,53,0.22)",
        'stroke-width': "1",
    });
    // @ts-ignore
    [polygonForLevel,];
}
for (const [k, idx] of __VLS_getVForSourceType((__VLS_ctx.orderedKeys))) {
    // @ts-ignore
    [orderedKeys,];
    __VLS_asFunctionalElement(__VLS_intrinsics.line)({
        key: (k),
        x1: (__VLS_ctx.cx),
        y1: (__VLS_ctx.cy),
        x2: (__VLS_ctx.axisPoint(idx).x),
        y2: (__VLS_ctx.axisPoint(idx).y),
        stroke: "rgba(39,60,53,0.22)",
        'stroke-width': "1",
    });
    // @ts-ignore
    [cx, cy, axisPoint, axisPoint,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.polygon)({
    points: (__VLS_ctx.dataPolygon),
    fill: "rgba(44,74,59,0.18)",
    stroke: "rgba(39,60,53,0.72)",
    'stroke-width': "1.6",
});
// @ts-ignore
[dataPolygon,];
for (const [k, idx] of __VLS_getVForSourceType((__VLS_ctx.orderedKeys))) {
    // @ts-ignore
    [orderedKeys,];
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        key: (k),
        cx: (__VLS_ctx.dataPoint(idx).x),
        cy: (__VLS_ctx.dataPoint(idx).y),
        r: "2.2",
        fill: "rgba(39,60,53,0.9)",
    });
    // @ts-ignore
    [dataPoint, dataPoint,];
}
for (const [k, idx] of __VLS_getVForSourceType((__VLS_ctx.orderedKeys))) {
    // @ts-ignore
    [orderedKeys,];
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)({
        key: (k + '-label'),
        x: (__VLS_ctx.labelPoint(idx).x),
        y: (__VLS_ctx.labelPoint(idx).y),
        'text-anchor': (__VLS_ctx.labelAnchor(idx)),
        'dominant-baseline': "middle",
        ...{ class: "fill-[#273c35] text-[10px]" },
    });
    // @ts-ignore
    [labelPoint, labelPoint, labelAnchor,];
    (__VLS_ctx.displayLabel(k));
    // @ts-ignore
    [displayLabel,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5" },
});
for (const [k] of __VLS_getVForSourceType((__VLS_ctx.orderedKeys))) {
    // @ts-ignore
    [orderedKeys,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (k + '-mini'),
        ...{ class: "rounded-lg bg-[rgba(252,249,243,0.85)] px-2 py-1 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-[12px] font-semibold text-[#273c35]" },
    });
    (__VLS_ctx.safeScore(k).toFixed(1));
    // @ts-ignore
    [safeScore,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-[11px] text-[#8a847a]" },
    });
    (__VLS_ctx.displayLabel(k));
    // @ts-ignore
    [displayLabel,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-2 text-[12px] text-[#8a847a]" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(44,74,59,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,243,0.85)]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
