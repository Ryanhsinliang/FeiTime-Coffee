<template>
  <main class="flex flex-col h-full relative">
    <header
      class="h-16 flex items-center justify-end px-6 border-b border-[#e7dacf] sticky top-0 z-10"
    >
      <button class="w-10 h-10 hover:text-[#e27312] relative">
        <i class="fa-regular fa-bell text-xl"></i>
        <span
          class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"
        ></span>
      </button>
    </header>

    <div class="overflow-y-auto p-6 md:p-8">
      <div class="max-w-[1400px] mx-auto flex flex-col gap-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="flex flex-col gap-1">
            <h2 class="text-3xl font-bold tracking-tight">訂單管理</h2>
            <p class="text-gray-400 text-sm">主要管理消費者訂單與出貨事宜。</p>
          </div>
          <div class="flex gap-3">
            <button
              class="flex items-center justify-center gap-2 h-10 px-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-text-main dark:text-white text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
            >
              <span class="material-symbols-outlined text-[20px]">download</span>
              <p>批次出貨</p>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1 rounded-xl p-5 border shadow-sm">
            <div class="flex items-center justify-between">
              <p class="text-sm">今日訂單數</p>
              <span class="material-symbols-outlined p-1.5 rounded-lg text-[20px]">
                shopping_cart
              </span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
              <p class="text-3xl font-bold dark:text-white">124</p>
              <span
                class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full"
              >
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
              <span
                class="text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full"
              >
                +18%
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col lg:flex-row gap-4 bg-surface-light p-4 rounded-xl border shadow-sm"
        >
          <div class="flex-1 relative min-w-[200px]">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input
              class="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
              placeholder="請輸入訂單編號、顧客姓名或使用者ID"
              type="text"
            />
          </div>
          <div class="flex flex-wrap gap-3">
            <div class="relative min-w-[140px]">
              <select
                class="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg text-sm cursor-pointer"
              >
                <option value="">所有出貨狀態</option>
                <option value="pending">待出貨</option>
                <option value="paid">已付款</option>
                <option value="shipped">運送中</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
              <span
                class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]"
              >
                expand_more
              </span>
            </div>
            <div class="relative min-w-[160px]">
              <select class="w-full pl-4 pr-10 py-2.5 rounded-lg b text-sm cursor-pointer">
                <option>最近30天</option>
                <option>最近7天</option>
                <option>今天</option>
              </select>
              <span
                class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[20px]"
              >
                calendar_today
              </span>
            </div>
            <button class="px-4 py-2.5 text-sm font-semibold hover:text-[#e27312]">Clear</button>
          </div>
        </div>
        <div
          class="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden shadow-sm flex flex-col"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-background-light dark:bg-[#362b24] border-b">
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
                  <th class="py-4 px-6 text-xs font-bold text-right">總金額</th>
                  <th class="py-4 px-6 text-xs font-bold text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-4 px-6 align-top">
                    <span class="text-sm font-bold text-text-main dark:text-white font-mono">
                      #ORD-7352
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex items-start gap-3">
                      <div
                        class="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                      >
                        JD
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold text-text-main dark:text-white">
                          John Doe
                        </span>
                        <span class="text-xs text-text-secondary dark:text-gray-500">
                          UID: 89932
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-1">
                      <span class="text-sm text-text-main dark:text-white">
                        1x Ethiopia Yirgacheffe (250g)
                      </span>
                      <span class="text-xs text-text-secondary dark:text-gray-500">Whole Bean</span>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-0.5">
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Ordered:</span>
                        <span class="text-text-main dark:text-gray-300">Oct 24, 2023</span>
                      </div>
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500 opacity-50"
                      >
                        <span class="w-12">Shipped:</span>
                        <span>--</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top text-center">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50"
                    >
                      Pending
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <span class="text-sm font-bold text-text-main dark:text-white">$45.00</span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Details"
                      >
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Mark Paid"
                      >
                        <span class="material-symbols-outlined text-[20px]">attach_money</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="group hover:bg-orange-50/50 dark:hover:bg-white/5 transition-colors">
                  <td class="py-4 px-6 align-top">
                    <span class="text-sm font-bold text-text-main dark:text-white font-mono">
                      #ORD-7351
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex items-start gap-3">
                      <div
                        class="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                      >
                        SS
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold text-text-main dark:text-white">
                          Sarah Smith
                        </span>
                        <span class="text-xs text-text-secondary dark:text-gray-500">
                          UID: 45211
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-1">
                      <span class="text-sm text-text-main dark:text-white">
                        2x Colombia Supremo (1kg)
                      </span>
                      <span class="text-xs text-text-secondary dark:text-gray-500">
                        Ground • Paper Filters (Pack of 100)
                      </span>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-0.5">
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Ordered:</span>
                        <span class="text-text-main dark:text-gray-300">Oct 24, 2023</span>
                      </div>
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500 opacity-50"
                      >
                        <span class="w-12">Shipped:</span>
                        <span>--</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top text-center">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                    >
                      Paid
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <span class="text-sm font-bold text-text-main dark:text-white">$120.50</span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Details"
                      >
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Ship Order"
                      >
                        <span class="material-symbols-outlined text-[20px]">local_shipping</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="group hover:bg-orange-50/50 dark:hover:bg-white/5 transition-colors">
                  <td class="py-4 px-6 align-top">
                    <span class="text-sm font-bold text-text-main dark:text-white font-mono">
                      #ORD-7350
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex items-start gap-3">
                      <div
                        class="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                      >
                        ML
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold text-text-main dark:text-white">
                          Mike Lewis
                        </span>
                        <span class="text-xs text-text-secondary dark:text-gray-500">
                          UID: 99120
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-1">
                      <span class="text-sm text-text-main dark:text-white">
                        1x French Press (1L)
                      </span>
                      <span class="text-xs text-text-secondary dark:text-gray-500">
                        House Blend (500g)
                      </span>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-0.5">
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Ordered:</span>
                        <span class="text-text-main dark:text-gray-300">Oct 22, 2023</span>
                      </div>
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500 font-medium"
                      >
                        <span class="w-12">Shipped:</span>
                        <span class="text-primary dark:text-orange-400">Oct 23, 2023</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top text-center">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50"
                    >
                      Shipped
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <span class="text-sm font-bold text-text-main dark:text-white">$54.00</span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Details"
                      >
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Track"
                      >
                        <span class="material-symbols-outlined text-[20px]">location_on</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="group hover:bg-orange-50/50 dark:hover:bg-white/5 transition-colors">
                  <td class="py-4 px-6 align-top">
                    <span class="text-sm font-bold text-text-main dark:text-white font-mono">
                      #ORD-7349
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex items-start gap-3">
                      <div
                        class="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                      >
                        EB
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold text-text-main dark:text-white">
                          Emily Blunt
                        </span>
                        <span class="text-xs text-text-secondary dark:text-gray-500">
                          UID: 10293
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-1">
                      <span class="text-sm text-text-main dark:text-white">
                        1x Breville Espresso Machine
                      </span>
                      <span class="text-xs text-text-secondary dark:text-gray-500">
                        Barista Express • Silver
                      </span>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-0.5">
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Ordered:</span>
                        <span class="text-text-main dark:text-gray-300">Oct 20, 2023</span>
                      </div>
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Shipped:</span>
                        <span>Oct 21, 2023</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top text-center">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800/50"
                    >
                      Completed
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <span class="text-sm font-bold text-text-main dark:text-white">$699.95</span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Details"
                      >
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Invoice"
                      >
                        <span class="material-symbols-outlined text-[20px]">receipt</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="group hover:bg-orange-50/50 dark:hover:bg-white/5 transition-colors">
                  <td class="py-4 px-6 align-top">
                    <span class="text-sm font-bold text-text-main dark:text-white font-mono">
                      #ORD-7348
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex items-start gap-3">
                      <div
                        class="size-8 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mt-1 shrink-0"
                      >
                        RK
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold text-text-main dark:text-white">
                          Raj Kumar
                        </span>
                        <span class="text-xs text-text-secondary dark:text-gray-500">
                          UID: 55421
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-1">
                      <span class="text-sm text-text-main dark:text-white">
                        3x Mocha Java Blend
                      </span>
                      <span class="text-xs text-text-secondary dark:text-gray-500">
                        Cancelled by user
                      </span>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top">
                    <div class="flex flex-col gap-0.5">
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500"
                      >
                        <span class="w-12">Ordered:</span>
                        <span class="text-text-main dark:text-gray-300">Oct 23, 2023</span>
                      </div>
                      <div
                        class="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500 opacity-50"
                      >
                        <span class="w-12">Shipped:</span>
                        <span>--</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 align-top text-center">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800/50"
                    >
                      Cancelled
                    </span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <span class="text-sm font-bold text-text-main dark:text-white">$89.00</span>
                  </td>
                  <td class="py-4 px-6 align-top text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Details"
                      >
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Info"
                      >
                        <span class="material-symbols-outlined text-[20px]">info</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border-light dark:border-border-dark bg-background-light/50 dark:bg-surface-dark gap-4"
          >
            <span class="text-sm text-text-secondary dark:text-gray-500">
              Showing
              <span class="font-bold text-text-main dark:text-white">1-5</span>
              of
              <span class="font-bold text-text-main dark:text-white">124</span>
              orders
            </span>
            <div class="flex items-center gap-2">
              <button
                class="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                disabled=""
              >
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                class="flex items-center justify-center size-9 rounded-lg bg-primary text-white font-bold text-sm shadow-sm"
              >
                1
              </button>
              <button
                class="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 transition-colors"
              >
                2
              </button>
              <button
                class="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 transition-colors"
              >
                3
              </button>
              <span class="text-text-secondary dark:text-gray-500 px-1">...</span>
              <button
                class="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 transition-colors"
              >
                12
              </button>
              <button
                class="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
        <div class="h-8"></div>
      </div>
    </div>
  </main>
</template>
<script setup></script>
