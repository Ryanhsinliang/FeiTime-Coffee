import api from '@/services/api';

export async function getProducts(roastType?: string) {
  // roastType 參數
  // ? 可帶可不帶
  // : string  TS的規範 規定roastType要是字串
  try {
    const res = await api.get('/api/products', {
      params: { roast: roastType },
    });
    // axios 的 get 第二個參數必須是物件
    // 除了 params  可能會有 headers或 timeout
    // axios 會把 params 物件的內容以【 ?key=value 】形式轉成網址
    // 若有 key 的值是 undefined 或 null，它通常會忽略這個 key
    // 把 roastType 的值 也就是淺焙 透過params轉成網址 送到後端

    console.log('Products:', res.data); // debug 用
    return res.data;
  } catch (err: any) {
    console.error('API 串接出錯：', err.message);
    throw err;
  }
}

// 資料是怎麼傳遞的？ 以 roastType（淺焙）為例
// 前端變數：roastType 是 "Light"
// axios 看到 params: { roast: "Light" }  把它打包
// 網址變成 /api/products?roast=Light  後面多了 ?roast=Light
// 後端接收：Express（後端）接收網址後 會把 ? 後面的東西拆掉放進 req.query
// 在後端寫 const roast = req.query.roast; 就能成功拿到 "Light"
