import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, StrapiCartItemData } from '@/types/cart';
import { useAuthStore } from '@/store/auth';

// Strapi API 設定
const STRAPI_URL = 'https://accessible-dogs-da5b6a029a.strapiapp.com';

// ===== 🧪 開發測試模式 =====
// 啟用此模式可在不真實登入的情況下測試購物車與 Strapi 的整合
const DEV_TEST_MODE = false; // 設為 false 則使用真實登入

// 測試用憑證（需要從 Strapi 取得有效的 Token 和 User ID）
const TEST_CREDENTIALS = {
    token: 'YOUR_STRAPI_JWT_TOKEN_HERE',  // 請替換為有效的 Strapi JWT
    userId: 1  // 請替換為有效的 User ID
};

/**
 * 購物車 Store (Hybrid 方案)
 * 特點:
 * 1. Read: 主要讀取 Pinia State，確保 UI 反應即時。
 * 2. Write: 動作同時更新 Pinia (前端) 和呼叫 API (後端資料庫)。
 * 3. Init: 若 Pinia 為空，會嘗試從 API 載入 (實作於 App.vue 或此處初始化)。
 */
export const useCartStore = defineStore('cart', () => {
    // State - 購物車項目清單
    const items = ref<CartItem[]>([]);
    const isOpen = ref(false); // 控制購物車側邊欄開關

    // 推薦商品 (Mock Data) - 用於測試「加入購物車」功能
    const recommendations = ref<CartItem[]>([
        {
            id: 999,
            pid: 'coffee_mock_001',
            name: '測試用咖啡豆 (Mock)',
            price: 350,
            quantity: 1,
            image: 'https://placehold.co/200x200',
            weight: '半磅',
            stock: 10, // Stock limit
            matchPercentage: 88
        }
    ]);

    // Getters - 計算總金額 (Client-side calculation)
    const subtotal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    });

    // Alias for compatibility
    const totalAmount = subtotal;
    const total = subtotal;

    // Getters - 計算總件數
    const totalItems = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    });

    // Actions - UI 控制
    function toggleCart() {
        isOpen.value = !isOpen.value;
    }

    function openCart() {
        isOpen.value = true;
    }

    function closeCart() {
        isOpen.value = false;
    }

    // 輔助函式：取得商品圖片
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
     * 加入購物車 (核心邏輯)
     * 支援傳入完整 Product 物件 (自動轉型) 或 CartItem
     */
    async function addItem(product: any) {
        const authStore = useAuthStore();

        // 正規化商品資料
        let itemToAdd: CartItem;

        // 判斷是否為 API 回傳的原始商品資料 (有 img 陣列)
        if (product.img && Array.isArray(product.img)) {
            itemToAdd = {
                id: product.id,
                pid: String(product.pid), // 確保 pid 為字串
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1, // 預設 1，或使用傳入的 quantity
                image: getProductImage(product),
                weight: product.weight || '半磅', // 預設規格
                stock: product.stock || 50, // 預設庫存，若無則給寬鬆值
                matchPercentage: 95 // 假設值
            };
        } else {
            // 已經是 CartItem 格式
            itemToAdd = { ...product };
            if (!itemToAdd.quantity) itemToAdd.quantity = 1;
        }

        // 1. 更新 Pinia (前端即時反應)
        const existingItem = items.value.find(item => item.id === itemToAdd.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const maxStock = itemToAdd.stock ?? 999;

        // 檢查庫存上限
        if (currentQuantity + itemToAdd.quantity > maxStock) {
            // 如果加總超過庫存，調整加入數量為 (庫存 - 目前數量)
            const allowedToAdd = Math.max(0, maxStock - currentQuantity);
            itemToAdd.quantity = allowedToAdd;

            if (allowedToAdd === 0) {
                // 已達上限，不繼續執行 (或可考慮跳出提示)
                console.warn('庫存不足，無法再加入');
                return;
            }
        }

        if (existingItem) {
            existingItem.quantity += itemToAdd.quantity;
        } else {
            items.value.push(itemToAdd);
        }

        // 打開購物車給予回饋
        openCart();

        // 2. 同步至 Strapi (背景執行)
        // 判斷使用測試模式或真實登入
        const shouldSync = DEV_TEST_MODE || (authStore.isLoggedIn && authStore.token);
        const authToken = DEV_TEST_MODE ? TEST_CREDENTIALS.token : authStore.token;
        const userId = DEV_TEST_MODE ? TEST_CREDENTIALS.userId : authStore.user?.id;

        if (shouldSync && authToken) {
            try {
                const response = await fetch(`${STRAPI_URL}/api/cart-items`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        data: {
                            user: userId,                 // relation 欄位
                            product: itemToAdd.id,        // relation 欄位（指向 PRODUCTS.id）
                            snapshot_name: itemToAdd.name,
                            snapshot_price: itemToAdd.price,
                            snapshot_image: itemToAdd.image || '',
                            snapshot_weight: itemToAdd.weight || '半磅',
                            quantity: existingItem ? existingItem.quantity : itemToAdd.quantity,
                            item_total: itemToAdd.price * (existingItem ? existingItem.quantity : itemToAdd.quantity)
                        }
                    })
                });

                // 儲存 Strapi 回傳的 documentId (用於後續 update/delete)
                if (response.ok) {
                    const result = await response.json();
                    const strapiData = result.data as StrapiCartItemData;
                    // 更新 Pinia 中的 item，加入 strapiDocumentId
                    const targetItem = items.value.find(item => item.id === itemToAdd.id);
                    if (targetItem) {
                        targetItem.strapiDocumentId = strapiData.documentId;
                    }
                }
            } catch (error) {
                console.error('Failed to sync to CART_ITEM:', error);
            }
        }
    }

    /**
     * 移除購物車項目
     */
    async function removeItem(productId: number) {
        const authStore = useAuthStore();

        // 1. 更新 Pinia (並保留被刪除項目的資訊以便同步)
        const index = items.value.findIndex(item => item.id === productId);
        let removedItem: CartItem | undefined;
        if (index > -1) {
            removedItem = items.value[index];
            items.value.splice(index, 1);
        }

        // 2. 同步至 Strapi (背景執行) - 使用 documentId 刪除
        const shouldSync = DEV_TEST_MODE || (authStore.isLoggedIn && authStore.token);
        const authToken = DEV_TEST_MODE ? TEST_CREDENTIALS.token : authStore.token;

        if (shouldSync && removedItem?.strapiDocumentId && authToken) {
            try {
                await fetch(`${STRAPI_URL}/api/cart-items/${removedItem.strapiDocumentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
            } catch (error) {
                console.error('Failed to delete from CART_ITEM:', error);
            }
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
                // 檢查庫存
                const maxStock = item.stock ?? 999;
                if (quantity > maxStock) {
                    item.quantity = maxStock;
                    console.warn(`數量已達庫存上限 (${maxStock})`);
                } else {
                    item.quantity = quantity;
                }

                // 同步至 Strapi
                const shouldSync = DEV_TEST_MODE || (authStore.isLoggedIn && authStore.token);
                const authToken = DEV_TEST_MODE ? TEST_CREDENTIALS.token : authStore.token;

                if (shouldSync && item.strapiDocumentId && authToken) {
                    try {
                        await fetch(`${STRAPI_URL}/api/cart-items/${item.strapiDocumentId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`
                            },
                            body: JSON.stringify({
                                data: {
                                    quantity: item.quantity,
                                    item_total: item.price * item.quantity
                                }
                            })
                        });
                    } catch (error) {
                        console.error('Failed to update quantity in Strapi:', error);
                    }
                }
            }
        }
    }

    /**
     * 清空購物車
     */
    function clearCart() {
        items.value = [];
        // TODO: 同步呼叫 API 清除該使用者所有購物車項目
    }

    /**
     * 前往結帳
     */
    function checkout() {
        console.log('Proceeding to checkout');
        // 未來: router.push('/checkout')
    }

    return {
        // State
        items,
        isOpen,
        recommendations,
        // Getters
        totalAmount,
        subtotal,
        total,
        totalItems,
        // Actions
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        checkout
    };
}, {
    persist: {
        key: 'cart',
        storage: localStorage,
        beforeHydrate: (_ctx) => {
            // 安全地處理可能損壞的 localStorage 資料
            try {
                const stored = localStorage.getItem('cart');
                if (stored) {
                    JSON.parse(stored); // 測試是否可解析
                }
            } catch (e) {
                console.warn('[Cart Store] localStorage 資料損壞，已清除:', e);
                localStorage.removeItem('cart');
            }
        }
    }
});
