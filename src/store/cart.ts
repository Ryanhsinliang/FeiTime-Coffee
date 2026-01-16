import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, StrapiCartItemData } from '@/types/cart';
import { useAuthStore } from '@/store/auth';

// Express API 設定 (使用環境變數或預設 localhost:4000)
// VITE_API_BASE_URL 應在 .env.local 定義
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

/**
 * 購物車 Store (Hybrid 方案 - Express Proxy)
 * 1. Read: 主要讀取 Pinia State。
 * 2. Write: 更新 Pinia 並非同步呼叫 Express API (/api/cart)。
 * 3. Init: 登入後可從 Express 載入購物車。
 */
export const useCartStore = defineStore('cart', () => {
    // State - 購物車項目清單
    const items = ref<CartItem[]>([]);
    const isOpen = ref(false); // 控制購物車側邊欄開關

    // 推薦商品 (Mock Data)
    const recommendations = ref<CartItem[]>([
        {
            id: 999,
            pid: 'coffee_mock_001',
            name: '測試用咖啡豆 (Mock)',
            price: 350,
            quantity: 1,
            image: 'https://placehold.co/200x200',
            weight: '半磅',
            stock: 10,
            matchPercentage: 88
        }
    ]);

    // Getters
    const subtotal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    });

    const totalAmount = subtotal;
    const total = subtotal;

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    });

    // 檢查購物車是否有庫存不明的商品 (阻擋結帳用)
    const hasInvalidStockItems = computed(() => {
        return items.value.some(item =>
            item.stock === undefined ||
            item.stock === null ||
            item.stock === 9999 ||
            item.stock === Infinity
        );
    });

    // 取得所有庫存不明的商品名稱
    const invalidStockItemNames = computed(() => {
        return items.value
            .filter(item =>
                item.stock === undefined ||
                item.stock === null ||
                item.stock === 9999 ||
                item.stock === Infinity
            )
            .map(item => item.name);
    });

    // Actions
    function toggleCart() { isOpen.value = !isOpen.value; }
    function openCart() { isOpen.value = true; }
    function closeCart() { isOpen.value = false; }

    function getProductImage(product: any): string {
        if (product.img && Array.isArray(product.img) && product.img.length > 0) {
            const firstImg = product.img[0];
            return firstImg.formats?.large?.url ||
                firstImg.formats?.medium?.url ||
                firstImg.formats?.small?.url ||
                firstImg.url ||
                '';
        }
        return typeof product.image === 'string' ? product.image : '';
    }

    /**
     * 加入購物車
     */
    async function addItem(product: any) {
        const authStore = useAuthStore();

        // 嘗試取得 Strapi Document ID (如果是從 API 來的商品資料)
        const productDocumentId = product.documentId || product.strapiDocumentId;

        let itemToAdd: CartItem;

        if (product.img && Array.isArray(product.img)) {
            itemToAdd = {
                id: product.id,
                pid: String(product.pid),
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: getProductImage(product),
                weight: product.weight || '半磅',
                stock: product.stock || 50,
                matchPercentage: 95
            };
        } else {
            itemToAdd = { ...product };
            if (!itemToAdd.quantity) itemToAdd.quantity = 1;
        }

        // 1. 更新 Pinia
        const existingItem = items.value.find(item => item.id === itemToAdd.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const maxStock = itemToAdd.stock ?? Infinity; // 若無庫存欄位則不限制

        if (currentQuantity + itemToAdd.quantity > maxStock) {
            const allowedToAdd = Math.max(0, maxStock - currentQuantity);
            itemToAdd.quantity = allowedToAdd;
            if (allowedToAdd === 0) {
                console.warn('庫存不足，無法再加入');
                return;
            }
        }

        if (existingItem) {
            existingItem.quantity += itemToAdd.quantity;
        } else {
            items.value.push(itemToAdd);
        }

        openCart();

        // 2. 同步至 Express -> Strapi
        if (authStore.isLoggedIn && authStore.user?.id) {
            const targetItem = items.value.find(item => item.id === itemToAdd.id);
            if (!targetItem) return;

            // 如果該商品已同步過 (有 strapiDocumentId)，改呼叫 PUT 更新數量
            if (targetItem.strapiDocumentId) {
                await updateQuantity(targetItem.id, targetItem.quantity);
                return;
            }

            // 否則呼叫 POST 新增
            try {
                // Strapi v5 建議使用 Document ID 建立關聯
                // 如果沒有 productDocumentId (例如 mock 商品)，則退回到 itemToAdd.id
                const productRelation = productDocumentId || itemToAdd.id;

                const payload = {
                    user: authStore.user.documentId || authStore.user.id, // Prefer documentId
                    product: productRelation,
                    snapshot_name: itemToAdd.name,
                    snapshot_price: itemToAdd.price,
                    snapshot_image: itemToAdd.image || '',
                    snapshot_weight: itemToAdd.weight || '半磅',
                    quantity: targetItem.quantity, // 使用當前總數量
                    item_total: itemToAdd.price * targetItem.quantity
                };
                console.log('🛒 準備加入購物車 Payload:', payload);

                const response = await fetch(`${API_BASE_URL}/api/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    const strapiData = result as StrapiCartItemData;
                    targetItem.strapiDocumentId = strapiData.documentId;
                } else {
                    console.error('Failed to sync to Cart via Express:', await response.json());
                }
            } catch (error) {
                console.error('Failed to sync to Cart via Express:', error);
            }
        }
    }

    /**
     * 移除購物車項目
     */
    async function removeItem(productId: number) {
        const authStore = useAuthStore();
        const index = items.value.findIndex(item => item.id === productId);
        let removedItem: CartItem | undefined;

        if (index > -1) {
            removedItem = items.value[index];
            items.value.splice(index, 1);
        }

        if (authStore.isLoggedIn && removedItem?.strapiDocumentId) {
            try {
                console.log('🗑️ Deleting from Strapi:', removedItem.strapiDocumentId);
                const res = await fetch(`${API_BASE_URL}/api/cart/${removedItem.strapiDocumentId}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    console.log('✅ Delete success');
                } else {
                    console.error('❌ Delete failed:', await res.json());
                }
            } catch (error) {
                console.error('Failed to delete from Cart via Express:', error);
            }
        } else if (authStore.isLoggedIn && removedItem) {
            console.warn('⚠️ Item has no strapiDocumentId, cannot delete from Strapi:', removedItem);
        }
    }

    /**
     * 更新數量
     */
    async function updateQuantity(productId: number, quantity: number) {
        const authStore = useAuthStore();
        const item = items.value.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                await removeItem(productId);
            } else {
                const maxStock = item.stock ?? Infinity; // 若無庫存欄位則不限制
                if (quantity > maxStock) {
                    item.quantity = maxStock;
                    console.warn(`數量已達庫存上限 (${maxStock})`);
                } else {
                    item.quantity = quantity;
                }

                if (authStore.isLoggedIn && item.strapiDocumentId) {
                    try {
                        console.log('📝 Updating Strapi quantity:', item.strapiDocumentId, 'to', item.quantity);
                        const res = await fetch(`${API_BASE_URL}/api/cart/${item.strapiDocumentId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                quantity: item.quantity,
                                item_total: item.price * item.quantity
                            })
                        });
                        if (res.ok) {
                            console.log('✅ Update success');
                        } else {
                            console.error('❌ Update failed:', await res.json());
                        }
                    } catch (error) {
                        console.error('Failed to update quantity via Express:', error);
                    }
                } else if (authStore.isLoggedIn && item) {
                    console.warn('⚠️ Item has no strapiDocumentId, cannot update in Strapi:', item);
                }
            }
        }
    }

    async function clearCart() {
        // 1. 同步清除後端 (如果已登入)
        const authStore = useAuthStore();
        if (authStore.isLoggedIn && authStore.user?.id) {
            try {
                console.log('🧹 Clearing backend cart for user:', authStore.user.id);
                // 使用 query param 傳遞 userId
                const response = await fetch(`${API_BASE_URL}/api/cart?userId=${authStore.user.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    console.log('✅ Backend cart cleared');
                } else {
                    console.warn('❌ Failed to clear backend cart:', await response.json());
                }
            } catch (error) {
                console.error('Failed to clear backend cart:', error);
            }
        }

        // 2. 清除前端
        items.value = [];
    }

    function checkout() {
        console.log('Proceeding to checkout');
    }

    /**
     * 從 Strapi 載入購物車資料 (登入後呼叫)
     * 用於同步資料庫裡的購物車狀態到 Pinia
     */
    async function loadCartFromStrapi() {
        const authStore = useAuthStore();

        if (!authStore.isLoggedIn || !authStore.user?.id) {
            console.warn('[Cart] 未登入，無法從 Strapi 載入購物車');
            return;
        }

        try {
            console.log('🔄 從 Strapi 載入購物車...');
            const userId = authStore.user.id;
            const response = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`);

            if (!response.ok) {
                console.error('❌ 載入購物車失敗:', await response.json());
                return;
            }

            const strapiItems: StrapiCartItemData[] = await response.json();
            console.log(`📦 從 Strapi 取得 ${strapiItems.length} 筆購物車資料`);

            // 將 Strapi 格式轉換為 CartItem 格式
            const mappedItems: CartItem[] = strapiItems.map((item: StrapiCartItemData) => ({
                id: typeof item.product === 'object' ? (item.product as any).id : item.product,
                pid: String(item.id), // 使用 Strapi ID 作為唯一識別
                name: item.snapshot_name,
                price: item.snapshot_price,
                quantity: item.quantity,
                image: item.snapshot_image,
                weight: item.snapshot_weight,
                stock: (item.product as any)?.stock ?? undefined, // 從關聯的 Product 取得即時庫存
                strapiDocumentId: item.documentId, // 關鍵：確保 documentId 被設置
                item_total: item.item_total
            }));

            // 替換 Pinia 狀態
            items.value = mappedItems;
            console.log('✅ 購物車同步完成');

        } catch (error) {
            console.error('[Cart] 從 Strapi 載入購物車失敗:', error);
        }
    }

    return {
        items,
        isOpen,
        recommendations,
        totalAmount,
        subtotal,
        total,
        totalItems,
        hasInvalidStockItems,
        invalidStockItemNames,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        checkout,
        loadCartFromStrapi
    };
}, {
    persist: {
        key: 'cart',
        storage: localStorage,
        beforeHydrate: (_ctx) => {
            try {
                const stored = localStorage.getItem('cart');
                if (stored) JSON.parse(stored);
            } catch (e) {
                console.warn('[Cart Store] localStorage 資料損壞，已清除:', e);
                localStorage.removeItem('cart');
            }
        }
    }
});
