<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden antialiased font-wenkai text-[#2C3E2D] selection:bg-[#8FA98F]/30 selection:text-[#2C3E2D] bg-[#F8FAF9] bg-texture">


    <main class="flex-grow flex flex-col items-center w-full px-6 md:px-12 lg:pr-[560px] py-12">
      <div class="max-w-[1400px] w-full">
        <!-- Main Content -->
        <div class="flex flex-col gap-24">
          
          <!-- Intro Section -->
          <div class="flex flex-col gap-8 text-center md:text-left relative pl-0 md:pl-8">
            <div class="hidden md:block absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-[#6B8E6B]/40 to-transparent rounded-full"></div>
            <div class="flex flex-wrap gap-2 items-center justify-center md:justify-start">
              <span class="text-[#6B8E6B] text-xs font-bold tracking-[0.2em] uppercase bg-[#6B8E6B]/10 px-3 py-1 rounded-full">FeiTime 精選 (selection)</span>
            </div>
            <div class="flex flex-col gap-4">
              <h1 class="text-4xl md:text-6xl font-notoserif text-[#2C3E2D] tracking-wide leading-tight">調整您的萃取 <br/><span class="text-3xl md:text-5xl text-[#5C6B5D] font-light">Configure Your Extraction</span></h1>
              <p class="text-[#5C6B5D] text-lg max-w-2xl font-light leading-relaxed">
                選擇您的參數以模擬完美沖煮，探索全新風味輪廓。和諧的平衡正等待著您。
                <span class="block text-sm mt-2 opacity-70">Select your parameters to simulate the perfect brew and discover new flavor profiles. A harmonious balance awaits.</span>
              </p>
            </div>
          </div>

          <!-- Select Origin -->
          <div class="flex flex-col gap-10 relative group/section">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">選擇產地 <span class="text-base text-[#5C6B5D] font-light ml-2">Select Origin</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">01</span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5">
                <CoffeeFairyIcon />
              </div>
              <div class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20">
                <h4 class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2">
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
                :class="selectedOrigin === origin.name ? 'shadow-soft ring-1 ring-[#8FA98F] transform -translate-y-1' : 'hover:shadow-card hover:bg-white border border-transparent hover:border-[#8FA98F]/30'"
              >
                <div v-if="selectedOrigin === origin.name" class="absolute top-4 right-4 bg-[#8FA98F] text-white rounded-full p-1 z-10 shadow-md">
                  <span class="material-symbols-outlined text-sm block">check</span>
                </div>
                <div 
                  class="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover overflow-hidden relative transition-all duration-500"
                  :class="selectedOrigin === origin.name ? '' : 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'"
                  :style="{ backgroundImage: `url(${origin.image})` }"
                >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" v-if="selectedOrigin === origin.name"></div>
                  <div class="absolute inset-0 bg-[#6B8E6B]/10 mix-blend-overlay" v-if="selectedOrigin === origin.name"></div>
                  <div class="absolute inset-0 bg-[#6B8E6B]/5 mix-blend-overlay" v-else></div>
                </div>
                <div class="p-6 flex flex-col gap-3">
                  <p class="text-[#2C3E2D] text-lg font-notoserif" :class="{'font-medium': selectedOrigin === origin.name}">{{ origin.name }}</p>
                  <p 
                    class="text-xs tracking-widest uppercase font-bold transition-colors"
                    :class="selectedOrigin === origin.name ? 'text-[#8FA98F]' : 'text-[#8DA390] group-hover:text-[#8FA98F]'"
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
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">烘焙度 <span class="text-base text-[#5C6B5D] font-light ml-2">Roast Level</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">02</span>
            </div>
             <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5">
                <CoffeeFairyIcon />
              </div>
              <div class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20">
                <h4 class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2">
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
                :class="selectedRoast === roast.name 
                  ? 'bg-gradient-to-r from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft relative' 
                  : 'bg-white group hover:shadow-card border border-[#E6EBE6] hover:border-[#8FA98F]/30'"
              >
                <div v-if="selectedRoast === roast.name" class="absolute top-3 right-3 text-[#8FA98F]">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                </div>
                <div 
                  class="size-12 rounded-full shadow-sm flex-shrink-0 transition-all"
                  :class="selectedRoast === roast.name ? 'ring-4 ring-white shadow-md' : 'ring-4 ring-[#F2F7F2] group-hover:ring-[#6B8E6B]/20'"
                  :style="{ backgroundColor: roast.color }"
                ></div>
                <div>
                  <p class="font-notoserif text-lg text-[#2C3E2D]" :class="{'font-medium': selectedRoast === roast.name}">{{ roast.name }}</p>
                  <p 
                    class="text-xs mt-1"
                    :class="selectedRoast === roast.name ? 'text-[#8FA98F] font-medium uppercase tracking-wide' : 'text-[#8DA390] font-light'"
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
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">研磨度 <span class="text-base text-[#5C6B5D] font-light ml-2">Grind Size</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">03</span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
               <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5">
                <CoffeeFairyIcon />
              </div>
              <div class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20">
                 <h4 class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2">
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
                :class="selectedGrind === grind.name 
                  ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft relative' 
                  : 'bg-white group hover:bg-white hover:shadow-card border border-transparent hover:border-[#8FA98F]/30'"
              >
                <div v-if="selectedGrind === grind.name" class="absolute top-2 right-2 text-[#8FA98F]">
                  <span class="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
                <div 
                  class="size-16 rounded-full bg-cover transition-all mix-blend-multiply"
                  :class="selectedGrind === grind.name ? 'ring-4 ring-white' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90'"
                  :style="{ backgroundImage: `url(${grind.image})` }"
                ></div>
                <span 
                  class="text-xs uppercase tracking-widest"
                  :class="selectedGrind === grind.name ? 'font-bold text-[#8FA98F]' : 'font-medium text-[#8DA390] group-hover:text-[#2C3E2D]'"
                >{{ grind.name }}</span>
              </div>
            </div>
          </div>

          <!-- Ratio (Water to Coffee) -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">粉水比 <span class="text-base text-[#5C6B5D] font-light ml-2">Ratio</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">04</span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5">
                <CoffeeFairyIcon />
              </div>
              <div class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20">
                <h4 class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2">
                  咖啡精靈 (Coffee Fairy)
                  <span class="w-1 h-1 rounded-full bg-[#8FA98F]"></span>
                </h4>
                <p class="text-sm text-[#5C6B5D] font-notoserif leading-relaxed italic">
                  「粉水比是濃淡的魔法。1:15 濃郁帶勁，適合加奶；1:18 清爽如茶，最能展現產地花果香。」
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                v-for="r in ratios" 
                :key="r.name"
                @click="selectedRatio = r.name"
                class="cursor-pointer flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all border group relative"
                :class="selectedRatio === r.name 
                  ? 'bg-gradient-to-br from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent' 
                  : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'"
              >
                <div v-if="selectedRatio === r.name" class="absolute top-2 right-2 text-[#8FA98F]">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                </div>
                <!-- Visual for Ratio -->
                <div class="flex items-end gap-1 mb-2 h-12">
                   <div class="w-3 bg-[#3e2723] rounded-sm" :style="{ height: '24px' }"></div> <!-- Coffee dose constant visualization -->
                   <div class="w-8 border-2 border-[#8FA98F]/50 rounded-sm relative overflow-hidden bg-white">
                      <!-- Water visualization -->
                      <div class="absolute bottom-0 left-0 right-0 bg-[#8FA98F]/30 transition-all duration-500" :style="{ height: ((r.val - 12) / 8) * 100 + '%' }"></div>
                   </div>
                </div>

                <p class="font-notoserif text-lg text-[#2C3E2D]" :class="{'font-medium': selectedRatio === r.name}">{{ r.name.split(' ')[0] }}</p>
                <p 
                  class="text-[10px] uppercase tracking-wider text-center"
                  :class="selectedRatio === r.name ? 'text-[#8FA98F] font-bold' : 'text-[#8DA390] font-light'"
                >
                  {{ r.desc }}
                </p>
              </div>
            </div>
          </div>

          <!-- Brew Method -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">沖煮方式 <span class="text-base text-[#5C6B5D] font-light ml-2">Brew Method</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">05</span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float p-1.5">
                <CoffeeFairyIcon />
              </div>
              <div class="relative bg-[#F2F7F2]/50 hover:bg-[#F2F7F2] transition-colors p-3 rounded-2xl rounded-tl-none border border-[#8FA98F]/20">
                <h4 class="text-[10px] font-bold text-[#6B8E6B] uppercase tracking-widest mb-1 flex items-center gap-2">
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
                  :class="selectedMethod === method.name 
                    ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent' 
                    : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'"
                >
                   <button class="w-full flex flex-col items-center justify-center gap-4 p-4">
                    <div v-if="selectedMethod === method.name" class="absolute top-3 right-3 text-[#8FA98F]">
                       <span class="material-symbols-outlined text-sm">check_circle</span>
                    </div>
                    <span 
                      class="material-symbols-outlined text-4xl transition-colors font-light"
                      :class="selectedMethod === method.name ? 'text-[#8FA98F]' : 'text-[#8DA390] group-hover:text-[#8FA98F]'"
                    >{{ method.icon }}</span>
                    <span 
                      class="text-xs uppercase tracking-widest font-medium"
                      :class="selectedMethod === method.name ? 'text-[#2C3E2D] font-bold' : 'text-[#8DA390] group-hover:text-[#2C3E2D]'"
                    >{{ method.name }}</span>
                  </button>
                  <div class="flex flex-col items-center border-t border-[#E6EBE6]/50 pt-3 gap-2" @click.stop>
                    <label class="text-[10px] uppercase tracking-wider text-[#8DA390] font-medium" for="pour-stages">注水段數 (Stages)</label>
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
                  :class="selectedMethod === method.name 
                    ? 'bg-gradient-to-b from-white to-[#F2F7F2] ring-1 ring-[#8FA98F] shadow-soft border-transparent' 
                    : 'bg-white hover:bg-white hover:shadow-card border-transparent hover:border-[#8FA98F]/30'"
                >
                  <div v-if="selectedMethod === method.name" class="absolute top-3 right-3 text-[#8FA98F]">
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                  </div>
                  <span 
                    class="material-symbols-outlined text-4xl font-light transition-colors"
                    :class="selectedMethod === method.name ? 'text-[#8FA98F]' : 'text-[#8DA390] group-hover:text-[#8FA98F]'"
                  >{{ method.icon }}</span>
                  <span 
                    class="text-xs uppercase tracking-widest"
                    :class="selectedMethod === method.name ? 'text-[#2C3E2D] font-bold' : 'text-[#8DA390] font-medium group-hover:text-[#2C3E2D]'"
                  >{{ method.name }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Ultra Simulator Promo -->
           <div class="relative w-full rounded-2xl overflow-hidden bg-[#2C3E2D] text-white shadow-2xl group cursor-pointer border border-white/10">
            <div class="absolute inset-0 bg-gradient-to-br from-[#2C3E2D] via-[#2C3E2D] to-[#6B8E6B]/40 opacity-100"></div>
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-[#6B8E6B]/20 rounded-full blur-3xl transition-all duration-500 group-hover:bg-[#6B8E6B]/30"></div>
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-[#8FA98F]/10 rounded-full blur-3xl transition-all duration-500 group-hover:bg-[#8FA98F]/20"></div>
            <div class="relative z-10 px-8 py-12 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3 mb-1 justify-center md:justify-start">
                  <div class="h-6 w-6 text-[#8FA98F] animate-pulse">
                    <CoffeeFairyIcon />
                  </div>
                  <span class="text-[10px] font-bold text-[#8FA98F] uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">精靈推薦 (Recommendation)</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-notoserif text-white leading-snug">
                  還不夠過癮嗎? <br class="md:hidden"/>
                  <span class="text-[#8FA98F] font-medium">Not feeling enough?</span>
                </h2>
                <p class="text-[#F2F7F2]/80 text-lg font-light tracking-wide">
                   歡迎嘗試我們的 <span class="text-white font-medium border-b border-[#8FA98F]">進階模擬器 (Ultra Simulator)</span> 進行精細控制。
                   <br class="hidden md:block">
                   <span class="text-sm opacity-60">welcome to try our ultra simulator for granular control.</span>
                </p>
              </div>
              <div class="shrink-0">
                <button class="bg-white text-[#2C3E2D] hover:bg-[#8FA98F] hover:text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group-hover:scale-105">
                  試用進階模擬器 (Try)
                  <span class="material-symbols-outlined text-lg">science</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Sidebar -->

        <!-- Fixed Sidebar (Right Column) - Responsive Adjustment -->
        <div class="block w-full lg:fixed lg:top-0 lg:right-0 lg:w-[400px] lg:h-screen lg:pt-24 lg:pb-8 lg:pr-6 z-30 lg:z-40 mt-16 lg:mt-0">
           <div class="flex flex-col gap-6 p-6 lg:h-full lg:overflow-y-auto lg:pr-2 bg-white lg:bg-[#F8FAF9]/95 lg:backdrop-blur-sm lg:custom-scrollbar rounded-xl lg:rounded-l-xl lg:rounded-r-none shadow-sm lg:shadow-lg border border-[#E6EBE6] lg:border-r-0 lg:border-t-0 lg:border-b-0 lg:border-l">
              
              <!-- Sidebar Header -->
              <div class="flex items-center justify-between pb-4 border-b border-[#E6EBE6]">
                 <div>
                    <h3 class="text-xl font-notoserif text-[#2C3E2D]">萃取摘要</h3>
                    <p class="text-xs text-[#5C6B5D] font-light uppercase tracking-wider">Extraction Summary</p>
                 </div>
              </div>

               <!-- Sidebar Content -->
               <div class="flex flex-col gap-6">
                  <!-- Summary Cards -->
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-[#E6EBE6]">
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">產地 (Origin)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ selectedOrigin }}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">烘焙 (Roast)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ selectedRoast }}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">研磨 (Grind)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ selectedGrind }}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">粉水比 (Ratio)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ selectedRatio.split(' ')[0] }}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">方式 (Method)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ selectedMethod }}</span>
                        </div>
                         <div class="flex justify-between items-center text-sm" v-if="selectedMethod === '手沖 (Pour Over)'">
                          <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">段數 (Stages)</span>
                          <span class="font-notoserif text-[#2C3E2D] text-right text-base">{{ pourStages }}</span>
                        </div>
                    </div>
                    
                     <button class="w-full mt-6 bg-[#2C3E2D] hover:bg-[#6B8E6B] text-white font-medium text-sm tracking-widest uppercase py-3 px-6 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#6B8E6B]/20 rounded-lg">
                      開始模擬 (Start)
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                  
                  <div class="flex gap-4 p-4 bg-[#F8FAF9] border border-[#E6EBE6] items-start rounded-xl">
                    <span class="material-symbols-outlined text-[#8FA98F] mt-0.5 text-lg font-light">spa</span>
                    <div>
                      <p class="text-sm font-notoserif font-medium mb-1 text-[#2C3E2D]">關於研磨度</p>
                      <p class="text-xs leading-relaxed text-[#5C6B5D] font-light">細研磨會增加萃取表面積，非常適合義式濃縮等快速高壓沖煮法。</p>
                    </div>
                  </div>

                   <!-- Flavor Prediction -->
                  <div class="bg-white p-5 border border-[#E6EBE6] rounded-xl shadow-sm flex flex-col gap-6">
                      <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-[#273c35] border-l-2 border-[#6B8E6B] pl-2">風味預測 (Prediction)</h3>
                       <div class="flex flex-col gap-6">
                        <FlavorRadar :scores="finalProfile" :label-map="labelMap" />
                        <div class="flex flex-col gap-2">
                            <div v-for="item in flavorEntries" :key="item.key" class="flex items-center">
                              <span class="w-14 text-[12px] text-[#273c35] font-medium">{{ labelMap[item.key] }}</span>
                              <div class="mx-2 flex-1 h-1.5 overflow-hidden rounded-full bg-[#F2F7F2]">
                                <div class="h-full rounded-full transition-[width] duration-300 ease-out shadow-sm"
                                  :style="{ width: (item.value / 5) * 100 + '%', background: getGradient(item.value) }">
                                </div>
                              </div>
                              <span class="w-7 text-right text-[11px] text-[#5C6B5D] font-mono">{{ item.value.toFixed(1) }}</span>
                            </div>
                          </div>
                      </div>
                  </div>

                   <!-- AI Assistant -->
                   <div class="bg-white p-5 border border-[#E6EBE6] rounded-xl shadow-sm flex flex-col gap-4">
                      <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-[#273c35] flex items-center gap-2">
                         <span class="material-symbols-outlined text-sm text-[#8FA98F]">smart_toy</span>
                         AI 小助手
                      </h3>
                      <div class="flex flex-wrap gap-2">
                         <button
                          type="button"
                          class="flex-1 bg-[#F2F7F2] hover:bg-[#E6EBE6] text-[#2C3E2D] px-3 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors"
                          @click="triggerAssistant('select')"
                        >
                          幫我選 (Pick)
                        </button>
                        <button
                          type="button"
                          class="flex-1 bg-[#F2F7F2] hover:bg-[#E6EBE6] text-[#2C3E2D] px-3 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors"
                          @click="triggerAssistant('adjust')"
                        >
                          幫我調整 (Adjust)
                        </button>
                      </div>
                      
                      <div v-if="assistantOpen" class="rounded-xl bg-[#F8FAF9] p-3 border border-[#E6EBE6]">
                        <div class="mb-3 max-h-40 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                          <div v-for="(msg, idx) in assistantMessages" :key="idx"
                            :class="['rounded-lg px-3 py-2 text-xs leading-relaxed max-w-[90%]', msg.role === 'assistant' ? 'bg-white border border-[#E6EBE6] text-[#2C3E2D] self-start' : 'ml-auto bg-[#6B8E6B] text-white self-end']">
                            <p class="m-0">{{ msg.text }}</p>
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
                            class="h-[34px] w-[34px] flex items-center justify-center rounded-lg bg-[#2C3E2D] text-white hover:bg-[#3E5240]"
                            @click="sendUserMessage"
                          >
                            <span class="material-symbols-outlined text-base">send</span>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Options Data
const origins = [
  {
    name: '衣索比亞 耶加雪菲 (Ethiopia Yirgacheffe)',
    tags: '明亮花香 (Bright & Floral)',
    desc: '以茶感醇厚度與複雜柑橘調性聞名。 (Known for its tea-like body and complex citrus notes.)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyVaxwV2ge2M6RLpTjAwtGuORx9laP7jCc_s2xqKYzBrUm7wXAKKYuyBTJFZYv-jxouPs9_t2GpqfJ-J0uBTL7Jwd-3OLvWY_M6J5iV3_9Se1C4My-2irByIvbOuBeZt8vhC32Qb5rXTzmgf6K_v_pHY1vyxuW99jJyc0CYojmqJGNkwk5KYLKhQ5cGXOh84FRhv6CBZhf8FBnd_lEPy8sti-Q2rXqXwMCQRqx7XtCIg_8rz4E_aaO2EzH-dT0dPeNYkL5OnZA_rLt'
  },
  {
    name: '哥倫比亞 惠蘭 (Colombia Huila)',
    tags: '焦糖堅果 (Caramel & Nutty)',
    desc: '均衡醇厚度，帶有甜美焦糖底蘊。 (Balanced body with sweet caramel undertones.)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHbm_nZwqTouOlXAh3cV8cgdepIAWcF6JcHjPazB5HGV4K4_9tXt4pyiEIZS0lbxXlqVmjOjdNEX2g0icX3B3yrFh0EaRAvjDlU9xCl8WFjpukvnJ4vnUrw3KaXgr5YYHLl8-lFjnmdId6gj1XN_RAqTyCcOWiDR-4qvjWkUZAgYd5W1OnFKoX6AHKQiqbwqYR102pZvJ8MERbLddD6za5ncOPASXH43jWxv3Y1_pHi74fdVNO4zJwEBxcMVPFekxLH2HqNObhkoYL'
  },
  {
    name: '巴西 喜拉朵 (Brazil Cerrado)',
    tags: '巧克力厚實 (Chocolate & Heavy)',
    desc: '低酸度，帶有奶油巧克力般的口感。 (Low acidity with a creamy, chocolaty mouthfeel.)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg3zIpBNrmvK2nr73bXsN85bC8oAQE8G3KIx_3gfAm9eo9v8qkrO-NRcuM4IMmnGCAeFyNac19oVgVOuioy2g8ONsMr7x6edDQSb7fG8Fns4sYZtVAWszE0vchIG3DMDOqFRx5cC9aAYY6Nlbsx5BXt78hiSP1IM5hIMoHg9AFIDZ9PWOLNqTFHuhG9YfUXkxDjmU2aUkXPq_5LN4qRNGH_isqN_yeNEqtSWsoc8rqaIWdNzw3TRqpFjyrLY_86vKkyqnT1TiLzH7a'
  }
];

const roasts = [
  { name: '淺焙 (Light Roast)', desc: '保留原始豆子風味。 (Retains flavor)', color: '#dcb188' },
  { name: '中焙 (Medium Roast)', desc: '酸質與醇厚度平衡。 (Balanced)', color: '#8c5e3c' },
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
import FlavorRadar from '@/components/FlavorRadar.vue';
import GeminiTestButton from '@/components/GeminiTestButton.vue';
import CoffeeFairyIcon from '@/components/common/CoffeeFairyIcon.vue';
import {
  calculateSweetness,
  calculateAcidity,
  calculateClarity,
  calculateBody,
  calculateAftertaste
// @ts-ignore
} from '@/utils/brewLogic.js';
import { computed } from 'vue';

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

// Create config object for brewLogic
const config = computed(() => ({
  roastLevel: roastValue.value,
  ratio: ratioValue.value,
  brewTimeSec: 165, // Default constant (2:45)
  grindLevel: grindValue.value,
  pours: poursValue.value,
  bloomTimeSec: 30, // Default
  waterTempC: 92, // Default
  coffeeDose: 20 // Default
}));

// 2. Flavor Calculations
const finalProfile = computed<Record<string, number>>(() => ({
  Sweetness: calculateSweetness(config.value),
  Acidity: calculateAcidity(config.value),
  Clarity: calculateClarity(config.value),
  Body: calculateBody(config.value),
  Aftertaste: calculateAftertaste(config.value)
}));

const flavorKeys = ['Sweetness', 'Acidity', 'Clarity', 'Body', 'Aftertaste'];
const flavorEntries = computed(() =>
  flavorKeys.map((key) => ({ key, value: finalProfile.value[key] }))
);

const labelMap: Record<string, string> = {
  Sweetness: '甜度',
  Acidity: '酸質',
  Clarity: '清晰度',
  Body: '醇厚度',
  Aftertaste: '餘韻'
};

function getGradient(score: number) {
  if (score >= 4) return 'linear-gradient(90deg, #2c4a3b, #cda873)';
  if (score >= 2.5) return 'linear-gradient(90deg, #6f8b6d, #e6d8c5)';
  return 'linear-gradient(90deg, #b46a5c, #f1ddd3)';
}

// 3. AI Assistant Logic
const assistantOpen = ref(false);
const assistantMode = ref<string | null>(null);
const assistantMessages = ref<{role: string, text: string}[]>([]);
const userInput = ref('');

function triggerAssistant(mode: string) {
  assistantMode.value = mode;
  assistantOpen.value = true;
  buildAssistantSuggestion();
}

function buildAssistantSuggestion() {
  const profile = finalProfile.value;
  const parts = [];

  if (profile.Acidity >= 4) {
    parts.push('目前酸質偏高，適合喜歡明亮果酸的配方。');
  } else if (profile.Acidity <= 2.2) {
    parts.push('目前酸質較低，整體會偏向可可、堅果調性。');
  }

  if (profile.Body >= 4) {
    parts.push('醇厚度較高，口感會像奶茶一樣有份量。');
  } else if (profile.Body <= 2.2) {
    parts.push('醇厚度偏薄，適合早晨想喝得清爽一點的時候。');
  }

  if (profile.Clarity >= 3.5) {
    parts.push('清晰度良好，風味輪廓會比較乾淨。');
  }

  let action = '';
  if (assistantMode.value === 'select') {
    action = '我幫你抓了一個「日常均衡杯」的方向：維持現有設定，這是一個不錯的起點。';
  } else if (assistantMode.value === 'adjust') {
    action = '如果你想再微調，建議先試著改變研磨度，觀察風味的變化。';
  }

  const text = [action, ...parts].join(' ');
  assistantMessages.value = [{ role: 'assistant', text }];
}

function sendUserMessage() {
  const content = userInput.value.trim();
  if (!content) return;
  assistantMessages.value.push({ role: 'user', text: content });
  userInput.value = '';
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
    background: #CED6CE;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #8DA390;
}

/* Texture */
.bg-texture {
    background-image: radial-gradient(#E3EBE3 1px, transparent 1px);
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
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
