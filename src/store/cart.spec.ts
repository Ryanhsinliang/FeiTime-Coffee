/**
 * Cart Store 單元測試
 * 測試購物車核心邏輯
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../store/cart'

// Mock useAuthStore
vi.mock('../store/auth', () => ({
    useAuthStore: () => ({
        isLoggedIn: false,
        strapiUserId: null
    })
}))

describe('Cart Store', () => {
    let cartStore: ReturnType<typeof useCartStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        cartStore = useCartStore()
        // 清空購物車
        cartStore.items.splice(0)
    })

    describe('基礎功能', () => {
        it('初始化時購物車應為空', () => {
            expect(cartStore.items).toHaveLength(0)
            expect(cartStore.totalItems).toBe(0)
            expect(cartStore.subtotal).toBe(0)
        })

        it('toggleCart 應切換購物車開關狀態', () => {
            expect(cartStore.isOpen).toBe(false)
            cartStore.toggleCart()
            expect(cartStore.isOpen).toBe(true)
            cartStore.toggleCart()
            expect(cartStore.isOpen).toBe(false)
        })
    })

    describe('addItem - 加入購物車', () => {
        const mockProduct = {
            id: 1,
            pid: 'coffee_001',
            name: '測試咖啡',
            price: 500,
            quantity: 1,
            image: '/test.jpg',
            weight: '250g',
            stock: 10
        }

        it('應成功加入新商品', async () => {
            await cartStore.addItem(mockProduct)
            expect(cartStore.items).toHaveLength(1)
            expect(cartStore.items[0].name).toBe('測試咖啡')
            expect(cartStore.items[0].quantity).toBe(1)
        })

        it('加入相同商品應增加數量', async () => {
            await cartStore.addItem(mockProduct)
            await cartStore.addItem(mockProduct)
            expect(cartStore.items).toHaveLength(1)
            expect(cartStore.items[0].quantity).toBe(2)
        })

        it('加入數量超過庫存應被限制', async () => {
            const lowStockProduct = { ...mockProduct, stock: 2 }
            await cartStore.addItem({ ...lowStockProduct, quantity: 3 })
            expect(cartStore.items[0].quantity).toBeLessThanOrEqual(2)
        })
    })

    describe('updateQuantity - 更新數量', () => {
        beforeEach(async () => {
            cartStore.items.push({
                id: 1,
                pid: 'coffee_001',
                name: '測試咖啡',
                price: 500,
                quantity: 2,
                image: '/test.jpg',
                weight: '250g',
                stock: 10
            })
        })

        it('應正確更新商品數量', async () => {
            await cartStore.updateQuantity(1, 5)
            expect(cartStore.items[0].quantity).toBe(5)
        })

        it('數量設為 0 時應移除商品', async () => {
            await cartStore.updateQuantity(1, 0)
            expect(cartStore.items).toHaveLength(0)
        })

        it('數量超過庫存時應限制為庫存上限', async () => {
            await cartStore.updateQuantity(1, 15)
            expect(cartStore.items[0].quantity).toBe(10)
        })
    })

    describe('removeItem - 移除商品', () => {
        beforeEach(() => {
            cartStore.items.push({
                id: 1,
                pid: 'coffee_001',
                name: '測試咖啡',
                price: 500,
                quantity: 2,
                image: '/test.jpg',
                weight: '250g',
                stock: 10
            })
        })

        it('應成功移除指定商品', async () => {
            await cartStore.removeItem(1)
            expect(cartStore.items).toHaveLength(0)
        })

        it('移除不存在的商品應不影響購物車', async () => {
            await cartStore.removeItem(999)
            expect(cartStore.items).toHaveLength(1)
        })
    })

    describe('Getters - 計算屬性', () => {
        beforeEach(() => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 2, image: '', weight: '', stock: 10 },
                { id: 2, pid: 'c2', name: 'B', price: 200, quantity: 1, image: '', weight: '', stock: 5 }
            )
        })

        it('subtotal 應正確計算小計', () => {
            // 100 * 2 + 200 * 1 = 400
            expect(cartStore.subtotal).toBe(400)
        })

        it('totalItems 應正確計算總數量', () => {
            // 2 + 1 = 3
            expect(cartStore.totalItems).toBe(3)
        })
    })

    describe('hasInvalidStockItems - 庫存檢查', () => {
        it('所有商品有正常庫存時應回傳 false', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: 10 }
            )
            expect(cartStore.hasInvalidStockItems).toBe(false)
        })

        it('商品庫存為 undefined 時應回傳 true', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: undefined as any }
            )
            expect(cartStore.hasInvalidStockItems).toBe(true)
        })

        it('商品庫存為 9999 時應回傳 true', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: 9999 }
            )
            expect(cartStore.hasInvalidStockItems).toBe(true)
        })

        it('商品庫存為 Infinity 時應回傳 true', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: Infinity }
            )
            expect(cartStore.hasInvalidStockItems).toBe(true)
        })

        it('混合正常與異常庫存時應回傳 true', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: 10 },
                { id: 2, pid: 'c2', name: 'B', price: 200, quantity: 1, image: '', weight: '', stock: undefined as any }
            )
            expect(cartStore.hasInvalidStockItems).toBe(true)
        })
    })

    describe('invalidStockItemNames - 庫存異常商品名稱', () => {
        it('應回傳所有庫存異常商品的名稱', () => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: '正常商品', price: 100, quantity: 1, image: '', weight: '', stock: 10 },
                { id: 2, pid: 'c2', name: '異常商品A', price: 200, quantity: 1, image: '', weight: '', stock: undefined as any },
                { id: 3, pid: 'c3', name: '異常商品B', price: 300, quantity: 1, image: '', weight: '', stock: 9999 }
            )
            expect(cartStore.invalidStockItemNames).toEqual(['異常商品A', '異常商品B'])
        })
    })

    describe('clearCart - 清空購物車', () => {
        beforeEach(() => {
            cartStore.items.push(
                { id: 1, pid: 'c1', name: 'A', price: 100, quantity: 1, image: '', weight: '', stock: 10 },
                { id: 2, pid: 'c2', name: 'B', price: 200, quantity: 1, image: '', weight: '', stock: 5 }
            )
        })

        it('應清空所有商品', async () => {
            await cartStore.clearCart()
            expect(cartStore.items).toHaveLength(0)
        })
    })
})
