import api from '@/services/api';

// 定義商品型別
export interface ProductRequest {
  name: string; // 產品名稱
  english_name: string; // 產品英文名稱
  id: string; // 產品DB編號(柔+)
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
  weight: number; // 重量（克）
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

export interface RecommendationsResponse {
  data: ProductRequest[];
}

//呼叫 後端 Express 的 API
export async function callProducts(page = 1, pageSize = 100): Promise<ProductListResponse> {
  const res = await api.get<ProductListResponse>('/api/product-detail', {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
}

// 取得單筆商品
export async function callSingleProduct(pid: string): Promise<SingleProductResponse> {
  const res = await api.get<SingleProductResponse>(`/api/product-detail/${pid}`);
  return res.data;
}

// 取得推薦商品
export async function callRecommendations(pid: string): Promise<RecommendationsResponse> {
  const res = await api.get<RecommendationsResponse>(`/api/product-detail/${pid}/recommendations`);
  return res.data;
}

// 立即購買 參數的型別 (柔+)
export interface BuyRule {
  user: string;
  product: string;
  quantity: number;
  snapshot_image: string;
  snapshot_name: string;
  snapshot_price: number;
  snapshot_weight: number;
  item_total: number;
}

// 新增產品至購物車 (柔+)
export async function cartGoPost(formData: BuyRule) {
  try {
    const res = await api.post('/api/cart', formData);
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    console.error(err.res.error);
    console.error(err.res.message);
    console.error(err.res.detail);
    throw err;
  }
}
