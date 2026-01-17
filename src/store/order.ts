import { defineStore } from 'pinia';

interface ProductRule {
  pid: string;
  quantity: number;
  snapshot_name: string;
  snapshot_price: number;
  snapshot_image: string;
  snapshot_weight: string;
  item_total: number;
}

interface OrderRule {
  id: number;
  order_number: string;
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  order_status: string;
  payment_status: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  shipping_method: string;
  createdAt: string;
  updatedAt: string;
  order_items: ProductRule[];
}

// 成功送出訂單後 得到的訂單資料
export const orderList = defineStore('order', {
  // data
  state: () => ({
    orderThing: null as OrderRule | null,
  }),

  // computed
  /* getters:{}, */

  // method
  actions: {
    orderAfter(data: OrderRule) {
      this.orderThing = data;
    },
  },
});
