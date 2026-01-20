import { defineComponent, ref, reactive, computed } from 'vue';
import { callGemini } from '@/services/geminiService';
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_export = defineComponent({
    name: 'CoffeeSimulatorT1',
    setup() {
        // 模擬器參數
        const config = reactive({
            roastLevel: 0, // -1: 淺焙, 0: 中焙, 1: 深焙
            ratio: 16,
            brewTimeSec: 150,
            grindLevel: 0, // -1 細, 0 中, 1 粗
            pours: 3,
            bloomTimeSec: 30,
            waterTempC: 92,
            coffeeDose: 18,
        });
        // 風味權重計算 (範例)
        const finalProfile = computed(() => ({
            sweetness: Math.min(5, 3 + config.roastLevel * 0.5),
            acidity: Math.max(1, 3 - config.roastLevel * 0.3),
            clarity: Math.min(5, 3 + (config.ratio - 16) * 0.2),
            body: Math.min(5, 2.5 + config.brewTimeSec / 100),
            aftertaste: Math.min(5, 3 + config.pours * 0.3),
        }));
        const labelMap = {
            sweetness: '甜度',
            acidity: '酸質',
            clarity: '清晰度',
            body: '醇厚',
            aftertaste: '餘韻',
        };
        function getGradient(value) {
            return `linear-gradient(to right, #d8b995, #2c4a3b ${value * 20}%)`;
        }
        const roastLabel = computed(() => config.roastLevel === -1 ? '淺焙' : config.roastLevel === 0 ? '中焙' : '深焙');
        const grindLabel = computed(() => config.grindLevel === -1 ? '細' : config.grindLevel === 0 ? '中' : '粗');
        // 小助手
        const assistantText = ref('點擊「請小助手幫我選」來獲得建議');
        const askAssistant = async () => {
            assistantText.value = '小助手思考中...';
            try {
                const res = await callGemini({
                    roast: roastLabel.value,
                    ratio: config.ratio,
                    brewTimeSec: config.brewTimeSec,
                    grind: grindLabel.value,
                    pours: config.pours,
                });
                // 更新小助手文字
                assistantText.value = res.text;
                // 如果後端有建議參數，套用到模擬器
                if (res.suggestedConfig) {
                    Object.assign(config, res.suggestedConfig);
                }
            }
            catch (err) {
                console.error(err);
                assistantText.value = 'API 呼叫失敗，請稍後再試';
            }
        };
        // 滾動到故事區
        const scrollToStory = () => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
        };
        return {
            config,
            finalProfile,
            labelMap,
            getGradient,
            roastLabel,
            grindLabel,
            assistantText,
            askAssistant,
            scrollToStory,
        };
    },
});
const __VLS_self = (await import('vue')).defineComponent({
    name: 'CoffeeSimulatorT1',
    setup() {
        // 模擬器參數
        const config = reactive({
            roastLevel: 0, // -1: 淺焙, 0: 中焙, 1: 深焙
            ratio: 16,
            brewTimeSec: 150,
            grindLevel: 0, // -1 細, 0 中, 1 粗
            pours: 3,
            bloomTimeSec: 30,
            waterTempC: 92,
            coffeeDose: 18,
        });
        // 風味權重計算 (範例)
        const finalProfile = computed(() => ({
            sweetness: Math.min(5, 3 + config.roastLevel * 0.5),
            acidity: Math.max(1, 3 - config.roastLevel * 0.3),
            clarity: Math.min(5, 3 + (config.ratio - 16) * 0.2),
            body: Math.min(5, 2.5 + config.brewTimeSec / 100),
            aftertaste: Math.min(5, 3 + config.pours * 0.3),
        }));
        const labelMap = {
            sweetness: '甜度',
            acidity: '酸質',
            clarity: '清晰度',
            body: '醇厚',
            aftertaste: '餘韻',
        };
        function getGradient(value) {
            return `linear-gradient(to right, #d8b995, #2c4a3b ${value * 20}%)`;
        }
        const roastLabel = computed(() => config.roastLevel === -1 ? '淺焙' : config.roastLevel === 0 ? '中焙' : '深焙');
        const grindLabel = computed(() => config.grindLevel === -1 ? '細' : config.grindLevel === 0 ? '中' : '粗');
        // 小助手
        const assistantText = ref('點擊「請小助手幫我選」來獲得建議');
        const askAssistant = async () => {
            assistantText.value = '小助手思考中...';
            try {
                const res = await callGemini({
                    roast: roastLabel.value,
                    ratio: config.ratio,
                    brewTimeSec: config.brewTimeSec,
                    grind: grindLabel.value,
                    pours: config.pours,
                });
                // 更新小助手文字
                assistantText.value = res.text;
                // 如果後端有建議參數，套用到模擬器
                if (res.suggestedConfig) {
                    Object.assign(config, res.suggestedConfig);
                }
            }
            catch (err) {
                console.error(err);
                assistantText.value = 'API 呼叫失敗，請稍後再試';
            }
        };
        // 滾動到故事區
        const scrollToStory = () => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
        };
        return {
            config,
            finalProfile,
            labelMap,
            getGradient,
            roastLabel,
            grindLabel,
            assistantText,
            askAssistant,
            scrollToStory,
        };
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-[radial-gradient(circle_at_top_left,#fdf8f2_0,#f4eee4_42%,#f3ece2)] text-[#3c3a37] font-wenkai" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "mb-6 flex flex-col gap-4 rounded-2xl border border-[rgba(199,182,150,0.5)] bg-[rgba(252,249,243,0.96)] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.04)] lg:sticky lg:top-6 lg:mb-0 lg:self-start" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "block text-base tracking-[0.24em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "block text-[11px] tracking-[0.12em] uppercase text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "mt-2 flex flex-col gap-1 md:flex-row md:flex-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#story",
    ...{ class: "rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#simulator",
    ...{ class: "rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#flavors",
    ...{ class: "rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-2 border-t border-dashed border-[rgba(199,182,150,0.7)] pt-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-xs leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "w-full lg:max-w-3xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "py-4 lg:py-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto flex max-w-4xl flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-3 text-[11px] tracking-[0.18em] uppercase text-[#d8b995]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "mb-3 text-3xl leading-snug tracking-[0.12em] text-[#273c35] md:text-[34px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "max-w-xl text-sm leading-relaxed md:text-[15px] md:leading-[1.7]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-4 flex flex-wrap gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#simulator",
    ...{ class: "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2c4a3b] to-[#385548] px-5 py-2.5 text-[13px] tracking-[0.12em] uppercase text-[#fdfaf5]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.scrollToStory) },
    type: "button",
    ...{ class: "inline-flex items-center justify-center rounded-full border border-[rgba(199,182,150,0.7)] px-4 py-2 text-[12px] tracking-[0.16em] uppercase text-[#273c35] bg-transparent" },
});
// @ts-ignore
[scrollToStory,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-start md:justify-end" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full max-w-xs rounded-2xl border border-[rgba(199,182,150,0.4)] bg-[#fdf9f3] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.06)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-3 text-[12px] tracking-[0.16em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "mb-2 space-y-1 text-[13px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "flex justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "flex justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "flex justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "flex justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[11px] leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "py-6" },
    id: "story",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto flex max-w-4xl flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "mb-3 text-xl tracking-[0.08em] text-[#273c35] md:text-[22px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-2 text-sm leading-relaxed md:text-[14px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm leading-relaxed md:text-[14px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-2xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] p-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-1 text-[13px] tracking-[0.14em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-1 text-[13px] leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[13px] leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "border-t border-[rgba(44,74,59,0.12)] py-10" },
    id: "simulator",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto max-w-4xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto mb-8 max-w-2xl text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "mb-3 text-2xl tracking-[0.08em] text-[#273c35] md:text-[28px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "mb-4 text-sm tracking-[0.18em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[13px] tracking-normal" },
});
(__VLS_ctx.roastLabel);
// @ts-ignore
[roastLabel,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "range",
    min: "-1",
    max: "1",
    step: "1",
    ...{ class: "w-full cursor-pointer accent-[#273c35]" },
});
(__VLS_ctx.config.roastLevel);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-1 flex justify-between text-[11px] text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[13px] tracking-normal" },
});
(__VLS_ctx.config.ratio);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "range",
    min: "12",
    max: "20",
    step: "0.5",
    ...{ class: "w-full cursor-pointer accent-[#273c35]" },
});
(__VLS_ctx.config.ratio);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-1 text-[11px] text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[13px] tracking-normal" },
});
(__VLS_ctx.config.brewTimeSec);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "range",
    min: "120",
    max: "240",
    step: "5",
    ...{ class: "w-full cursor-pointer accent-[#273c35]" },
});
(__VLS_ctx.config.brewTimeSec);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-1 text-[11px] text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[13px] tracking-normal" },
});
(__VLS_ctx.grindLabel);
// @ts-ignore
[grindLabel,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "range",
    min: "-1",
    max: "1",
    step: "0.5",
    ...{ class: "w-full cursor-pointer accent-[#273c35]" },
});
(__VLS_ctx.config.grindLevel);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-1 flex justify-between text-[11px] text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[13px] tracking-normal" },
});
(__VLS_ctx.config.pours);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "range",
    min: "1",
    max: "5",
    step: "1",
    ...{ class: "w-full cursor-pointer accent-[#273c35]" },
});
(__VLS_ctx.config.pours);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-3 flex flex-wrap gap-3 border-t border-dashed border-[rgba(44,74,59,0.2)] pt-3 text-[13px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-w-[88px] flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.config.bloomTimeSec);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-w-[88px] flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.config.waterTempC);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-w-[88px] flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.config.coffeeDose);
// @ts-ignore
[config,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "mb-2 text-sm tracking-[0.18em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-4 text-[12px] text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-4 flex flex-col gap-2.5" },
});
for (const [value, key] of __VLS_getVForSourceType((__VLS_ctx.finalProfile))) {
    // @ts-ignore
    [finalProfile,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (key),
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-18 text-[13px] text-[#273c35]" },
    });
    (__VLS_ctx.labelMap[key]);
    // @ts-ignore
    [labelMap,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mx-2.5 flex-1 h-2 overflow-hidden rounded-full bg-[rgba(240,232,220,0.9)]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full rounded-full transition-[width] duration-300 ease-out" },
        ...{ style: ({
                width: (value / 5) * 100 + '%',
                background: __VLS_ctx.getGradient(value),
            }) },
    });
    // @ts-ignore
    [getGradient,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-10 text-right text-[12px] text-[#3c3a37]" },
    });
    (value.toFixed(1));
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-xl bg-[rgba(44,74,59,0.04)] px-3 py-2.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[12px] leading-relaxed text-[#8a847a]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "mb-2 text-sm tracking-[0.18em] uppercase text-[#273c35]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-2 min-h-[60px] rounded-lg border border-[rgba(44,74,59,0.15)] bg-white p-2 text-[13px] text-[#3c3a37]" },
});
(__VLS_ctx.assistantText);
// @ts-ignore
[assistantText,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.askAssistant) },
    ...{ class: "w-full rounded-full bg-[#2c4a3b] px-3 py-2 text-[13px] uppercase text-[#fdfaf5]" },
});
// @ts-ignore
[askAssistant,];
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[radial-gradient(circle_at_top_left,#fdf8f2_0,#f4eee4_42%,#f3ece2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#3c3a37]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-wenkai']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-[200px_minmax(0,1fr)]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.5)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,243,0.96)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_14px_40px_rgba(0,0,0,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:self-start']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.24em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-[rgba(199,182,150,0.6)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[rgba(253,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-[rgba(199,182,150,0.6)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[rgba(253,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-[rgba(199,182,150,0.6)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[rgba(253,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.7)]']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.18em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#d8b995]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-snug']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[34px]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[15px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:leading-[1.7]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-[#2c4a3b]']} */ ;
/** @type {__VLS_StyleScopedClasses['to-[#385548]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#fdfaf5]']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.7)]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['md:justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.4)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#fdf9f3]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_20px_48px_rgba(0,0,0,0.06)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#d8b995]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.08em]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[22px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.4)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,244,0.96)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.14em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(44,74,59,0.12)]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#d8b995]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.08em]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[28px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.35)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_14px_40px_rgba(0,0,0,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.18em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.06em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.06em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.06em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.06em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.06em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(44,74,59,0.2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[88px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[88px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[88px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.12em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.35)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_14px_40px_rgba(0,0,0,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.18em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-18']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(240,232,220,0.9)]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-[width]']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#3c3a37]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(44,74,59,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.16em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8a847a]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(199,182,150,0.35)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(252,249,243,0.95)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_14px_40px_rgba(0,0,0,0.04)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.18em]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#273c35]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[rgba(44,74,59,0.15)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#3c3a37]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#2c4a3b]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#fdfaf5]']} */ ;
export default {};
