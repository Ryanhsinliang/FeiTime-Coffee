<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>庫存管理</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">新增商品</p>
      </div>
    </div>
  </header>

  <main class="px-8 py-6 max-w-5xl mx-auto w-full">
    <!-- 標題 -->
    <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-extrabold">新增商品資料</h2>
        <p class="text-gray-400 text-sm">主要負責建立新的商品資料。</p>
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

    <!-- 更新訊息提示 -->
    <div
      v-if="updateMessage"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 mb-6 p-4 rounded-lg"
      :class="
        updateSuccess
          ? 'bg-green-50 text-green-800 border border-green-200'
          : 'bg-red-50 text-red-800 border border-red-200'
      "
    >
      {{ updateMessage }}
    </div>

    <form class="space-y-8 pb-20" @submit.prevent="handleCreateProduct">
      <!-- 商品圖片 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">photo_library</span>
          <h2 class="text-lg font-bold">
            商品圖
            <span class="text-red-500">*</span>
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- 現有圖片 -->
            <div
              v-for="(image, index) in ProductForm.img"
              :key="image?.id ?? index"
              class="relative group aspect-square rounded-lg overflow-hidden border border-[#e7dacf]"
            >
              <img
                :src="image?.formats?.large?.url || image?.formats?.medium?.url || image?.url"
                :alt="ProductForm.name"
                class="w-full h-full object-cover"
              />

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  class="bg-white/20 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                  @click="removeImage(index)"
                  title="刪除圖片"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <!-- 上傳按鈕 -->
            <input
              type="file"
              id="imageUpload"
              class="hidden"
              accept="image/webp"
              multiple
              @change="handleImageUpload"
            />
            <label
              for="imageUpload"
              class="border-2 border-dashed border-[#e7dacf] rounded-lg flex flex-col items-center justify-center gap-2 bg-[#fcfaf8] cursor-pointer aspect-square hover:bg-[#f3ede7] transition-colors"
              :class="{ 'opacity-50 pointer-events-none': uploading }"
            >
              <span
                class="material-symbols-outlined text-[#9a704c] text-3xl"
                :class="{ 'animate-spin': uploading }"
              >
                {{ uploading ? 'progress_activity' : 'upload_file' }}
              </span>
              <p class="text-xs text-[#9a704c]">
                {{ uploading ? '上傳中...' : '新增 Webp 照片' }}
              </p>
            </label>
          </div>
        </div>
      </section>

      <!-- 商品名稱 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">info</span>
          <h2 class="text-lg font-bold">商品名稱</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              商品編號PID
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] px-4 py-3"
              type="text"
              required
              v-model.trim="ProductForm.pid"
            />
            <p class="text-xs text-[#9a704c]">商品編號不可重複。</p>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              中文名稱
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              v-model="ProductForm.name"
              required
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              英文名稱
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              required
              v-model="ProductForm.english_name"
            />
          </label>
        </div>
      </section>

      <!-- 產地 & 處理法 & 烘焙度 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">public</span>
          <h2 class="text-lg font-bold">產地 &amp; 處理法 &amp; 烘焙度</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              產地
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              placeholder="例如：Panama"
              required
              v-model="ProductForm.origin"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              處理法
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              placeholder="例如：Anaerobic"
              required
              v-model="ProductForm.processing"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              烘焙度
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              placeholder="例如：Light"
              required
              v-model="ProductForm.roast"
            />
          </label>
        </div>
      </section>

      <!-- 風味資訊 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">palette</span>
          <h2 class="text-lg font-bold">風味資訊</h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label class="flex flex-col gap-2">
              <p class="text-sm font-semibold">
                風味類型
                <span class="text-red-500">*</span>
              </p>
              <select
                class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
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

      <!-- 價格 & 庫存 & 重量 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">payments</span>
          <h2 class="text-lg font-bold">價格 &amp; 庫存 &amp; 重量</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              價格
              <span class="text-red-500">*</span>
            </p>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a704c]">$</span>
              <input
                class="w-full pl-8 rounded-lg border border-[#e7dacf] bg-white py-3 pr-4 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
                type="number"
                min="0"
                v-model.number="ProductForm.price"
                required
              />
            </div>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              庫存量(包)
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="number"
              min="0"
              v-model.number="ProductForm.stock"
              required
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">
              重量
              <span class="text-red-500">*</span>
            </p>
            <input
              class="w-full rounded-lg border border-[#e7dacf] bg-white px-4 py-3 focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
              type="text"
              placeholder="例如：250g"
              v-model="ProductForm.weight"
              required
            />
          </label>
        </div>
      </section>

      <!-- 商品描述 -->
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">description</span>
          <h2 class="text-lg font-bold">
            商品描述
            <span class="text-red-500">*</span>
          </h2>
        </div>
        <div class="p-6">
          <textarea
            class="w-full bg-white border border-[#e7dacf] rounded-lg p-4 resize-none focus:border-[#e27312] focus:ring-1 focus:ring-[#e27312]"
            placeholder="請輸入商品詳細介紹，字數不得超過300字，最少須大於10字"
            minlength="10"
            maxlength="300"
            rows="6"
            v-model="ProductForm.description"
            required
          ></textarea>
          <div class="flex justify-end mt-2 text-xs text-[#9a704c]">
            {{ ProductForm.description?.length || 0 }} / 300
          </div>
        </div>
      </section>

      <!-- 操作按鈕 -->
      <div class="flex justify-end gap-3 pt-6 border-t border-[#e7dacf]">
        <button
          type="button"
          class="px-6 py-2.5 w-36 rounded-lg border border-[#e7dacf] text-sm font-bold hover:bg-[#f3ede7] active:scale-95 transition-all"
          @click="handleCancel"
          :disabled="updating"
        >
          取消
        </button>
        <button
          type="submit"
          class="px-8 py-2.5 w-36 rounded-lg text-white text-sm bg-[#e27312] font-bold shadow-md hover:bg-[#d66a10] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="updating || uploading"
        >
          {{ updating ? '建立商品中...' : '建立商品' }}
        </button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    callCreateProduct,
    callUploadImage,
    type CreateProductRequest,
    type CreateProductPayload,
  } from '@/services/admin/adminProductService';

  const route = useRoute();
  const router = useRouter();

  const updating = ref(false);
  const uploading = ref(false);
  const updateMessage = ref('');
  const updateSuccess = ref(false);

  // 商品表單資料
  const ProductForm = ref<CreateProductRequest>({
    name: '',
    english_name: '',
    pid: '',
    origin: '',
    processing: '',
    roast: '',
    flavor_type: 'Floral',
    flavor_tags: [],
    description: '',
    price: 0,
    stock: 0,
    img: [],
    weight: '',
    documentId: '',
    acidity: 0,
    sweetness: 0,
    body: 0,
    aftertaste: 0,
    clarity: 0,
    popularity: 0,
  });

  // 載入商品資料
  // const loadProduct = async () => {
  //   try {
  //     console.log('🔍 載入商品:', pid);
  //     const response = await callSingleProduct(pid);
  //     console.log('✅ 商品資料:', response.data);

  //     // 深拷貝避免引用問題
  //     ProductForm.value = JSON.parse(JSON.stringify(response.data));
  //   } catch (error: any) {
  //     console.error('載入商品失敗:', error);
  //     alert('載入商品資料失敗');
  //   }
  // };

  // 刪除圖片
  const removeImage = (index: number) => {
    if (confirm('確定要刪除這張圖片嗎？')) {
      ProductForm.value.img.splice(index, 1);
    }
  };

  // 上傳圖片
  const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) return;

    // 驗證所有檔案都是 webp 格式
    const invalidFiles = Array.from(files).filter((file) => file.type !== 'image/webp');
    if (invalidFiles.length > 0) {
      alert('只能上傳 WebP 格式的圖片！');
      target.value = '';
      return;
    }

    uploading.value = true;

    try {
      // 一次上傳所有檔案
      for (const file of Array.from(files)) {
        const uploadedImages = await callUploadImage(file);
        console.log('✅ 上傳成功:', uploadedImages);

        // 將上傳的圖片加入表單
        if (Array.isArray(uploadedImages)) {
          ProductForm.value.img.push(...uploadedImages);
        }
      }

      target.value = '';
    } catch (error: any) {
      console.error('上傳圖片失敗:', error);
      alert(error?.response?.data?.error || '上傳圖片失敗，請重試');
    } finally {
      uploading.value = false;
    }
  };

  // 新增商品
  const handleCreateProduct = async () => {
    // 驗證必填欄位
    if (!ProductForm.value.pid.trim()) {
      alert('請填寫商品pid');
      return;
    }

    if (!ProductForm.value.name) {
      alert('請填寫商品名稱');
      return;
    }

    if (!ProductForm.value.description || ProductForm.value.description.length < 10) {
      alert('商品描述至少需要 10 個字');
      return;
    }

    updating.value = true;
    updateMessage.value = '';

    try {
      const payload: CreateProductPayload = {
        pid: ProductForm.value.pid,
        name: ProductForm.value.name,
        english_name: ProductForm.value.english_name,
        price: Math.max(0, ProductForm.value.price),
        origin: ProductForm.value.origin,
        processing: ProductForm.value.processing,
        roast: ProductForm.value.roast,
        stock: Math.max(0, ProductForm.value.stock),
        weight: ProductForm.value.weight,
        flavor_type: ProductForm.value.flavor_type,
        description: ProductForm.value.description,
        imgIds: ProductForm.value.img.map((img) => img.id),
        acidity: ProductForm.value.acidity,
        sweetness: ProductForm.value.sweetness,
        body: ProductForm.value.body,
        aftertaste: ProductForm.value.aftertaste,
        clarity: ProductForm.value.clarity,
        popularity: ProductForm.value.popularity,
      };

      console.log('📤 發送更新:', payload);

      const response = await callCreateProduct(payload);

      console.log('✅ 更新成功:', response);
      updateMessage.value = '商品新增成功！';
      updateSuccess.value = true;

      // 3秒後清除提示訊息
      setTimeout(() => {
        updateMessage.value = '';
      }, 3000);
    } catch (error: any) {
      console.error('新增商品失敗:', error);
      updateMessage.value = error?.response?.data?.error || '新增商品失敗，請重試';
      updateSuccess.value = false;
      setTimeout(() => {
        updateMessage.value = '';
      }, 3000);
    } finally {
      updating.value = false;
    }
  };

  // 取消編輯
  const handleCancel = () => {
    if (confirm('確定要取消編輯嗎？未儲存的變更將會遺失。')) {
      router.back();
    }
  };

  onMounted(() => {
    handleCreateProduct;
  });
</script>
