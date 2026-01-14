import { defineStore } from 'pinia';
import api from '@/services/api';
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
    async saveToUserAccount(personaData: {
      persona_name: string;
      persona_image: string;
      description: string;
      normalizedScores: Scores;
    }) {
      try {
        const payload = {
          data: {
            persona_name: personaData.persona_name,
            persona_image: personaData.persona_image,
            description: personaData.description,
            acidity: personaData.normalizedScores.acidity,
            sweetness: personaData.normalizedScores.sweetness,
            body: personaData.normalizedScores.body,
            aftertaste: personaData.normalizedScores.aftertaste,
            clarity: personaData.normalizedScores.clarity,
            user: 19,
          },
        };
        const response = await api.post('/api/coffee-results', payload);
        return response.data;
      } catch (error: any) {
        console.error('儲存失敗，請檢查 Strapi Public 權限是否開啟:', error.message);
        throw error;
      }
    },
  },

  persist: {
    key: 'coffee-id-result',
    storage: localStorage,
  },
});
