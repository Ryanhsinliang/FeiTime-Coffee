import { Answer } from '@/views/CoffeeIdTest/type';
import api from '@/services/api';
export const questionAPI = {
  getQuestions() {
    return api.get('/api/questions');
  },
};
export const quizAPI = {
  calculateScores(answers: Answer[]) {
    return api.post('/api/quiz/calculate', { answers });
  },
};
