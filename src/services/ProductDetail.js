import api from '@/services/api';
//呼叫 後端 Express 的 API
export async function callProducts(page = 1, pageSize = 100) {
    const res = await api.get('/api/product-detail', {
        params: {
            page,
            pageSize,
        },
    });
    return res.data;
}
// 取得單筆商品
export async function callSingleProduct(pid) {
    const res = await api.get(`/api/product-detail/${pid}`);
    return res.data;
}
// 取得推薦商品
export async function callRecommendations(pid) {
    const res = await api.get(`/api/product-detail/${pid}/recommendations`);
    return res.data;
}
