import api from '@/services/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  flavor_type?: string;
  img?: {
    id: number;
    url: string;
  }[];
}

/**
 * 取得精選產品列表
 */
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/featured/products');
  return response.data;
};
