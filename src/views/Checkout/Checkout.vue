<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';

  const form = reactive({
    email: '',
    name: '',
    phone: '',
    address: '',
  });
</script>
<template>
  <main class="font-wenkai flex justify-center">
    <form action="#" class="w-[55%] bg-[#FAFAFA] pt-4 pb-8 flex justify-end">
      <div class="w-[65%]">
        <div class="my-5">
          <h2 class="text-2xl font-semibold mb-5">配送方式</h2>
          <p>宅配取貨付款</p>
        </div>

        <div class="">
          <h2 class="text-2xl font-semibold mb-5">收件人資訊</h2>
          <label for="name" class="block">姓名</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="姓名"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="phone" class="block">電話</label>
          <input
            v-model="form.phone"
            type="tel"
            id="phone"
            placeholder="電話"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="email" class="block">電子郵件</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="電子郵件"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />

          <label for="address" class="block">收件人地址</label>
          <input
            v-model="form.address"
            type="text"
            id="address"
            placeholder="收件地址"
            required
            class="w-full p-3 border border-gray-300 rounded-md mt-2 mb-4"
          />
        </div>
        <button type="submit" class="w-full p-3 rounded-md mt-2 mb-4 bg-[#6d654f] text-white">
          確認送出訂單
        </button>
      </div>
    </form>

    <section class="w-[45%]">
      <div class="w-[65%]">
        <div class="flex mx-8 my-12">
          <img
            src="./assets/coffee_001.png"
            alt=""
            class="w-[64px] h-full aspect-square object-cover rounded-xl"
          />
          <div class="mx-4 w-[65%]">
            <h3>耶加雪菲G1日曬</h3>
            <p class="text-sm mt-2">200g</p>
          </div>
          <div class="">$1,000</div>
        </div>

        <div class="mx-8">
          <div class="flex justify-between">
            <p class="">商品金額</p>
            <p id="price" class="">$1,000</p>
          </div>

          <div class="flex justify-between">
            <p>運費</p>
            <p id="shippingFee">$130</p>
          </div>

          <div class="flex justify-between text-lg my-4">
            <p>總金額</p>
            <p>$1,130</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
