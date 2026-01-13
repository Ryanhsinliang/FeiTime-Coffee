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


    // Front-end specific
    matchPercentage?: number;
}
