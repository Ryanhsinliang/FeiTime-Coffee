import api from '@/services/api';

export async function getProducts() {
  try {
    const res = await api.get('/api/products');
    console.log('Products:', res.data); // debug 用
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    throw err;
  }
}
