import api from '@/services/api';

// 抓購物車的
export async function getCart() {
  try {
    const res = await api.get('/api/get-cart');
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}

export async function formGoPost() {
  try {
    const res = await api.get('/api/orders/checkout');
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}
