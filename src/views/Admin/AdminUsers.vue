<template>
  <!-- TODO:測試用記得刪除 -->
  <!-- <router-link to="/admin/customers/id">查看資料</router-link> -->

  <header
    class="h-16 flex items-center justify-end px-8 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-10 flex-shrink-0"
  >
    <button class="w-10 h-10 hover:text-[#e27312] relative">
      <i class="fa-regular fa-bell text-2xl"></i>
      <span
        class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"
      ></span>
    </button>
  </header>

  <main class="overflow-y-auto p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
    <section class="flex justify-between">
      <div>
        <h2 class="text-3xl font-bold">使用者管理</h2>
        <p class="text-gray-400 text-sm">主要管理使用者權限與資料。</p>
      </div>
      <button
        class="flex items-center justify-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-100 shadow-sm"
      >
        <i class="fa-solid fa-plus text-sm"></i>
        <p>新增使用者</p>
      </button>
    </section>

    <!-- 搜尋 -->
    <div class="flex flex-wrap gap-4 p-5 rounded-xl bg-white border border-[#e7dacf] shadow-sm">
      <div class="relative min-w-60 flex-1">
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] pointer-events-none"
        ></i>
        <input
          v-model="keyword"
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
          placeholder="請輸入使用者姓名、ID或Email"
          type="text"
        />
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>所有使用者</option>
          <option>管理者</option>
          <option>一般會員</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>所有狀態</option>
          <option>啟用</option>
          <option>未啟用</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div>
      <button
        class="h-12 px-6 rounded-lg bg-[#f3ede7] text-[#1b140d] hover:bg-[#e7dacf] font-bold text-sm"
      >
        套用
      </button>
    </div>

    <!-- Loading status -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px] flex-col gap-4">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
      <p>載入產品中...</p>
    </div>
    <!-- Error status -->
    <div v-else-if="error">{{ error }}</div>
    <!-- 表格 -->
    <div
      v-else-if="users"
      class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm"
    >
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">
                使用者ID
                <span class="material-symbols-outlined">arrow_downward</span>
              </div>
            </th>
            <th class="py-4 px-6 text-xs font-bold">使用者姓名</th>
            <th class="py-4 px-6 text-xs font-bold">Email</th>
            <th class="py-4 px-6 text-xs font-bold">註冊日期</th>
            <th class="py-4 px-6 text-xs font-bold text-center">身分別</th>
            <th class="py-4 px-6 text-xs font-bold text-center">狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            @click="goToUserDetail(user.id)"
            class="hover:bg-gray-100 cursor-pointer"
          >
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">{{ user.user_id }}</p>
            </td>

            <td class="py-4 px-6 text-sm font-semibold">
              {{ user.username }}
            </td>

            <td class="py-4 px-6 text-sm">{{ user.email }}</td>

            <td class="py-4 px-6 text-sm">{{ formatDate(user.updatedAt) }}</td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs border"
                :class="
                  user.user_role === 'Admin'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                "
              >
                {{ user.user_role }}
              </p>
            </td>

            <td
              class="py-4 px-6 text-center text-sm font-bold"
              :class="user.confirmed ? ' text-emerald-700' : ' text-orange-700'"
            >
              {{ user.confirmed ? '已驗證' : '未驗證' }}
            </td>

            <td class="py-4 px-6 text-right flex justify-center gap-5">
              <button type="button">
                <span class="material-symbols-outlined text-[20px] hover:text-[#9a704c]">
                  visibility
                </span>
              </button>
              <button type="button">
                <span class="material-symbols-outlined text-[20px] hover:text-[#9a704c]">edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex items-center justify-between p-4 border-t gap-4 border-[#e7dacf] bg-[#fcfaf8]"
      >
        <p class="text-sm">1 - 10 筆 / 共 {{ filteredUsers.length }} 筆</p>

        <div class="flex items-center gap-2">
          <button
            class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
            disabled="false"
          >
            <i class="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button
            class="flex items-center justify-center size-9 rounded-lg bg-[#f09a4e] font-bold text-sm shadow-sm"
          >
            1
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            2
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            3
          </button>
          <button class="flex items-center justify-center size-9 rounded-lg border bg-white">
            <i class="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAllUsers } from '@/services/adminUserService';
  import type { UserRequest } from '@/services/adminUserService';

  const router = useRouter();

  const users = ref<UserRequest[]>([]);
  const loading = ref(false);
  const error = ref('');
  const keyword = ref('');

  function formatDate(iso: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  // 搜尋欄檢索
  const filteredUsers = computed(() => {
    const key = keyword.value.trim().toLowerCase();
    if (!key) return users.value;

    return users.value.filter((user) => {
      const hay = [
        user.username,
        user.email,
        user.phone_number,
        user.user_role,
        user.user_id,
        String(user.id),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(key);
    });
  });

  async function fetchUsers() {
    loading.value = true;
    error.value = '';
    try {
      const res = await getAllUsers();
      users.value = res.data || [];
    } catch (err: any) {
      error.value = err?.response?.data?.message || err?.message || '取得使用者列表失敗';
    } finally {
      loading.value = false;
    }
  }

  function goToUserDetail(id: number) {
    router.push({ name: 'AdminUserDetail', params: { id } });
  }

  onMounted(fetchUsers);
</script>
