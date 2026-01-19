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
  documentId: string;
}

// 成功送出訂單後 得到的訂單資料
export const orderList = defineStore('order', {
  // data
  state: () => ({
    orderThing: null as OrderRule | null,
    buyProducts: [] as ProductRule[],
  }),

  // method
  actions: {
    // DB > 後端 回傳的訂單資料
    orderAfter(data: OrderRule) {
      this.orderThing = data;
    },

    // 買的產品資料
    productAfter(data: ProductRule[]) {
      this.buyProducts = data;
    },
    // 清空功能
    orderReset() {
      this.orderThing = null;
      this.buyProducts = [];
    },
  },
  persist: true, // 跨網域也不會丟失資料
});
