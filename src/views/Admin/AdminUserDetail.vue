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
    <!-- 標題 -->
    <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-extrabold">編輯使用者資料</h2>
        <p class="text-[#9a704c]">主要負責修改資料、權限。</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回使用者管理</p>
      </button>
    </div>

    <!-- 表單內容 -->
    <form class="bg-white rounded-xl shadow-sm border border-[#f3ede7] overflow-hidden">
      <div class="p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-[#f3ede7] pb-3">
          <span class="material-symbols-outlined">person</span>
          <h2 class="text-xl font-bold">個人資訊</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">使用者ID</label>
            <input
              class="bg-[#f3ede7] rounded-lg text-[#9a704c] text-sm px-4 py-3 cursor-not-allowed"
              disabled=""
              type="text"
              value="#87352"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-bold">姓名</label>
            <input
              class="bg-[#f3ede7] rounded-lg text-sm px-4 py-3 focus:ring-2"
              type="text"
              id="name"
              value="John Doe"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-bold">Email</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                mail
              </span>
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm text-[#9a704c] pl-10 pr-4 py-3 focus:ring-2 cursor-not-allowed"
                disabled=""
                type="email"
                id="email"
                value="Johndoan@example.com"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="text-sm font-bold">密碼</label>
            <div class="relative">
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm pl-4 py-3 focus:ring-2"
                type="password"
                id="password"
                value=""
              />
              <span
                class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                visibility_off
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="phone" class="text-sm font-bold">電話號碼</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] text-lg"
              >
                call
              </span>
              <input
                class="w-full bg-[#f3ede7] rounded-lg text-sm pl-10 pr-4 py-3 focus:ring-2"
                type="tel"
                id="phone"
                value="0912345678"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">使用者身分</label>
            <select class="bg-[#f3ede7] rounded-lg text-sm px-4 py-3 focus:ring-2">
              <option value="member">一般會員</option>
              <option value="admin">管理者</option>
            </select>
          </div>

          <!-- <div class="flex flex-col gap-2">
            <label for="address" class="text-sm font-bold">收件地址</label>
            <textarea
              id="address"
              class="rounded-lg text-sm px-4 py-3 focus:ring-2 bg-[#f3ede7] resize-none"
              placeholder="請輸入完整收件地址（縣市、區、路名、門牌、樓層）"
              rows="3"
            ></textarea>
          </div> -->

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold">狀態</label>
            <div class="flex flex-wrap gap-6 mt-2">
              <div class="flex items-center gap-3">
                <label class="relative flex items-center cursor-pointer" for="toggle-confirmed">
                  <input checked="" class="sr-only peer" id="toggle-confirmed" type="checkbox" />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"
                  ></div>
                  <p class="ml-3 text-sm">已驗證</p>
                </label>
              </div>

              <div class="flex items-center gap-3">
                <label class="relative flex items-center cursor-pointer" for="toggle-blocked">
                  <input class="sr-only peer" id="toggle-blocked" type="checkbox" />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"
                  ></div>
                  <span class="ml-3 text-sm">已封鎖</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收件地址 -->
      <div class="p-6">
        <div class="flex items-center gap-2 mb-6 border-b border-[#f3ede7] pb-3">
          <span class="material-symbols-outlined">local_shipping</span>
          <h2 class="text-xl font-bold">預設收件地址</h2>
        </div>
        <!-- <div> -->
        <div class="flex flex-col gap-2">
          <!-- <label class="text-sm font-bold">收件地址</label> -->
          <textarea
            class="border border-[#f3ede7] rounded-lg text-sm px-4 py-3 focus:ring-2 resize-none"
            placeholder="請輸入完整收件地址（縣市、區、路名、門牌、樓層）"
            rows="3"
          >
104 臺北市中山區民生東路三段67號</textarea
          >
        </div>
        <!-- </div> -->
      </div>

      <div class="p-6 flex justify-end items-center gap-4 bg-white border-t border-[#f3ede7]">
        <button
          type="button"
          class="px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#f3ede7] active:scale-95"
        >
          取消修改
        </button>
        <button
          type="submit"
          class="flex items-center gap-2 px-8 py-2.5 text-white rounded-lg text-sm font-extrabold shadow-md active:scale-95 bg-[#e27312] hover:bg-[#f3ede7]"
        >
          <span class="material-symbols-outlined text-lg">save</span>
          <p>更新資料</p>
        </button>
      </div>
    </form>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div
          class="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
        >
          <span class="material-symbols-outlined">payments</span>
        </div>
        <div>
          <p class="text-xs font-bold text-[#9a704c]">先前的訂單</p>
          <p class="text-sm font-bold">2天前</p>
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
    </div>
  </main>

  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold">用戶編輯</h1>
        <p class="text-sm text-gray-500">可編輯單一用戶資料，或切換載入「當前登入用戶」。</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <RouterLink
          to="/admin/users"
          class="h-10 px-4 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50 inline-flex items-center"
        >
          返回列表
        </RouterLink>

        <button
          class="h-10 px-4 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
          :disabled="loading"
          @click="loadByRouteId"
        >
          依路由 ID 重新載入
        </button>

        <button
          class="h-10 px-4 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
          :disabled="loading"
          @click="loadMe"
        >
          載入當前登入用戶
        </button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="p-4 rounded-lg border bg-white text-sm text-gray-600">載入中...</div>

    <!-- Main -->
    <div v-else-if="user" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Info Card -->
      <div class="lg:col-span-1 space-y-4">
        <div class="rounded-xl border bg-white p-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-sm text-gray-500">User</div>
              <div class="text-lg font-bold text-gray-900">{{ user.username }}</div>
              <div class="text-xs text-gray-500">
                ID: {{ user.id }} / user_id: {{ user.user_id }}
              </div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded-md text-xs border"
                :class="
                  user.confirmed
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                "
              >
                {{ user.confirmed ? '已驗證' : '未驗證' }}
              </span>
              <span
                class="inline-flex items-center px-2 py-1 rounded-md text-xs border"
                :class="
                  user.blocked
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                "
              >
                {{ user.blocked ? '已封鎖' : '正常' }}
              </span>
            </div>
          </div>

          <div class="mt-4 text-xs text-gray-500 space-y-1">
            <div>createdAt：{{ formatDate(user.createdAt) }}</div>
            <div>updatedAt：{{ formatDate(user.updatedAt) }}</div>
            <div>publishedAt：{{ formatDate(user.publishedAt) }}</div>
          </div>
        </div>

        <div class="rounded-xl border bg-white p-4">
          <div class="text-sm font-semibold mb-2">快速操作</div>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="h-10 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
              :disabled="saving"
              @click="setConfirmed(true)"
            >
              設為已驗證
            </button>
            <button
              class="h-10 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
              :disabled="saving"
              @click="setConfirmed(false)"
            >
              設為未驗證
            </button>
            <button
              class="h-10 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
              :disabled="saving"
              @click="setBlocked(true)"
            >
              封鎖
            </button>
            <button
              class="h-10 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
              :disabled="saving"
              @click="setBlocked(false)"
            >
              解封
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="lg:col-span-2 rounded-xl border bg-white p-6">
        <div class="flex items-center justify-between gap-3 mb-6">
          <h2 class="text-lg font-bold">編輯資料</h2>

          <div class="flex gap-2">
            <button
              class="h-10 px-4 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-50"
              :disabled="saving"
              @click="resetForm"
            >
              重置
            </button>

            <button
              class="h-10 px-4 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
              :disabled="saving || !isDirty"
              @click="submit"
            >
              {{ saving ? '儲存中...' : '儲存更新' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Username">
            <input v-model="form.username" class="input" type="text" />
          </Field>

          <Field label="Email">
            <input v-model="form.email" class="input" type="email" />
          </Field>

          <Field label="Phone">
            <input
              v-model="form.phone_number"
              class="input"
              type="text"
              placeholder="例如 09xxxxxxxx"
            />
          </Field>

          <Field label="Role">
            <select v-model="form.user_role" class="input">
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </Field>

          <Field label="Confirmed">
            <select v-model="form.confirmed" class="input">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </Field>

          <Field label="Blocked">
            <select v-model="form.blocked" class="input">
              <option :value="false">false</option>
              <option :value="true">true</option>
            </select>
          </Field>

          <div class="md:col-span-2">
            <Field label="Shipping Address">
              <textarea
                v-model="form.shipping_address"
                class="input min-h-[96px]"
                placeholder="收件地址"
              ></textarea>
            </Field>
          </div>
        </div>

        <div
          v-if="success"
          class="mt-6 p-3 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm"
        >
          已更新成功 ✅
        </div>
      </div>
    </div>

    <div v-else class="p-4 rounded-lg border bg-white text-sm text-gray-600">
      沒有載入到用戶資料（可能 ID 不存在或權限不足）
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { userService } from '@/services/userService';
  import type { User, UserUpdatePayload } from '@/types/user';

  const route = useRoute();

  const user = ref<User | null>(null);
  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const success = ref(false);

  // 表單（只放允許更新的欄位）
  const form = reactive<UserUpdatePayload>({
    username: '',
    email: '',
    phone_number: '',
    shipping_address: '',
    user_role: 'Member',
    confirmed: true,
    blocked: false,
  });

  let originalSnapshot = '';

  // --- 小元件：Field（用 defineComponent 會更正式，這裡用 template slot 簡化） ---
  const Field = (props: { label: string }, { slots }: any) => null as any;

  function formatDate(iso: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  function fillFormFromUser(u: User) {
    form.username = u.username ?? '';
    form.email = u.email ?? '';
    form.phone_number = u.phone_number ?? '';
    form.shipping_address = u.shipping_address ?? '';
    form.user_role = (u.user_role as any) ?? 'Member';
    form.confirmed = !!u.confirmed;
    form.blocked = !!u.blocked;

    originalSnapshot = JSON.stringify(form);
  }

  const isDirty = computed(() => JSON.stringify(form) !== originalSnapshot);

  function resetForm() {
    if (!user.value) return;
    fillFormFromUser(user.value);
    success.value = false;
  }

  async function loadByRouteId() {
    const id = route.params.id as string | undefined;
    if (!id) {
      error.value = '路由缺少 id（例如 /admin/users/29）';
      return;
    }

    loading.value = true;
    error.value = '';
    success.value = false;

    try {
      const u = await userService.getUserById(id);
      user.value = u;
      fillFormFromUser(u);
    } catch (e: any) {
      user.value = null;
      error.value = e?.response?.data?.message || e?.message || '取得單一用戶失敗';
    } finally {
      loading.value = false;
    }
  }

  async function loadMe() {
    loading.value = true;
    error.value = '';
    success.value = false;

    try {
      const u = await userService.getCurrentUser();
      user.value = u;
      fillFormFromUser(u);
    } catch (e: any) {
      user.value = null;
      error.value =
        e?.response?.data?.message || e?.message || '取得當前登入用戶失敗（請確認 token）';
    } finally {
      loading.value = false;
    }
  }

  async function submit() {
    if (!user.value) return;

    saving.value = true;
    error.value = '';
    success.value = false;

    try {
      const updated = await userService.updateUser(user.value.id, form);
      user.value = updated;
      fillFormFromUser(updated);
      success.value = true;
    } catch (e: any) {
      error.value = e?.response?.data?.message || e?.message || '更新用戶失敗';
    } finally {
      saving.value = false;
    }
  }

  // 快速操作：只改一個欄位就送出
  async function setConfirmed(v: boolean) {
    form.confirmed = v;
    await submit();
  }
  async function setBlocked(v: boolean) {
    form.blocked = v;
    await submit();
  }

  watch(
    () => route.params.id,
    () => {
      // 路由 id 變了就自動重新載入
      loadByRouteId();
    }
  );

  onMounted(loadByRouteId);
</script>
