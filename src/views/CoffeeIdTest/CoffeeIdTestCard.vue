<template>
  <main class="min-h-screen bg-coffee-bg flex flex-col font-wenkai">
    <!-- 標題 -->
    <h2
      class="w-2/3 mx-auto my-8 relative text-center font-shizuru text-3xl font-bold p-6 bg-[rgba(238,238,238,0.9)] rounded-2xl border-[5px] border-dotted border-[#dccfc0]"
    >
      Coffee ID TEST
    </h2>
    <!-- 進度條第一版 -->
    <div class="w-2/3 h-8 rounded-lg mx-auto mb-10 bg-[rgb(238,238,238)]">
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
        class="bg-[rgb(238,238,238)] w-2/3 p-5 rounded-2xl mb-5"
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
              'text-center leading-normal p-5 rounded-2xl hover:cursor-pointer',
              isSelected(option) ? 'bg-[#a2af9b]' : 'bg-[#dccfc0] hover:bg-[#b0c4a0]',
            ]"
            @click="selectOption(option)"
          >
            {{ option.label }}
            <p class="text-[#79916e] text-xs">{{ option.label }}</p>
          </div>
        </div>
        <button
          v-if="quizData.currentIndex == quizData.questions.length - 1"
          @click="showResultCard"
          type="button"
          class="w-full border-[#dccfc0] border p-2 rounded-lg hover:bg-[#a2af9b]"
        >
          看結果
        </button>
      </div>
    </section>
    <CoffeeID v-if="quizData.showResult" :scores="quizData.scores" :answers="quizData.answers" />
  </main>
</template>

<script setup lang="ts">
  import CoffeeID from '../../components/CoffeeID.vue';
  import { reactive, computed } from 'vue';
  import type { Scores, Option, Question } from './type';

  const quizData = reactive<{
    currentIndex: number;
    answers: Option[];
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
      // 第一題
      {
        id: 'Qustion 1',
        title: '你能接受咖啡裡的果酸感到什麼程度？',
        subtitle: '想像你喝到第一口咖啡時的酸甜明亮度。',
        options: [
          {
            option: 'a',
            label: '越酸越喜歡，果汁感越明亮越好',
            helper: '偏好莓果、柑橘的酸度',
            score: {
              acidity: 15,
              sweetness: 5,
              body: 0,
              aftertaste: 0,
              clarity: 5,
            },
          },
          {
            option: 'b',
            label: '可以接受微酸，但不喜歡太刺激',
            helper: '有亮度但不尖銳',
            score: {
              acidity: 10,
              sweetness: 5,
              body: 3,
              aftertaste: 0,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: ' 不太喜歡酸，偏好溫和滑順',
            helper: '入口柔和、圓潤',
            score: {
              acidity: 3,
              sweetness: 0,
              body: 5,
              aftertaste: 5,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '完全不喜歡酸，只想要濃郁感',
            helper: '深焙、拿鐵派',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 10,
              aftertaste: 5,
              clarity: 0,
            },
          },
        ],
      },
      // 第二題
      {
        id: 'Qustion 2',
        title: '用甜點形容，你更偏愛哪一種？',
        subtitle: '甜感與尾韻通常與咖啡的風味走向相關。',
        options: [
          {
            option: 'a',
            label: '水果塔、莓果甜點',
            helper: '清爽的酸甜平衡',
            score: {
              acidity: 8,
              sweetness: 10,
              body: 0,
              aftertaste: 0,
              clarity: 5,
            },
          },
          {
            option: 'b',
            label: '焦糖布丁',
            helper: '奶香與焦糖香氣',
            score: {
              acidity: 0,
              sweetness: 12,
              body: 5,
              aftertaste: 3,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '巧克力蛋糕',
            helper: '濃郁厚重的甜感',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 10,
              aftertaste: 8,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '基本不吃甜',
            helper: '喜歡咖啡本身的純粹',
            score: {
              acidity: 3,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 8,
            },
          },
        ],
      },
      // 第三題
      {
        id: 'Qustion 3',
        title: '你喜歡咖啡的口感厚度？',
        subtitle: '是清爽型還是濃郁型？',
        options: [
          {
            option: 'a',
            label: '清爽，像茶一樣透明',
            helper: '高澄澈度、輕柔口感',
            score: {
              acidity: 5,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 12,
            },
          },
          {
            option: 'b',
            label: '適中，有些存在感',
            helper: '平衡型口感',
            score: {
              acidity: 0,
              sweetness: 5,
              body: 5,
              aftertaste: 5,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '濃郁、有重量感',
            helper: '適合搭配牛奶',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 10,
              aftertaste: 5,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '非常濃稠、像巧克力',
            helper: '強烈厚實風味派',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 15,
              aftertaste: 10,
              clarity: 0,
            },
          },
        ],
      },
      // 第四題
      {
        id: 'Qustion 4',
        title: '你平常在什麼時候喝咖啡？',
        subtitle: '飲用情境會影響你偏好的風味方向。',
        options: [
          {
            option: 'a',
            label: '早上醒腦時喝',
            helper: '希望酸度清爽提神',
            score: {
              acidity: 5,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 5,
            },
          },
          {
            option: 'b',
            label: '下午放鬆時喝',
            helper: '喜歡甜感與療癒風味',
            score: {
              acidity: 0,
              sweetness: 10,
              body: 4,
              aftertaste: 0,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '晚上工作或閱讀',
            helper: '偏好香氣深沉、有尾韻',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 5,
              aftertaste: 10,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '沒固定時段，想到就喝',
            helper: '對風味接受度高',
            score: {
              acidity: 3,
              sweetness: 3,
              body: 5,
              aftertaste: 10,
              clarity: 0,
            },
          },
        ],
      },
      // 第五題
      {
        id: 'Question 5',
        title: '你喜歡咖啡的餘韻長短？',
        subtitle: '你希望風味停留在嘴裡多久？',
        options: [
          {
            option: 'a',
            label: '短、俐落的風味',
            helper: '乾淨透明，收束快',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 12,
            },
          },
          {
            option: 'b',
            label: '適中即可',
            helper: '柔和順口的尾段感受',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 0,
              aftertaste: 5,
              clarity: 5,
            },
          },
          {
            option: 'c',
            label: '中長尾韻',
            helper: '喜歡香氣延伸的感覺',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 5,
              aftertaste: 10,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '越長越濃越好',
            helper: '深沉、飽滿的風味殘留',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 5,
              aftertaste: 15,
              clarity: 0,
            },
          },
        ],
      },
      // 第六題
      {
        id: 'Question 6',
        title: '你偏好的咖啡香氣風味？',
        subtitle: '香氣的方向會決定你喜歡的品飲類型。',
        options: [
          {
            option: 'a',
            label: '花香、柑橘、果香',
            helper: '清爽、明亮、活潑的風味',
            score: {
              acidity: 10,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 5,
            },
          },
          {
            option: 'b',
            label: '堅果、焦糖',
            helper: '溫暖甜香的經典風味',
            score: {
              acidity: 0,
              sweetness: 10,
              body: 5,
              aftertaste: 0,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '巧克力、可可',
            helper: '濃郁滑順，適合奶類飲品',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 10,
              aftertaste: 5,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '木質、烘焙香',
            helper: '深焙、沈穩、厚重調性',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 8,
              aftertaste: 8,
              clarity: 0,
            },
          },
        ],
      },
      // 第七題
      {
        id: 'Question 7',
        title: '你常用哪種沖煮方式？',
        subtitle: '不同沖煮方式會強化不同風味向度。',
        options: [
          {
            option: 'a',
            label: '手沖（清爽乾淨）',
            helper: '提升透明感，保留香氣層次',
            score: {
              acidity: 5,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 12,
            },
          },
          {
            option: 'b',
            label: '義式機（濃縮）',
            helper: '濃度高、口感厚實',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 12,
              aftertaste: 8,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '法壓',
            helper: '油脂多、口感飽滿',
            score: {
              acidity: 0,
              sweetness: 5,
              body: 10,
              aftertaste: 0,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '冷萃',
            helper: '柔和甜感明顯，適合夏天',
            score: {
              acidity: 0,
              sweetness: 8,
              body: 0,
              aftertaste: 0,
              clarity: 5,
            },
          },
        ],
      },
      // 第八題
      {
        id: 'Question 8',
        title: '你希望咖啡帶給你的整體感受？',
        subtitle: '你心中的完美咖啡風味定位。',
        options: [
          {
            option: 'a',
            label: '清新、明亮、有活力',
            helper: '果香系取向',
            score: {
              acidity: 12,
              sweetness: 0,
              body: 0,
              aftertaste: 0,
              clarity: 8,
            },
          },
          {
            option: 'b',
            label: '甜美、舒服、療癒感',
            helper: '喜歡甜香平衡風味',
            score: {
              acidity: 0,
              sweetness: 12,
              body: 5,
              aftertaste: 0,
              clarity: 0,
            },
          },
          {
            option: 'c',
            label: '濃郁、紮實、有存在感',
            helper: '厚實派愛好者',
            score: {
              acidity: 0,
              sweetness: 0,
              body: 12,
              aftertaste: 8,
              clarity: 0,
            },
          },
          {
            option: 'd',
            label: '平衡、協調、不挑人',
            helper: '各風味均衡、百搭',
            score: {
              acidity: 5,
              sweetness: 5,
              body: 5,
              aftertaste: 5,
              clarity: 5,
            },
          },
        ],
      },
    ],
  });

  const progressWidth = computed(() => {
    const answered = quizData.answers.filter((a) => a !== undefined).length;
    return (answered / quizData.questions.length) * 100;
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
    return answer === option; // 選中就變色
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
    const answered = quizData.answers.filter((a) => a !== undefined).length;
    if (answered == 8) {
      quizData.showResult = true;
    }
    emit('quiz-finished', quizData.scores, quizData.answers);
  }
</script>
<!-- 選項式 -->
<!-- <script>
  import CoffeeID from '../../components/CoffeeID.vue';

  export default {
    data() {
      return {
        currentIndex: 0,
        answers: [],
        scores: {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        },
        questions: [
          // 第一題
          {
            id: 'Qustion 1',
            title: '你能接受咖啡裡的果酸感到什麼程度？',
            subtitle: '想像你喝到第一口咖啡時的酸甜明亮度。',
            options: [
              {
                option: 'a',
                label: '越酸越喜歡，果汁感越明亮越好',
                helper: '偏好莓果、柑橘的酸度',
                score: {
                  acidity: 15,
                  sweetness: 5,
                  body: 0,
                  aftertaste: 0,
                  clarity: 5,
                },
              },
              {
                option: 'b',
                label: '可以接受微酸，但不喜歡太刺激',
                helper: '有亮度但不尖銳',
                score: {
                  acidity: 10,
                  sweetness: 5,
                  body: 3,
                  aftertaste: 0,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: ' 不太喜歡酸，偏好溫和滑順',
                helper: '入口柔和、圓潤',
                score: {
                  acidity: 3,
                  sweetness: 0,
                  body: 5,
                  aftertaste: 5,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '完全不喜歡酸，只想要濃郁感',
                helper: '深焙、拿鐵派',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 10,
                  aftertaste: 5,
                  clarity: 0,
                },
              },
            ],
          },
          // 第二題
          {
            id: 'Qustion 2',
            title: '用甜點形容，你更偏愛哪一種？',
            subtitle: '甜感與尾韻通常與咖啡的風味走向相關。',
            options: [
              {
                option: 'a',
                label: '水果塔、莓果甜點',
                helper: '清爽的酸甜平衡',
                score: {
                  acidity: 8,
                  sweetness: 10,
                  body: 0,
                  aftertaste: 0,
                  clarity: 5,
                },
              },
              {
                option: 'b',
                label: '焦糖布丁',
                helper: '奶香與焦糖香氣',
                score: {
                  acidity: 0,
                  sweetness: 12,
                  body: 5,
                  aftertaste: 3,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '巧克力蛋糕',
                helper: '濃郁厚重的甜感',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 10,
                  aftertaste: 8,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '基本不吃甜',
                helper: '喜歡咖啡本身的純粹',
                score: {
                  acidity: 3,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 8,
                },
              },
            ],
          },
          // 第三題
          {
            id: 'Qustion 3',
            title: '你喜歡咖啡的口感厚度？',
            subtitle: '是清爽型還是濃郁型？',
            options: [
              {
                option: 'a',
                label: '清爽，像茶一樣透明',
                helper: '高澄澈度、輕柔口感',
                score: {
                  acidity: 5,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 12,
                },
              },
              {
                option: 'b',
                label: '適中，有些存在感',
                helper: '平衡型口感',
                score: {
                  acidity: 0,
                  sweetness: 5,
                  body: 5,
                  aftertaste: 5,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '濃郁、有重量感',
                helper: '適合搭配牛奶',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 10,
                  aftertaste: 5,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '非常濃稠、像巧克力',
                helper: '強烈厚實風味派',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 15,
                  aftertaste: 10,
                  clarity: 0,
                },
              },
            ],
          },
          // 第四題
          {
            id: 'Qustion 4',
            title: '你平常在什麼時候喝咖啡？',
            subtitle: '飲用情境會影響你偏好的風味方向。',
            options: [
              {
                option: 'a',
                label: '早上醒腦時喝',
                helper: '希望酸度清爽提神',
                score: {
                  acidity: 5,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 5,
                },
              },
              {
                option: 'b',
                label: '下午放鬆時喝',
                helper: '喜歡甜感與療癒風味',
                score: {
                  acidity: 0,
                  sweetness: 10,
                  body: 4,
                  aftertaste: 0,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '晚上工作或閱讀',
                helper: '偏好香氣深沉、有尾韻',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 5,
                  aftertaste: 10,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '沒固定時段，想到就喝',
                helper: '對風味接受度高',
                score: {
                  acidity: 3,
                  sweetness: 3,
                  body: 5,
                  aftertaste: 10,
                  clarity: 0,
                },
              },
            ],
          },
          // 第五題
          {
            id: 'Question 5',
            title: '你喜歡咖啡的餘韻長短？',
            subtitle: '你希望風味停留在嘴裡多久？',
            options: [
              {
                option: 'a',
                label: '短、俐落的風味',
                helper: '乾淨透明，收束快',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 12,
                },
              },
              {
                option: 'b',
                label: '適中即可',
                helper: '柔和順口的尾段感受',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 5,
                  clarity: 5,
                },
              },
              {
                option: 'c',
                label: '中長尾韻',
                helper: '喜歡香氣延伸的感覺',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 5,
                  aftertaste: 10,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '越長越濃越好',
                helper: '深沉、飽滿的風味殘留',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 5,
                  aftertaste: 15,
                  clarity: 0,
                },
              },
            ],
          },
          // 第六題
          {
            id: 'Question 6',
            title: '你偏好的咖啡香氣風味？',
            subtitle: '香氣的方向會決定你喜歡的品飲類型。',
            options: [
              {
                option: 'a',
                label: '花香、柑橘、果香',
                helper: '清爽、明亮、活潑的風味',
                score: {
                  acidity: 10,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 5,
                },
              },
              {
                option: 'b',
                label: '堅果、焦糖',
                helper: '溫暖甜香的經典風味',
                score: {
                  acidity: 0,
                  sweetness: 10,
                  body: 5,
                  aftertaste: 0,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '巧克力、可可',
                helper: '濃郁滑順，適合奶類飲品',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 10,
                  aftertaste: 5,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '木質、烘焙香',
                helper: '深焙、沈穩、厚重調性',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 8,
                  aftertaste: 8,
                  clarity: 0,
                },
              },
            ],
          },
          // 第七題
          {
            id: 'Question 7',
            title: '你常用哪種沖煮方式？',
            subtitle: '不同沖煮方式會強化不同風味向度。',
            options: [
              {
                option: 'a',
                label: '手沖（清爽乾淨）',
                helper: '提升透明感，保留香氣層次',
                score: {
                  acidity: 5,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 12,
                },
              },
              {
                option: 'b',
                label: '義式機（濃縮）',
                helper: '濃度高、口感厚實',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 12,
                  aftertaste: 8,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '法壓',
                helper: '油脂多、口感飽滿',
                score: {
                  acidity: 0,
                  sweetness: 5,
                  body: 10,
                  aftertaste: 0,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '冷萃',
                helper: '柔和甜感明顯，適合夏天',
                score: {
                  acidity: 0,
                  sweetness: 8,
                  body: 0,
                  aftertaste: 0,
                  clarity: 5,
                },
              },
            ],
          },
          // 第八題
          {
            id: 'Question 8',
            title: '你希望咖啡帶給你的整體感受？',
            subtitle: '你心中的完美咖啡風味定位。',
            options: [
              {
                option: 'a',
                label: '清新、明亮、有活力',
                helper: '果香系取向',
                score: {
                  acidity: 12,
                  sweetness: 0,
                  body: 0,
                  aftertaste: 0,
                  clarity: 8,
                },
              },
              {
                option: 'b',
                label: '甜美、舒服、療癒感',
                helper: '喜歡甜香平衡風味',
                score: {
                  acidity: 0,
                  sweetness: 12,
                  body: 5,
                  aftertaste: 0,
                  clarity: 0,
                },
              },
              {
                option: 'c',
                label: '濃郁、紮實、有存在感',
                helper: '厚實派愛好者',
                score: {
                  acidity: 0,
                  sweetness: 0,
                  body: 12,
                  aftertaste: 8,
                  clarity: 0,
                },
              },
              {
                option: 'd',
                label: '平衡、協調、不挑人',
                helper: '各風味均衡、百搭',
                score: {
                  acidity: 5,
                  sweetness: 5,
                  body: 5,
                  aftertaste: 5,
                  clarity: 5,
                },
              },
            ],
          },
        ],
        showResult: false,
      };
    },
    computed: {
      progressWidth() {
        const answered = this.answers.filter((a) => a !== undefined).length;
        return (answered / this.questions.length) * 100;
      },
    },
    methods: {
      selectOption(score) {
        this.answers[this.currentIndex] = score;
        this.recalculateScores();
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
        } else {
          console.log('測驗完成');
          console.log(this.scores);
        }
      },
      recalculateScores() {
        this.scores = {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        };
        this.answers.forEach((currentQuestion) => {
          if (!currentQuestion) return;
          this.scores.acidity += currentQuestion.acidity;
          this.scores.sweetness += currentQuestion.sweetness;
          this.scores.body += currentQuestion.body;
          this.scores.aftertaste += currentQuestion.aftertaste;
          this.scores.clarity += currentQuestion.clarity;
        });
      },
      toPreviousQuestion() {
        this.currentIndex--;
        this.recalculateScores();
      },
      resetTest() {
        this.currentIndex = 0;
        this.answers = [];
        this.scores = {
          acidity: 0,
          sweetness: 0,
          body: 0,
          aftertaste: 0,
          clarity: 0,
        };
        this.showResult = false;
      },
      showResultCard() {
        this.showResult = true;
        this.$emit('quiz-finished', this.scores, this.answers);
      },
    },
    components: {
      CoffeeID,
    },
  };
</script> -->

<style>
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-image: url('.\assets\img\bgImage.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
