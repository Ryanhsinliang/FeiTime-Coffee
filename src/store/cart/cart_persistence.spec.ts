import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/store/cart'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { nextTick } from 'vue'

// Mock useAuthStore - we don't need auth logic for this test
vi.mock('../store/auth', () => ({
    useAuthStore: () => ({
        isLoggedIn: false,
        strapiUserId: null
    })
}))

describe('Cart Store Persistence', () => {
    let cartStore: ReturnType<typeof useCartStore>

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear()

        const pinia = createPinia()
        pinia.use(piniaPluginPersistedstate)
        setActivePinia(pinia)

        cartStore = useCartStore()
        // Reset items
        cartStore.items = []
        // Ensure initial state is clean
        localStorage.removeItem('cart')
    })

    it('should persist items to localStorage when added', async () => {
        const item = { id: 1, pid: 'p1', name: 'Coffee', price: 100, quantity: 1, image: '', weight: '', stock: 10 }
        cartStore.items.push(item)

        await nextTick() // Wait for persistence plugin

        // Wait for persistence (it's synchronous by default usually, but let's check)
        // With pinia-plugin-persistedstate, changes are usually immediate unless configured otherwise.

        // Check localStorage
        const stored = localStorage.getItem('cart')
        expect(stored).not.toBeNull()

        const parsed = JSON.parse(stored!)
        // The structure depends on the plugin. Usually it saves the object { items: [...], isOpen: ... }
        expect(parsed.items).toHaveLength(1)
        expect(parsed.items[0].id).toBe(1)
    })

    it('should update localStorage when clearLocalCart is called', async () => {
        // 1. Add item
        cartStore.items.push({ id: 1, pid: 'p1', name: 'Coffee', price: 100, quantity: 1, image: '', weight: '', stock: 10 })

        await nextTick() // Wait for persistence

        // Verify it's there
        expect(JSON.parse(localStorage.getItem('cart')!).items).toHaveLength(1)

        // 2. Clear cart
        cartStore.clearLocalCart()

        await nextTick() // Wait for persistence

        // 3. Verify localStorage
        const stored = localStorage.getItem('cart')
        expect(stored).not.toBeNull() // Key should still exist

        const parsed = JSON.parse(stored!)
        expect(parsed.items).toHaveLength(0) // Items should be empty
    })
})
