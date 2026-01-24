import api from '@/services/api';

// 要post的訂單中的產品型別
export interface GivePiniaRule {
  pid: number;
  quantity: number;
  snapshot_name: string;
  snapshot_price: number;
  snapshot_image: string;
  snapshot_weight: string;
  item_total: number;
}

// 要post的訂單
export interface OrderForm {
  user: string;
  order_items: GivePiniaRule[];
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  order_status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  payment_method: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  customer_note: string;
  shipping_method: string;
}

// 要put(更新)訂單的物件
export interface UpdateOrderRule {
  order_status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  paid_at: string;
}

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

export async function formGoPost(formData: OrderForm) {
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

export async function updateOrder(id: number | string, updateData: Partial<UpdateOrderRule>) {
  try {
    const res = await api.put(`/api/orders/${id}`, updateData);
    return res.data;
  } catch (err: any) {
    console.error('後端回傳的錯誤內容:', err.response?.data || err.message || err);
    throw err;
  }
}

export async function productsGet() {
  try {
    const product = await api.get('/api/products/get');
    return product.data;
  } catch (err: any) {
    console.error('後端回傳的錯誤內容:', err.response?.data || err.message || err);
    throw err;
  }
}

export async function updateProduct(pid: number | string, updateData: { stock: number }) {
  try {
    const res = await api.put(`/api/products/${pid}`, updateData);
    return res.data;
  } catch (err: any) {
    console.error('後端回傳的錯誤內容:', err.response?.data || err.message || err);
    throw err;
  }
}

export async function deleteCart(userId: number | string) {
  try {
    const res = await api.delete(`/api/cart-items/${userId}`);
    return res;
  } catch (err: any) {
    console.error('delete購物車失敗:', err.response?.data || err.message || err);
    throw err;
  }
}
