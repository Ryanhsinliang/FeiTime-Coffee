<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>我的帳號</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">個人資料設定</p>
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
    <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-extrabold">我的帳號資料</h2>
        <p class="text-gray-400 text-sm">
          可修改個人聯絡資訊與預設收件地址（使用者ID、Email不可修改）。
        </p>
      </div>

      <button
        type="button"
        @click="goBack"
        class="flex items-center gap-2 px-4 py-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回後台首頁</p>
      </button>
    </div>

    <!-- 狀態 -->
    <div v-if="loading" class="flex items-center justify-center min-h-[200px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入中...</p>
    </div>

    <div v-else-if="error" class="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
      {{ error }}
    </div>

    <!-- 表單 -->
    <form
      v-else-if="me"
      class="bg-white rounded-xl shadow-sm border border-[#f3ede7] overflow-hidden"
      @submit.prevent="onSubmit"
    >
      <div class="p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-[#f3ede7] pb-3">
          <span class="material-symbols-outlined">person</span>
          <h2 class="text-xl font-bold">個人資訊</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 使用者ID（不可改） -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">使用者ID</label>
            <input
              class="bg-[#f3ede7] rounded-lg text-[#9a704c] text-sm px-4 py-3 cursor-not-allowed"
              disabled
              type="text"
              :value="me.user_id"
            />
          </div>

          <!-- 姓名（可改） -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">姓名</label>
            <input
              v-model.trim="form.username"
              class="border border-[#f3ede7] rounded-lg text-sm px-4 py-3 focus:ring-2 focus:ring-[#e27312]/30"
              type="text"
              placeholder="請輸入姓名"
            />
          </div>

          <!-- Email（不可改） -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">Email</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                mail
              </span>
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm text-[#9a704c] pl-10 pr-4 py-3 cursor-not-allowed"
                disabled
                type="email"
                :value="me.email"
              />
            </div>
          </div>

          <!-- 密碼（提示，不在此改） -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">密碼</label>
            <div class="flex items-center gap-2">
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm text-[#9a704c] pl-4 py-3 cursor-not-allowed"
                disabled
                type="password"
                value="********"
              />
              <button
                type="button"
                class="shrink-0 px-3 py-2 rounded-lg text-sm font-bold bg-[#f3ede7] hover:bg-[#e6ddda] active:scale-95"
                @click="goResetPassword"
              >
                修改密碼
              </button>
            </div>
            <p class="text-xs text-[#9a704c]">密碼請透過「忘記密碼 / 重設密碼」流程修改。</p>
          </div>

          <!-- 電話（可改） -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">電話號碼</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                call
              </span>
              <input
                v-model.trim="form.phone_number"
                class="w-full border border-[#f3ede7] rounded-lg text-sm pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#e27312]/30"
                type="tel"
                placeholder="例如：0912345678"
              />
            </div>
          </div>

          <!-- 驗證狀態（顯示） -->
          <div class="flex flex-col gap-3">
            <h3 class="text-sm font-bold">驗證狀態</h3>
            <p class="text-sm">
              {{ me.confirmed ? '已驗證' : '未驗證' }}
            </p>
          </div>

          <!-- 更新時間 -->
          <p class="text-xs text-[#9a704c]">最近更新：{{ formatDate(me.updatedAt) }}</p>
        </div>
      </div>

      <div class="p-6 flex justify-end items-center gap-4 bg-white border-t border-[#f3ede7]">
        <div v-if="success" class="px-6 py-2.5 text-sm text-emerald-700 font-semibold">
          更新成功
        </div>

        <button
          type="button"
          @click="resetForm"
          class="px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#f3ede7] active:scale-95"
          :disabled="saving"
        >
          清除修改
        </button>

        <button
          type="submit"
          class="flex items-center gap-2 px-8 py-2.5 text-white rounded-lg text-sm font-extrabold shadow-md active:scale-95 bg-[#e27312] disabled:opacity-60"
          :disabled="saving"
        >
          <span class="material-symbols-outlined text-lg">save</span>
          <p>{{ saving ? '更新中...' : '更新資料' }}</p>
        </button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getCurrentUser, updateMe } from '@/services/admin/adminUserService';
  import type { UserRequest } from '@/services/admin/adminUserService';

  const router = useRouter();

  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const success = ref(false);

  const me = ref<UserRequest | null>(null);

  // 只送允許更新欄位（白名單）
  const form = reactive({
    username: '',
    phone_number: '',
  });

  function formatDate(iso?: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  function resetForm() {
    if (!me.value) return;
    form.username = me.value.username || '';
    form.phone_number = me.value.phone_number || '';
    success.value = false;
  }

  async function loadMe() {
    loading.value = true;
    error.value = '';
    success.value = false;

    try {
      const res = await getCurrentUser();
      me.value = res.data;
      resetForm();
    } catch (e: any) {
      error.value = e?.message || e?.response?.data?.message || '載入個人資料失敗';
    } finally {
      loading.value = false;
    }
  }

  async function onSubmit() {
    if (!me.value) return;
    saving.value = true;
    error.value = '';
    success.value = false;

    try {
      //  只送允許更新的欄位（不送 user_id / email）
      const payload = {
        username: form.username,
        phone_number: form.phone_number,
      };

      const res = await updateMe(payload);

      me.value = res.data;
      resetForm();
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 3000);
    } catch (e: any) {
      error.value = e?.message || e?.response?.data?.message || '更新失敗';
    } finally {
      saving.value = false;
    }
  }

  function goBack() {
    router.push({ name: 'Admin' });
  }

  function goResetPassword() {
    // 你可以導到「忘記密碼」頁或彈窗
    router.push({ name: 'ForgotPassword' }); // 自己改
  }

  onMounted(loadMe);
</script>
