<template>
  <header
    class="h-16 flex items-center justify-end px-6 border-b border-[#e7dacf] fix top-0 z-10 flex-shrink-0"
  >
    <button class="w-10 h-10 hover:text-[#e27312] relative">
      <i class="fa-regular fa-bell text-xl"></i>
      <span
        class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"
      ></span>
    </button>
  </header>

  <main class="overflow-y-auto p-6 md:p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
    <section class="flex justify-between">
      <div>
        <h2 class="text-3xl font-bold">顧客管理</h2>
        <p class="text-gray-400 text-sm">主要管理使用者權限與資料。</p>
      </div>
      <button
        class="flex items-center justify-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-100 shadow-sm"
      >
        <i class="fa-solid fa-plus text-sm"></i>
        <p>批次出貨</p>
      </button>
    </section>

    <!-- 搜尋 -->
    <div
      class="flex flex-wrap items-end gap-4 p-5 rounded-xl bg-white border border-[#e7dacf] shadow-sm"
    >
      <label class="min-w-60 flex-1">
        <div class="relative">
          <i
            class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c]"
          ></i>
          <input
            class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
            placeholder="請輸入姓名、ID或Email"
            value=""
          />
        </div>
      </label>
      <label class="min-w-48 w-full md:w-auto">
        <div class="relative">
          <select
            class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
          >
            <option>所有使用者</option>
            <option>管理者</option>
            <option>一般會員</option>
          </select>
          <i
            class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          ></i>
        </div>
      </label>
      <label class="flex flex-col min-w-48 w-full md:w-auto">
        <div class="relative">
          <select
            class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
          >
            <option>所有狀態</option>
            <option>啟用</option>
            <option>未啟用</option>
          </select>
          <i
            class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          ></i>
        </div>
      </label>
      <button
        class="h-12 px-6 rounded-lg bg-[#f3ede7] text-[#1b140d] hover:bg-[#e7dacf] font-bold text-sm"
      >
        套用
      </button>
    </div>

    <!-- 表格 -->
    <div class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">
                使用者ID
                <span class="material-symbols-outlined">arrow_downward</span>
              </div>
            </th>
            <th
              class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400"
            >
              使用者姓名
            </th>
            <th class="py-4 px-6 text-xs font-bold">Email</th>
            <th class="py-4 px-6 text-xs font-bold">註冊日期</th>
            <th class="py-4 px-6 text-xs font-bold text-center">身分別</th>
            <th class="py-4 px-6 text-xs font-bold text-center">狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#00000</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                管
              </div>
              <div>
                <p class="text-sm font-semibold">管理者</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">admin@coffee.com</td>

            <td class="py-4 px-6 text-xs">2020-01-01</td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200"
              >
                管理者
              </p>
            </td>

            <td class="py-4 px-6 text-center text-sm font-bold text-emerald-700">啟用中</td>

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

          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">#73523</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <div
                class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
              >
                JD
              </div>
              <div>
                <p class="text-sm font-semibold">John Doe</p>
              </div>
            </td>

            <td class="py-4 px-6 text-sm">123@gmail.com</td>

            <td class="py-4 px-6 text-xs">2023-10-24</td>

            <td class="py-4 px-6 text-center">
              <p
                class="items-center px-2.5 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200"
              >
                一般會員
              </p>
            </td>

            <td class="py-4 px-6 text-center text-sm font-bold text-red-500">未啟用</td>

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
        <p class="text-sm">1 - 10 筆 / 共 24 筆</p>

        <div class="flex items-center gap-2">
          <button
            class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
            disabled=""
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
<script setup></script>
