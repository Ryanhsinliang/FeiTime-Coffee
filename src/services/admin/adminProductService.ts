import api from '@/services/api';

// 定義商品型別
export interface ProductRequest {
  name: string; // 產品名稱
  english_name: string; // 產品英文名稱
  pid: string; // 產品編號
  origin: string; // 產地
  processing: string; // 處理法
  roast: string; // 烘焙度
  flavor_type: string; // 風味類型
  flavor_tags: { name: string }[]; // 風味標籤
  description: string; // 產品描述
  price: number; // 價格
  stock: number; // 庫存量
  img: { formats: { large: { url: string }; medium?: { url: string } } }[]; // 產品圖片
  weight: string; // 重量（克）
  documentId: string; // Strapi v5 Document ID
}

export interface ProductListResponse {
  data: ProductRequest[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface SingleProductResponse {
  data: ProductRequest;
}

// 產品資料更新請求(前端傳給後端)
export interface UpdateProductPayload {
  name?: string;
  english_name?: string;
  price?: number;
  origin?: string;
  processing?: string;
  roast?: string;
  stock?: number;
  weight?: string;
  flavor_type?: string;
  flavor_tags?: { name: string }[];
  description?: string;
  imgIds?: number[]; // 用 id 陣列更新圖片關聯
}

//呼叫 後端 Express 的 API
export async function callProducts(page = 1, pageSize = 100): Promise<ProductListResponse> {
  const res = await api.get<ProductListResponse>('/api/admin-products', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}

// 取得單筆商品
export async function callSingleProduct(pid: string): Promise<SingleProductResponse> {
  const res = await api.get<SingleProductResponse>(`/api/admin-products/${pid}`);
  return res.data;
}

// 更新商品資料
export async function callUpdateProduct(
  pid: string,
  payload: UpdateProductPayload
): Promise<{ success: boolean; message: string; data: ProductRequest }> {
  const res = await api.put(`/api/admin-products/${pid}`, payload);
  return res.data;
}
