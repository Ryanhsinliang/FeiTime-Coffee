<template>
  <h2
    class="w-2/3 mx-auto my-8 relative text-center font-shizuru text-3xl font-bold p-6 bg-[rgb(238,238,238)] rounded-2xl ]"
  >
    Coffee ID TEST
  </h2>
  <main
    class="w-full lg:w-1/2 min-h-screen bg-[url('./assets/img/bgImage.jpg')] bg-cover bg-center lg:bg-none flex flex-col float-right p-5 font-wenkai"
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
      <div class="text-right mt-2">
        第 {{ quizData.currentIndex + 1 }} 題　/　共 {{ quizData.questions.length }} 題
      </div>
    </div>
    <div class="w-2/3 mx-auto flex justify-end my-3">
      <button
        v-if="quizData.currentIndex >= 1"
        @click="resetTest"
        type="button"
        class="border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]"
      >
        重新測驗
      </button>
    </div>
    <!-- 內容區塊（RWD 置中） -->
    <section v-if="!quizData.showResult" id="questionCard" class="flex flex-wrap justify-center">
      <div
        v-if="quizData.questions[quizData.currentIndex]"
        class="bg-[rgba(238,238,238,0.8)] w-2/3 p-5 rounded-2xl mb-5"
      >
        <!-- img放logo -->
        <button
          v-if="quizData.currentIndex >= 1"
          @click="toPreviousQuestion"
          type="button"
          class="border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]"
        >
          <
        </button>
        <h3 class="text-center">{{ quizData.questions[quizData.currentIndex]?.id }}</h3>
        <p class="text-center mt-3">{{ quizData.questions[quizData.currentIndex]?.title }}</p>
        <p class="text-center text-xs text-[#875e2f]">
          {{ quizData.questions[quizData.currentIndex]?.subtitle }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-9">
          <div
            v-for="option in quizData.questions[quizData.currentIndex]?.options"
            :key="option.option"
            :class="[
              'text-center leading-normal p-5 rounded-2xl bg-[rgba(220,207,192,0.8)] hover:bg-[#a2af9b] hover:cursor-pointer',
              isSelected(option) ? 'border-[#a2af9b]' : 'border-[#b0c4a0] ',
            ]"
            @click="selectOption(option)"
          >
            {{ option.label }}
            <p class="text-[#79916e] text-xs">{{ option.label }}</p>
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
    </section>
    <CoffeeID
      v-if="quizData.showResult"
      :scores="quizData.scores"
      :answers="quizData.answers"
      :maxScores="maxScores"
    />
  </main>
</template>

<script setup lang="ts">
  import CoffeeID from '../../components/CoffeeID.vue';
  import { reactive, computed } from 'vue';
  import type { Scores, Option, Question } from './type';

  const quizData = reactive<{
    currentIndex: number;
    answers: (Option | undefined)[];
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
    questions: [
      {
        id: 'Question 1',
        title: '你能接受咖啡的酸度到什麼程度？',
        subtitle: '想像你喝到第一口咖啡時的感受。',
        options: [
          {
            option: 'a',
            label: '越酸越喜歡，果汁感明亮',
            helper: '',
            score: { acidity: 15, sweetness: 3, body: 0, aftertaste: 0, clarity: 2 },
          },
          {
            option: 'b',
            label: '可以接受微酸，但不刺激',
            helper: '',
            score: { acidity: 10, sweetness: 5, body: 2, aftertaste: 1, clarity: 3 },
          },
          {
            option: 'c',
            label: '偏好溫和滑順',
            helper: '',
            score: { acidity: 3, sweetness: 5, body: 7, aftertaste: 5, clarity: 2 },
          },
          {
            option: 'd',
            label: '完全不喜歡酸，只想要濃郁感',
            helper: '',
            score: { acidity: 0, sweetness: 2, body: 12, aftertaste: 5, clarity: 0 },
          },
        ],
      },
      {
        id: 'Question 2',
        title: '你偏好的甜度類型？',
        subtitle: '甜感與尾韻通常與咖啡風味相關。',
        options: [
          {
            option: 'a',
            label: '水果塔、莓果甜點',
            helper: '',
            score: { acidity: 7, sweetness: 15, body: 0, aftertaste: 2, clarity: 3 },
          },
          {
            option: 'b',
            label: '焦糖布丁',
            helper: '',
            score: { acidity: 2, sweetness: 13, body: 5, aftertaste: 4, clarity: 2 },
          },
          {
            option: 'c',
            label: '巧克力蛋糕',
            helper: '',
            score: { acidity: 0, sweetness: 6, body: 10, aftertaste: 8, clarity: 0 },
          },
          {
            option: 'd',
            label: '基本不吃甜',
            helper: '',
            score: { acidity: 3, sweetness: 0, body: 3, aftertaste: 2, clarity: 10 },
          },
        ],
      },
      {
        id: 'Question 3',
        title: '你喜歡咖啡的口感厚度？',
        subtitle: '是清爽型還是濃郁型？',
        options: [
          {
            option: 'a',
            label: '清爽，像茶一樣透明',
            helper: '',
            score: { acidity: 5, sweetness: 2, body: 0, aftertaste: 0, clarity: 15 },
          },
          {
            option: 'b',
            label: '適中，有些存在感',
            helper: '',
            score: { acidity: 3, sweetness: 5, body: 6, aftertaste: 4, clarity: 5 },
          },
          {
            option: 'c',
            label: '濃郁、有重量感',
            helper: '',
            score: { acidity: 0, sweetness: 3, body: 13, aftertaste: 5, clarity: 1 },
          },
          {
            option: 'd',
            label: '非常濃稠、像巧克力',
            helper: '',
            score: { acidity: 0, sweetness: 2, body: 15, aftertaste: 8, clarity: 0 },
          },
        ],
      },
      {
        id: 'Question 4',
        title: '你平常在什麼時候喝咖啡？',
        subtitle: '飲用時段影響偏好風味。',
        options: [
          {
            option: 'a',
            label: '早上醒腦時喝',
            helper: '',
            score: { acidity: 8, sweetness: 3, body: 1, aftertaste: 2, clarity: 8 },
          },
          {
            option: 'b',
            label: '下午放鬆時喝',
            helper: '',
            score: { acidity: 3, sweetness: 10, body: 3, aftertaste: 3, clarity: 4 },
          },
          {
            option: 'c',
            label: '晚上工作或閱讀',
            helper: '',
            score: { acidity: 1, sweetness: 3, body: 6, aftertaste: 12, clarity: 2 },
          },
          {
            option: 'd',
            label: '沒固定時段，想到就喝',
            helper: '',
            score: { acidity: 4, sweetness: 4, body: 4, aftertaste: 6, clarity: 4 },
          },
        ],
      },
      {
        id: 'Question 5',
        title: '你喜歡咖啡的餘韻長短？',
        subtitle: '希望風味停留多久？',
        options: [
          {
            option: 'a',
            label: '短、俐落',
            helper: '',
            score: { acidity: 3, sweetness: 2, body: 0, aftertaste: 0, clarity: 15 },
          },
          {
            option: 'b',
            label: '適中即可',
            helper: '',
            score: { acidity: 3, sweetness: 4, body: 3, aftertaste: 6, clarity: 8 },
          },
          {
            option: 'c',
            label: '中長尾韻',
            helper: '',
            score: { acidity: 2, sweetness: 3, body: 6, aftertaste: 12, clarity: 3 },
          },
          {
            option: 'd',
            label: '越長越濃',
            helper: '',
            score: { acidity: 0, sweetness: 2, body: 7, aftertaste: 15, clarity: 0 },
          },
        ],
      },
      {
        id: 'Question 6',
        title: '你偏好的咖啡香氣風味？',
        subtitle: '香氣方向決定品飲類型。',
        options: [
          {
            option: 'a',
            label: '花香、果香',
            helper: '',
            score: { acidity: 12, sweetness: 5, body: 0, aftertaste: 2, clarity: 8 },
          },
          {
            option: 'b',
            label: '堅果、焦糖',
            helper: '',
            score: { acidity: 2, sweetness: 13, body: 5, aftertaste: 3, clarity: 3 },
          },
          {
            option: 'c',
            label: '巧克力、可可',
            helper: '',
            score: { acidity: 0, sweetness: 5, body: 12, aftertaste: 6, clarity: 1 },
          },
          {
            option: 'd',
            label: '木質、烘焙香',
            helper: '',
            score: { acidity: 0, sweetness: 2, body: 8, aftertaste: 10, clarity: 2 },
          },
        ],
      },
      {
        id: 'Question 7',
        title: '你常用哪種沖煮方式？',
        subtitle: '不同方式會強化不同風味。',
        options: [
          {
            option: 'a',
            label: '手沖（清爽）',
            helper: '',
            score: { acidity: 7, sweetness: 3, body: 0, aftertaste: 2, clarity: 12 },
          },
          {
            option: 'b',
            label: '義式機（濃縮）',
            helper: '',
            score: { acidity: 1, sweetness: 4, body: 13, aftertaste: 8, clarity: 0 },
          },
          {
            option: 'c',
            label: '法壓',
            helper: '',
            score: { acidity: 2, sweetness: 5, body: 10, aftertaste: 5, clarity: 2 },
          },
          {
            option: 'd',
            label: '冷萃',
            helper: '',
            score: { acidity: 3, sweetness: 10, body: 3, aftertaste: 4, clarity: 8 },
          },
        ],
      },
      {
        id: 'Question 8',
        title: '你希望咖啡帶給你的整體感受？',
        subtitle: '心中的完美咖啡風味定位。',
        options: [
          {
            option: 'a',
            label: '清新、明亮、有活力',
            helper: '',
            score: { acidity: 13, sweetness: 3, body: 0, aftertaste: 2, clarity: 10 },
          },
          {
            option: 'b',
            label: '甜美、舒服、療癒',
            helper: '',
            score: { acidity: 3, sweetness: 13, body: 4, aftertaste: 4, clarity: 4 },
          },
          {
            option: 'c',
            label: '濃郁、紮實、有存在感',
            helper: '',
            score: { acidity: 0, sweetness: 3, body: 13, aftertaste: 8, clarity: 1 },
          },
          {
            option: 'd',
            label: '平衡、協調、不挑人',
            helper: '',
            score: { acidity: 5, sweetness: 5, body: 5, aftertaste: 5, clarity: 5 },
          },
        ],
      },
    ],
  });
  const answered = computed(() => quizData.answers.filter((a) => a !== undefined).length);
  const progressWidth = computed(() => {
    return (answered.value / quizData.questions.length) * 100;
  });
  function selectOption(option: Option) {
    quizData.answers[quizData.currentIndex] = option;
    recalculateScores();
    if (quizData.currentIndex < quizData.questions.length - 1) {
      quizData.currentIndex++;
    } else {
      console.log('測驗完成');
      console.log(quizData.scores);
    }
  }
  function isSelected(option: Option) {
    const answer = quizData.answers[quizData.currentIndex];
    return answer === option;
  }
  function recalculateScores() {
    // 重置
    quizData.scores = {
      acidity: 0,
      sweetness: 0,
      body: 0,
      aftertaste: 0,
      clarity: 0,
    };

    // 累加
    quizData.answers.forEach((ans) => {
      if (!ans) return;
      quizData.scores.acidity += ans.score.acidity;
      quizData.scores.sweetness += ans.score.sweetness;
      quizData.scores.body += ans.score.body;
      quizData.scores.aftertaste += ans.score.aftertaste;
      quizData.scores.clarity += ans.score.clarity;
    });
  }
  function toPreviousQuestion() {
    if (quizData.currentIndex > 0) {
      quizData.currentIndex--;
      quizData.answers[quizData.currentIndex] = undefined;
      recalculateScores();
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
  }
  const emit = defineEmits(['quiz-finished']);

  function showResultCard() {
    if (answered.value == 8) {
      quizData.showResult = true;
    }
    emit('quiz-finished', quizData.scores, quizData.answers);
  }
  const isLastQuestionAnswered = computed(() => {
    const lastIndex = quizData.questions.length - 1;
    return quizData.currentIndex === lastIndex && quizData.answers[lastIndex] !== undefined;
  });

  // 計算總分
  const maxScores = computed(() => {
    const result = {
      acidity: 0,
      sweetness: 0,
      body: 0,
      aftertaste: 0,
      clarity: 0,
    };

    quizData.questions.forEach((question) => {
      const max = {
        acidity: 0,
        sweetness: 0,
        body: 0,
        aftertaste: 0,
        clarity: 0,
      };
      question.options.forEach((option) => {
        max.acidity = Math.max(max.acidity, option.score.acidity);
        max.sweetness = Math.max(max.sweetness, option.score.sweetness);
        max.body = Math.max(max.body, option.score.body);
        max.aftertaste = Math.max(max.aftertaste, option.score.aftertaste);
        max.clarity = Math.max(max.clarity, option.score.clarity);
      });
      result.acidity += max.acidity;
      result.sweetness += max.sweetness;
      result.body += max.body;
      result.aftertaste += max.aftertaste;
      result.clarity += max.clarity;
    });
    return result;
  });
</script>

<style></style>
