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

  <main class="p-8 flex flex-col gap-6">
    <section>
      <h2 class="text-3xl font-bold">庫存管理</h2>
      <p class="text-gray-400 text-sm">主要管理商品庫存。</p>
    </section>

    <!-- 搜尋 -->
    <div class="flex gap-4 p-5 rounded-xl bg-white border border-[#e7dacf] shadow-sm">
      <div class="relative min-w-60 flex-1">
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#9a704c] pointer-events-none"
        ></i>
        <input
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 placeholder:text-[#9a704c] pl-10 pr-4 text-sm"
          placeholder="請輸入商品名稱或PID"
          value=""
        />
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>商品分類</option>
          <option>咖啡豆</option>
          <option>濾掛咖啡</option>
        </select>
        <i
          class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        ></i>
      </div>
      <div class="relative min-w-48 w-full md:w-auto">
        <select
          class="w-full rounded-lg text-[#1b140d] focus:ring-2 border border-[#e7dacf] bg-[#fcfaf8] h-12 pl-4 pr-10 text-sm cursor-pointer"
        >
          <option>所有庫存狀態</option>
          <option>無庫存</option>
          <option>低庫存</option>
          <option>庫存正常</option>
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

    <!-- 表格 -->
    <div class="overflow-hidden rounded-xl border border-[#e7dacf] bg-white shadow-sm">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[#e7dacf] bg-[#fcfaf8]">
            <th class="py-4 px-6 text-xs font-bold">
              <div class="flex items-center gap-1 cursor-pointer">
                商品PID
                <span class="material-symbols-outlined">arrow_downward</span>
              </div>
            </th>
            <th class="py-4 px-6 text-xs font-bold">商品名稱</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存狀態</th>
            <th class="py-4 px-6 text-xs font-bold text-center">庫存量</th>
            <th class="py-4 px-6 text-xs font-bold text-center">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="py-4 px-6">
              <p class="text-sm font-bold font-mono">coffee_030</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <img
                src="./assets/coffee_001.png"
                alt="coffee_img"
                class="h-10 w-10 rounded-lg object-cover aspect-square"
              />
              <p class="text-sm font-bold">印尼 曼特寧</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200"
              >
                低庫存
              </p>
            </td>

            <td class="py-4 px-6 text-center text-sm font-bold text-[#e27312]">20</td>

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
              <p class="text-sm font-bold font-mono">coffee_058</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <img
                src="./assets/coffee_001.png"
                alt="coffee_img"
                class="h-10 w-10 rounded-lg object-cover aspect-square"
              />
              <p class="text-sm font-bold">巴西 藝伎咖啡</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200"
              >
                無庫存
              </p>
            </td>

            <td class="py-4 px-6 text-center text-sm font-bold text-red-500">0</td>

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
              <p class="text-sm font-bold font-mono">coffee_020</p>
            </td>

            <td class="py-4 px-6 flex items-center gap-3">
              <img
                src="./assets/coffee_001.png"
                alt="coffee_img"
                class="h-10 w-10 rounded-lg object-cover aspect-square"
              />
              <p class="text-sm font-bold">衣索比亞 厭氧</p>
            </td>

            <td class="py-4 px-6 text-center">
              <p
                class="inline-block items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200"
              >
                庫存正常
              </p>
            </td>

            <td class="py-4 px-6 text-center text-sm font-bold text-emerald-700">250</td>

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
