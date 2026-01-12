<template>
  <body class="flex flex-col h-full relative">
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
          <span class="material-symbols-outlined text-[20px]">download</span>
          <p>批次出貨</p>
        </button>
      </section>

      <!-- Filters -->
      <div
        class="flex flex-wrap items-end gap-4 p-5 rounded-xl bg-white dark:bg-[#2a1d15] border border-[#e7dacf] dark:border-[#3e2d20] shadow-sm"
      >
        <label class="flex flex-col min-w-60 flex-1">
          <p class="text-[#1b140d] text-sm font-bold leading-normal pb-2">使用者查詢</p>
          <div class="relative">
            <span class="absolute left-3 top-3 text-[#9a704c] material-symbols-outlined">
              search
            </span>
            <input
              class="w-full n rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
              placeholder="請輸入姓名、ID或Email"
              value=""
            />
          </div>
        </label>
        <label class="min-w-48 w-full md:w-auto">
          <p class="text-[#1b140d] text-sm font-bold pb-2">使用者類型</p>
          <div class="relative">
            <select
              class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
            >
              <option>所有使用者</option>
              <option>管理者</option>
              <option>一般會員</option>
            </select>
            <span
              class="absolute right-3 top-3 text-[#9a704c] dark:text-[#bcaaa4] pointer-events-none material-symbols-outlined"
            >
              expand_more
            </span>
          </div>
        </label>
        <label class="flex flex-col min-w-48 w-full md:w-auto">
          <p class="text-[#1b140d] text-sm font-bold pb-2">狀態</p>
          <div class="relative">
            <select
              class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
            >
              <option>所有狀態</option>
              <option>啟用</option>
              <option>未啟用</option>
              <option>未付款</option>
            </select>
            <span
              class="absolute right-3 top-3 text-[#9a704c] pointer-events-none material-symbols-outlined"
            >
              expand_more
            </span>
          </div>
        </label>
        <button
          class="h-12 px-6 rounded-lg bg-[#f3ede7] dark:bg-[#3e2d20] text-[#1b140d] hover:bg-[#e7dacf] font-bold text-sm"
        >
          套用
        </button>
      </div>

      <div class="border rounded-xl shadow-sm">
        <table class="w-full text-left overflow-x-auto">
          <thead>
            <tr class="border-b">
              <th class="py-4 px-6 text-xs font-bold">
                <div class="flex items-center gap-1 cursor-pointer">
                  訂單編號
                  <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                </div>
              </th>
              <th
                class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400"
              >
                顧客姓名
              </th>
              <th class="py-4 px-6 text-xs font-bold">下訂商品名稱</th>
              <th class="py-4 px-6 text-xs font-bold">日期</th>
              <th class="py-4 px-6 text-xs font-bold text-center">出貨狀態</th>
              <th class="py-4 px-6 text-xs font-bold text-center">總金額</th>
              <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="py-4 px-6">
                <p class="text-sm font-bold font-mono">#ORD-7352</p>
              </td>

              <td class="py-4 px-6 flex items-start gap-3">
                <div
                  class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                >
                  JD
                </div>
                <div>
                  <p class="text-sm font-semibold">John Doe</p>
                  <p class="text-xs">UID: 89932</p>
                </div>
              </td>

              <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
              <td class="py-4 px-6 text-xs">
                <p class="">下單日期: Oct 24, 2023</p>
                <p class="text-gray-500">出貨日期: --</p>
              </td>

              <td class="py-4 px-6 text-center">
                <p
                  class="items-center px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200"
                >
                  未付款
                </p>
              </td>

              <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

              <td class="py-4 px-6 text-right flex items-center gap-2">
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">attach_money</span>
                </button>
              </td>
            </tr>

            <tr>
              <td class="py-4 px-6">
                <p class="text-sm font-bold font-mono">#ORD-7352</p>
              </td>

              <td class="py-4 px-6 flex items-start gap-3">
                <div
                  class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                >
                  JD
                </div>
                <div>
                  <p class="text-sm font-semibold">John Doe</p>
                  <p class="text-xs">UID: 89932</p>
                </div>
              </td>

              <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
              <td class="py-4 px-6 text-xs">
                <p class="">下單日期: Oct 24, 2023</p>
                <p class="text-gray-500">出貨日期: --</p>
              </td>

              <td class="py-4 px-6 text-center">
                <p
                  class="items-center px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200"
                >
                  已付款
                </p>
              </td>

              <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

              <td class="py-4 px-6 text-right flex items-center gap-2">
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">local_shipping</span>
                </button>
              </td>
            </tr>

            <tr>
              <td class="py-4 px-6">
                <p class="text-sm font-bold font-mono">#ORD-7352</p>
              </td>

              <td class="py-4 px-6 flex items-start gap-3">
                <div
                  class="size-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                >
                  JD
                </div>
                <div>
                  <p class="text-sm font-semibold">John Doe</p>
                  <p class="text-xs">UID: 89932</p>
                </div>
              </td>

              <td class="py-4 px-6 text-sm">1x 阿拉比卡 (250g)</td>
              <td class="py-4 px-6 text-xs">
                <p class="">下單日期: Oct 24, 2023</p>
                <p class="text-gray-500">出貨日期: Oct 25, 2023</p>
              </td>

              <td class="py-4 px-6 text-center">
                <p
                  class="items-center px-2.5 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200"
                >
                  已出貨
                </p>
              </td>

              <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

              <td class="py-4 px-6 text-right flex items-center gap-2">
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">location_on</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4">
          <p class="text-sm">1 - 10 筆 / 共 24 筆</p>

          <div class="flex items-center gap-2">
            <button
              class="flex items-center justify-center size-9 rounded-lg border bg-white disabled:opacity-50"
              disabled=""
            >
              <span class="material-symbols-outlined text-[20px]">chevron_left</span>
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
              <span class="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
<script setup></script>
