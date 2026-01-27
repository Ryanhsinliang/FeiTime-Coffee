<template>
  <div
    v-if="authStore.isLoggedIn"
    class="bg-background-airy font-notoserif min-h-screen text-primary/80 antialiased overflow-x-hidden selection:bg-pale-green"
  >
    <!-- 主要內容區域 -->
    <main class="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <!-- ========== 會員專區視圖 ========== -->
      <div v-if="activeTab === 'member'">
        <!-- 麵包屑導航（預留但隱藏） -->
        <div
          class="flex items-center gap-2 mb-10 text-[9px] font-bold tracking-[0.4em] uppercase text-primary/30 px-4"
        ></div>

        <!-- 會員專區主卡片容器（外層金色背景） -->
        <div class="relative max-w-6xl mx-auto p-2 md:p-3 leather-texture-gold rounded-[2.5rem]">
          <!-- 頁籤切換列 -->
          <div class="absolute -top-12 left-4 sm:left-10 md:left-20 flex gap-2 sm:gap-3 z-0">
            <!-- 會員專區頁籤（已選中狀態） -->
            <a
              class="px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-t-3xl font-bold text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] glass-tab-active-member text-accent-green translate-y-[2px]"
              href="#"
              @click.prevent="switchToMember"
            >
              會員專區
            </a>
            <!-- 訂單記錄頁籤（未選中狀態） -->
            <a
              class="px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-t-3xl font-bold text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] glass-tab-member text-primary/30 hover:text-primary/50 transition-all"
              href="#"
              @click.prevent="switchToOrder"
            >
              訂單記錄
            </a>
          </div>

          <!-- 主要玻璃面板（內層透明玻璃效果） -->
          <div
            class="relative z-10 glass-panel rounded-[2rem] overflow-hidden flex flex-col min-h-[800px]"
          >
            <!-- ===== 個人資料區域 ===== -->
            <div class="p-6 sm:p-10 md:p-12 lg:p-16 border-b border-white/20">
              <div class="flex flex-col lg:flex-row justify-between items-stretch gap-6 lg:gap-8">
                <!-- 左側：會員基本資料（垂直排列） -->
                <div class="space-y-8 w-full lg:w-[42%] pl-4 lg:pl-8 py-4">
                  <!-- 會員姓名 -->
                  <div class="space-y-2">
                    <label class="text-sm uppercase font-bold text-gold-foil/50 tracking-[0.3em]">
                      會員姓名
                    </label>
                    <p class="text-2xl font-light text-primary tracking-wide">
                      {{ authStore.username }}
                    </p>
                  </div>
                  <!-- 會員編號 -->
                  <div class="space-y-2">
                    <label class="text-sm uppercase font-bold text-gold-foil/50 tracking-[0.3em]">
                      會員編號
                    </label>
                    <p class="text-2xl font-light text-primary tracking-wide">
                      {{ authStore.userId }}
                    </p>
                  </div>
                  <!-- 聯絡電話 -->
                  <div class="space-y-2">
                    <label class="text-sm uppercase font-bold text-gold-foil/50 tracking-[0.3em]">
                      聯絡電話
                    </label>
                    <input
                      v-if="isEditingPhone"
                      ref="phoneInputRef"
                      v-model="phone"
                      type="tel"
                      placeholder="請輸入聯絡電話"
                      class="w-full text-lg font-light text-primary tracking-wide bg-white/20 border border-white/30 rounded-xl px-4 py-2 outline-none focus:border-gold-foil/50 focus:bg-white/30 transition-all placeholder:text-primary/30"
                      @blur="finishEditingPhone"
                    />
                    <div
                      v-else
                      class="flex items-center gap-2 cursor-pointer group"
                      @click="startEditingPhone"
                    >
                      <p class="text-lg font-light text-primary tracking-wide">
                        {{ phone || '尚未填寫' }}
                      </p>
                      <span
                        class="material-symbols-outlined text-base text-primary/30 group-hover:text-gold-foil/70 transition-colors"
                      >
                        edit
                      </span>
                    </div>
                  </div>
                  <!-- Email -->
                  <div class="space-y-2">
                    <label class="text-sm uppercase font-bold text-gold-foil/50 tracking-[0.3em]">
                      Email
                    </label>
                    <p class="text-lg font-light text-primary tracking-wide">
                      {{ authStore.email }}
                    </p>
                  </div>
                  <!-- 收件地址 -->
                  <div class="space-y-2">
                    <label class="text-sm uppercase font-bold text-gold-foil/50 tracking-[0.3em]">
                      收件地址
                    </label>
                    <input
                      v-if="isEditingAddress"
                      ref="addressInputRef"
                      v-model="address"
                      type="text"
                      placeholder="請輸入收件地址"
                      class="w-full text-lg font-light text-primary tracking-wide bg-white/20 border border-white/30 rounded-xl px-4 py-2 outline-none focus:border-gold-foil/50 focus:bg-white/30 transition-all placeholder:text-primary/30"
                      @blur="finishEditingAddress"
                    />
                    <div
                      v-else
                      class="flex items-center gap-2 cursor-pointer group"
                      @click="startEditingAddress"
                    >
                      <p class="text-lg font-light text-primary tracking-wide">
                        {{ address || '尚未填寫' }}
                      </p>
                      <span
                        class="material-symbols-outlined text-base text-primary/30 group-hover:text-gold-foil/70 transition-colors"
                      >
                        edit
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 右側：咖啡測驗結果卡片 -->
                <div class="w-full lg:w-[52%]">
                  <div
                    class="glass-card p-4 sm:p-5 rounded-[2rem] mx-auto lg:mx-0 overflow-hidden h-full"
                  >
                    <!-- 卡片標題列（含重新測驗按鈕） -->
                    <div class="flex items-center justify-between mb-4">
                      <p class="text-xs uppercase font-bold text-primary/30 tracking-[0.4em]">
                        Coffee ID Card
                      </p>
                      <button
                        v-if="coffeeResultStore.hasResult"
                        class="text-xs font-bold text-accent-green/70 hover:text-accent-green tracking-[0.2em] uppercase transition-colors"
                        @click="retakeQuiz"
                      >
                        重新測驗
                      </button>
                    </div>

                    <!-- 測驗結果卡片區域 -->
                    <div class="relative w-full rounded-xl overflow-hidden">
                      <CoffeeIDMini />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ===== 沖煮記錄區域 ===== -->
            <div class="p-6 sm:p-10 md:p-16 lg:p-20 mt-auto">
              <!-- 標題列（含展開/收合按鈕） -->
              <div class="mb-8 md:mb-10 flex items-center justify-between gap-4">
                <h3
                  class="text-sm font-bold text-primary/50 tracking-[0.3em] uppercase flex items-center gap-3"
                >
                  <span class="size-1.5 rounded-full bg-accent-green/30"></span>
                  Recent Brew Logs
                </h3>
                <button
                  class="text-xs font-bold text-accent-green/70 hover:text-accent-green tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
                  @click="toggleBrewLogsView"
                >
                  <!-- 桌面版：顯示完整文字 -->
                  <span class="hidden md:inline">
                    {{ showAllBrewLogs ? 'Collapse' : 'View All History' }}
                  </span>
                  <!-- 圖標 -->
                  <span
                    class="material-symbols-outlined text-base md:text-base transition-transform"
                    :class="{ 'rotate-180': showAllBrewLogs }"
                  >
                    expand_more
                  </span>
                </button>
              </div>

              <!-- 沖煮記錄卡片網格（3欄布局） -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <!-- 沖煮記錄卡片 - 改為圖片卡片 -->
                <div
                  v-for="(log, index) in displayedBrewLogs"
                  :key="log.id"
                  class="glass-card rounded-[2rem] hover:bg-white/40 transition-all cursor-pointer group border-none shadow-sm overflow-hidden aspect-[4/3]"
                  @click="viewBrewLog(log.id)"
                >
                  <!-- 圖片佔位符 -->
                  <div
                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/30 to-white/10"
                  >
                    <span
                      class="material-symbols-outlined text-6xl text-primary/20 font-extralight"
                    >
                      image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 裝飾性書籤標籤 -->
          <div
            class="hidden md:block absolute top-0 left-[80%] w-10 h-48 bg-pale-green/30 -translate-x-1/2 rounded-b-2xl shadow-sm pointer-events-none opacity-60 z-0 backdrop-blur-xl"
          >
            <div class="absolute bottom-0 left-0 w-full h-5 bg-accent-green/5 rounded-b-2xl"></div>
            <div class="absolute inset-x-3 top-6 h-[1px] bg-accent-green/10"></div>
            <div
              class="absolute bottom-8 left-1/2 -translate-x-1/2 size-5 border border-accent-green/20 rounded-full flex items-center justify-center"
            >
              <div class="size-1.5 bg-accent-green/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== 訂單記錄視圖 ========== -->
      <div v-else>
        <!-- 麵包屑導航（隱藏但保留空間維持版面一致） -->
        <div
          class="flex items-center gap-2 mb-10 text-[9px] font-bold tracking-[0.4em] uppercase text-primary/30 px-4 invisible"
        ></div>

        <!-- 訂單記錄主卡片容器（外層綠色背景） -->
        <div
          class="relative max-w-6xl mx-auto p-2 md:p-3 leather-texture-champagne rounded-[2.5rem]"
        >
          <!-- 頁籤切換列 -->
          <div class="absolute -top-12 left-4 sm:left-10 md:left-20 flex gap-2 sm:gap-3 z-0">
            <!-- 會員專區頁籤（未選中狀態） -->
            <a
              class="px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-t-3xl font-bold text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] glass-tab-order text-primary/30 hover:text-primary/50 transition-all"
              href="#"
              @click.prevent="switchToMember"
            >
              會員專區
            </a>
            <!-- 訂單記錄頁籤（已選中狀態） -->
            <a
              class="px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-t-3xl font-bold text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] glass-tab-active-order text-gold-accent translate-y-[2px]"
              href="#"
              @click.prevent="switchToOrder"
            >
              訂單記錄
            </a>
          </div>

          <!-- 主要玻璃容器（內層透明玻璃效果） -->
          <div
            class="relative z-10 glass-container rounded-[2rem] min-h-[800px] flex flex-col overflow-hidden"
          >
            <!-- ===== 頁面標題區域 ===== -->
            <div
              class="p-6 sm:p-10 md:p-12 lg:p-16 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10"
            >
              <div>
                <h2
                  class="text-3xl sm:text-4xl md:text-5xl font-light text-primary/90 tracking-tight"
                >
                  訂單記錄
                </h2>
                <p
                  class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mt-3 md:mt-4"
                >
                  2026 年度交易記錄
                </p>
              </div>
              <!-- 篩選按鈕（日期選擇器） -->
              <div class="flex gap-4 items-center">
                <div class="relative">
                  <VueDatePicker
                    v-model="dateRange"
                    range
                    :enable-time-picker="false"
                    select-text="確定"
                    cancel-text="取消"
                    placeholder="選擇日期範圍"
                    format="yyyy/MM/dd"
                    @update:model-value="handleDateChange"
                  >
                    <template #trigger>
                      <button
                        class="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-bold uppercase tracking-[0.3em] text-primary/50 bg-white/20 flex items-center gap-2 sm:gap-3 hover:bg-white/40 transition-all"
                      >
                        <span class="material-symbols-outlined text-base sm:text-lg">calendar_today</span>
                        {{ getDateRangeText() }}
                      </button>
                    </template>
                  </VueDatePicker>
                </div>
                <button
                  v-if="dateRange"
                  class="px-4 py-2 rounded-full text-xs font-bold text-primary/40 hover:text-primary/60 hover:bg-white/20 transition-all"
                  @click="clearDateFilter"
                >
                  清除篩選
                </button>
              </div>
            </div>

            <!-- ===== 訂單列表區域 ===== -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-16 space-y-4 md:space-y-6">
              <!-- 載入中 -->
              <div v-if="isLoadingOrders" class="text-center py-12">
                <p class="text-sm text-primary/40 uppercase tracking-[0.3em] font-bold">
                  載入中...
                </p>
              </div>

              <!-- 無訂單 -->
              <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
                <p class="text-sm text-primary/40 uppercase tracking-[0.3em] font-bold">
                  {{ dateRange ? '此日期範圍內沒有訂單' : '目前沒有訂單記錄' }}
                </p>
              </div>

              <!-- 訂單列表 -->
              <template v-else>
                <details v-for="order in paginatedOrders" :key="order.id" class="group border-none">
                  <!-- 訂單摘要列 -->
                  <summary
                    class="glass-row rounded-2xl md:rounded-[2rem] px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 cursor-pointer flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-8 list-none outline-none"
                  >
                    <div class="flex items-center gap-4 sm:gap-8 md:gap-12 w-full sm:w-auto">
                      <!-- 訂單日期 -->
                      <div class="text-center w-12 sm:w-14 flex-shrink-0">
                        <p class="text-sm font-bold text-gold-accent/60 uppercase tracking-[0.3em]">
                          {{ formatMonth(order.createdAt) }}
                        </p>
                        <p class="text-3xl sm:text-4xl font-extralight text-primary/70">
                          {{ formatDay(order.createdAt) }}
                        </p>
                      </div>
                      <div class="w-px h-10 sm:h-12 bg-gold-accent/15"></div>
                      <!-- 訂單編號 -->
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-1 sm:mb-1.5"
                        >
                          訂單編號
                        </p>
                        <h4 class="text-lg font-light text-primary/80">
                          #{{ order.order_number }}
                        </h4>
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-4 sm:gap-8 md:gap-12 w-full sm:w-auto justify-between sm:justify-start"
                    >
                      <!-- 訂單金額 -->
                      <div class="text-left sm:text-right">
                        <p
                          class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-1 sm:mb-1.5"
                        >
                          金額
                        </p>
                        <p class="text-lg font-light text-primary/80">
                          ${{ order.total_amount.toLocaleString() }}
                        </p>
                      </div>
                      <!-- 訂單狀態與展開圖標 -->
                      <div class="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <span
                          class="status-success px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-bold uppercase tracking-[0.3em]"
                        >
                          {{ getStatusText(order.order_status) }}
                        </span>
                        <span
                          class="material-symbols-outlined text-primary/20 group-open:rotate-90 transition-transform text-base sm:text-xl"
                        >
                          arrow_forward_ios
                        </span>
                      </div>
                    </div>
                  </summary>

                  <!-- 訂單詳細資訊 -->
                  <div
                    class="mx-2 sm:mx-4 mt-2 rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 glass-detail-panel"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
                      <!-- 左欄：商品明細、運費、總金額 -->
                      <div>
                        <p
                          class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-4 sm:mb-6"
                        >
                          商品明細
                        </p>
                        <!-- 商品項目 -->
                        <div
                          v-for="item in order.order_items"
                          :key="item.id"
                          class="flex justify-between items-center py-3"
                        >
                          <span class="text-lg font-light text-primary/70">
                            {{ item.quantity }}x {{ item.snapshot_name }}（{{
                              item.snapshot_weight
                            }}）
                          </span>
                          <span class="text-lg font-light text-primary/70">
                            ${{ item.item_total.toLocaleString() }}
                          </span>
                        </div>
                        <!-- 運費（上方有分隔線） -->
                        <div
                          class="flex justify-between items-center py-4 mt-2 border-t border-primary/10"
                        >
                          <span class="text-lg font-light text-primary/70">運費</span>
                          <span class="text-lg font-light text-primary/70">
                            ${{ order.shipping_fee.toLocaleString() }}
                          </span>
                        </div>
                        <!-- 總金額（上方有分隔線） -->
                        <div
                          class="flex justify-between items-center py-4 border-t border-primary/10"
                        >
                          <span class="text-lg font-medium text-primary/80">總計</span>
                          <span class="text-xl font-medium text-primary/90">
                            ${{ order.total_amount.toLocaleString() }}
                          </span>
                        </div>
                      </div>

                      <!-- 右欄：收件資訊、付款方式、追蹤 -->
                      <div class="space-y-6 sm:space-y-8">
                        <!-- 收件資訊 -->
                        <div>
                          <p
                            class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-4 sm:mb-6"
                          >
                            收件資訊
                          </p>
                          <div class="space-y-5">
                            <div>
                              <p
                                class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-2"
                              >
                                收件人
                              </p>
                              <p class="text-lg font-light text-primary/70">
                                {{ order.recipient_name }}
                              </p>
                            </div>
                            <div>
                              <p
                                class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-2"
                              >
                                收件地址
                              </p>
                              <p class="text-lg text-primary/50 leading-relaxed font-light">
                                {{ order.recipient_address }}
                              </p>
                            </div>
                            <div>
                              <p
                                class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-2"
                              >
                                聯絡電話
                              </p>
                              <p class="text-lg text-primary/50 font-light">
                                {{ order.recipient_phone }}
                              </p>
                            </div>
                            <div>
                              <p
                                class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-2"
                              >
                                付款方式
                              </p>
                              <p class="text-lg text-primary/60">
                                {{
                                  order.payment_method === 'linepay'
                                    ? 'LINE Pay'
                                    : order.payment_method
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                        <!-- 追蹤編號（如果有） -->
                        <div v-if="order.tracking_number">
                          <p
                            class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30 mb-2"
                          >
                            追蹤編號
                          </p>
                          <p
                            class="text-lg font-light text-gold-accent/70 tracking-wide break-all"
                          >
                            {{ order.tracking_number }}
                          </p>
                          <button
                            class="mt-4 px-8 sm:px-10 py-2.5 sm:py-3 bg-pale-green/40 border border-pale-green-dark/20 text-pale-green-dark text-sm font-bold uppercase tracking-[0.3em] rounded-full shadow-sm hover:bg-pale-green/60 transition-all"
                          >
                            追蹤訂單
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </template>
            </div>

            <!-- ===== 分頁導航區域 ===== -->
            <div
              class="p-6 sm:p-8 md:p-12 border-t border-white/10 flex flex-col items-center gap-4 sm:gap-6"
            >
              <!-- 分頁按鈕組 - 只在超過一頁時顯示 -->
              <div v-if="totalPages > 1" class="flex gap-3 sm:gap-4">
                <!-- 上一頁按鈕 -->
                <button
                  class="size-11 flex items-center justify-center rounded-full transition-colors bg-white/5"
                  :class="currentPage === 1 ? 'text-primary/10 cursor-not-allowed' : 'text-primary/20 hover:text-primary'"
                  :disabled="currentPage === 1"
                  @click="prevPage"
                >
                  <span class="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <!-- 頁碼按鈕 -->
                <div class="flex items-center gap-2">
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    class="size-11 flex items-center justify-center rounded-full text-xs font-bold transition-all"
                    :class="page === currentPage ? 'bg-white/50 text-primary/80' : 'text-primary/30 hover:bg-white/40'"
                    @click="goToPage(page)"
                  >
                    {{ page }}
                  </button>
                </div>
                <!-- 下一頁按鈕 -->
                <button
                  class="size-11 flex items-center justify-center rounded-full transition-colors bg-white/5"
                  :class="currentPage === totalPages ? 'text-primary/10 cursor-not-allowed' : 'text-primary/20 hover:text-primary'"
                  :disabled="currentPage === totalPages"
                  @click="nextPage"
                >
                  <span class="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
              <!-- 頁碼資訊 -->
              <p
                v-if="filteredOrders.length > 0"
                class="text-sm font-bold uppercase tracking-[0.3em] text-primary/30"
              >
                第 {{ String(currentPage).padStart(2, '0') }} 頁 • 共 {{ filteredOrders.length }} 筆訂單
              </p>
            </div>
          </div>

          <!-- 裝飾性元素組（書籤與側邊標記） -->
          <div
            class="hidden md:block absolute top-0 right-20 w-10 h-48 bg-pale-green/10 -translate-y-8 rounded-b-2xl shadow-sm pointer-events-none z-0 backdrop-blur-md"
          >
            <!-- 書籤內的裝飾線條 -->
            <div class="absolute bottom-8 left-0 w-full h-px bg-gold-accent/15"></div>
            <div class="absolute bottom-12 left-0 w-full h-px bg-gold-accent/15"></div>
            <!-- 書籤頂部圓形裝飾 -->
            <div
              class="absolute top-6 left-1/2 -translate-x-1/2 size-2.5 rounded-full border border-gold-accent/25"
            ></div>
          </div>
          <!-- 左側裝飾標記 -->
          <div
            class="hidden md:block absolute top-1/2 -left-3 w-1.5 h-32 bg-gold-accent/10 rounded-full blur-[2px]"
          ></div>
          <!-- 右側裝飾標記 -->
          <div
            class="hidden md:block absolute top-1/2 -right-3 w-1.5 h-32 bg-gold-accent/10 rounded-full blur-[2px]"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import { useCoffeeResultStore } from '@/store/coffeeResult';
  import CoffeeIDMini from '@/components/CoffeeIDMini.vue';
  import { memberService, type Order } from '@/services/memberService';
  import { VueDatePicker } from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const coffeeResultStore = useCoffeeResultStore();
  const user = authStore.user;

  // ========== 狀態管理 ==========
  const activeTab = ref<'member' | 'order'>('member');

  // ========== 訂單資料 ==========
  const orders = ref<Order[]>([]);
  const isLoadingOrders = ref(false);

  // ========== 日期篩選 ==========
  const dateRange = ref<[Date, Date] | null>(null);

  // ========== 分頁 ==========
  const currentPage = ref(1);
  const pageSize = 10;

  // ========== 聯絡資訊 ==========
  const phone = ref('');
  const address = ref('');
  const isEditingPhone = ref(false);
  const isEditingAddress = ref(false);
  const phoneInputRef = ref<HTMLInputElement | null>(null);
  const addressInputRef = ref<HTMLInputElement | null>(null);

  // ========== 取得會員訂單 ==========
  const fetchMemberOrders = async () => {
    if (!authStore.userId) return;

    isLoadingOrders.value = true;
    try {
      orders.value = await memberService.getMemberOrders(authStore.userId);
    } catch (error) {
      console.error('取得訂單失敗:', error);
    } finally {
      isLoadingOrders.value = false;
    }
  };

  // ========== 格式化日期 ==========
  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    return months[date.getMonth()];
  };

  const formatDay = (dateStr: string) => {
    return new Date(dateStr).getDate().toString().padStart(2, '0');
  };

  // ========== 訂單狀態對應 ==========
  const statusMap: Record<string, string> = {
    pending: '待處理',
    processing: '處理中',
    shipped: '已出貨',
    delivered: '已送達',
    cancelled: '已取消',
  };

  const getStatusText = (status: string) => statusMap[status] || status;

  // ========== 篩選後的訂單（新的在前面） ==========
  const filteredOrders = computed(() => {
    let result = [...orders.value];

    // 日期篩選
    if (dateRange.value) {
      const [start, end] = dateRange.value;
      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }

    // 按日期排序，新的在前面
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  });

  // ========== 分頁計算 ==========
  const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize));
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredOrders.value.slice(start, start + pageSize);
  });

  // ========== 分頁方法 ==========
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const prevPage = () => goToPage(currentPage.value - 1);
  const nextPage = () => goToPage(currentPage.value + 1);

  // ========== 日期篩選方法 ==========
  const handleDateChange = (value: [Date, Date] | null) => {
    dateRange.value = value;
    currentPage.value = 1; // 重置到第一頁
  };

  const clearDateFilter = () => {
    dateRange.value = null;
    currentPage.value = 1;
  };

  const getDateRangeText = () => {
    if (!dateRange.value) return '選擇日期';
    const [start, end] = dateRange.value;
    const formatDate = (d: Date) => `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // ========== 初始化 ==========
  onMounted(async () => {
    if (route.query.tab === 'order') {
      activeTab.value = 'order';
    }
    phone.value = authStore.phoneNumber || '';
    address.value = authStore.shippingAddress || '';
    await coffeeResultStore.loadFromUserAccount();
    await fetchMemberOrders();
  });

  // ========== 監聽路由變化 ==========
  watch(
    () => route.query.tab,
    (newTab) => {
      if (newTab === 'order') {
        activeTab.value = 'order';
      } else {
        activeTab.value = 'member';
      }
    }
  );

  // ========== 沖煮記錄 ==========
  const brewLogs = reactive([
    { id: 1, date: 'Mar 14, 2024', name: 'Yirgacheffe V60', details: '92°C | 1:16 Ratio' },
    { id: 2, date: 'Mar 12, 2024', name: 'Gesha Aeropress', details: '88°C | Inverted' },
    { id: 3, date: 'Mar 10, 2024', name: 'Midnight Blend', details: '4min Steep | Coarse' },
    { id: 4, date: 'Mar 08, 2024', name: 'Kenya AA Filter', details: '90°C | 1:15 Ratio' },
    { id: 5, date: 'Mar 05, 2024', name: 'Colombia Supremo', details: '93°C | French Press' },
    { id: 6, date: 'Mar 01, 2024', name: 'Brazilian Santos', details: '88°C | Cold Brew' },
  ]);

  const showAllBrewLogs = ref(false);

  const displayedBrewLogs = computed(() => {
    return showAllBrewLogs.value ? brewLogs : brewLogs.slice(0, 3);
  });

  // ========== 方法函式 ==========
  const switchToMember = () => {
    activeTab.value = 'member';
    router.push('/member');
  };

  const switchToOrder = () => {
    activeTab.value = 'order';
    router.push('/member?tab=order');
    document.title = 'FeiTime - 我的訂單';
  };

  const retakeQuiz = () => {
    router.push('/coffee-id-test-card?retake=true');
  };

  const toggleBrewLogsView = () => {
    showAllBrewLogs.value = !showAllBrewLogs.value;
  };

  const viewBrewLog = (id: number) => {
    console.log('View brew log:', id);
  };

  const editLogName = (id: number) => {
    console.log('Edit log name:', id);
  };

  const addNewLog = () => {
    console.log('Add new log');
  };

  // ========== 編輯聯絡資訊 ==========
  const startEditingPhone = () => {
    isEditingPhone.value = true;
    nextTick(() => {
      phoneInputRef.value?.focus();
    });
  };

  const finishEditingPhone = () => {
    isEditingPhone.value = false;
    saveContactInfo();
  };

  const startEditingAddress = () => {
    isEditingAddress.value = true;
    nextTick(() => {
      addressInputRef.value?.focus();
    });
  };

  const finishEditingAddress = () => {
    isEditingAddress.value = false;
    saveContactInfo();
  };

  const saveContactInfo = async () => {
    const result = await authStore.updateContactInfo({
      phone_number: phone.value || null,
      shipping_address: address.value || null,
    });
    if (!result.success) {
      console.error('儲存失敗:', result.message);
    }
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 200,
      'GRAD' 0,
      'opsz' 24;
  }

  .leather-texture-gold {
    background: #e8dfc8;
  }

  .glass-panel {
    backdrop-filter: blur(60px) saturate(150%);
    -webkit-backdrop-filter: blur(60px) saturate(150%);
    border: 2px solid transparent;
    background-image:
      linear-gradient(rgba(247, 243, 235, 0.25), rgba(247, 243, 235, 0.15)),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(197, 160, 89, 0.25) 25%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(197, 160, 89, 0.25) 75%,
        rgba(255, 255, 255, 0.08) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 16px 48px rgba(197, 160, 89, 0.1),
      0 4px 12px rgba(197, 160, 89, 0.06),
      inset 0 1px 1px rgba(255, 255, 255, 0.4),
      inset 0 -1px 1px rgba(255, 255, 255, 0.2);
  }

  .glass-card {
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid transparent;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1)),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(197, 160, 89, 0.2) 30%,
        rgba(255, 255, 255, 0.35) 50%,
        rgba(197, 160, 89, 0.2) 70%,
        rgba(255, 255, 255, 0.05) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.04),
      inset 0 1px 1px rgba(255, 255, 255, 0.4),
      inset 0 -1px 1px rgba(255, 255, 255, 0.2);
  }

  .glass-tab-member {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(40px) saturate(150%);
    -webkit-backdrop-filter: blur(40px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: none;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.03),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  .glass-tab-active-member {
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    border: 2px solid transparent;
    border-bottom: none;
    background-image:
      linear-gradient(rgba(247, 243, 235, 0.35), rgba(247, 243, 235, 0.25)),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(197, 160, 89, 0.5) 20%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(197, 160, 89, 0.5) 80%,
        rgba(255, 255, 255, 0.1) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 8px 20px rgba(197, 160, 89, 0.12),
      inset 0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }

  .gold-foil-text {
    background: linear-gradient(
      135deg,
      #d4af37 0%,
      #f3eee5 45%,
      #c5a059 50%,
      #f3eee5 55%,
      #b8860b 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 200;
  }

  .leather-texture-champagne {
    background: #dce8df;
  }

  .glass-container {
    background: rgba(220, 232, 222, 0.4);
    backdrop-filter: blur(60px) saturate(150%);
    -webkit-backdrop-filter: blur(60px) saturate(150%);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    box-shadow:
      0 16px 48px rgba(122, 140, 124, 0.15),
      0 4px 12px rgba(122, 140, 124, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.6),
      inset 0 -1px 1px rgba(0, 0, 0, 0.05);
  }

  .glass-row {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.04),
      inset 0 1px 1px rgba(255, 255, 255, 0.6),
      inset 0 -1px 1px rgba(0, 0, 0, 0.03);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .glass-row:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.06),
      inset 0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 -1px 1px rgba(0, 0, 0, 0.04);
  }

  .glass-detail-panel {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.03),
      inset 0 1px 1px rgba(255, 255, 255, 0.5),
      inset 0 -1px 1px rgba(0, 0, 0, 0.02);
  }

  .status-success {
    background: rgba(232, 242, 238, 0.5);
    color: #5b7a6d;
    border: 1px solid rgba(127, 166, 149, 0.2);
  }

  .glass-tab-order {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(40px) saturate(150%);
    -webkit-backdrop-filter: blur(40px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: none;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.03),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  .glass-tab-active-order {
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    border: 2px solid transparent;
    border-bottom: none;
    background-image:
      linear-gradient(rgba(220, 232, 222, 0.35), rgba(220, 232, 222, 0.25)),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(127, 166, 149, 0.4) 25%,
        rgba(255, 255, 255, 0.7) 50%,
        rgba(127, 166, 149, 0.4) 75%,
        rgba(255, 255, 255, 0.1) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 8px 20px rgba(122, 140, 124, 0.12),
      inset 0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(220, 203, 176, 0.3);
    border-radius: 10px;
  }

  /* Vue DatePicker 自訂樣式 */
  :deep(.dp__theme_light) {
    --dp-background-color: rgba(255, 255, 255, 0.9);
    --dp-text-color: #3d3d3d;
    --dp-hover-color: rgba(220, 232, 222, 0.5);
    --dp-hover-text-color: #3d3d3d;
    --dp-hover-icon-color: #5b7a6d;
    --dp-primary-color: #5b7a6d;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #c5a059;
    --dp-border-color: rgba(197, 160, 89, 0.2);
    --dp-menu-border-color: rgba(197, 160, 89, 0.2);
    --dp-border-color-hover: rgba(197, 160, 89, 0.4);
    --dp-disabled-color: #f0f0f0;
    --dp-scroll-bar-background: rgba(220, 232, 222, 0.3);
    --dp-scroll-bar-color: rgba(91, 122, 109, 0.5);
    --dp-success-color: #5b7a6d;
    --dp-success-color-disabled: rgba(91, 122, 109, 0.3);
    --dp-icon-color: #5b7a6d;
    --dp-danger-color: #cc4b4b;
    --dp-highlight-color: rgba(220, 232, 222, 0.3);
    --dp-range-between-dates-background-color: rgba(220, 232, 222, 0.4);
    --dp-range-between-dates-text-color: #3d3d3d;
    --dp-range-between-border-color: rgba(91, 122, 109, 0.2);
  }

  :deep(.dp__menu) {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  :deep(.dp__action_button) {
    border-radius: 0.5rem;
    font-weight: 600;
  }
</style>
