<template>
  <div>
    <section class="min-h-[40vh] w-2/3 bg-[#eeeeee] mx-auto rounded-2xl">
      <div class="p-5">
        <img class="h-10" src="" alt="" />
        <h2 class="text-2xl text-center">您的Coffee ID card</h2>
      </div>
      <div class="pl-10 flex flex-wrap justify-between">
        <div class="flex-col">
          <div>酸味指標：{{ scores.acidity }}</div>
          <div>甜味指標：{{ scores.sweetness }}</div>
          <div>醇厚度指標：{{ scores.body }}</div>
          <div>餘韻指標：{{ scores.aftertaste }}</div>
          <div>澄澈度指標：{{ scores.clarity }}</div>
        </div>
        <div></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import type { Scores } from '../views/CoffeeIdTest/type';
  const props = defineProps<{ scores: Scores; answers?: any[] }>();
</script>

<style scoped></style>
