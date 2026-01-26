<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>庫存管理</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">商品編號PID: coffee_001</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="w-10 h-10 hover:text-[#e27312] relative">
        <i class="fa-regular fa-bell text-2xl"></i>
        <span
          class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"
        ></span>
      </button>
    </div>
  </header>

  <main class="px-8 py-6 max-w-5xl mx-auto w-full">
    <!-- 標題 -->
    <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-extrabold">編輯商品資料</h2>
        <p class="text-[#9a704c]">主要負責修改商品資料。</p>
      </div>
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
        @click="$router.back()"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回庫存管理</p>
      </button>
    </div>

    <form class="space-y-8 pb-20">
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">photo_library</span>
          <h2 class="text-lg font-bold">商品圖</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              v-for="(image, index) in ProductForm.img"
              :key="image?.id ?? index"
              class="relative group aspect-square rounded-lg overflow-hidden border border-[#e7dacf]"
            >
              <img
                :src="image?.formats?.large?.url || image?.formats?.medium?.url || image?.url"
                :alt="ProductForm.name"
                class="absolute inset-0 bg-cover bg-center w-full aspect-square object-cover"
              />

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  class="bg-white/20 p-2 rounded-full text-white hover:bg-white/40"
                >
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button
                  type="button"
                  class="bg-white/20 p-2 rounded-full text-white hover:bg-red-500"
                  @click="removeImage(index)"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <input type="file" id="imageUpload" class="hidden" />
            <label
              for="imageUpload"
              class="border-2 border-dashed border-[#e7dacf] rounded-lg flex flex-col items-center justify-center gap-2 bg-[#fcfaf8] cursor-pointer aspect-square"
            >
              <span class="material-symbols-outlined text-[#9a704c] text-3xl">upload_file</span>
              <p class="text-xs text-[#9a704c]">新增照片</p>
            </label>
          </div>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">info</span>
          <h2 class="text-lg font-bold">商品名稱</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">商品編號PID</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3 cursor-not-allowed text-[#9a704c]"
              type="text"
              disabled
              v-model="ProductForm.pid"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">中文名稱</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              v-model="ProductForm.name"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">英文名稱</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              v-model="ProductForm.english_name"
            />
          </label>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">public</span>
          <h2 class="text-lg font-bold">產地 &amp; 處理法 &amp; 烘焙度</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">產地</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              v-model="ProductForm.origin"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">處理法</p>
            <select
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              v-model="ProductForm.processing"
            >
              <option value="washed">Washed</option>
              <option value="natural">Natural</option>
              <option value="honey">Honey</option>
              <option value="anaerobic">Anaerobic</option>
            </select>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">烘焙度</p>
            <select
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              v-model="ProductForm.roast"
            >
              <option value="light">淺焙</option>
              <option value="medium">中焙</option>
              <option value="dark">深焙</option>
            </select>
          </label>
        </div>
      </section>

      <section
        class="bg-white dark:bg-[#2a1e14] rounded-xl border border-[#e7dacf] dark:border-[#3d2b1d] overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-4 border-b border-[#e7dacf] dark:border-[#3d2b1d] bg-[#fcfaf8] dark:bg-[#2d2116] flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-primary text-xl">palette</span>
          <h2 class="text-lg font-bold">Flavor Profile</h2>
        </div>
        <div class="p-6 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label class="flex flex-col gap-2">
              <p class="text-sm font-semibold">Flavor Tags</p>
              <div
                class="flex flex-wrap gap-2 p-3 border border-[#e7dacf] dark:border-[#3d2b1d] rounded-lg bg-white dark:bg-[#221810]"
              >
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Jasmine
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Lemon
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Earl Grey
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <input
                  class="flex-1 bg-transparent border-none focus:ring-0 text-sm p-1 min-w-[120px]"
                  placeholder="Add flavor tag..."
                  type="text"
                />
              </div>
            </label>
            <label class="flex flex-col gap-2">
              <p class="text-sm font-semibold">Flavor Type</p>
              <select
                class="w-full pl-4 rounded-lg border-[#e7dacf] bg-[#f8f7f6] py-3"
                v-model="ProductForm.flavor_type"
              >
                <option value="Floral">Floral</option>
                <option value="Nutty">Nutty</option>
                <option value="Fruity">Fruity</option>
                <option value="Bold">Bold</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">payments</span>
          <h2 class="text-lg font-bold">價格 &amp; 庫存 &amp; 重量</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">價格</p>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a704c]">$</span>
              <input
                class="w-full pl-8 rounded-lg border-[#e7dacf] bg-[#f8f7f6] py-3"
                type="number"
                v-model.number="ProductForm.price"
              />
            </div>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">庫存量(包)</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="number"
              v-model.number="ProductForm.stock"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">重量</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              v-model="ProductForm.weight"
            />
          </label>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">description</span>
          <h2 class="text-lg font-bold">商品描述</h2>
        </div>
        <textarea
          class="w-full bg-white p-6 resize-none"
          placeholder="請輸入商品詳細介紹，字數不得超過300字，最少須大於10字"
          minlength="10"
          maxlength="300"
          rows="6"
          v-model="ProductForm.description"
        ></textarea>
      </section>

      <div class="flex justify-end gap-3 pt-6 border-t border-[#e7dacf]">
        <button
          type="button"
          class="px-6 py-2.5 w-36 rounded-lg border border-[#e7dacf] text-sm font-bold hover:bg-[#f3ede7] active:scale-95"
        >
          取消
        </button>
        <button
          class="px-8 py-2.5 w-36 rounded-lg text-white text-sm bg-[#e27312] font-bold shadow-md hover:bg-[#e6a974] active:scale-95"
          :disabled="updating"
          @click="handleUpdateProduct"
        >
          {{ updating ? '儲存中...' : '儲存' }}
        </button>
      </div>
    </form>
  </main>
</template>
<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { callSingleProduct, callUpdateProduct } from '@/services/admin/adminProductService';
  import type { ProductRequest } from '@/services/admin/adminProductService';

  const route = useRoute();

  const product = ref<ProductRequest | null>(null);
  const loading = ref(false);
  const error = ref('');
  const updating = ref(false);
  const updateMessage = ref('');
  const updateSuccess = ref(false);

  // 表單資料
  const ProductForm = ref({
    pid: '',
    name: '',
    english_name: '',
    price: 0,
    origin: '',
    processing: '',
    roast: '',
    stock: 0,
    weight: '',
    flavor_type: '',
    flavor_tags: [],
    description: '',
    img: [],
    documentId: '',
  });

  // 載入商品資料
  async function loadProductData(pid: string) {
    loading.value = true;
    error.value = '';
    try {
      const res = await callSingleProduct(pid);
      product.value = res.data;
      console.log('🔍 載入商品明細:', pid);
      console.log('✅ 載入成功:', product.value);

      // 如果訂單已有物流資訊，填入表單
      if (product.value) {
        ProductForm.value = JSON.parse(JSON.stringify(product.value));
      }
    } catch (err: any) {
      console.error('❌ API載入失敗:', err);
      error.value = `載入失敗: ${err.response?.data?.message || err.message}`;
    } finally {
      loading.value = false;
    }
  }

  // 處理商品更新
  async function handleUpdateProduct() {
    if (!product.value) return;

    updating.value = true;
    updateMessage.value = '';

    // 轉成 imgIds（只保留 id）
    const imgIds = (ProductForm.value.img ?? [])
      .map((m: any) => m?.id)
      .filter((id: any) => typeof id === 'number');

    // 組 payload：不要把 img 整包送回去
    const payload = {
      name: ProductForm.value.name,
      english_name: ProductForm.value.english_name,
      pid: ProductForm.value.pid,
      price: ProductForm.value.price,
      origin: ProductForm.value.origin,
      processing: ProductForm.value.processing,
      roast: ProductForm.value.roast,
      stock: ProductForm.value.stock,
      weight: ProductForm.value.weight,
      flavor_type: ProductForm.value.flavor_type,
      flavor_tags: ProductForm.value.flavor_tags,
      description: ProductForm.value.description,
      imgIds,
    };

    try {
      const res = await callUpdateProduct(product.value.documentId, {
        data: ProductForm.value,
      });

      console.log('✅ 更新成功:', res);

      updateMessage.value = '商品更新成功！';
      updateSuccess.value = true;

      // 重新載入訂單資料
      await loadProductData(product.value.pid);

      // 3秒後清除提示訊息
      setTimeout(() => {
        updateMessage.value = '';
      }, 3000);
    } catch (err: any) {
      console.error('❌ 更新失敗:', err);
      updateMessage.value = `更新失敗: ${err.response?.data?.error || err.message}`;
      updateSuccess.value = false;
    } finally {
      updating.value = false;
    }
  }

  // 刪除圖片
  function removeImage(index: number) {
    ProductForm.value.img.splice(index, 1);
  }

  onMounted(() => {
    const pid = route.params.pid as string;
    console.log('商品編號:', pid);

    if (pid) {
      loadProductData(pid);
    } else {
      error.value = '缺少商品編號';
    }
  });
</script>
