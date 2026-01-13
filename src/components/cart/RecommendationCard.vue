<template>
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0fdf4] to-white border border-[#8C7B5D]/10 p-4 group hover:border-[#8C7B5D]/30 transition-colors shadow-sm">
    <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      <span class="material-symbols-outlined text-[#8C7B5D] text-[60px] -mr-4 -mt-4 rotate-12">coffee_maker</span>
    </div>
    <div class="relative flex gap-4 z-10">
      <div
        class="shrink-0 w-16 h-16 rounded-lg bg-cover bg-center bg-no-repeat shadow-inner border border-[#e0e6e4]/50"
        :style="{ backgroundImage: `url('${product.image}')` }"
      ></div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h5 class="text-[#1a2e26] font-bold truncate text-base font-notoserif">{{ product.name }}</h5>
          <span class="text-sm font-bold text-[#1a2e26] font-notoserif">${{ product.price.toFixed(2) }}</span>
        </div>
        <div class="flex items-center gap-1.5 mt-1 mb-2">
          <span
            v-if="product.tag"
            class="text-[11px] text-[#8C7B5D] font-bold bg-white/60 px-1.5 py-0.5 rounded"
          >
            {{ product.tag }}
          </span>
          <span
            v-if="product.aiRecommended"
            class="text-[10px] text-[#546e63]/70 flex items-center gap-0.5"
          >
            <span class="w-1 h-1 rounded-full bg-[#8C7B5D]"></span>
           咖啡小精靈誠心推薦
          </span>
        </div>
        <button
          class="w-full flex items-center justify-center gap-1 bg-white border border-[#e0e6e4] hover:border-[#A2AF9B] hover:text-[#A2AF9B] text-[#546e63] text-xs font-bold py-1.5 px-3 rounded-lg transition-all shadow-sm"
          @click="handleAddToCart"
        >
          <span>加入購物車</span>
          <span class="material-symbols-outlined text-[14px]">add</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({

  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
}
</script>
