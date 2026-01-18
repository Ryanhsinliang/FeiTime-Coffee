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

export async function getOrder() {
  try {
    const res = await api.get('/api/order/giveme');
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}

export async function formGoPost(formData: any) {
  try {
    const res = await api.post('/api/orders/checkout', formData);
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}

export async function updateOrder(updateData: any) {
  try {
    const res = await api.put('/api/order/updata', updateData);
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}
