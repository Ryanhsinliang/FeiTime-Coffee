import { reactive, computed } from 'vue';
import { Product, CartItem } from '@/types/product';

// Initial data left as mock for now, but typed partially
const initialCartItems: CartItem[] = [];
const initialRecommendations: CartItem[] = [];

// State
const state = reactive({
    isOpen: false,
    items: [] as CartItem[],
    recommendations: [] as CartItem[]
});

// Getters
const totalItems = computed(() => state.items.reduce((sum, item) => sum + item.quantity, 0));
const subtotal = computed(() => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0));
const total = computed(() => subtotal.value);

// Helper to normalize product image
function getProductImage(product: Product): string {
    if (product.img && product.img.length > 0) {
        // Try to get large, then medium, then small, then original url
        const firstImg = product.img[0];
        return firstImg.formats?.large?.url ||
            firstImg.formats?.medium?.url ||
            firstImg.formats?.small?.url ||
            firstImg.url ||
            ''; // fallback placeholder if needed
    }
    return '';
}

// Actions
function toggleCart() {
    state.isOpen = !state.isOpen;
}

function openCart() {
    state.isOpen = true;
}

function closeCart() {
    state.isOpen = false;
}

// Add to Cart accepts a Product (from API) or a CartItem (from recommendations/existing mock)
function addToCart(product: Product | CartItem) {
    const existingItem = state.items.find(i => i.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        // Check if it's already a CartItem (has image string and quantity), otherwise normalize it
        const isCartItem = (p: any): p is CartItem => 'image' in p && typeof p.image === 'string';

        let newItem: CartItem;

        if (isCartItem(product)) {
            newItem = { ...product, quantity: 1 };
        } else {
            // It's a raw Product from API, need to normalize
            // Destructure to remove 'img' from the rest of the product properties
            const { img, ...restOfProduct } = product;
            newItem = {
                ...restOfProduct,
                quantity: 1,
                image: getProductImage(product),
                matchPercentage: product.aiRecommended ? 95 : null // Default match % for now
            };
        }

        state.items.push(newItem);
    }

    // If in recommendations, remove it
    const recIndex = state.recommendations.findIndex(r => r.id === product.id);
    if (recIndex > -1) {
        state.recommendations.splice(recIndex, 1);
    }

    openCart();
}

function updateQuantity(itemId: number, quantity: number) {
    const item = state.items.find(i => i.id === itemId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = quantity;
        }
    }
}

function removeFromCart(itemId: number) {
    const index = state.items.findIndex(i => i.id === itemId);
    if (index > -1) {
        state.items.splice(index, 1);
    }
}

function checkout() {
    console.log('Proceeding to checkout with items:', state.items);
    // Future: Router push to checkout
}

export const useCartStore = () => {
    return {
        state,
        totalItems,
        subtotal,
        total,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout
    };
};
