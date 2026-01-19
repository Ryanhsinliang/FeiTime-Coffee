import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 背景圖片網址
const backgroundImage = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuC7BgIUUVEAnEXLRFgWhsy5EcLAf-LOdf12IrgJ0Yq3TBbySJIEiyssXv0Ev3Z2AyK9y205mXaoDBDTdwu31RB2zCJVXsYRB7H3HCcVvyxSmY4Ok0WrBRBy1pAGbIcGaZguMD1EdmbCdsiKxw2gFhsUaaQZ-Yavz9I6MRCWhCVhl_1N7qGRSRuvVM8JJ-Sz61xcwbjLXp_OUp3JGAwUDeT2fK_aC9Y8SktqWrk3zL-QvV0ft9oPSzG_qohvGF4mR1RPBx06-mFyvjcO');
// Progress Bar 狀態
const progress = ref(0);
// 模擬進度增加
onMounted(() => {
    const interval = setInterval(() => {
        if (progress.value < 100) {
            progress.value += 1;
        }
        else {
            clearInterval(interval);
            // 進度完成可以導向下一頁或觸發事件
            router.push({ name: 'HomePage' });
        }
    }, 50);
});
// Skip Intro 按鈕事件
const skipIntro = () => {
    progress.value = 100;
    // 可以導向首頁或其他頁面
    router.push({ name: 'HomePage' });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bg-cream font-display overflow-hidden text-coffee-dark relative flex h-screen w-full flex-col group/design-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 z-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 mix-blend-multiply" },
    ...{ style: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0061\u0063\u006b\u0067\u0072\u006f\u0075\u006e\u0064\u002d\u0069\u006d\u0061\u0067\u0065\u003a\u0020\u0075\u0072\u006c\u0028\u0027\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006c\u0068\u0033\u002e\u0067\u006f\u006f\u0067\u006c\u0065\u0075\u0073\u0065\u0072\u0063\u006f\u006e\u0074\u0065\u006e\u0074\u002e\u0063\u006f\u006d\u002f\u0061\u0069\u0064\u0061\u002d\u0070\u0075\u0062\u006c\u0069\u0063\u002f\u0041\u0042\u0036\u0041\u0058\u0075\u0043\u0037\u0042\u0067\u0049\u0055\u0055\u0056\u0045\u0041\u006e\u0045\u0058\u004c\u0052\u0046\u0067\u0057\u0068\u0073\u0079\u0035\u0045\u0063\u004c\u0041\u0066\u002d\u004c\u004f\u0064\u0066\u0031\u0032\u0049\u0072\u0067\u004a\u0030\u0059\u0071\u0033\u0054\u0042\u0062\u0079\u0053\u004a\u0049\u0045\u0069\u0079\u0073\u0073\u0058\u0076\u0030\u0045\u0076\u0033\u005a\u0032\u0041\u0079\u004b\u0039\u0079\u0032\u0030\u0035\u006d\u0058\u0061\u006f\u0044\u0042\u0044\u0054\u0064\u0077\u0075\u0033\u0031\u0052\u0042\u0032\u007a\u0043\u004a\u0056\u0058\u0073\u0059\u0052\u0042\u0037\u0048\u0033\u0048\u0043\u0063\u0056\u0076\u0079\u0078\u0053\u006d\u0059\u0034\u004f\u006b\u0030\u0057\u0072\u0042\u0052\u0042\u0079\u0031\u0070\u0041\u0047\u0062\u0049\u0063\u0047\u0061\u005a\u0067\u0075\u004d\u0044\u0031\u0045\u0064\u006d\u0062\u0043\u0064\u0073\u0069\u004b\u0078\u0077\u0032\u0067\u0046\u0068\u0073\u0055\u0061\u0061\u0051\u005a\u002d\u0059\u0061\u0076\u007a\u0039\u0049\u0036\u004d\u0052\u0043\u0057\u0068\u0043\u0056\u0068\u006c\u005f\u0031\u004e\u0037\u0071\u0047\u0052\u0053\u0052\u0075\u0076\u0056\u004d\u0038\u004a\u004a\u002d\u0053\u007a\u0036\u0031\u0078\u0063\u0077\u0062\u006a\u004c\u0058\u0070\u005f\u004f\u0055\u0070\u0033\u004a\u0047\u0041\u0077\u0055\u0044\u0065\u0054\u0032\u0066\u004b\u005f\u0061\u0043\u0039\u0059\u0038\u0053\u006b\u0074\u0071\u0057\u0072\u006b\u0033\u007a\u004c\u002d\u0051\u0076\u0056\u0030\u0066\u0074\u0039\u006f\u0050\u0053\u007a\u0047\u005f\u0071\u006f\u0068\u0076\u0047\u0046\u0034\u006d\u0052\u0031\u0052\u0050\u0042\u0078\u0030\u0036\u002d\u006d\u0046\u0079\u0076\u006a\u0063\u004f\u0027\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/50 to-cream/90" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FAF9EE_100%)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 flex h-full grow flex-col justify-center items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-center justify-center max-w-[960px] p-6 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(166,124,82,0.15)] animate-pulse" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined text-[40px] text-primary" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col gap-3 mb-16" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-coffee-dark text-5xl font-black leading-tight tracking-tight md:text-7xl drop-shadow-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-coffee-medium text-sm font-medium uppercase tracking-[0.25em] md:text-base" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex w-full max-w-[320px] flex-col gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between items-end px-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary uppercase tracking-widest" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-coffee-medium text-xs font-mono leading-normal" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-1.5 w-full rounded-full bg-coffee-dark/10 backdrop-blur-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(166,124,82,0.6)]" },
    ...{ style: ({ width: __VLS_ctx.progress + '%' }) },
});
// @ts-ignore
[progress,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute bottom-10 right-10 md:bottom-16 md:right-16" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.skipIntro) },
    ...{ class: "group flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-coffee-dark/10 bg-white/40 backdrop-blur-md h-12 px-6 hover:bg-white/80 hover:border-primary/50 transition-all shadow-sm hover:shadow-md" },
});
// @ts-ignore
[skipIntro,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-coffee-dark text-sm font-bold tracking-[0.05em] group-hover:text-primary transition-colors" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined text-coffee-dark text-[18px] group-hover:text-primary transition-transform group-hover:translate-x-1" },
});
/** @type {__VLS_StyleScopedClasses['bg-cream']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['group/design-root']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-no-repeat']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mix-blend-multiply']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-cream/90']} */ ;
/** @type {__VLS_StyleScopedClasses['via-cream/50']} */ ;
/** @type {__VLS_StyleScopedClasses['to-cream/90']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[radial-gradient(circle_at_center,transparent_0%,#FAF9EE_100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[960px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/60']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_8px_30px_rgba(166,124,82,0.15)]']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.25em]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[320px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-coffee-dark/10']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_0_12px_rgba(166,124,82,0.6)]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-10']} */ ;
/** @type {__VLS_StyleScopedClasses['right-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:bottom-16']} */ ;
/** @type {__VLS_StyleScopedClasses['md:right-16']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[120px]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-coffee-dark/10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/40']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[0.05em]']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-coffee-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:translate-x-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
