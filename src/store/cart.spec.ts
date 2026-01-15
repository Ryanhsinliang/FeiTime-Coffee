// Mock localStorage for Node environment
global.localStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 0,
    key: () => null
} as any

import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cart'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock implementation of useAuthStore
vi.mock('./mockAuth', () => ({
    useAuthStore: vi.fn(() => ({
        isLoggedIn: false,
        id: 123,
        jwt: 'mock-jwt'
    }))
}))

describe('Cart Store Logic Analysis', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const mockProduct = {
        id: 101,
        pid: 'p-101',
        name: 'Test Coffee',
        price: 100,
        img: [{ formats: { large: { url: 'http://test.com/img.png' } } }]
    }

    it('should add item to cart', async () => {
        const cart = useCartStore()
        await cart.addItem(mockProduct)
        expect(cart.items).toHaveLength(1)
        expect(cart.items[0].id).toBe(101)
        expect(cart.items[0].quantity).toBe(1)
    })

    it('should increment quantity for duplicate item', async () => {
        const cart = useCartStore()
        await cart.addItem(mockProduct)
        await cart.addItem(mockProduct)
        expect(cart.items).toHaveLength(1)
        expect(cart.items[0].quantity).toBe(2)
        expect(cart.totalAmount).toBe(200)
    })

    it('should check for stock limits (Logic Gap)', async () => {
        const cart = useCartStore()

        // Try to add 999 items
        for (let i = 0; i < 10; i++) {
            await cart.addItem(mockProduct)
        }

        // Asserting current behavior to confirm no stock check
        expect(cart.items[0].quantity).toBe(10)
        console.log('[Audit Finding] Cart allowed adding items without any stock check.')
    })

    it('should handle price changes logic (Logic Gap)', async () => {
        const cart = useCartStore()
        // Add item with price 100
        await cart.addItem(mockProduct)

        // Add same item but assume price changed to 150
        const updatedProduct = { ...mockProduct, price: 150 }
        await cart.addItem(updatedProduct)

        // Logic Issue: It finds by ID, and increments quantity.
        // It does NOT update price or other fields.
        expect(cart.items[0].quantity).toBe(2)
        expect(cart.items[0].price).toBe(100)

        console.log('[Audit Finding] Adding same item with updated price does not update cart item price. User pays old price for new quantity.')
    })
})
