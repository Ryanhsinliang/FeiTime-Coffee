<template>
  <div class="group relative flex gap-5 bg-white p-4 rounded-2xl border border-[#e0e6e4] shadow-sm hover:border-[#8C7B5D]/30 transition-all duration-300">
    <div
      class="shrink-0 w-24 h-24 rounded-xl bg-[#f4f7f6] bg-cover bg-center bg-no-repeat border border-[#e0e6e4]/50"
      :style="{ backgroundImage: `url('${item.image}')` }"
    ></div>
    <div class="flex flex-1 flex-col justify-between py-0.5">
      <div>
        <div class="flex justify-between items-start gap-2">
          <h3 class="font-bold text-lg leading-tight text-[#1a2e26] font-notoserif">{{ item.name }}</h3>
          <p class="font-bold text-[#1a2e26] font-notoserif">${{ item.price.toFixed(2) }}</p>
        </div>
        <p class="text-[#546e63] text-sm mt-1 font-medium">{{ item.description }}</p>
        <div
          v-if="item.matchPercentage"
          class="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#8C7B5D]/10 border border-[#8C7B5D]/20 text-[#8C7B5D]"
        >
          <span class="material-symbols-outlined text-[14px]">favorite</span>
          <span class="text-[10px] font-bold tracking-wide uppercase">{{ item.matchPercentage }}% 契合度</span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center bg-[#f4f7f6] rounded-lg border border-[#e0e6e4] p-0.5 h-8">
          <button
            class="h-full w-8 flex items-center justify-center rounded-md hover:bg-white text-[#546e63] transition-colors disabled:opacity-40"
            :disabled="item.quantity <= 1"
            @click="decreaseQuantity"
          >
            <span class="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <input
            class="w-8 text-center bg-transparent border-none text-sm font-bold p-0 text-[#1a2e26] focus:ring-0"
            readonly
            type="text"
            :value="item.quantity"
          />
          <button
            class="h-full w-8 flex items-center justify-center rounded-md hover:bg-white text-[#1a2e26] transition-colors disabled:opacity-40"
            :disabled="item.quantity >= (item.stock || 999)"
            @click="increaseQuantity"
          >
            <span class="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>
        <button
          class="text-[#546e63]/60 hover:text-red-500 transition-colors p-1"
          @click="handleRemove"
        >
          <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({

  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity', 'remove'])

const increaseQuantity = () => {
  if (props.item.quantity < (props.item.stock || 999)) {
    emit('update-quantity', props.item.id, props.item.quantity + 1)
  }
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('update-quantity', props.item.id, props.item.quantity - 1)
  }
}

const handleRemove = () => {
  emit('remove', props.item.id)
}
</script>
