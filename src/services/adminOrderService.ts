import api from '@/services/api';

// 定義商品型別
export interface OrderRequest {
  order_number: string; //  訂單編號(唯一)
  subtotal: number; // 商品小計
  shipping_fee: number; // 運費
  total_amount: number; //  總金額
  order_status: string; // 訂單狀態
  payment_status: string; // 支付狀態
  recipient_name: string; //  收件人姓名
  recipient_phone: string; //  收件人電話
  recipient_address: string; // 收件地址
  customer_note: string; //  買家備註
  shipping_method: string; //  配送方式
  tracking_number: string; //  物流單號(後台負責生成)
  payment_method: string; //  支付方式
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  paid_at: string;
  shipped_at: string;
}

export interface OrderListResponse {
  data: OrderRequest[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface SingleOrderResponse {
  data: OrderRequest;
}

//呼叫 後端 Express 的 API
export async function callOrders(page = 1, pageSize = 100): Promise<OrderListResponse> {
  const res = await api.get<OrderListResponse>('/api/admin/orders', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}

// 取得單筆訂單
export async function callSingleOrder(order_number: string): Promise<SingleOrderResponse> {
  const res = await api.get<SingleOrderResponse>(`/api/admin/orders/${order_number}`);
  return res.data;
}
