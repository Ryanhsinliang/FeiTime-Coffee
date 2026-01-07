import api from '../api';
import { Answer } from '@/views/CoffeeIdTest/type';

export const questionAPI = {
  // 獲取所有問題
  getQuestions() {
    return api.get('/api/questions');
  },
};
export const quizAPI = {
  calculateScores(answers: Answer[]) {
    return api.post('/api/quiz/calculate', { answers });
  },
};
