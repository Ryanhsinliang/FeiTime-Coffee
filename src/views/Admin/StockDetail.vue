<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-[#e7dacf] backdrop-blur-md sticky top-0 z-20 flex-shrink-0"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm gap-2">
        <p>庫存管理</p>
        <span class="material-symbols-outlined text-lg">chevron_right</span>
        <p class="font-semibold">商品編號PID: coffee_001</p>
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
        <h2 class="text-3xl font-extrabold">編輯商品資料</h2>
        <p class="text-[#9a704c]">主要負責修改商品資料。</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-[#f3ede7] rounded-lg text-sm font-bold hover:bg-[#e6ddda] active:scale-95"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        <p>返回庫存管理</p>
      </button>
    </div>

    <div class="space-y-8 pb-20">
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">photo_library</span>
          <h2 class="text-lg font-bold">產品圖</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              class="relative group aspect-square rounded-lg overflow-hidden border border-[#e7dacf]"
            >
              <div
                class="absolute inset-0 bg-cover bg-center"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGnvrg0I9-C47r9mcCC0BZwulVtwLJpQNUQWwkPt7-hYaxuLQ1fbftOF3hz0KvewzfaLSWk30c2QLAPAJkRLS6umxYH8OCcIDaPwWs-5iu6OyyE77IB3KCEb4tOGO6PdR_3YOrRuSLbTQW3uXNTPzL9tk8pK9bXM2XLfxKBxSWcBALAfE0bXZqOGkTk0UkUmj7IiRupRrnxWq1UbglNL9YuzJ2CAtTQMxGCuk2ketL6YWaOI3nhYfjlP-iSNNMeubQYpOamAz0rMM');
                "
              ></div>
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
              >
                <button class="bg-white/20 p-2 rounded-full text-white hover:bg-white/40">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="bg-white/20 p-2 rounded-full text-white hover:bg-red-500">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div
                class="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded"
              >
                Main
              </div>
            </div>
            <div
              class="border-2 border-dashed border-[#e7dacf] rounded-lg flex flex-col items-center justify-center gap-2 bg-[#fcfaf8] cursor-pointer aspect-square"
            >
              <span class="material-symbols-outlined text-[#9a704c] text-3xl">upload_file</span>
              <p class="text-xs text-[#9a704c]">新增照片</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">info</span>
          <h2 class="text-lg font-bold">商品名稱</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">商品編號PID</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              value="coffee_001"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">中文名稱</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              value="衣索比亞 耶家雪菲 日曬 G1"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">英文名稱</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              value="Ethiopian Yirgacheffe G1"
            />
          </label>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">public</span>
          <h2 class="text-lg font-bold">產地 &amp; 處理法 &amp; 烘焙度</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">產地</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              value="衣索比亞"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">處理法</p>
            <select class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3">
              <option selected="">Washed</option>
              <option>Natural</option>
              <option>Honey</option>
              <option>Anaerobic</option>
            </select>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">烘焙度</p>
            <select class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3">
              <option selected="">淺焙</option>
              <option>中焙</option>
              <option>深焙</option>
            </select>
          </label>
        </div>
      </section>

      <!-- <section
        class="bg-white dark:bg-[#2a1e14] rounded-xl border border-[#e7dacf] dark:border-[#3d2b1d] overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-4 border-b border-[#e7dacf] dark:border-[#3d2b1d] bg-[#fcfaf8] dark:bg-[#2d2116] flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-primary text-xl">palette</span>
          <h2 class="text-lg font-bold">Flavor Profile</h2>
        </div>
        <div class="p-6 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label class="flex flex-col gap-2">
              <p class="text-sm font-semibold">Flavor Tags</p>
              <div
                class="flex flex-wrap gap-2 p-3 border border-[#e7dacf] dark:border-[#3d2b1d] rounded-lg bg-white dark:bg-[#221810]"
              >
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Jasmine
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Lemon
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <span
                  class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20"
                >
                  Earl Grey
                  <span class="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
                <input
                  class="flex-1 bg-transparent border-none focus:ring-0 text-sm p-1 min-w-[120px]"
                  placeholder="Add flavor tag..."
                  type="text"
                />
              </div>
            </label>
            <label class="flex flex-col gap-2">
              <p class="text-sm font-semibold">Flavor Type</p>
              <select
                class="w-full rounded-lg border-[#e7dacf] dark:border-[#3d2b1d] bg-white dark:bg-[#221810]  px-4 py-3"
              >
                <option selected="">Floral &amp; Citrusy</option>
                <option>Chocolatey &amp; Nutty</option>
                <option>Fruity &amp; Winey</option>
                <option>Spicy &amp; Earthy</option>
              </select>
            </label>
          </div>
        </div>
      </section> -->

      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">payments</span>
          <h2 class="text-lg font-bold">價格 &amp; 庫存 &amp; 重量</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">價格</p>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a704c]">$</span>
              <input
                class="w-full pl-8 rounded-lg border-[#e7dacf] bg-[#f8f7f6] py-3"
                type="number"
                value="300"
              />
            </div>
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">庫存量(包)</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="number"
              value="156"
            />
          </label>
          <label class="flex flex-col gap-2">
            <p class="text-sm font-semibold">重量</p>
            <input
              class="w-full rounded-lg border-[#e7dacf] bg-[#f8f7f6] px-4 py-3"
              type="text"
              value="250g"
            />
          </label>
        </div>
      </section>
      <section class="bg-white rounded-xl border border-[#e7dacf] overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-[#e7dacf] bg-[#fcfaf8] flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">description</span>
          <h2 class="text-lg font-bold">商品描述</h2>
        </div>
        <textarea
          class="w-full bg-white p-6 resize-none"
          placeholder="請輸入商品詳細介紹，字數不得超過300字，最少須大於10字"
          minlength="10"
          maxlength="300"
          rows="6"
        ></textarea>
      </section>

      <div class="flex justify-end gap-3 pt-6 border-t border-[#e7dacf]">
        <button
          class="px-6 py-2.5 w-36 rounded-lg border border-[#e7dacf] text-sm font-bold hover:bg-[#f3ede7] active:scale-95"
        >
          取消
        </button>
        <button
          class="px-8 py-2.5 w-36 rounded-lg text-white text-sm bg-[#e27312] font-bold shadow-md hover:bg-[#e6a974] active:scale-95"
        >
          儲存
        </button>
      </div>
    </div>
  </main>
</template>
<script></script>
