import { defineStore } from 'pinia';

export interface Scores {
  acidity: number;
  sweetness: number;
  body: number;
  aftertaste: number;
  clarity: number;
}

export interface Answer {
  questionOrder: number;
  optionKey: string;
}

export const useCoffeeResultStore = defineStore('coffeeResult', {
  state: () => ({
    scores: null as Scores | null,
    maxScores: null as Scores | null,
    normalizedScores: null as Scores | null,
    personaId: null as string | null,
    answers: [] as Answer[],
    calculatedAt: null as number | null,
  }),

  getters: {
    hasResult: (state) => state.scores !== null,
    getPersonaId: (state) => state.personaId,
  },

  actions: {
    setResult(data: {
      scores: Scores;
      maxScores: Scores;
      normalizedScores: Scores;
      personaId: string;
      answers: Answer[];
    }) {
      this.scores = data.scores;
      this.maxScores = data.maxScores;
      this.normalizedScores = data.normalizedScores;
      this.personaId = data.personaId;
      this.answers = data.answers;
      this.calculatedAt = Date.now();
    },

    clearResult() {
      this.scores = null;
      this.maxScores = null;
      this.normalizedScores = null;
      this.personaId = null;
      this.answers = [];
      this.calculatedAt = null;
    },
  },

  persist: {
    key: 'coffee-id-result',
    storage: localStorage,
  },
});
