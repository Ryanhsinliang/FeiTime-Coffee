<template>
  <div
    class="bg-background-airy font-display min-h-screen text-primary/80 antialiased overflow-x-hidden selection:bg-pale-green"
  >
    <!-- Desktop Background Glass Effect (for Member Center) -->
    <div
      v-if="activeTab === 'member'"
      class="fixed inset-0 pointer-events-none desktop-bg-glass z-[-1]"
    ></div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div v-if="activeTab === 'member'">
        <!-- Member Center View -->
        <!-- Breadcrumb -->
        <div
          class="flex items-center gap-2 mb-10 text-[9px] font-bold tracking-[0.4em] uppercase text-primary/30 px-4"
        ></div>

        <!-- Profile Card Container -->
        <div
          class="relative max-w-6xl mx-auto p-2 md:p-3 leather-texture-gold rounded-[3.5rem] shadow-[0_50px_100px_-30px_rgba(197,160,89,0.12)] border-l-[16px] border-champagne-border ring-1 ring-black/[0.01]"
        >
          <!-- Tabs -->
          <div class="absolute -top-12 left-20 flex gap-3 z-0">
            <a
              class="px-12 py-4 rounded-t-3xl font-bold text-[9px] uppercase tracking-[0.4em] glass-tab-active-member text-accent-green translate-y-[2px]"
              href="#"
              @click.prevent="activeTab = 'member'"
            >
              Member Center
            </a>
            <a
              class="px-12 py-4 rounded-t-3xl font-bold text-[9px] uppercase tracking-[0.4em] glass-tab-member text-primary/30 hover:text-primary/50 transition-all"
              href="#"
              @click.prevent="activeTab = 'order'"
            >
              Order History
            </a>
          </div>

          <!-- Main Glass Panel -->
          <div
            class="relative z-10 glass-panel rounded-[3rem] overflow-hidden flex flex-col min-h-[800px]"
          >
            <!-- Profile Header Section -->
            <div class="p-10 md:p-20 border-b border-white/20">
              <div class="flex flex-col md:flex-row justify-between items-start gap-16">
                <!-- User Info -->
                <div class="space-y-12 max-w-xl">
                  <div>
                    <h2 class="text-6xl gold-foil-text tracking-tighter mb-4">
                      {{ memberData.name }}
                    </h2>
                    <div class="flex items-center gap-4">
                      <p class="text-[9px] font-bold text-primary/40 tracking-[0.5em] uppercase">
                        {{ memberData.membershipType }} · Est. {{ memberData.joinYear }}
                      </p>
                      <span
                        class="px-2 py-0.5 rounded bg-pale-green text-accent-green text-[8px] font-bold tracking-widest uppercase"
                      >
                        Verified
                      </span>
                    </div>
                  </div>

                  <!-- Contact Details Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                    <div v-for="detail in contactDetails" :key="detail.label" class="space-y-2">
                      <label
                        class="text-[8px] uppercase font-bold text-gold-foil/50 tracking-[0.3em]"
                      >
                        {{ detail.label }}
                      </label>
                      <p
                        class="text-sm font-light text-primary tracking-wide"
                        v-html="detail.value"
                      ></p>
                    </div>
                  </div>
                </div>

                <!-- Coffee Quiz Result Card -->
                <div class="w-full md:w-auto">
                  <div
                    class="glass-card p-10 rounded-[2.5rem] min-w-[340px] max-w-[400px] space-y-8"
                  >
                    <div class="flex items-center justify-between">
                      <p class="text-[8px] uppercase font-bold text-primary/30 tracking-[0.4em]">
                        Coffee Quiz Result
                      </p>
                      <button
                        class="text-[8px] font-bold text-accent-green/70 hover:text-accent-green tracking-[0.2em] uppercase transition-colors"
                        @click="retakeQuiz"
                      >
                        Retake
                      </button>
                    </div>

                    <div class="flex justify-center">
                      <div
                        class="size-32 rounded-full border border-white/60 flex items-center justify-center p-2 bg-white/20 shadow-inner"
                      >
                        <span
                          class="material-symbols-outlined text-6xl text-gold-foil/30 font-extralight"
                        >
                          coffee_maker
                        </span>
                      </div>
                    </div>

                    <div class="text-center space-y-4">
                      <h4
                        class="text-2xl font-extralight text-primary tracking-tight leading-tight"
                      >
                        {{ quizResult.title }}
                      </h4>
                      <p class="text-primary/50 leading-relaxed font-light text-xs">
                        {{ quizResult.description }}
                      </p>
                    </div>

                    <div class="flex flex-wrap gap-2 justify-center">
                      <span
                        v-for="tag in quizResult.tags"
                        :key="tag"
                        class="px-6 py-2 rounded-full glass-card text-[8px] font-bold text-primary/40 uppercase tracking-[0.3em] border-none"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Brew Logs Section -->
            <div class="p-10 md:p-20 mt-auto">
              <div class="mb-10 flex items-center justify-between">
                <h3
                  class="text-[11px] font-bold text-primary/50 tracking-[0.3em] uppercase flex items-center gap-3"
                >
                  <span class="size-1.5 rounded-full bg-accent-green/30"></span>
                  Recent Brew Logs
                </h3>
                <button
                  class="text-[9px] font-bold text-accent-green/70 hover:text-accent-green tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
                  @click="toggleBrewLogsView"
                >
                  {{ showAllBrewLogs ? 'Collapse' : 'View All History' }}
                  <span
                    class="material-symbols-outlined text-sm transition-transform"
                    :class="{ 'rotate-180': showAllBrewLogs }"
                  >
                    expand_more
                  </span>
                </button>
              </div>

              <div
                v-if="!showAllBrewLogs"
                class="flex flex-nowrap overflow-x-auto gap-8 pb-6 no-scrollbar"
              >
                <!-- Horizontal Scroll View (Default) -->
                <div
                  v-for="log in brewLogs"
                  :key="log.id"
                  class="min-w-[260px] flex-shrink-0 glass-card p-10 rounded-[2rem] hover:bg-white/40 transition-all cursor-pointer group border-none shadow-sm"
                  @click="viewBrewLog(log.id)"
                >
                  <p class="text-[8px] font-bold text-gold-foil/40 uppercase tracking-[0.3em] mb-5">
                    {{ log.date }}
                  </p>
                  <h5
                    class="font-light text-primary text-lg mb-3 group-hover:text-accent-green transition-colors"
                  >
                    {{ log.name }}
                  </h5>
                  <p class="text-[11px] text-primary/30 font-light italic tracking-widest">
                    {{ log.details }}
                  </p>
                </div>

                <!-- Add New Log Card -->
                <div
                  class="min-w-[260px] flex-shrink-0 glass-card p-10 rounded-[2rem] border-dashed border-accent-green/20 flex flex-col items-center justify-center text-primary/20 hover:text-accent-green/60 hover:border-accent-green/40 transition-all bg-transparent shadow-none cursor-pointer"
                  @click="addNewLog"
                >
                  <span class="material-symbols-outlined mb-3 font-extralight text-3xl">
                    add_circle
                  </span>
                  <span class="text-[9px] font-bold uppercase tracking-[0.3em]">Log Entry</span>
                </div>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Grid View (Expanded) -->
                <div
                  v-for="log in brewLogs"
                  :key="log.id"
                  class="glass-card p-10 rounded-[2rem] hover:bg-white/40 transition-all cursor-pointer group border-none shadow-sm"
                  @click="viewBrewLog(log.id)"
                >
                  <p class="text-[8px] font-bold text-gold-foil/40 uppercase tracking-[0.3em] mb-5">
                    {{ log.date }}
                  </p>
                  <h5
                    class="font-light text-primary text-lg mb-3 group-hover:text-accent-green transition-colors"
                  >
                    {{ log.name }}
                  </h5>
                  <p class="text-[11px] text-primary/30 font-light italic tracking-widest">
                    {{ log.details }}
                  </p>
                </div>

                <!-- Add New Log Card -->
                <div
                  class="glass-card p-10 rounded-[2rem] border-dashed border-accent-green/20 flex flex-col items-center justify-center text-primary/20 hover:text-accent-green/60 hover:border-accent-green/40 transition-all bg-transparent shadow-none cursor-pointer"
                  @click="addNewLog"
                >
                  <span class="material-symbols-outlined mb-3 font-extralight text-3xl">
                    add_circle
                  </span>
                  <span class="text-[9px] font-bold uppercase tracking-[0.3em]">Log Entry</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Bookmark -->
          <div
            class="absolute top-0 left-[80%] w-10 h-48 bg-pale-green/30 -translate-x-1/2 rounded-b-2xl shadow-sm pointer-events-none opacity-60 z-0 border border-t-0 border-white/40 backdrop-blur-xl"
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

      <div v-else>
        <!-- Order History View -->
        <div
          class="relative max-w-5xl mx-auto leather-texture-champagne rounded-[3.5rem] shadow-[0_60px_140px_-40px_rgba(220,203,176,0.2)] min-h-[850px] border border-white/60 p-2 overflow-visible"
        >
          <!-- Tabs -->
          <div class="absolute -top-[49px] left-16 flex gap-1 z-0">
            <a
              class="px-12 py-4 rounded-t-3xl font-bold text-[10px] uppercase tracking-[0.3em] glass-tab-order text-primary/40 hover:bg-white/40 transition-all"
              href="#"
              @click.prevent="activeTab = 'member'"
            >
              Member Center
            </a>
            <a
              class="px-12 py-4 rounded-t-3xl font-bold text-[10px] uppercase tracking-[0.3em] glass-tab-active-order text-primary/80"
              href="#"
              @click.prevent="activeTab = 'order'"
            >
              Order History
            </a>
          </div>

          <!-- Main Container -->
          <div
            class="relative z-10 glass-container rounded-[3.2rem] min-h-[840px] flex flex-col overflow-hidden"
          >
            <!-- Header -->
            <div
              class="p-12 md:p-16 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10"
            >
              <div>
                <h2 class="text-4xl font-light text-primary/90 tracking-tight">Purchase Ledger</h2>
                <p class="text-primary/30 text-[11px] mt-4 font-bold uppercase tracking-[0.2em]">
                  Archived Transactions Vol. 2024
                </p>
              </div>
              <div class="flex gap-4">
                <button
                  class="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 bg-white/20 border border-white/40 flex items-center gap-3 hover:bg-white/40 transition-all"
                >
                  <span class="material-symbols-outlined text-base">calendar_today</span>
                  This Year
                </button>
              </div>
            </div>

            <!-- Order List -->
            <div class="flex-1 overflow-y-auto p-8 md:p-16 space-y-6">
              <!-- Order 1 - Detailed -->
              <details class="group border-none">
                <summary
                  class="glass-row rounded-[2rem] px-10 py-8 cursor-pointer flex flex-wrap items-center justify-between gap-8 list-none outline-none"
                >
                  <div class="flex items-center gap-12">
                    <div class="text-center w-14">
                      <p
                        class="text-[10px] font-bold text-gold-accent/60 uppercase tracking-widest"
                      >
                        May
                      </p>
                      <p class="text-3xl font-extralight text-primary/70">18</p>
                    </div>
                    <div class="w-px h-12 bg-gold-accent/15"></div>
                    <div>
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-1.5"
                      >
                        Registry #CO-44291
                      </p>
                      <h4 class="text-xl font-light text-primary/80">
                        Ethio-Sidamo Reserve Bundle
                      </h4>
                    </div>
                  </div>
                  <div class="flex items-center gap-12">
                    <div class="text-right">
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/30 mb-1.5"
                      >
                        Investment
                      </p>
                      <p class="text-xl font-light text-primary/80">$72.00</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span
                        class="status-success px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        Shipped
                      </span>
                      <span
                        class="material-symbols-outlined text-primary/20 group-open:rotate-90 transition-transform"
                      >
                        arrow_forward_ios
                      </span>
                    </div>
                  </div>
                </summary>
                <div class="mx-4 bg-white/10 mt-2 rounded-[2rem] p-12 border border-white/20">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div class="space-y-10">
                      <div>
                        <p
                          class="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-6"
                        >
                          Manifest Content
                        </p>
                        <div
                          class="flex justify-between items-center py-4 border-b border-primary/5"
                        >
                          <span class="text-xs font-light text-primary/70">
                            3x Sidamo Whole Bean (250g)
                          </span>
                          <span class="text-xs font-medium text-primary/70">$54.00</span>
                        </div>
                        <div
                          class="flex justify-between items-center py-4 border-b border-primary/5"
                        >
                          <span class="text-xs font-light text-primary/70">
                            1x Ceramic Dripper (Ivory)
                          </span>
                          <span class="text-xs font-medium text-primary/70">$18.00</span>
                        </div>
                      </div>
                      <div class="flex gap-10">
                        <div class="flex-1">
                          <p
                            class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-2"
                          >
                            Transit Method
                          </p>
                          <p class="text-[11px] text-primary/60">Expedited Global Air</p>
                        </div>
                        <div class="flex-1">
                          <p
                            class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-2"
                          >
                            Tracking ID
                          </p>
                          <p class="text-[11px] font-medium text-gold-accent/70 tracking-widest">
                            SID-882-TRK
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-10">
                      <div>
                        <p
                          class="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-6"
                        >
                          Destination
                        </p>
                        <p class="text-xs font-medium text-primary/70 mb-1.5">Julian Vander</p>
                        <p class="text-xs text-primary/50 leading-relaxed font-light">
                          Avenue des Arts 44
                          <br />
                          1000 Brussels, Belgium
                        </p>
                      </div>
                      <div class="pt-8 border-t border-primary/5 flex justify-between items-end">
                        <div>
                          <p
                            class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30"
                          >
                            Grand Total
                          </p>
                          <p class="text-3xl font-extralight text-primary/80">$72.00</p>
                        </div>
                        <button
                          class="px-10 py-3 bg-pale-green/40 border border-pale-green-dark/20 text-pale-green-dark text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm hover:bg-pale-green/60 transition-all"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              <!-- Order 2 - Simplified -->
              <details class="group border-none">
                <summary
                  class="glass-row rounded-[2rem] px-10 py-8 cursor-pointer flex flex-wrap items-center justify-between gap-8 list-none outline-none"
                >
                  <div class="flex items-center gap-12">
                    <div class="text-center w-14">
                      <p
                        class="text-[10px] font-bold text-gold-accent/60 uppercase tracking-widest"
                      >
                        Apr
                      </p>
                      <p class="text-3xl font-extralight text-primary/70">24</p>
                    </div>
                    <div class="w-px h-12 bg-gold-accent/15"></div>
                    <div>
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-1.5"
                      >
                        Registry #CO-44118
                      </p>
                      <h4 class="text-xl font-light text-primary/80">
                        Signature House Blend Subscription
                      </h4>
                    </div>
                  </div>
                  <div class="flex items-center gap-12">
                    <div class="text-right">
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/30 mb-1.5"
                      >
                        Investment
                      </p>
                      <p class="text-xl font-light text-primary/80">$35.00</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span
                        class="status-success px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        Delivered
                      </span>
                      <span
                        class="material-symbols-outlined text-primary/20 group-open:rotate-90 transition-transform"
                      >
                        arrow_forward_ios
                      </span>
                    </div>
                  </div>
                </summary>
                <div
                  class="mx-4 bg-white/10 mt-2 rounded-[2rem] p-12 text-center border border-white/20"
                >
                  <p class="text-[11px] text-primary/40 uppercase tracking-[0.3em] font-bold">
                    Consolidated Archive Data Verified
                  </p>
                </div>
              </details>

              <!-- Order 3 - Simplified -->
              <details class="group border-none">
                <summary
                  class="glass-row rounded-[2rem] px-10 py-8 cursor-pointer flex flex-wrap items-center justify-between gap-8 list-none outline-none"
                >
                  <div class="flex items-center gap-12">
                    <div class="text-center w-14">
                      <p
                        class="text-[10px] font-bold text-gold-accent/60 uppercase tracking-widest"
                      >
                        Apr
                      </p>
                      <p class="text-3xl font-extralight text-primary/70">02</p>
                    </div>
                    <div class="w-px h-12 bg-gold-accent/15"></div>
                    <div>
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/30 mb-1.5"
                      >
                        Registry #CO-44021
                      </p>
                      <h4 class="text-xl font-light text-primary/80">
                        Limited Brass Tasting Spoon
                      </h4>
                    </div>
                  </div>
                  <div class="flex items-center gap-12">
                    <div class="text-right">
                      <p
                        class="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/30 mb-1.5"
                      >
                        Investment
                      </p>
                      <p class="text-xl font-light text-primary/80">$28.00</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span
                        class="status-success px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        Delivered
                      </span>
                      <span
                        class="material-symbols-outlined text-primary/20 group-open:rotate-90 transition-transform"
                      >
                        arrow_forward_ios
                      </span>
                    </div>
                  </div>
                </summary>
                <div
                  class="mx-4 bg-white/10 mt-2 rounded-[2rem] p-12 text-center border border-white/20"
                >
                  <p class="text-[11px] text-primary/40 uppercase tracking-[0.3em] font-bold">
                    Consolidated Archive Data Verified
                  </p>
                </div>
              </details>
            </div>

            <!-- Pagination Footer -->
            <div
              class="p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/30">
                Folio Page 01 • 12 Global Entries
              </p>
              <div class="flex gap-4">
                <button
                  class="size-11 flex items-center justify-center rounded-full text-primary/20 hover:text-primary transition-colors bg-white/5 border border-white/10"
                >
                  <span class="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <div class="flex items-center gap-2">
                  <button
                    class="size-11 bg-white/50 border border-gold-accent/20 flex items-center justify-center rounded-full text-primary/80 text-[10px] font-bold"
                  >
                    1
                  </button>
                  <button
                    class="size-11 flex items-center justify-center rounded-full text-primary/30 text-[10px] font-bold hover:bg-white/40 transition-all"
                  >
                    2
                  </button>
                  <button
                    class="size-11 flex items-center justify-center rounded-full text-primary/30 text-[10px] font-bold hover:bg-white/40 transition-all"
                  >
                    3
                  </button>
                </div>
                <button
                  class="size-11 flex items-center justify-center rounded-full text-primary/20 hover:text-primary transition-colors bg-white/5 border border-white/10"
                >
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div
            class="absolute top-0 right-20 w-10 h-48 bg-pale-green/10 -translate-y-8 rounded-b-2xl shadow-sm pointer-events-none z-0 border border-white/30 backdrop-blur-md"
          >
            <div class="absolute bottom-8 left-0 w-full h-px bg-gold-accent/15"></div>
            <div class="absolute bottom-12 left-0 w-full h-px bg-gold-accent/15"></div>
            <div
              class="absolute top-6 left-1/2 -translate-x-1/2 size-2.5 rounded-full border border-gold-accent/25"
            ></div>
          </div>
          <div
            class="absolute top-1/2 -left-3 w-1.5 h-32 bg-gold-accent/10 rounded-full blur-[2px]"
          ></div>
          <div
            class="absolute top-1/2 -right-3 w-1.5 h-32 bg-gold-accent/10 rounded-full blur-[2px]"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';

  // Active tab state
  const activeTab = ref<'member' | 'order'>('member');

  // Search functionality
  const searchQuery = ref('');

  // User avatars
  const memberAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQvhkIx5-TwI3xHd6dtrk7ZOdb-VyI1MGD4d1U2ia0LdVtiowTqL1IV8yRUKfNoIy73Kxn9vvVItT0KbX4avpNJhA6SOi-Uujo_oEaBr1dB6iQXT3jrIzsZo6SgPE6unhqx05zfxcnOVFipo2hsvq8WiX-hoDGAaJfd9OhdCyBo9K6J3mUxN75F-cSOiyuH24bAPGK7NhhKfH-j6IU5_V4th12a3vm_f976CVPSHrDHz2hmOYKLNiP8eKecBM1XZv2whC5QngcW730';
  const orderAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAu7Odjj3ZRP-MYyDhYMn0GV2Gz_Y6lwWoPEV8S3fVQdqs0ra4IHEiwmxMZVQ5YhHqsLb4M0ftTXX2a6Hxb4IcuVCLW_U0sKaDIgBHTe7oeHmTHsoL7StETfS6tvK7C1nRvy2fFKJjtO8Ho_02rhqbfNl_KCuVBr3dtZe1hckaAHmTJqlS2AZj4fRwzIfDK8qfVg0HvTbY9LcOyPYqsNqS-R1f_dyojFjyWijuCMlteWiz6vENTKOs5smoO-SIB0wIy7_icMSPYYiYK';

  // Member data
  const memberData = reactive({
    name: 'Alex Chen',
    membershipType: 'Premium Member',
    joinYear: '2022',
    tier: 'Gold Reserve',
    tierProgress: 85,
    nextTier: 'Platinum',
  });

  // Contact details
  const contactDetails = reactive([
    { label: 'Member ID', value: 'FT8829-X0' },
    { label: 'Phone', value: '+1 (555) 012-9934' },
    { label: 'Email', value: 'a.chen@collectors.coffee' },
    { label: 'Address', value: '1289 Espresso Way, Suite 400<br/>San Francisco, CA 94103' },
  ]);

  // Quiz result
  const quizResult = reactive({
    title: 'The Ethereal Ethiopia Profile',
    description:
      'Your palate favors high-acidity, floral notes with a tea-like body. We recommend light roasts from the Yirgacheffe region, brewed with a V60 to accentuate the jasmine and lemon zest undertones.',
    tags: ['Floral', 'Citrus', 'Light'],
  });

  // Brew logs
  const brewLogs = reactive([
    { id: 1, date: 'Mar 14, 2024', name: 'Yirgacheffe V60', details: '92°C | 1:16 Ratio' },
    { id: 2, date: 'Mar 12, 2024', name: 'Gesha Aeropress', details: '88°C | Inverted' },
    { id: 3, date: 'Mar 10, 2024', name: 'Midnight Blend', details: '4min Steep | Coarse' },
  ]);

  // Brew logs view state
  const showAllBrewLogs = ref(false);

  // Methods
  const retakeQuiz = () => {
    console.log('Retake quiz');
  };

  const toggleBrewLogsView = () => {
    showAllBrewLogs.value = !showAllBrewLogs.value;
  };

  const viewBrewLog = (id: number) => {
    console.log('View brew log:', id);
  };

  const addNewLog = () => {
    console.log('Add new log');
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
  }

  /* Member Center Styles */
  .leather-texture-gold {
    background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(0, 0, 0, 0.01) 100%
      ),
      url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwKQak4iZsSM171XUekA4_DV6Y12-lRJXZQ1c5bJx82r-eZab3nppNJC42e48arTBify3uwmjoaqRObA9vlgfY5jcS_M95IH2WqQH1bogYu8CRthXpziY1VyO3ojMuLjeejKARrtf1Pz7vO8ctzyTlgjg7WJdRBdCzi62GmuRRBPeHhx_WTQmA4-a_RfE--6rzyoXitIvw2oxZFI00SXKY6upOU8znZJOwA-vLi_zOl49BCoxSEMzJ9mKxEAV5rKkALEhNsWNWPK7O');
    background-color: #f7f3eb;
    background-blend-mode: soft-light;
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 40px rgba(197, 160, 89, 0.05);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .glass-tab-member {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }

  .glass-tab-active-member {
    background: rgba(232, 240, 233, 0.5);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-top: 2px solid #7a8c7c;
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

  .desktop-bg-glass {
    background: radial-gradient(
      circle at top right,
      rgba(232, 240, 233, 0.4) 0%,
      rgba(251, 249, 244, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
  }

  /* Order History Styles */
  .leather-texture-champagne {
    background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(220, 203, 176, 0.15) 100%
    );
    background-color: #f9f6f0;
  }

  .glass-container {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .glass-row {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .glass-row:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(220, 203, 176, 0.4);
    transform: translateY(-1px);
  }

  .status-success {
    background: rgba(232, 242, 238, 0.5);
    color: #5b7a6d;
    border: 1px solid rgba(127, 166, 149, 0.2);
  }

  .glass-tab-order {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: none;
  }

  .glass-tab-active-order {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-bottom: none;
  }

  /* Shared Styles */
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
</style>
