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
          <h2 class="text-3xl font-bold">訂單管理</h2>
          <p class="text-gray-400 text-sm">主要管理消費者訂單與出貨事宜。</p>
        </div>
        <button
          class="flex items-center justify-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-100 shadow-sm"
        >
          <span class="material-symbols-outlined text-[20px]">download</span>
          <p>批次出貨</p>
        </button>
      </section>

      <!-- <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex flex-col gap-1 rounded-xl p-5 border shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-sm">今日訂單數</p>
            <span class="material-symbols-outlined p-1.5 rounded-lg text-[20px]">
              shopping_cart
            </span>
          </div>
          <div class="flex items-baseline gap-2 mt-2">
            <p class="text-3xl font-bold dark:text-white">124</p>
            <span class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-1 rounded-xl p-5 border shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-sm">待出貨</p>
            <span class="material-symbols-outlined p-1.5 rounded-lg text-[20px]">
              local_shipping
            </span>
          </div>
          <div class="flex items-baseline gap-2 mt-2">
            <p class="text-3xl font-bold">45</p>
            <span class="text-red-500 text-xs">請盡速出貨</span>
          </div>
        </div>
        <div class="flex flex-col gap-1 rounded-xl p-5 border shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-sm">總營業額</p>
            <span class="material-symbols-outlined p-1.5 rounded-lg text-[20px]">payments</span>
          </div>
          <div class="flex items-baseline gap-2 mt-2">
            <p class="text-3xl font-bold">$8,320</p>
            <span class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              +18%
            </span>
          </div>
        </div>
      </section> -->

      <section class="flex gap-4 p-4 rounded-xl border shadow-sm">
        <div class="flex-1 relative min-w-[200px]">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input
            class="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:ring-2 placeholder:text-[#9a704c]"
            placeholder="請輸入訂單編號、顧客姓名或使用者ID"
            type="text"
          />
        </div>

        <div class="relative min-w-[140px]">
          <select class="w-full pl-4 pr-10 py-2.5 rounded-lg text-sm cursor-pointer focus:ring-2">
            <option value="">所有出貨狀態</option>
            <option value="pending">待付款</option>
            <option value="paid">已付款</option>
            <option value="shipped">已出貨</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
          <i
            class="fa-solid fa-angle-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[16px]"
          ></i>
        </div>

        <div class="relative min-w-[160px]">
          <select class="w-full pl-4 pr-10 py-2.5 rounded-lg b text-sm cursor-pointer focus:ring-2">
            <option>最近30天</option>
            <option>最近7天</option>
            <option>今天</option>
          </select>
          <i
            class="fa-regular fa-calendar-days absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[20px]"
          ></i>
        </div>
        <button class="px-4 py-2.5 text-sm font-semibold hover:text-[#e27312]">Clear</button>
      </section>

      <section class="border-b flex items-center justify-between">
        <div class="flex">
          <button class="px-6 py-4 text-sm font-bold border-b-2">全部</button>
          <button class="px-6 py-4 text-sm">待付款</button>
          <button class="px-6 py-4 text-sm">已付款</button>
          <button class="px-6 py-4 text-sm">已出貨</button>
          <button class="px-6 py-4 text-sm">已完成</button>
          <button class="px-6 py-4 text-sm">已取消</button>
        </div>
        <div class="hidden lg:flex items-center gap-2 text-xs text-text-secondary px-4">
          <span class="flex size-2 bg-emerald-500 rounded-full"></span>
          12 筆新訂單
        </div>
      </section>

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
                  class="items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200"
                >
                  已完成
                </p>
              </td>

              <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

              <td class="py-4 px-6 text-right flex items-center gap-2">
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">receipt</span>
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
                  class="items-center px-2.5 py-1 rounded-full text-xs bg-red-100 text-red-800 border-red-200"
                >
                  已取消
                </p>
              </td>

              <td class="py-4 px-6 text-right text-sm font-bold">$600</td>

              <td class="py-4 px-6 text-right flex items-center gap-2">
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button type="button" class="p-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-[20px]">info</span>
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
