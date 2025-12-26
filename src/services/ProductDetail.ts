import api from '@/services/api';

// 定義商品型別
export interface BeansRequest {
  id: string; // 產品 ID
  name: string; // 產品名稱
  origin: string; // 產地
  processing: string; // 處理法
  roast: string; // 烘焙度
  flavor_tags: string[]; // 風味標籤
  description: string; // 產品描述
  price: number; // 價格
  stock: number; // 庫存量
  weight: number; // 重量（克）
}

export interface ProductListResponse {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

//呼叫 後端 Express 的 API
export async function callProducts(page = 1, pageSize = 58): Promise<ProductListResponse> {
  const res = await api.get<ProductListResponse>('/api/product-detail', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}
