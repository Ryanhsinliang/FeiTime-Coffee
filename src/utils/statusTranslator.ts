export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// 狀態翻譯表
export const orderStatusMap: Record<OrderStatus, string> = {
  pending: '待付款',
  paid: '已付款',
  processing: '待出貨',
  shipped: '已出貨',
  delivered: '已完成',
  cancelled: '已取消',
};

export function orderStatusText(status?: string) {
  if (!status) return '-';
  return orderStatusMap[status as OrderStatus] || status;
}

// 支付狀態翻譯表
export const paymentStatusMap: Record<string, string> = {
  unpaid: '未付款',
  paid: '已付款',
  refunded: '已退款',
};

export function paymentStatusText(status?: string) {
  if (!status) return '-';
  return paymentStatusMap[status] || status;
}

export const payment_methodMap: Record<string, string> = {
  linePay: 'linePay',
  cod: '貨到付款',
  COD: '貨到付款',
};

export function paymentMethodText(method?: string) {
  if (!method) return '-';
  return payment_methodMap[method] || method;
}

export function user_roleText(role?: string) {
  if (!role) return '-';
  if (role === 'Admin') return '管理員';
  if (role === 'Member') return '一般會員';
  return role;
}
