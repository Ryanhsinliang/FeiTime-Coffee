// 定義後端 API 回傳的圖片格式
export interface ImageFormat {
    url: string;
    width?: number;
    height?: number;
}

export interface ProductImage {
    id: number;
    formats: {
        large?: ImageFormat;
        medium?: ImageFormat;
        small?: ImageFormat;
        thumbnail?: ImageFormat;
    };
    url: string;
}

// 定義後端 API 回傳的商品資料結構 (對應 Product.vue 的 DataRule)
export interface Product {
    id: number;
    pid?: number;
    name: string;
    price: number;
    origin: string;
    img: ProductImage[];
    description?: string; // 後端可能沒有，前端需要預留

    // 風味數值
    popularity?: number;
    sweetness?: number;
    acidity?: number;
    body?: number;
    aftertaste?: number;
    clarity?: number;

    // 推薦系統可能用到的欄位
    tag?: string;
    aiRecommended?: boolean;
}

// 定義購物車內的項目結構 (繼承 Product 並簡化圖片與增加數量)
export interface CartItem extends Omit<Product, 'img'> {
    quantity: number;    // 購買數量
    image: string;       // 處理過後的單一圖片網址 (方便前端顯示)
    matchPercentage?: number | null; // AI 契合度
}
