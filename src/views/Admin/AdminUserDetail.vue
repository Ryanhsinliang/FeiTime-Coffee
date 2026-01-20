<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>使用者管理</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">使用者ID #87352</p>
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
        <h2 class="text-3xl font-extrabold">編輯使用者資料</h2>
        <p class="text-[#9a704c]">僅可修改「封鎖狀態」與「身分別」。</p>
      </div>
      <button
        type="button"
        @click="goBack"
        class="flex items-center gap-2 px-4 py-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回使用者管理</p>
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
      v-else-if="user"
      class="bg-white rounded-xl shadow-sm border border-[#f3ede7] overflow-hidden"
      @submit.prevent="onSubmit"
    >
      <div class="p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-[#f3ede7] pb-3">
          <span class="material-symbols-outlined">person</span>
          <h2 class="text-xl font-bold">個人資訊</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 使用者ID -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">使用者ID</label>
            <input
              class="bg-[#f3ede7] rounded-lg text-[#9a704c] text-sm px-4 py-3 cursor-not-allowed"
              disabled
              type="text"
              :value="user.user_id"
            />
          </div>

          <!-- 姓名 -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">姓名</label>
            <input
              class="bg-[#f3ede7] rounded-lg text-[#9a704c] text-sm px-4 py-3 cursor-not-allowed"
              disabled
              type="text"
              :value="user.username"
            />
          </div>

          <!-- Email -->
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
                :value="user.email"
              />
            </div>
          </div>

          <!-- 密碼 -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">密碼</label>
            <input
              class="w-full bg-[#f3ede7] rounded-lg text-sm text-[#9a704c] pl-4 py-3 cursor-not-allowed"
              disabled
              type="password"
              value="********"
            />
          </div>

          <!-- 電話 -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">電話號碼</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                call
              </span>
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm text-[#9a704c] pl-10 pr-4 py-3 cursor-not-allowed"
                disabled
                type="tel"
                :value="user.phone_number || ''"
              />
            </div>
          </div>

          <!-- 身分別 -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">使用者身分（可修改）</label>
            <select
              v-model="form.user_role"
              class="bg-[#f3ede7] rounded-lg text-sm px-4 py-3 focus:ring-2"
            >
              <option value="Member">一般會員</option>
              <option value="Admin">管理者</option>
            </select>
          </div>

          <!-- 驗證狀態 -->
          <div class="flex flex-col gap-3">
            <h3 class="text-sm font-bold">驗證狀態</h3>
            <p class="text-sm">
              {{ user.confirmed ? '已驗證' : '未驗證' }}
            </p>
          </div>

          <!-- 封鎖狀態 -->
          <div class="flex flex-col gap-2">
            <h3 class="text-sm font-bold">狀態（可修改）</h3>
            <label class="relative flex items-center cursor-pointer flex-wrap">
              <input v-model="form.blocked" class="sr-only peer" type="checkbox" />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"
              ></div>
              <p class="ml-3 text-sm">
                {{ form.blocked ? '已停用' : '正常啟用' }}
              </p>
            </label>
          </div>

          <!-- 更新時間 -->
          <p class="text-xs text-[#9a704c]">最近更新：{{ formatDate(user.updatedAt) }}</p>
        </div>
      </div>

      <!-- 收件地址 -->
      <div class="p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-[#f3ede7] pb-3">
          <span class="material-symbols-outlined">local_shipping</span>
          <h2 class="text-xl font-bold">預設收件地址</h2>
        </div>

        <div class="flex flex-col gap-2">
          <textarea
            class="border border-[#f3ede7] rounded-lg text-sm px-4 py-3 resize-none bg-[#f3ede7] text-[#9a704c] cursor-not-allowed"
            rows="3"
            disabled
            :value="user.shipping_address || ''"
          />
        </div>
      </div>

      <div class="p-6 flex justify-end items-center gap-4 bg-white border-t border-[#f3ede7]">
        <div v-if="success" class="px-6 py-2.5 text-sm text-emerald-700 font-semibold 00">
          更新成功
        </div>
        <button
          type="button"
          @click="loadUser"
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

    <!-- <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-4 bg-white border border-[#f3ede7] rounded-lg flex items-center gap-4">
        <div
          class="size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"
        >
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <div>
          <p class="text-xs font-bold text-[#9a704c]">帳號狀態</p>
          <p class="text-sm font-bold">啟用中</p>
        </div>
      </div>

      <div class="p-4 bg-white border border-[#f3ede7] rounded-lg flex items-center gap-4">
        <div class="size-12 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined">loyalty</span>
        </div>
        <div>
          <p class="text-xs font-bold text-[#9a704c]">咖啡ID</p>
          <p class="text-sm font-bold">深海鯨魚</p>
        </div>
      </div>
    </div> -->
  </main>
</template>
<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getUserById, updateUser } from '@/services/adminUserService';
  import type { UserRequest } from '@/services/adminUserService';

  type UserRole = 'Admin' | 'Member';

  const route = useRoute();
  const router = useRouter();

  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const success = ref(false);

  const user = ref<UserRequest | null>(null);

  // ✅ 只允許編輯的欄位
  const form = reactive<{ blocked: boolean; user_role: UserRole }>({
    blocked: false,
    user_role: 'Member',
  });

  const id = computed(() => String(route.params.id || ''));

  function formatDate(iso?: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  async function loadUser() {
    if (!id.value) return;
    loading.value = true;
    error.value = '';
    success.value = false;

    try {
      const res = await getUserById(id.value);
      user.value = res.data;

      // 初始化可編輯欄位
      form.blocked = !!res.data.blocked;
      form.user_role = (res.data.user_role as UserRole) || 'Member';
    } catch (e: any) {
      error.value = e?.message || e?.response?.data?.message || '載入使用者失敗';
    } finally {
      loading.value = false;
    }
  }

  async function onSubmit() {
    if (!user.value) return;
    saving.value = true;
    error.value = '';
    success.value = false;

    try {
      // ✅ 只送允許更新的欄位
      const res = await updateUser(user.value.id, {
        blocked: form.blocked,
        user_role: form.user_role,
      });

      // 更新畫面資料
      user.value = res.data;
      success.value = true;

      // 3秒後清除提示訊息
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
    router.push({ name: 'AdminUsers' }); // 你自己路由名若不同改一下
  }

  onMounted(loadUser);
</script>
