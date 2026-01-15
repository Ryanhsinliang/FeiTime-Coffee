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
</template>
<script></script>
