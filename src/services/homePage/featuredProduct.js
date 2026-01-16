import api from '@/services/api';
/**
 * 取得精選產品列表
 */
export const fetchFeaturedProducts = async () => {
    const response = await api.get('/api/featured/products');
    return response.data;
};
