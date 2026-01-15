<template>
  <Transition name="cart-overlay">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-[#1a2e26]/20 backdrop-blur-[2px] transition-opacity duration-300"
      @click="closeCart"
    ></div>
  </Transition>

  <Transition name="cart-slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 z-50 h-full w-full max-w-[480px] flex flex-col border-l border-white/40 shadow-2xl bg-white/90 backdrop-blur-[16px] font-wenkai"
    >
      <!-- Header -->
      <header class="flex items-center justify-between px-8 py-6 border-b border-[#e0e6e4]/60 bg-white/40">
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-bold tracking-wide text-[#1a2e26] font-notoserif">您的購物車</h2>
          <span class="flex items-center justify-center h-6 min-w-[1.5rem] px-1.5 rounded-full bg-[#1a2e26] text-white text-xs font-bold shadow-sm">
            {{ totalItems }}
          </span>
        </div>
        <button
          class="group flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#1a2e26]/5 transition-colors text-[#546e63] hover:text-[#1a2e26]"
          @click="closeCart"
        >
          <span class="material-symbols-outlined font-medium">close</span>
        </button>
      </header>

      <!-- Cart Content -->
      <div class="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8">
        <!-- AI Assistant Message -->
        <div v-if="cartItems.length > 0" class="flex gap-5 items-start animate-fade-in-up">
          <div class="relative shrink-0 pt-2">
            <!-- Icon changed to #8C7B5D, border changed to gray -->
            <div class="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#DCCFC0] shadow-sm hover:shadow-md hover:border-[#8C7B5D]/40 transition-all duration-300 z-10 overflow-hidden p-1">
              <svg viewBox="0 0 100 100" class="w-full h-full group-hover:scale-110 transition-transform">
                <ellipse cx="50" cy="55" rx="28" ry="35" fill="#6F4E37" />
                <path d="M 50 25 Q 45 55 50 85" stroke="#8B6F47" stroke-width="3" fill="none" stroke-linecap="round" />
                <circle cx="50" cy="25" r="15" fill="#A0826D" />
                <line x1="50" y1="10" x2="50" y2="15" stroke="#E8B4B8" stroke-width="2" stroke-linecap="round" />
                <circle cx="50" cy="8" r="3" fill="#FF6B6B" />
                <circle cx="44" cy="24" r="2.5" fill="#FFF" />
                <circle cx="56" cy="24" r="2.5" fill="#FFF" />
                <circle cx="44.5" cy="24.5" r="1.5" fill="#333" />
                <circle cx="56.5" cy="24.5" r="1.5" fill="#333" />
                <path d="M 43 28 Q 50 31 57 28" stroke="#FFF" stroke-width="1.5" fill="none" stroke-linecap="round" />
                <rect x="20" y="50" width="8" height="20" rx="4" fill="#8B6F47" />
                <rect x="72" y="50" width="8" height="20" rx="4" fill="#8B6F47" />
                <circle cx="24" cy="72" r="4" fill="#A0826D" />
                <circle cx="76" cy="72" r="4" fill="#A0826D" />
                <path d="M 40 15 Q 38 10 40 5" stroke="#E8E8E8" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6" />
                <path d="M 60 15 Q 62 10 60 5" stroke="#E8E8E8" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6" />
              </svg>
            </div>
          </div>
          <div class="relative flex-1 bg-white/95 backdrop-blur-sm border border-[#DCCFC0]/80 rounded-2xl rounded-tl-none p-5 shadow-sm group hover:shadow-md transition-shadow duration-300">
            <div class="absolute -left-[7px] top-6 w-3.5 h-3.5 bg-white border-l border-b border-[#DCCFC0]/80 transform rotate-45"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[11px] font-bold text-[#8C7B5D] uppercase tracking-wider flex items-center gap-1 font-notoserif">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#8C7B5D]"></span>
                  咖啡精靈
                </span>
                <span class="text-[10px] text-[#B5A893]/80">• 剛剛</span>
              </div>
              <p class="text-sm text-[#1a2e26] leading-relaxed">
                絕佳選擇！<span class="font-bold border-b-2 border-[#8C7B5D]/30">{{ featuredItem?.name || '耶加雪菲' }}</span>
                與您的口味檔案有
                <span class="text-[#8C7B5D] font-bold inline-flex items-center gap-0.5">
                  <span class="material-symbols-outlined text-[14px]">favorite</span>{{ matchPercentage }}% 契合度
                </span>
                。
              </p>
              <div class="mt-3 pt-3 border-t border-[#DCCFC0]/60 flex gap-2 items-start">
                <span class="material-symbols-outlined text-[#8C7B5D] text-[16px] mt-0.5">lightbulb</span>
                <span class="text-xs text-[#546e63] leading-relaxed font-medium">
                  小撇步：試試用 93°C 的熱水搭配您的新分享壺，能釋放出更棒的蜜桃風味喔！
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div class="space-y-4">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @update-quantity="handleUpdateQuantity"
            @remove="handleRemoveItem"
          />
        </div>

        <!-- Recommendations Section -->
        <div v-if="recommendations.length > 0" class="pt-6 border-t border-[#e0e6e4]">
          <div class="flex items-center gap-2 mb-4 px-1">
            <div class="p-1 rounded bg-[#8C7B5D]/10">
              <img src="/icons/feitime-logo.png" alt="FeiTime Logo" class="w-5 h-5 object-contain opacity-80" />
            </div>
            <h4 class="text-xs font-bold text-[#546e63] uppercase tracking-widest font-notoserif">您可能也喜歡</h4>
          </div>
          <RecommendationCard
            v-for="rec in recommendations"
            :key="rec.id"
            :product="rec"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>

      <!-- Footer / Checkout -->
      <div class="border-t border-[#e0e6e4] p-8 bg-[#eef2f0]/50 backdrop-blur-md">
        <div class="space-y-3 mb-6">
          <div class="flex justify-between items-center text-[#546e63] text-sm">
            <span>小計</span>
            <span class="font-bold text-[#1a2e26]">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between items-center text-[#546e63] text-sm">
            <span>運費</span>
            <span class="text-[#546e63]/70 italic">於結帳時計算</span>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-[#e0e6e4]/60">
            <span class="font-bold text-lg text-[#1a2e26] font-notoserif">總計</span>
            <span class="font-extrabold text-2xl text-[#1a2e26] font-notoserif">${{ total.toFixed(2) }}</span>
          </div>
        </div>
        <button
          class="w-full group relative flex items-center justify-center gap-2 bg-[#1a2e26] hover:bg-[#A2AF9B] hover:text-white text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-glow font-notoserif"
          @click="handleCheckout"
        >
          <span>前往結帳</span>
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
        <button
          class="w-full mt-4 text-center text-sm font-semibold text-[#546e63] hover:text-[#1a2e26] transition-colors"
          @click="closeCart"
        >
          繼續購物
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import CartItem from './cart/CartItem.vue'
import RecommendationCard from './cart/RecommendationCard.vue'
import { useCartStore } from '@/store/cart'

// Pinia Store 整合
// 使用 useCartStore 取得購物車狀態與方法
const cartStore = useCartStore()

// State - 直接對應 Store 的 State
// 使用 computed 保持響應性 (Reactivity)
const isOpen = computed(() => cartStore.isOpen)
const cartItems = computed(() => cartStore.items)
const recommendations = computed(() => cartStore.recommendations)

// Getters - 從 Store 取得計算後的數值
const subtotal = computed(() => cartStore.subtotal)
const total = computed(() => cartStore.total)
const totalItems = computed(() => cartStore.totalItems)

// Actions - 綁定 Store 的操作方法
const closeCart = cartStore.closeCart
const updateQuantity = cartStore.updateQuantity
const removeFromCart = cartStore.removeItem
const addToCart = cartStore.addItem
const checkout = cartStore.checkout

// Computed - 計算當前推薦商品 (前端邏輯)
const featuredItem = computed(() => {
  return cartItems.value.find(item => item.matchPercentage)
})


const matchPercentage = computed(() => {
  return featuredItem.value?.matchPercentage || 98
})

const handleUpdateQuantity = (itemId, newQuantity) => {
  updateQuantity(itemId, newQuantity)
}

const handleRemoveItem = (itemId) => {
  removeFromCart(itemId)
}

const handleAddToCart = (product) => {
  addToCart(product)
}

const handleCheckout = () => {
  checkout()
}
</script>

<style scoped>
/* Transition animations */
.cart-overlay-enter-active,
.cart-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.cart-overlay-enter-from,
.cart-overlay-leave-to {
  opacity: 0;
}

.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: transform 0.3s ease-out;
}

.cart-slide-enter-from,
.cart-slide-leave-to {
  transform: translateX(100%);
}

/* Custom scrollbar hiding */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animation */
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
