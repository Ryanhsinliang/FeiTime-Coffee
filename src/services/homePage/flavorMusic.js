import api from '@/services/api';
// ============================================
// API 方法
// ============================================
/**
 * 根據風味取得音樂推薦
 */
export const getMusicByFlavor = async (request) => {
    const response = await api.post('/api/music/flavor', request);
    return response.data;
};
/**
 * 取得隨機音樂推薦
 */
export const getRandomMusic = async (request) => {
    const response = await api.post('/api/music/random', request);
    return response.data;
};
