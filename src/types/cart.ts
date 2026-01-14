export interface CartItem {
    id: number;           // Product ID (PRODUCTS.id)
    pid: string;          // Product Code (e.g., coffee_001)
    name: string;         // Product Name
    price: number;        // Unit Price
    quantity: number;     // Quantity
    image?: string;       // Image URL (optional)
    weight?: string;      // Specification (e.g., 227g)
    item_total?: number;  // Item Total (calculated)
    snapshot_name?: string;
    snapshot_price?: number;
    snapshot_image?: string;
    snapshot_weight?: string;
    stock?: number;       // Stock limit

    // Strapi v5 specific - 用於 API 操作 (update/delete)
    strapiDocumentId?: string;

    // Front-end specific
    matchPercentage?: number;
}

// Strapi v5 Cart Item API 回傳格式
export interface StrapiCartItemData {
    id: number;
    documentId: string;  // Strapi v5 主鍵，用於 API 操作
    user: number;        // relation 欄位 (指向 USERS.id)
    product: number;     // relation 欄位 (指向 PRODUCTS.id)
    snapshot_name: string;
    snapshot_price: number;
    snapshot_image: string;
    snapshot_weight: string;
    quantity: number;
    item_total: number;
    createdAt: string;
    updatedAt: string;
}

export interface StrapiCartItemResponse {
    data: StrapiCartItemData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
