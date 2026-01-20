import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { ref, computed } from 'vue';
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

export const useCoffeeResultStore = defineStore(
  'coffeeResult',
  () => {
    const scores = ref<Scores | null>(null);
    const maxScores = ref<Scores | null>(null);
    const normalizedScores = ref<Scores | null>(null);
    const personaId = ref<string | null>(null);
    const answers = ref<Answer[]>([]);
    const calculatedAt = ref<number | null>(null);
    const hasResult = computed(() => scores.value !== null);
    const getPersonaId = computed(() => personaId.value);

    const authStore = useAuthStore();
    const userId = computed(() => authStore.user?.id);

    function setResult(data: {
      scores: Scores;
      maxScores: Scores;
      personaId: string;
      answers: Answer[];
    }): void {
      scores.value = data.scores;
      maxScores.value = data.maxScores;
      answers.value = data.answers;
      personaId.value = data.personaId;
      calculatedAt.value = Date.now();

      normalizedScores.value = {
        acidity: Math.floor((data.scores.acidity / data.maxScores.acidity) * 100) || 0,
        sweetness: Math.floor((data.scores.sweetness / data.maxScores.sweetness) * 100) || 0,
        body: Math.floor((data.scores.body / data.maxScores.body) * 100) || 0,
        aftertaste: Math.floor((data.scores.aftertaste / data.maxScores.aftertaste) * 100) || 0,
        clarity: Math.floor((data.scores.clarity / data.maxScores.clarity) * 100) || 0,
      };
    }

    function clearResult(): void {
      scores.value = null;
      maxScores.value = null;
      normalizedScores.value = null;
      personaId.value = null;
      answers.value = [];
      calculatedAt.value = null;
    }

    async function saveToUserAccount(personaData: {
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
            user: userId.value,
          },
        };
        const response = await api.post('/api/coffee-results', payload);
        return response.data;
      } catch (err: any) {
        console.error(`'儲存失敗:', ${err.message}`);
        throw err;
      }
    }
    return {
      scores,
      maxScores,
      normalizedScores,
      personaId,
      answers,
      calculatedAt,
      hasResult,
      getPersonaId,
      clearResult,
      setResult,
      saveToUserAccount,
    };
  },
  {
    persist: {
      key: 'coffee-id-result',
      storage: localStorage,
    },
  }
);
