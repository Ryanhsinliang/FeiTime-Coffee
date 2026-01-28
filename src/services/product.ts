import api from '@/services/api';

export interface FilterDataRule {
  roast?: string;
  flavor_type?: string;
  processing?: string;
  origin?: string;
  sort?: string[];
  page?: number;
  pageSize?: number;
  sortWhich?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getProducts(obj: FilterDataRule = {}) {
  try {
    const res = await api.get('/api/products', {
      params: obj,
    });

    return res.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('API 串接出錯：', err);
    throw err;
  }
}
