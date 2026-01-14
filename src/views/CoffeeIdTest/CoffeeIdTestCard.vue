<template>
  <main
    class="w-full min-h-screen bg-cover bg-center lg:bg-none flex flex-col float-right p-5 font-cactus"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="w-2/3 h-8 rounded-lg mx-auto mb-10 bg-[rgba(238,238,238,0.2)]">
      <div
        class="h-full bg-[#79916e] transition-all duration-500 rounded-lg bg-gradient-to-r from-[#dccfc0] to-[#a2af9b] relative"
        :style="{ width: progressWidth + '%' }"
      >
        <img
          :style="{ right: 0 }"
          class="w-8 transition-all duration-500 invert absolute"
          src=".\assets\img\coffeeWalk.gif"
          alt=""
        />
      </div>
      <div class="text-right mt-2 text-white">
        第 {{ quizData.currentIndex + 1 }} 題　/　共 {{ quizData.questions.length }} 題
      </div>
    </div>
    <div class="w-2/3 mx-auto flex justify-end my-3">
      <button
        v-if="quizData.currentIndex >= 1 || coffeeResultStore.hasResult"
        @click="resetTest"
        type="button"
        class="border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b] text-white"
      >
        重新測驗
      </button>
    </div>
    <section
      v-if="!coffeeResultStore.hasResult"
      id="questionCard"
      class="flex flex-wrap justify-center"
    >
      <div
        ref="card"
        @mousemove="handleMove"
        @mouseleave="reset"
        :style="style"
        class="group relative w-2/3 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg transform-gpu transition-transform duration-300 ease-out"
      >
        <div class="pointer-events-none absolute inset-0 rounded-2xl z-20" :style="glowStyle"></div>
        <div
          v-if="quizData.questions[quizData.currentIndex]"
          class="p-5 rounded-2xl bg-background-light/90 backdrop-blur-md shadow-lg border-sage z-10"
        >
          <button
            v-if="quizData.currentIndex >= 1"
            @click="toPreviousQuestion"
            type="button"
            class="text-white border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]"
          >
            <
          </button>
          <h3 class="text-center font-bold">
            {{ quizData.questions[quizData.currentIndex]?.quizKey }}
          </h3>
          <p class="text-center mt-3 font-bold text-xl">
            {{ quizData.questions[quizData.currentIndex]?.title }}
          </p>
          <p class="text-center text-md font-medium text-[#090909]">
            {{ quizData.questions[quizData.currentIndex]?.subtitle }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-9">
            <div
              v-for="option in quizData.questions[quizData.currentIndex]?.options"
              :key="option.option"
              @click="selectOption(option)"
              class="group/option relative overflow-hidden text-center leading-normal p-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/30 cursor-pointer transition-all duration-300"
            >
              <div class="relative z-10 font-bold text-[#2f2f2f]">
                {{ option.label }}
                <p class="text-[#2f2f2f] font-normal text-sm">{{ option.helper }}</p>
              </div>
              <span
                class="pointer-events-none absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white scale-0 origin-top-left transition-transform duration-300 group-hover/option:scale-100"
              ></span>
              <span
                class="pointer-events-none absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white scale-0 origin-bottom-right transition-transform duration-300 group-hover/option:scale-100"
              ></span>
            </div>
          </div>

          <button
            v-if="isLastQuestionAnswered"
            @click="showResultCard"
            type="button"
            class="w-full border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]"
          >
            看結果
          </button>
        </div>
      </div>
    </section>
    <CoffeeID
      v-if="coffeeResultStore.hasResult"
      :scores="
        coffeeResultStore.scores || { acidity: 0, sweetness: 0, body: 0, aftertaste: 0, clarity: 0 }
      "
      :answers="coffeeResultStore.answers"
      :maxScores="
        coffeeResultStore.maxScores || {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        }
      "
    />
  </main>
</template>

<script setup lang="ts">
  import CoffeeID from '../../components/CoffeeID.vue';
  import { reactive, computed, onMounted, ref } from 'vue';
  import type { Scores, Option, Question, Answer } from './type';
  import { questionAPI, quizAPI } from '@/services/questionService';
  import bgImage from './assets/img/bgImage.jpg';
  import { useCoffeeResultStore } from '@/store/coffeeResult';
  import { getPersona } from '@/utils/getPersona';

  const coffeeResultStore = useCoffeeResultStore();
  const isLoading = ref(true);

  const quizData = reactive<{
    currentIndex: number;
    answers: (Answer | undefined)[];
    scores: Scores;
    questions: Question[];
    showResult: boolean;
  }>({
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

  const calculatedResult = ref<{
    scores: Scores;
    maxScores: Scores;
    normalizedScores: Scores;
  } | null>(null);

  const fetchQuetions = async () => {
    try {
      const { data } = await questionAPI.getQuestions();
      quizData.questions = data;
    } catch (err) {
      console.error('獲取問題失敗:', err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    await fetchQuetions();

    if (coffeeResultStore.hasResult) {
      calculatedResult.value = {
        scores: coffeeResultStore.scores ?? {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        },
        maxScores: coffeeResultStore.maxScores ?? {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        },
        normalizedScores: coffeeResultStore.normalizedScores ?? {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        },
      };
      quizData.showResult = true;
    }
  });

  // 進度條
  const answered = computed(() => quizData.answers.filter((a) => a !== undefined).length);
  const progressWidth = computed(() => {
    return (answered.value / quizData.questions.length) * 100;
  });

  function selectOption(option: Option) {
    quizData.answers[quizData.currentIndex] = {
      questionOrder: Number(quizData.questions[quizData.currentIndex].order),
      optionKey: option.key,
    };

    if (quizData.currentIndex < quizData.questions.length - 1) {
      quizData.currentIndex++;
    } else {
      console.log('測驗完成');
    }
  }

  function toPreviousQuestion() {
    if (quizData.currentIndex > 0) {
      quizData.currentIndex--;
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
    coffeeResultStore.clearResult();
  }

  const emit = defineEmits(['quiz-finished']);

  async function showResultCard() {
    if (answered.value !== quizData.questions.length) {
      console.warn('尚未完成所有題目');
      return;
    }

    try {
      const validAnswers = quizData.answers.filter((a) => a !== undefined);

      const { data } = await quizAPI.calculateScores(validAnswers);

      if (data.success) {
        calculatedResult.value = data.data;
        quizData.scores = data.data.scores;

        const normalized = {
          acidity: Math.floor((data.data.scores.acidity / data.data.maxScores.acidity) * 100) || 0,
          sweetness:
            Math.floor((data.data.scores.sweetness / data.data.maxScores.sweetness) * 100) || 0,
          body: Math.floor((data.data.scores.body / data.data.maxScores.body) * 100) || 0,
          aftertaste:
            Math.floor((data.data.scores.aftertaste / data.data.maxScores.aftertaste) * 100) || 0,
          clarity: Math.floor((data.data.scores.clarity / data.data.maxScores.clarity) * 100) || 0,
        };

        const persona = getPersona({ value: normalized });

        coffeeResultStore.setResult({
          scores: data.data.scores,
          maxScores: data.data.maxScores,
          normalizedScores: normalized,
          personaId: persona?.id || 'unknown',
          answers: validAnswers,
        });

        quizData.showResult = true;
        emit('quiz-finished', data.data.scores, validAnswers);
      }
    } catch (err: any) {
      console.error('計算分數失敗:', err.message);
    }
  }

  const isLastQuestionAnswered = computed(() => {
    const lastIndex = quizData.questions.length - 1;
    return quizData.currentIndex === lastIndex && quizData.answers[lastIndex] !== undefined;
  });

  //卡片效果
  const card = ref<HTMLElement | null>(null);
  const style = ref('');
  const glowStyle = ref('');

  function handleMove(e: MouseEvent) {
    if (!card.value) return;

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
</script>

<style></style>
