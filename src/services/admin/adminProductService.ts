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
  flavor_tags: FlavorTag[]; // 風味標籤
  description: string; // 產品描述
  price: number; // 價格
  stock: number; // 庫存量
  img: StrapiImage[]; // 產品圖片
  weight: string; // 重量（克）
  documentId: string; // Strapi v5 Document ID
  publishedAt: string | null; // 上下架狀態
}

// 基礎圖片型別 (Strapi 格式)
interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  name: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

// Flavor Tag 型別
export interface FlavorTag {
  id?: number;
  documentId?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ProductListResponse {
  data: ProductRequest[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number; // 總頁數
      total: number; // 總筆數
    };
  };
}

export interface SingleProductResponse {
  data: ProductRequest;
}

// 更新商品時發送的資料(前端傳給後端)
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
  flavor_tags?: FlavorTag[];
  description?: string;
  imgIds?: number[]; // 用 id 陣列更新圖片關聯
  publishedAt?: string | null; // 上下架狀態
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
  // 在發送前可以做最後的型別檢查或清理
  const res = await api.put<{ success: boolean; message: string; data: ProductRequest }>(
    `/api/admin-products/${pid}`,
    payload
  );
  return res.data;
}

/**
 * 上傳圖片到 Express 轉發層
 * @param file 檔案物件
 * @returns Strapi 回傳的圖片資訊陣列
 */
export async function callUploadImage(file: File): Promise<StrapiImage[]> {
  const formData = new FormData();
  formData.append('files', file); // 'files' 需與後端 uploadMiddleware 一致

  const res = await api.post<StrapiImage[]>('/api/admin-products/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// 刪除圖片
export async function deleteProductImage(
  imageId: number
): Promise<{ success: boolean; message: string }> {
  const res = await api.delete(`/api/admin-products/upload/${imageId}`);
  return res.data;
}
