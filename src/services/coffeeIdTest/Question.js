import api from '../api';
export const questionAPI = {
    // 獲取所有問題
    getQuestions() {
        return api.get('/api/questions');
    },
};
export const quizAPI = {
    calculateScores(answers) {
        return api.post('/api/quiz/calculate', { answers });
    },
};
