import { reactive, computed } from 'vue';

// 初始商品資料 (模擬)
const initialCartItems = [
    {
        id: 1,
        name: '衣索比亞 耶加雪菲',
        description: '淺焙 • 12oz',
        price: 24.00,
        quantity: 1,
        matchPercentage: 98,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2gabWd4ozx91suo-QAgQabZG7Vq4nm8fgLKge3HKEBEdto15YwvEksKRDqpizJtewwXADuBVbziJkyNK2ZFOeFxauVQPtSNT3gvTnsAMEPi7HroRwXZIVIKT2Pg3VIcufEQ4VlOAjCE_Wj0FA8EkBu-kaul-bINnrRb8HMR2yTicqELwDop0f_uplFKjOIU0FxJinRHump9oRR9vJ8HfzgXfdRKFKPU66uRoistv7tomPvfOVWsCtUN2CGIt5TrVeox2brOU7Rq1q'
    },
    {
        id: 2,
        name: 'FeiTime 玻璃分享壺',
        description: '高硼矽玻璃 • 600ml',
        price: 35.00,
        quantity: 1,
        matchPercentage: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJGjVM2WwRNXaixFMbSLqGc7a5SPd6t6s5lE4yjLieJrxT6ecGSYB7-gOvTnQ_nSU27b_pXmzbELx4ymoENuJOtXtGIMjoBgS83ETVrK1j82dVsM3eLMTCI5ycd9BCez-fPt78f-QGwkRLp_pEH_MqdqMy1iVo7ps--wgZSZ80QSYm3lN_tokBYn7UQuTrEL9Brwt22HYzKZmhP2efROx6sU7MLEOGQvsF4tQ9fLs1Vjq0QcYipQPfriD0fJNXlX7VrSDjj2DZUy4V'
    }
];

const initialRecommendations = [
    {
        id: 3,
        name: '肯亞 AA',
        price: 22.00,
        tag: '果香調性',
        aiRecommended: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn_r7SRXOTtcGPvGVHBg4-J0wkbfZOH0L3qICRTnXFfkH7OQwAmfSiRWQINp6eIG_QEC9vMJZxtGtAsZTQqu1NZIcbPTaLQ7B60RTwcs9vNZ32sYV7Tmdd7C5YETW6Pwd12RDimiqhWXo29jo7U6vQJ5_QZlDmTxOYRAX2yVlNQYJ0RKcU6Dc8_TPKl4K_5NkxqqoZDPyjCZvPUpLk-rWWhX1iQe09znt3c5onCopKvGkPIpXvrS6_PK_RqoYuaEhseNunCGWJytuh'
    }
];

// State
const state = reactive({
    isOpen: false,
    items: [...initialCartItems],
    recommendations: [...initialRecommendations]
});

// Getters
const totalItems = computed(() => state.items.reduce((sum, item) => sum + item.quantity, 0));
const subtotal = computed(() => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0));
const total = computed(() => subtotal.value); // 暫時無運費邏輯

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

function addToCart(product: any) {
    const existingItem = state.items.find(i => i.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.items.push({
            ...product,
            quantity: 1
        });
    }
    // 如果在推薦列表中，則移除
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
    // 這裡可以加入跳轉到結帳頁面的邏輯
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
