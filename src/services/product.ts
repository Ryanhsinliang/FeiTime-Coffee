import api from '@/services/api';

export interface FilterDataRule {
  roast?: string;
  flavor_type?: string;
  processing?: string;
  origin?: string;
  sort?: string[]; // 例如 ["price:desc"]
  // name_contains?: string; 之後的搜尋欄
}

export async function getProducts(obj: FilterDataRule = {}) {
  // obj 是參數 它是一個物件
  try {
    const res = await api.get('/api/products', {
      params: obj,
    });
    // axios 的 get 第二個參數必須是物件
    // 物件內除了 params  可能會有 headers或 timeout
    // axios 會把 params 物件的內容以【 ?key=value 】形式轉成網址
    // 若有 key 的值是 undefined 或 null，它通常會忽略這個 key
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    throw err;
  }
}

// 資料是怎麼傳遞的？ 以 淺焙 為例

// 在產品頁
// 點擊淺焙後 getcoffee() 送一個物件 { roast: 'Light' } 過來

// 在前端 封裝API (此頁)
// getProducts() 接收 { roast: 'Light' }
// axios 看到 params: { roast: "Light" }  把它轉成網址
// 網址變成 /api/products?roast=Light  後面多了 ?roast=Light

// 後端 productControllers.ts 中
// productHandler()接收網址   它把 ? 後面的東西拆掉放進 req.query
// 使用 const roast = req.query.roast; 就能成功拿到 "Light"
// 把 Light 塞進 options 傳給 fetchStrapiData()

// 在後端 Service > dataServices.ts 的  fetchStrapiData()
// 依照 options 的內容 發送get取得資料
