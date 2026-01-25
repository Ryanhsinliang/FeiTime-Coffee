import api from '@/services/api';

// 定義訂單型別
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
  user: OrderUser;
  order_items: OrderItem[];
}

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

export interface OrderUser {
  user_id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Authenticated';
  confirmed: boolean;
  blocked: boolean;
  phone_number: string;
  shipping_address: string;
}

export interface OrderListResponse {
  data: OrderRequest[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number; // 總頁數
      total: number; // 總筆數
    };
  };
}

export interface SingleOrderResponse {
  data: OrderRequest;
}

// 出貨資訊請求(前端傳給後端)
export interface updateOrderRequest {
  tracking_number: string;
  shipped_at: string;
}

//呼叫 後端 Express 的 API
export async function callOrders(page = 1, pageSize = 1000): Promise<OrderListResponse> {
  const res = await api.get<OrderListResponse>('/api/admin-orders', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}

// 取得單筆訂單
export async function callSingleOrder(order_number: string): Promise<SingleOrderResponse> {
  const res = await api.get<SingleOrderResponse>(`/api/admin-orders/${order_number}`);
  return res.data;
}

// 出貨 API
export async function callUpdateOrder(
  // 前端傳給後端的東西
  order_number: string,
  data: updateOrderRequest
  // 後端處理完後，回來跟我說的結果
): Promise<{ success: boolean; message: string; data: OrderRequest }> {
  const res = await api.put(`/api/admin-orders/${order_number}`, data);
  return res.data;
}

// 批量同步物流的結果介面
export interface BulkSyncResponse {
  success: boolean;
  message: string;
  details?: string[];
}

// ✅ 一鍵同步物流狀態
export async function callBulkSyncLogistics(): Promise<BulkSyncResponse> {
  const res = await api.post<BulkSyncResponse>('/api/admin-orders/bulk-sync');
  return res.data;
}
