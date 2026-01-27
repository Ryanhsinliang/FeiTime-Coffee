import api from './api';

export interface OrderItem {
  id: number;
  pid: string;
  quantity: number;
  snapshot_name: string;
  snapshot_price: number;
  snapshot_image: string | null;
  snapshot_weight: string;
  item_total: number;
}

export interface Order {
  id: number;
  documentId: string;
  order_number: string;
  subtotal: number;
  createdAt: string;
  shipping_fee: number;
  total_amount: number;
  order_status: string;
  payment_status: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  payment_method: string;
  tracking_number: string | null;
  order_items: OrderItem[];
}

export const memberService = {
  // 取得會員所有訂單
  async getMemberOrders(userId: string): Promise<Order[]> {
    const response = await api.get(`/api/member/${userId}`);
    return response.data.data || [];
  },

  // 更新會員資料
  async updateMemberInfo(
    userId: number,
    data: { phone_number?: string | null; shipping_address?: string | null }
  ): Promise<void> {
    await api.put(`/api/users/${userId}`, data);
  },
};
