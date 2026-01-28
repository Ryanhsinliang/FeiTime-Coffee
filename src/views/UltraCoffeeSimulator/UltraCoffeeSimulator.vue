<template>
  <div
    class="min-h-screen flex flex-col antialiased font-wenkai text-[#2C3E2D] selection:bg-[#8FA98F]/30 selection:text-[#2C3E2D] bg-[#F8FAF9] bg-texture"
  >
    <main class="flex-grow flex flex-col items-center w-full px-6 md:px-12 lg:pr-[560px] py-12">
      <!-- Error Boundary Display -->
      <div
        v-if="error"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div
          class="bg-red-50 border border-red-200 text-red-800 p-8 rounded-xl shadow-xl max-w-2xl w-full mx-4"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">warning</span>
            Rendering Error
          </h2>
          <p
            class="font-mono text-sm bg-white p-4 rounded border border-red-100 overflow-auto max-h-60 mb-4"
          >
            {{ error.toString() }}
          </p>
          <p class="text-sm text-red-600">Please check the console for more details.</p>
          <button
            @click="error = null"
            class="mt-6 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>

      <div v-else class="max-w-[1400px] w-full">
        <!-- Main Content -->
        <div class="flex flex-col gap-24">
          <!-- Intro Section -->
          <div class="flex flex-col gap-8 text-center md:text-left relative pl-0 md:pl-8">
            <div
              class="hidden md:block absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-[#6B8E6B]/40 to-transparent rounded-full"
            ></div>
            <div class="flex flex-wrap gap-2 items-center justify-center md:justify-start">
              <span
                class="text-[#6B8E6B] text-xs font-bold tracking-[0.2em] uppercase bg-[#6B8E6B]/10 px-3 py-1 rounded-full"
              >
                FeiTime 精選 (selection)
              </span>
            </div>
            <div class="flex flex-col gap-4">
              <h1
                class="text-4xl md:text-6xl font-notoserif text-[#2C3E2D] tracking-wide leading-tight"
              >
                專屬於您的萃取配方
                <br />
                <span class="text-3xl md:text-5xl text-[#5C6B5D] font-light">
                  Configure Your Extraction
                </span>
              </h1>
              <p class="text-[#5C6B5D] text-lg max-w-2xl font-light leading-relaxed">
                探索專屬於您的獨特沖煮之道，發掘全新風味輪廓。難以言喻的口感正等待著您:D。
                <span class="block text-sm mt-2 opacity-70">
                  Select your parameters to simulate the perfect brew and discover new flavor
                  profiles. A harmonious balance awaits.
                </span>
              </p>
            </div>
          </div>

          <!-- Select Origin -->
          <div class="flex flex-col gap-10 relative group/section">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">
                選擇產地
                <span class="text-base text-[#5C6B5D] font-light ml-2">Select Origin</span>
              </h2>
              <span
                class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light"
              >
                01
              </span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div
                class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5"
              >
                <CoffeeFairyIcon />
              </div>
              <div
                class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20"
              >
                <h4
                  class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2"
                >
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「來自不同土壤的豆子承載著土地的靈魂。非洲豆通常帶來花香與明亮感，而南美豆則提供堅果般的舒適風味。」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div
                v-for="origin in origins"
                :key="origin.name"
                @click="selectedOrigin = origin.name"
                class="group cursor-pointer relative flex flex-col gap-0 bg-white transition-all duration-300 rounded-xl overflow-hidden"
                :class="
                  selectedOrigin === origin.name
                    ? 'shadow-soft ring-1 ring-[#8FA98F] transform -translate-y-1'
                    : 'hover:shadow-card hover:bg-white border border-transparent hover:border-[#8FA98F]/30'
                "
              >
                <div
                  v-if="selectedOrigin === origin.name"
                  class="absolute top-4 right-4 bg-[#8FA98F] text-white rounded-full p-1 z-10 shadow-md"
                >
                  <span class="material-symbols-outlined text-sm block">check</span>
                </div>
                <div
                  class="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover overflow-hidden relative transition-all duration-500"
                  :class="
                    selectedOrigin === origin.name ? '' : 'opacity-80 group-hover:opacity-100'
                  "
                  :style="{ backgroundImage: `url(${origin.image})` }"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply"
                    v-if="selectedOrigin === origin.name"
                  ></div>
                  <div
                    class="absolute inset-0 bg-[#6B8E6B]/10 mix-blend-overlay"
                    v-if="selectedOrigin === origin.name"
                  ></div>
                  <div class="absolute inset-0 bg-[#6B8E6B]/5 mix-blend-overlay" v-else></div>
                </div>
                <div class="p-6 flex flex-col gap-3">
                  <p
                    class="text-[#2C3E2D] text-lg font-notoserif"
                    :class="{ 'font-medium': selectedOrigin === origin.name }"
                  >
                    {{ origin.name }}
                  </p>
                  <p
                    class="text-xs tracking-widest uppercase font-bold transition-colors"
                    :class="
                      selectedOrigin === origin.name
                        ? 'text-[#8FA98F]'
                        : 'text-[#8DA390] group-hover:text-[#8FA98F]'
                    "
                  >
                    {{ origin.tags }}
                  </p>
                  <p class="text-[#5C6B5D] text-sm leading-relaxed font-light">{{ origin.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Roast Level -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">
                烘焙度
                <span class="text-base text-[#5C6B5D] font-light ml-2">Roast Level</span>
              </h2>
              <span
                class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light"
              >
                02
              </span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div
                class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5"
              >
                <CoffeeFairyIcon />
              </div>
              <div
                class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20"
              >
                <h4
                  class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2"
                >
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「熱度將潛力轉化為風味。淺焙保留細緻莓果香；深焙帶出大膽煙燻巧克力深韻。」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="roast in roasts"
                :key="roast.name"
                @click="selectedRoast = roast.name"
                class="cursor-pointer flex items-center gap-5 p-6 rounded-xl transition-all"
                :class="
                  selectedRoast === roast.name
                    ? 'bg-gradient-to-r from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft relative'
                    : 'bg-white group hover:shadow-card border border-[#E6EBE6] hover:border-[#8FA98F]/30'
                "
              >
                <div
                  v-if="selectedRoast === roast.name"
                  class="absolute top-3 right-3 text-[#8FA98F]"
                >
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                </div>
                <div
                  class="size-12 rounded-full shadow-sm flex-shrink-0 transition-all"
                  :class="
                    selectedRoast === roast.name
                      ? 'ring-4 ring-white shadow-md'
                      : 'ring-4 ring-[#F2F7F2] group-hover:ring-[#6B8E6B]/20'
                  "
                  :style="{ backgroundColor: roast.color }"
                ></div>
                <div>
                  <p
                    class="font-notoserif text-lg text-[#2C3E2D]"
                    :class="{ 'font-medium': selectedRoast === roast.name }"
                  >
                    {{ roast.name }}
                  </p>
                  <p
                    class="text-xs mt-1"
                    :class="
                      selectedRoast === roast.name
                        ? 'text-[#8FA98F] font-medium uppercase tracking-wide'
                        : 'text-[#8DA390] font-light'
                    "
                  >
                    {{ roast.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Grind Size -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">
                研磨度
                <span class="text-base text-[#5C6B5D] font-light ml-2">Grind Size</span>
              </h2>
              <span
                class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light"
              >
                03
              </span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div
                class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5"
              >
                <CoffeeFairyIcon />
              </div>
              <div
                class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20"
              >
                <h4
                  class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2"
                >
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「表面積是關鍵！細研磨能快速釋放風味，適合濃縮咖啡；粗研磨適合慢速沖煮，如法式濾壓壺。」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div
                v-for="grind in grinds"
                :key="grind.name"
                @click="selectedGrind = grind.name"
                class="cursor-pointer flex flex-col items-center gap-4 p-6 rounded-xl transition-all"
                :class="
                  selectedGrind === grind.name
                    ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft relative'
                    : 'bg-white group hover:bg-white hover:shadow-card border border-transparent hover:border-[#8FA98F]/30'
                "
              >
                <div
                  v-if="selectedGrind === grind.name"
                  class="absolute top-2 right-2 text-[#8FA98F]"
                >
                  <span class="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
                <div
                  class="size-16 rounded-full bg-cover transition-all mix-blend-multiply"
                  :class="
                    selectedGrind === grind.name
                      ? 'ring-4 ring-white'
                      : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90'
                  "
                  :style="{ backgroundImage: `url(${grind.image})` }"
                ></div>
                <span
                  class="text-xs uppercase tracking-widest"
                  :class="
                    selectedGrind === grind.name
                      ? 'font-bold text-[#8FA98F]'
                      : 'font-medium text-[#8DA390] group-hover:text-[#2C3E2D]'
                  "
                >
                  {{ grind.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Ratio (Water to Coffee) -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">
                粉水比
                <span class="text-base text-[#5C6B5D] font-light ml-2">Ratio</span>
              </h2>
              <span
                class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light"
              >
                04
              </span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div
                class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5"
              >
                <CoffeeFairyIcon />
              </div>
              <div
                class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20"
              >
                <h4
                  class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2"
                >
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「粉水比是濃淡的魔法。1:15 濃郁帶勁，適合加奶；1:18
                  清爽如茶，最能展現產地花果香。」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div
                v-for="r in ratios"
                :key="r.name"
                @click="selectedRatio = r.name"
                class="cursor-pointer flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all border group relative"
                :class="
                  selectedRatio === r.name
                    ? 'bg-gradient-to-br from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent'
                    : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'
                "
              >
                <div v-if="selectedRatio === r.name" class="absolute top-2 right-2 text-[#8FA98F]">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                </div>
                <!-- Visual for Ratio -->
                <div class="flex items-end gap-1 mb-2 h-12">
                  <div class="w-3 bg-[#3e2723] rounded-sm" :style="{ height: '24px' }"></div>
                  <!-- Coffee dose constant visualization -->
                  <div
                    class="w-8 border-2 border-[#8FA98F]/50 rounded-sm relative overflow-hidden bg-white"
                  >
                    <!-- Water visualization -->
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-[#8FA98F]/30 transition-all duration-500"
                      :style="{ height: ((r.val - 12) / 8) * 100 + '%' }"
                    ></div>
                  </div>
                </div>

                <p
                  class="font-notoserif text-lg text-[#2C3E2D]"
                  :class="{ 'font-medium': selectedRatio === r.name }"
                >
                  {{ r.name.split(' ')[0] }}
                </p>
                <p
                  class="text-[10px] uppercase tracking-wider text-center"
                  :class="
                    selectedRatio === r.name
                      ? 'text-[#8FA98F] font-bold'
                      : 'text-[#8DA390] font-light'
                  "
                >
                  {{ r.desc }}
                </p>
              </div>
            </div>
          </div>

          <!-- Brew Method -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">
                沖煮方式
                <span class="text-base text-[#5C6B5D] font-light ml-2">Brew Method</span>
              </h2>
              <span
                class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light"
              >
                05
              </span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div
                class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5"
              >
                <CoffeeFairyIcon />
              </div>
              <div
                class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20"
              >
                <h4
                  class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2"
                >
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「展演的舞台。壓力、重力或浸泡——今天您將如何引導風味釋放？」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div v-for="method in methods" :key="method.name" class="contents">
                <!-- Special handling for Pour Over (Layout differs) -->
                <div
                  v-if="method.name === '手沖 (Pour Over)'"
                  @click="selectedMethod = method.name"
                  class="flex flex-col gap-3 transition-all border rounded-xl p-4 group"
                  :class="
                    selectedMethod === method.name
                      ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent'
                      : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'
                  "
                >
                  <button class="w-full flex flex-col items-center justify-center gap-4 p-4">
                    <div
                      v-if="selectedMethod === method.name"
                      class="absolute top-3 right-3 text-[#8FA98F]"
                    >
                      <span class="material-symbols-outlined text-sm">check_circle</span>
                    </div>
                    <span
                      class="material-symbols-outlined text-4xl transition-colors font-light"
                      :class="
                        selectedMethod === method.name
                          ? 'text-[#8FA98F]'
                          : 'text-[#8DA390] group-hover:text-[#8FA98F]'
                      "
                    >
                      {{ method.icon }}
                    </span>
                    <span
                      class="text-xs uppercase tracking-widest font-medium"
                      :class="
                        selectedMethod === method.name
                          ? 'text-[#2C3E2D] font-bold'
                          : 'text-[#8DA390] group-hover:text-[#2C3E2D]'
                      "
                    >
                      {{ method.name }}
                    </span>
                  </button>
                  <div
                    class="flex flex-col items-center border-t border-[#E6EBE6]/50 pt-3 gap-2"
                    @click.stop
                  >
                    <label
                      class="text-[10px] uppercase tracking-wider text-[#8DA390] font-medium"
                      for="pour-stages"
                    >
                      注水段數 (Stages)
                    </label>
                    <select
                      v-model="pourStages"
                      class="form-select block w-full text-xs py-1 px-2 border-[#E6EBE6] rounded text-[#5C6B5D] focus:ring-[#6B8E6B] focus:border-[#6B8E6B] text-center bg-[#F2F7F2]"
                      id="pour-stages"
                    >
                      <option>1 段 (Stage)</option>
                      <option>2 段 (Stages)</option>
                      <option>3 段 (Stages)</option>
                      <option>4 段 (Stages)</option>
                      <option>5 段 (Stages)</option>
                    </select>
                  </div>
                </div>

                <!-- Standard Button for other methods -->
                <button
                  v-else
                  @click="selectedMethod = method.name"
                  class="flex flex-col items-center justify-center gap-4 p-8 transition-all group border rounded-xl relative"
                  :class="
                    selectedMethod === method.name
                      ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent'
                      : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'
                  "
                >
                  <div
                    v-if="selectedMethod === method.name"
                    class="absolute top-3 right-3 text-[#8FA98F]"
                  >
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                  </div>
                  <span
                    class="material-symbols-outlined text-4xl font-light transition-colors"
                    :class="
                      selectedMethod === method.name
                        ? 'text-[#8FA98F]'
                        : 'text-[#8DA390] group-hover:text-[#8FA98F]'
                    "
                  >
                    {{ method.icon }}
                  </span>
                  <span
                    class="text-xs uppercase tracking-widest"
                    :class="
                      selectedMethod === method.name
                        ? 'text-[#2C3E2D] font-bold'
                        : 'text-[#8DA390] font-medium group-hover:text-[#2C3E2D]'
                    "
                  >
                    {{ method.name }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Ultra Simulator Promo -->
          <div
            class="relative w-full rounded-2xl overflow-hidden bg-[#2C3E2D] text-white shadow-2xl group cursor-pointer border border-white/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#2C3E2D] via-[#2C3E2D] to-[#6B8E6B]/40 opacity-100"
            ></div>
            <div
              class="absolute -top-24 -right-24 w-64 h-64 bg-[#6B8E6B]/20 rounded-full blur-3xl transition-all duration-500 group-hover:bg-[#6B8E6B]/30"
            ></div>
            <div
              class="absolute -bottom-24 -left-24 w-64 h-64 bg-[#8FA98F]/10 rounded-full blur-3xl transition-all duration-500 group-hover:bg-[#8FA98F]/20"
            ></div>
            <div
              class="relative z-10 px-8 py-12 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
            >
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3 mb-1 justify-center md:justify-start">
                  <div class="h-6 w-6 text-[#8FA98F] animate-pulse">
                    <CoffeeFairyIcon />
                  </div>
                  <span
                    class="text-[10px] font-bold text-[#8FA98F] uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full"
                  >
                    精靈推薦 (Recommendation)
                  </span>
                </div>
                <h2 class="text-3xl md:text-4xl font-notoserif text-white leading-snug">
                  還不夠過癮嗎?
                  <br class="md:hidden" />
                  <span class="text-[#8FA98F] font-medium">Not feeling enough?</span>
                </h2>
                <p class="text-[#F2F7F2]/80 text-lg font-light tracking-wide">
                  歡迎嘗試我們的
                  <span class="text-white font-medium border-b border-[#8FA98F]">
                    進階模擬器 (Ultra Simulator)
                  </span>
                  進行精細控制。
                  <br class="hidden md:block" />
                  <span class="text-sm opacity-60">
                    welcome to try our ultra simulator for granular control.
                  </span>
                </p>
              </div>
              <div class="shrink-0">
                <button
                  @click="handleNavigateToRefine"
                  class="bg-white text-[#2C3E2D] hover:bg-[#8FA98F] hover:text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group-hover:scale-105"
                >
                  試用進階模擬器 (Try)
                  <span class="material-symbols-outlined text-lg">science</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Sidebar -->

        <!-- Fixed Sidebar (Right Column) - Responsive Adjustment -->
        <div
          class="block w-full lg:fixed lg:top-0 lg:right-0 lg:w-[400px] lg:h-screen lg:pt-24 lg:pb-8 lg:pr-6 z-30 lg:z-40 mt-16 lg:mt-0"
        >
          <div
            class="flex flex-col gap-6 p-6 lg:h-full lg:overflow-y-auto lg:pr-2 bg-white lg:bg-[#F8FAF9]/95 lg:backdrop-blur-sm lg:custom-scrollbar rounded-xl lg:rounded-l-xl lg:rounded-r-none shadow-sm lg:shadow-lg border border-[#E6EBE6] lg:border-r-0 lg:border-t-0 lg:border-b-0 lg:border-l"
          >
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between pb-4 border-b border-[#E6EBE6]">
              <div>
                <h3 class="text-xl font-notoserif text-[#2C3E2D]">萃取摘要</h3>
                <p class="text-xs text-[#5C6B5D] font-light uppercase tracking-wider">
                  Extraction Summary
                </p>
              </div>
            </div>

            <!-- Sidebar Content -->
            <div class="flex flex-col gap-6">
              <!-- Summary Cards -->
              <div class="bg-white p-6 rounded-xl shadow-sm border border-[#E6EBE6]">
                <div class="flex flex-col gap-4">
                  <div
                    class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2"
                  >
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      產地 (Origin)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ selectedOrigin }}
                    </span>
                  </div>
                  <div
                    class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2"
                  >
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      烘焙 (Roast)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ selectedRoast }}
                    </span>
                  </div>
                  <div
                    class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2"
                  >
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      研磨 (Grind)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ selectedGrind }}
                    </span>
                  </div>
                  <div
                    class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2"
                  >
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      粉水比 (Ratio)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ selectedRatio.split(' ')[0] }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      方式 (Method)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ selectedMethod }}
                    </span>
                  </div>
                  <div
                    class="flex justify-between items-center text-sm"
                    v-if="selectedMethod === '手沖 (Pour Over)'"
                  >
                    <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">
                      段數 (Stages)
                    </span>
                    <span class="font-notoserif text-[#2C3E2D] text-right text-base">
                      {{ pourStages }}
                    </span>
                  </div>
                </div>

                <button
                  @click="startSimulation"
                  class="w-full mt-6 bg-[#2C3E2D] hover:bg-[#6B8E6B] text-white font-medium text-sm tracking-widest uppercase py-3 px-6 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#6B8E6B]/20 rounded-lg"
                >
                  開始模擬 (Start)
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div
                class="flex gap-4 p-4 bg-[#F8FAF9] border border-[#E6EBE6] items-start rounded-xl"
              >
                <span class="material-symbols-outlined text-[#8FA98F] mt-0.5 text-lg font-light">
                  spa
                </span>
                <div>
                  <p class="text-sm font-notoserif font-medium mb-1 text-[#2C3E2D]">關於研磨度</p>
                  <p class="text-xs leading-relaxed text-[#5C6B5D] font-light">
                    細研磨會增加萃取表面積，非常適合義式濃縮等快速高壓沖煮法。
                  </p>
                </div>
              </div>

              <!-- Flavor Prediction -->
              <div
                ref="flavorPredictionRef"
                class="bg-white p-5 border border-[#E6EBE6] rounded-xl shadow-sm flex flex-col gap-6"
              >
                <h3
                  class="text-xs font-bold tracking-[0.2em] uppercase text-[#273c35] border-l-2 border-[#6B8E6B] pl-2"
                >
                  風味預測 (Prediction)
                </h3>
                <div class="flex flex-col gap-6">
                  <FlavorRadar :scores="finalProfile" :label-map="labelMap" />
                  <div class="flex flex-col gap-2">
                    <div v-for="item in flavorEntries" :key="item.key" class="flex items-center">
                      <span class="w-14 text-[12px] text-[#273c35] font-medium">
                        {{ labelMap[item.key] }}
                      </span>
                      <div class="mx-2 flex-1 h-1.5 overflow-hidden rounded-full bg-[#F2F7F2]">
                        <div
                          class="h-full rounded-full transition-[width] duration-300 ease-out shadow-sm"
                          :style="{
                            width: (item.value / 5) * 100 + '%',
                            background: getGradient(item.value),
                          }"
                        ></div>
                      </div>
                      <span class="w-7 text-right text-[11px] text-[#5C6B5D] font-mono">
                        {{ item.value.toFixed(1) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- AI Assistant -->
              <div
                class="bg-white p-5 border border-[#E6EBE6] rounded-xl shadow-sm flex flex-col gap-4"
              >
                <h3
                  class="text-xs font-bold tracking-[0.2em] uppercase text-[#273c35] flex items-center gap-2"
                >
                  <div class="size-5 text-[#8FA98F]">
                    <CoffeeFairyIcon />
                  </div>
                  小精靈的叮嚀
                </h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    class="flex-1 bg-[#F2F7F2] hover:bg-[#E6EBE6] text-[#2C3E2D] px-3 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="isAssistantLoading"
                    @click="triggerAssistant('select')"
                  >
                    {{
                      isAssistantLoading && assistantMode === 'select'
                        ? '精靈思考中...'
                        : '幫我選 (Pick)'
                    }}
                  </button>
                  <button
                    type="button"
                    class="flex-1 bg-[#F2F7F2] hover:bg-[#E6EBE6] text-[#2C3E2D] px-3 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="isAssistantLoading"
                    @click="triggerAssistant('adjust')"
                  >
                    {{
                      isAssistantLoading && assistantMode === 'adjust'
                        ? '精靈思考中...'
                        : '幫我調整 (Adjust)'
                    }}
                  </button>
                </div>

                <div
                  v-if="assistantOpen"
                  class="rounded-xl bg-[#F8FAF9] p-3 border border-[#E6EBE6]"
                >
                  <div class="mb-3 max-h-40 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                    <!-- 載入動畫 -->
                    <div
                      v-if="isAssistantLoading && assistantMessages.length === 0"
                      class="flex items-center gap-2 text-[#8DA390] text-xs"
                    >
                      <span class="animate-spin material-symbols-outlined text-sm">
                        progress_activity
                      </span>
                      <span>精靈正在思考中...</span>
                    </div>
                    <div
                      v-for="(msg, idx) in assistantMessages"
                      :key="idx"
                      :class="[
                        'rounded-lg px-3 py-2 text-xs leading-relaxed max-w-[90%]',
                        msg.role === 'assistant'
                          ? 'bg-white border border-[#E6EBE6] text-[#2C3E2D] self-start'
                          : 'ml-auto bg-[#6B8E6B] text-white self-end',
                      ]"
                    >
                      <p class="m-0">{{ msg.text }}</p>
                    </div>
                    <!-- 回覆載入中 -->
                    <div
                      v-if="isAssistantLoading && assistantMessages.length > 0"
                      class="flex items-center gap-2 text-[#8DA390] text-xs"
                    >
                      <span class="animate-spin material-symbols-outlined text-sm">
                        progress_activity
                      </span>
                      <span>精靈思考中...</span>
                    </div>
                  </div>
                  <div class="flex items-end gap-2">
                    <textarea
                      v-model="userInput"
                      rows="1"
                      class="flex-1 resize-none rounded-lg border border-[#E6EBE6] bg-white px-3 py-2 text-xs focus:ring-1 focus:ring-[#8FA98F] focus:border-[#8FA98F] outline-none"
                      placeholder="請輸入..."
                    ></textarea>
                    <button
                      type="button"
                      class="h-[34px] w-[34px] flex items-center justify-center rounded-lg bg-[#2C3E2D] text-white hover:bg-[#3E5240] disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="isAssistantLoading || !userInput.trim()"
                      @click="sendUserMessage"
                    >
                      <span
                        v-if="isAssistantLoading"
                        class="animate-spin material-symbols-outlined text-base"
                      >
                        progress_activity
                      </span>
                      <span v-else class="material-symbols-outlined text-base">send</span>
                    </button>
                  </div>
                  <!-- Hidden actual btn component just to import logic if needed, or we implement logic directly -->
                  <GeminiTestButton class="hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Login Prompt Modal -->
    <div
      v-if="showLoginModal"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100 border border-[#E6EBE6]"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div
            class="size-12 rounded-full bg-[#F2F7F2] flex items-center justify-center text-[#8FA98F] mb-2"
          >
            <span class="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h3 class="text-xl font-notoserif text-[#2C3E2D] font-bold">需要會員權限</h3>
          <p class="text-[#5C6B5D] text-sm leading-relaxed">
            進階模擬器 (Refine Simulator) 僅開放給會員使用。
            <br />
            請先登入以繼續探索更精細的沖煮參數。
          </p>
          <div class="flex gap-3 w-full mt-4">
            <button
              @click="showLoginModal = false"
              class="flex-1 px-4 py-3 rounded-xl border border-[#E6EBE6] text-[#5C6B5D] font-medium hover:bg-[#F8FAF9] transition-colors text-sm"
            >
              稍後 (Later)
            </button>
            <button
              @click="confirmLoginRedirect"
              class="flex-1 px-4 py-3 rounded-xl bg-[#2C3E2D] text-white font-medium hover:bg-[#3E5240] transition-colors text-sm shadow-lg shadow-[#2C3E2D]/20"
            >
              前往登入 (Login)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onErrorCaptured, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import FlavorRadar from '@/components/FlavorRadar.vue';
  import GeminiTestButton from '@/components/GeminiTestButton.vue';
  import CoffeeFairyIcon from '@/components/common/CoffeeFairyIcon.vue';
  import {
    askFairyToSelect,
    askFairyToAdjust,
    chatWithFairy,
    type FairyContext,
    type FairyMessage,
  } from '@/services/coffeeFairyService';
  import {
    calculateSweetness,
    calculateAcidity,
    calculateClarity,
    calculateBody,
    calculateAftertaste,
    // @ts-ignore
  } from '@/utils/brewLogic.js';

  const error = ref<any>(null);

  onErrorCaptured((err, instance, info) => {
    console.error('UltraCoffeeSimulator Error:', err);
    console.error('Info:', info);
    error.value = err;
    return false; // Stop propagation
  });

  onMounted(() => {});

  // Navigation Logic
  const router = useRouter();
  const authStore = useAuthStore();
  const showLoginModal = ref(false);

  function handleNavigateToRefine() {
    if (authStore.isLoggedIn) {
      router.push({ name: 'RefineSimulator' });
    } else {
      showLoginModal.value = true;
    }
  }

  function confirmLoginRedirect() {
    showLoginModal.value = false;
    router.push({ name: 'Login' });
  }

  // Options Data
  // Options Data
  const origins = [
    // Africa
    {
      name: '衣索比亞 耶加雪菲 (Ethiopia Yirgacheffe)',
      tags: '明亮花香 (Bright & Floral)',
      desc: '以茶感醇厚度與複雜柑橘調性聞名。 (Known for its tea-like body and complex citrus notes.)',
      image:
        'https://specialtycoffee.stonex.com/cdn/shop/files/ethiopia-yirgacheffe-halo-beriti-gr1-washed-green-coffee-beans-stonex-specialty-coffee-1.png?v=1724876971', // Coffee drying
    },
    {
      name: '肯亞 AA (Kenya AA)',
      tags: '莓果酒香 (Berry & Wine-like)',
      desc: '具有鮮明的黑醋栗與梅子酸感，口感紮實。 (Distinct blackcurrant acidity and full body.)',
      image: 'https://www.coffeeness.de/wp-content/uploads/2022/05/Coffee-cherries-spread-out.jpg', // Coffee cherries
    },
    // Americas
    {
      name: '哥倫比亞 惠蘭 (Colombia Huila)',
      tags: '焦糖堅果 (Caramel & Nutty)',
      desc: '均衡醇厚度，帶有甜美焦糖底蘊。 (Balanced body with sweet caramel undertones.)',
      image:
        'https://images.unsplash.com/photo-1633627358345-0b94005cdf4f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Coffee plant
    },
    {
      name: '巴西 喜拉朵 (Brazil Cerrado)',
      tags: '巧克力厚實 (Chocolate & Heavy)',
      desc: '低酸度，帶有奶油巧克力般的口感。 (Low acidity with a creamy, chocolaty mouthfeel.)',
      image:
        'https://www.reuters.com/resizer/v2/L5ZR3R3QWBI5VJKZMMHLMLAWUU.jpg?auth=c502296ce649eb7b1158ae163066ff56b0e3fc752f8e927300efc416b5ea24a0&height=2400&width=1920&quality=80&smart=true', // Reusing Coffee plant for Brazil (Plantation vibe)
    },
    {
      name: '巴拿馬 藝伎 (Panama Geisha)',
      tags: '極致花韻 (Jasmine & Tea-like)',
      desc: '如香水般的茉莉花香與精緻果韻，頂級享受。 (Perfume-like jasmine aroma and delicate fruit notes.)',
      image:
        'https://kava.family/cdn/shop/files/fincadeborahpanamageishakavafamily3_860x.png?v=1755774806',
    },
    // Asia
    {
      name: '印尼 蘇門答臘 (Indonesia Sumatra)',
      tags: '草本厚實 (Earthy & Herbal)',
      desc: '獨特的藥草香氣與極高的醇厚度，酸度極低。 (Unique herbal aroma, heavy body, very low acidity.)',
      image:
        'https://zavida.com/cdn/shop/articles/what-process-ensures-the-best-tasting-sumatra-coffee-262960_1600x.png?v=1715806427', // Green beans/process
    },
  ];

  const roasts = [
    { name: '淺焙 (Light Roast)', desc: '保留原始豆子風味。 (Retains flavor)', color: '#dcb188' },
    { name: '中焙 (Medium Roast)', desc: '酸度與醇厚度平衡。 (Balanced)', color: '#8c5e3c' },
    { name: '深焙 (Dark Roast)', desc: '強烈、煙燻、低酸。 (Bold & Smoky)', color: '#3e2723' },
  ];

  const grinds = [
    { name: '粗研磨 (Coarse)', image: 'https://placeholder.pics/svg/100/3e2723/6B8E6B/Coarse' },
    { name: '中研磨 (Medium)', image: 'https://placeholder.pics/svg/100/3e2723/6B8E6B/Medium' },
    { name: '細研磨 (Fine)', image: 'https://placeholder.pics/svg/100/3e2723/6B8E6B/Fine' },
    { name: '極細研磨 (Extra)', image: 'https://placeholder.pics/svg/100/3e2723/6B8E6B/Extra' },
  ];

  const methods = [
    { name: '手沖 (Pour Over)', icon: 'coffee_maker' },
    { name: '義式濃縮 (Espresso)', icon: 'local_cafe' },
    { name: '法式濾壓壺 (French Press)', icon: 'coffee' },
    { name: '愛樂壓 (Aeropress)', icon: 'opacity' },
  ];

  const ratios = [
    { name: '1:15 (Strong)', desc: '濃郁厚實 (Rich & Bold)', val: 15 },
    { name: '1:16 (Balanced)', desc: '黃金比例 (Golden Ratio)', val: 16 },
    { name: '1:17 (Light)', desc: '清爽明亮 (Clear & Bright)', val: 17 },
    { name: '1:18 (Tea-like)', desc: '茶感淡雅 (Delicate)', val: 18 },
  ];

  // Reactive State
  const selectedOrigin = ref('衣索比亞 耶加雪菲 (Ethiopia Yirgacheffe)');
  const selectedRoast = ref('中焙 (Medium Roast)');
  const selectedGrind = ref('細研磨 (Fine)');
  const selectedRatio = ref('1:16 (Balanced)');
  const selectedMethod = ref('義式濃縮 (Espresso)');
  const pourStages = ref('1 段 (Stage)');
  // const isDrawerOpen = ref(false); // Removed

  // --- Logic Integration ---

  // 1. Parameter Mapping
  // Map UI text to brewLogic numbers
  const roastValue = computed(() => {
    if (selectedRoast.value.includes('淺焙')) return -1;
    if (selectedRoast.value.includes('深焙')) return 1;
    return 0; // Default Medium
  });

  const grindValue = computed(() => {
    if (selectedGrind.value.includes('極細')) return -1; // Treat Extra Fine as Fine (-1)
    if (selectedGrind.value.includes('細')) return -1;
    if (selectedGrind.value.includes('粗')) return 1;
    return 0; // Default Medium
  });

  const ratioValue = computed(() => {
    const match = selectedRatio.value.match(/^1:(\d+)/);
    return match ? parseInt(match[1]) : 16;
  });

  const poursValue = computed(() => {
    if (selectedMethod.value !== '手沖 (Pour Over)') return 3; // Default for non-pour over
    // Extract number from string "1 段 (Stage)"
    const match = pourStages.value.match(/^(\d+)/);
    return match ? parseInt(match[1]) : 3;
  });

  // Create config object for brewLogic (即時選擇)
  const config = computed(() => ({
    roastLevel: roastValue.value,
    ratio: ratioValue.value,
    brewTimeSec: 165, // Default constant (2:45)
    grindLevel: grindValue.value,
    pours: poursValue.value,
    bloomTimeSec: 30, // Default
    waterTempC: 92, // Default
    coffeeDose: 20, // Default
  }));

  // 已確認的設定 (按下開始模擬後才更新)
  const hasSimulated = ref(false);
  const confirmedConfig = ref({
    roastLevel: 0,
    ratio: 16,
    brewTimeSec: 165,
    grindLevel: 0,
    pours: 3,
    bloomTimeSec: 30,
    waterTempC: 92,
    coffeeDose: 20,
  });

  // 滾動目標 Ref
  const flavorPredictionRef = ref<HTMLElement | null>(null);

  // 開始模擬 - 將當前選擇套用到已確認設定
  function startSimulation() {
    confirmedConfig.value = { ...config.value };
    hasSimulated.value = true;

    // 自動滾動到風味預測區塊
    setTimeout(() => {
      flavorPredictionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  // 2. Flavor Calculations (使用已確認的設定)
  const finalProfile = computed<Record<string, number>>(() => {
    if (!hasSimulated.value) {
      // 初始狀態：顯示預設中性值
      return {
        Sweetness: 2.5,
        Acidity: 2.5,
        Clarity: 2.5,
        Body: 2.5,
        Aftertaste: 2.5,
      };
    }
    // 已按下開始模擬：使用已確認的設定計算
    return {
      Sweetness: calculateSweetness(confirmedConfig.value),
      Acidity: calculateAcidity(confirmedConfig.value),
      Clarity: calculateClarity(confirmedConfig.value),
      Body: calculateBody(confirmedConfig.value),
      Aftertaste: calculateAftertaste(confirmedConfig.value),
    };
  });

  const flavorKeys = ['Sweetness', 'Acidity', 'Clarity', 'Body', 'Aftertaste'];
  const flavorEntries = computed(() =>
    flavorKeys.map((key) => ({ key, value: finalProfile.value[key] }))
  );

  const labelMap: Record<string, string> = {
    Sweetness: '甜度',
    Acidity: '酸度',
    Clarity: '澄澈度',
    Body: '醇厚度',
    Aftertaste: '餘韻',
  };

  function getGradient(score: number) {
    if (score >= 4) return 'linear-gradient(90deg, #2c4a3b, #cda873)';
    if (score >= 2.5) return 'linear-gradient(90deg, #6f8b6d, #e6d8c5)';
    return 'linear-gradient(90deg, #b46a5c, #f1ddd3)';
  }

  // 3. AI Assistant Logic
  const assistantOpen = ref(false);
  const assistantMode = ref<string | null>(null);
  const assistantMessages = ref<{ role: string; text: string }[]>([]);
  const userInput = ref('');
  const isAssistantLoading = ref(false);
  const assistantError = ref('');

  // 建構精靈 API 所需的 context
  function buildFairyContext(): FairyContext {
    return {
      origin: selectedOrigin.value,
      roast: selectedRoast.value,
      grind: selectedGrind.value,
      ratio: selectedRatio.value,
      method: selectedMethod.value,
      pourStages: selectedMethod.value === '手沖 (Pour Over)' ? pourStages.value : undefined,
      flavorProfile: {
        sweetness: finalProfile.value.Sweetness,
        acidity: finalProfile.value.Acidity,
        clarity: finalProfile.value.Clarity,
        body: finalProfile.value.Body,
        aftertaste: finalProfile.value.Aftertaste,
      },
    };
  }

  // 轉換對話歷史格式
  function getConversationHistory(): FairyMessage[] {
    return assistantMessages.value.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.text,
    }));
  }

  function triggerAssistant(mode: string) {
    assistantMode.value = mode;
    assistantOpen.value = true;
    buildAssistantSuggestion();
  }

  async function buildAssistantSuggestion() {
    isAssistantLoading.value = true;
    assistantError.value = '';
    assistantMessages.value = [];

    try {
      const context = buildFairyContext();
      let answer: string;

      if (assistantMode.value === 'select') {
        answer = await askFairyToSelect(context);
      } else {
        answer = await askFairyToAdjust(context);
      }

      assistantMessages.value = [{ role: 'assistant', text: answer }];
    } catch (err: any) {
      console.error('Fairy API Error:', err);
      assistantError.value = '抱歉，精靈現在忙碌中，請稍後再試 ☕';
      assistantMessages.value = [{ role: 'assistant', text: assistantError.value }];
    } finally {
      isAssistantLoading.value = false;
    }
  }

  async function sendUserMessage() {
    const content = userInput.value.trim();
    if (!content || isAssistantLoading.value) return;

    // 加入用戶訊息
    assistantMessages.value.push({ role: 'user', text: content });
    userInput.value = '';
    isAssistantLoading.value = true;
    assistantError.value = '';

    try {
      const context = buildFairyContext();
      const history = getConversationHistory().slice(0, -1); // 不包含剛加入的用戶訊息
      const answer = await chatWithFairy(content, context, history);
      assistantMessages.value.push({ role: 'assistant', text: answer });
    } catch (err: any) {
      console.error('Fairy Chat Error:', err);
      assistantMessages.value.push({
        role: 'assistant',
        text: '抱歉，我暫時無法回應，請稍後再試 ☕',
      });
    } finally {
      isAssistantLoading.value = false;
    }
  }
</script>

<style scoped>
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #ced6ce;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #8da390;
  }

  /* Texture */
  .bg-texture {
    background-image: radial-gradient(#e3ebe3 1px, transparent 1px);
    background-size: 32px 32px;
  }

  /* Glass Panel helper since Tailwind JIT arbitrary value for backdrop-filter might be tricky in some versions without plugin */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Animation */
  .fairy-float {
    animation: fairy-float 4s ease-in-out infinite;
  }

  @keyframes fairy-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  /* Drawer Transitions */
  .drawer-fade-enter-active,
  .drawer-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .drawer-fade-enter-from,
  .drawer-fade-leave-to {
    opacity: 0;
  }

  .drawer-slide-enter-active,
  .drawer-slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .drawer-slide-enter-from,
  .drawer-slide-leave-to {
    transform: translateX(100%);
  }
</style>
