import CoffeeID from '../../components/CoffeeID.vue';
import { reactive, computed, onMounted, ref } from 'vue';
import { questionAPI, quizAPI } from '@/services/coffeeIdTest/Question';
import bgImage from './assets/img/bgImage.jpg';
const quizData = reactive({
    currentIndex: 0,
    answers: [],
    showResult: false,
    scores: {
        acidity: 0,
        sweetness: 0,
        body: 0,
        aftertaste: 0,
        clarity: 0,
    },
    questions: [],
});
// ✅ 用於儲存後端計算的結果
const calculatedResult = ref(null);
const fetchQuetions = async () => {
    try {
        const { data } = await questionAPI.getQuestions();
        quizData.questions = data;
    }
    catch (err) {
        console.error('獲取問題失敗:', err);
    }
};
onMounted(() => {
    fetchQuetions();
});
// 進度條
const answered = computed(() => quizData.answers.filter((a) => a !== undefined).length);
const progressWidth = computed(() => {
    return (answered.value / quizData.questions.length) * 100;
});
function selectOption(option) {
    quizData.answers[quizData.currentIndex] = {
        questionOrder: Number(quizData.questions[quizData.currentIndex].order),
        optionKey: option.key,
    };
    if (quizData.currentIndex < quizData.questions.length - 1) {
        quizData.currentIndex++;
    }
    else {
        console.log('測驗完成');
    }
}
// function isSelected(option: Option) {
//   return quizData.answers[quizData.currentIndex]?.optionKey === option.key;
// }
function toPreviousQuestion() {
    if (quizData.currentIndex > 0) {
        quizData.currentIndex--;
        quizData.answers[quizData.currentIndex] = undefined;
    }
}
function resetTest() {
    quizData.currentIndex = 0;
    quizData.answers = [];
    quizData.scores = {
        acidity: 0,
        sweetness: 0,
        body: 0,
        aftertaste: 0,
        clarity: 0,
    };
    quizData.showResult = false;
    calculatedResult.value = null;
}
const emit = defineEmits(['quiz-finished']);
// ✅ 改用後端計算
async function showResultCard() {
    if (answered.value !== quizData.questions.length) {
        console.warn('尚未完成所有題目');
        return;
    }
    try {
        // 過濾掉 undefined 的答案
        const validAnswers = quizData.answers.filter((a) => a !== undefined);
        // 呼叫後端 API 計算分數
        const { data } = await quizAPI.calculateScores(validAnswers);
        if (data.success) {
            calculatedResult.value = data.data;
            quizData.scores = data.data.scores;
            quizData.showResult = true;
            emit('quiz-finished', data.data.scores, quizData.answers);
        }
    }
    catch (err) {
        console.error('計算分數失敗:', err.message);
    }
}
const isLastQuestionAnswered = computed(() => {
    const lastIndex = quizData.questions.length - 1;
    return quizData.currentIndex === lastIndex && quizData.answers[lastIndex] !== undefined;
});
// ✅ 從後端結果取得 maxScores
const maxScores = computed(() => {
    return (calculatedResult.value?.maxScores || {
        acidity: 0,
        sweetness: 0,
        body: 0,
        aftertaste: 0,
        clarity: 0,
    });
});
//卡片效果
const card = ref(null);
const style = ref('');
const glowStyle = ref('');
function handleMove(e) {
    if (!card.value)
        return;
    const rect = card.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 4;
    style.value = `
    transform:
      perspective(1000px)
      rotateY(${rotateY}deg)
      rotateX(${rotateX}deg)
      translateY(-4px);
  `;
    glowStyle.value = `
    background:
      radial-gradient(
        500px circle at ${x}px ${y}px,
        rgba(255,255,255,0.35),
        transparent 45%
      );
  `;
}
function reset() {
    style.value = `
    transform:
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      translateY(0);
  `;
    glowStyle.value = '';
}
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
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "w-full min-h-screen bg-cover bg-center lg:bg-none flex flex-col float-right p-5 font-cactus" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.bgImage})` }) },
});
// @ts-ignore
[bgImage,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-2/3 h-8 rounded-lg mx-auto mb-10 bg-[rgba(238,238,238,0.2)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-full bg-[#79916e] transition-all duration-500 rounded-lg bg-gradient-to-r from-[#dccfc0] to-[#a2af9b] relative" },
    ...{ style: ({ width: __VLS_ctx.progressWidth + '%' }) },
});
// @ts-ignore
[progressWidth,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    ...{ style: ({ right: 0 }) },
    ...{ class: "w-8 transition-all duration-500 invert absolute" },
    src: "\u002e\u005c\u0061\u0073\u0073\u0065\u0074\u0073\u005c\u0069\u006d\u0067\u005c\u0063\u006f\u0066\u0066\u0065\u0065\u0057\u0061\u006c\u006b\u002e\u0067\u0069\u0066",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-right mt-2 text-white" },
});
(__VLS_ctx.quizData.currentIndex + 1);
(__VLS_ctx.quizData.questions.length);
// @ts-ignore
[quizData, quizData,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-2/3 mx-auto flex justify-end my-3" },
});
if (__VLS_ctx.quizData.currentIndex >= 1) {
    // @ts-ignore
    [quizData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.resetTest) },
        type: "button",
        ...{ class: "border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b] text-white" },
    });
    // @ts-ignore
    [resetTest,];
}
if (!__VLS_ctx.quizData.showResult) {
    // @ts-ignore
    [quizData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        id: "questionCard",
        ...{ class: "flex flex-wrap justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onMousemove: (__VLS_ctx.handleMove) },
        ...{ onMouseleave: (__VLS_ctx.reset) },
        ref: "card",
        ...{ style: (__VLS_ctx.style) },
        ...{ class: "group relative w-2/3 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg transform-gpu transition-transform duration-300 ease-out" },
    });
    /** @type {typeof __VLS_ctx.card} */ ;
    // @ts-ignore
    [handleMove, reset, style, card,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pointer-events-none absolute inset-0 rounded-2xl z-20" },
        ...{ style: (__VLS_ctx.glowStyle) },
    });
    // @ts-ignore
    [glowStyle,];
    if (__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]) {
        // @ts-ignore
        [quizData, quizData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "p-5 rounded-2xl bg-background-light/90 backdrop-blur-md shadow-lg border-sage z-10" },
        });
        if (__VLS_ctx.quizData.currentIndex >= 1) {
            // @ts-ignore
            [quizData,];
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.toPreviousQuestion) },
                type: "button",
                ...{ class: "text-white border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]" },
            });
            // @ts-ignore
            [toPreviousQuestion,];
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "text-center font-bold" },
        });
        (__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]?.quizKey);
        // @ts-ignore
        [quizData, quizData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-center mt-3 font-bold text-xl" },
        });
        (__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]?.title);
        // @ts-ignore
        [quizData, quizData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-center text-md font-medium text-[#090909]" },
        });
        (__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]?.subtitle);
        // @ts-ignore
        [quizData, quizData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4 p-9" },
        });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]?.options))) {
            // @ts-ignore
            [quizData, quizData,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(!__VLS_ctx.quizData.showResult))
                            return;
                        if (!(__VLS_ctx.quizData.questions[__VLS_ctx.quizData.currentIndex]))
                            return;
                        __VLS_ctx.selectOption(option);
                        // @ts-ignore
                        [selectOption,];
                    } },
                key: (option.option),
                ...{ class: "group/option relative overflow-hidden text-center leading-normal p-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/30 cursor-pointer transition-all duration-300" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "relative z-10 font-bold text-[#2f2f2f]" },
            });
            (option.label);
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-[#2f2f2f] font-normal text-sm" },
            });
            (option.helper);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100" },
            });
        }
        if (__VLS_ctx.isLastQuestionAnswered) {
            // @ts-ignore
            [isLastQuestionAnswered,];
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.showResultCard) },
                type: "button",
                ...{ class: "w-full border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]" },
            });
            // @ts-ignore
            [showResultCard,];
        }
    }
}
if (__VLS_ctx.quizData.showResult) {
    // @ts-ignore
    [quizData,];
    /** @type {[typeof CoffeeID, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CoffeeID, new CoffeeID({
        scores: (__VLS_ctx.quizData.scores),
        answers: (__VLS_ctx.quizData.answers),
        maxScores: (__VLS_ctx.maxScores),
    }));
    const __VLS_1 = __VLS_0({
        scores: (__VLS_ctx.quizData.scores),
        answers: (__VLS_ctx.quizData.answers),
        maxScores: (__VLS_ctx.maxScores),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [quizData, quizData, maxScores,];
}
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:bg-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['float-right']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-cactus']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2/3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[rgba(238,238,238,0.2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#79916e]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-[#dccfc0]']} */ ;
/** @type {__VLS_StyleScopedClasses['to-[#a2af9b]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['invert']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2/3']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#dccfc0]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#a2af9b]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2/3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transform-gpu']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background-light/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sage']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#dccfc0]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#a2af9b]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#090909]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-9']} */ ;
/** @type {__VLS_StyleScopedClasses['group/option']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/60']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#2f2f2f]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#2f2f2f]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-0']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-top-left']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover/option:scale-100']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-0']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-bottom-right']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover/option:scale-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#dccfc0]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#a2af9b]']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
