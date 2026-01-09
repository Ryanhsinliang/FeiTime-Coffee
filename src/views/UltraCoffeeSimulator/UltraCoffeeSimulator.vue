<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden antialiased font-sans text-[#2C3E2D] selection:bg-[#8FA98F]/30 selection:text-[#2C3E2D] bg-[#F8FAF9] bg-texture">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full glass-panel border-b border-[#E6EBE6]/60 transition-all duration-300">
      <div class="px-6 md:px-12 py-5 flex items-center justify-between max-w-[1400px] mx-auto w-full">
        <div class="flex items-center gap-3 group cursor-pointer">
          <div class="size-8 text-[#6B8E6B] group-hover:text-[#2C3E2D] transition-colors duration-300">
            <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_543)">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                <path clip-rule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fill-rule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 class="text-[#2C3E2D] text-xl font-notoserif font-medium leading-tight tracking-wide">FeiTime</h2>
        </div>
        <div class="hidden md:flex flex-1 justify-end gap-12 items-center">
          <nav class="flex items-center gap-10">
            <a class="text-[#5C6B5D] hover:text-[#6B8E6B] text-xs uppercase tracking-widest font-semibold transition-colors" href="#">商店 (shop)</a>
            <a class="text-[#5C6B5D] hover:text-[#6B8E6B] text-xs uppercase tracking-widest font-semibold transition-colors" href="#">故事 (story)</a>
            <a class="text-[#2C3E2D] font-bold text-xs uppercase tracking-widest border-b-2 border-[#6B8E6B] pb-0.5" href="#">模擬器 (simulator)</a>
          </nav>
          <div class="flex gap-6 items-center">
            <span class="material-symbols-outlined text-lg text-[#2C3E2D] hover:text-[#6B8E6B] transition-colors cursor-pointer">shopping_bag</span>
            <span class="material-symbols-outlined text-lg text-[#2C3E2D] hover:text-[#6B8E6B] transition-colors cursor-pointer">person</span>
          </div>
        </div>
        <button class="md:hidden text-[#2C3E2D]">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>

    <main class="flex-grow flex flex-col items-center w-full px-6 md:px-12 py-12">
      <div class="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-8 flex flex-col gap-24">
          
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
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float">
                <span class="material-symbols-outlined text-xl">auto_awesome</span>
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
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float">
                <span class="material-symbols-outlined text-xl">auto_awesome</span>
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
               <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float">
                <span class="material-symbols-outlined text-xl">auto_awesome</span>
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

          <!-- Brew Method -->
          <div class="flex flex-col gap-10 relative">
            <div class="flex items-baseline justify-between border-b border-[#E6EBE6] pb-4">
              <h2 class="text-2xl font-notoserif text-[#2C3E2D]">沖煮方式 <span class="text-base text-[#5C6B5D] font-light ml-2">Brew Method</span></h2>
              <span class="text-[#6B8E6B]/10 text-6xl font-notoserif absolute -top-8 -left-16 font-light">04</span>
            </div>
            <div class="flex gap-4 items-start -mt-4 mb-4 max-w-2xl">
              <div class="size-10 rounded-full bg-[#F2F7F2] border border-[#8FA98F]/30 flex items-center justify-center text-[#8FA98F] shadow-sm shrink-0 fairy-float">
                <span class="material-symbols-outlined text-xl">auto_awesome</span>
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
                  <span class="material-symbols-outlined text-[#8FA98F] animate-pulse">auto_awesome</span>
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
        <div class="lg:col-span-4 relative">
          <div class="sticky top-32 flex flex-col gap-8">
            <div class="glass-panel p-8 flex flex-col gap-8 relative overflow-hidden shadow-card border border-white/50 rounded-xl backdrop-blur-xl">
              <div class="absolute -top-10 -right-10 size-64 bg-[#6B8E6B]/10 rounded-full blur-3xl"></div>
              <div class="border-b border-[#5C6B5D]/10 pb-4 z-10">
                <h3 class="text-xl font-notoserif text-[#2C3E2D] mb-2">萃取摘要 (Summary)</h3>
                <p class="text-sm text-[#5C6B5D] font-light">開始前請檢視您選擇的參數。</p>
              </div>
              <div class="flex flex-col gap-5 z-10">
                <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                  <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">產地 (Origin)</span>
                  <span class="font-notoserif text-[#2C3E2D] text-right text-lg">{{ selectedOrigin }}</span>
                </div>
                <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                  <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">烘焙 (Roast)</span>
                  <span class="font-notoserif text-[#2C3E2D] text-right text-lg">{{ selectedRoast }}</span>
                </div>
                <div class="flex justify-between items-center text-sm border-b border-dashed border-[#5C6B5D]/20 pb-2">
                  <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">研磨 (Grind)</span>
                  <span class="font-notoserif text-[#2C3E2D] text-right text-lg">{{ selectedGrind }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">方式 (Method)</span>
                  <span class="font-notoserif text-[#2C3E2D] text-right text-lg">{{ selectedMethod }}</span>
                </div>
                 <div class="flex justify-between items-center text-sm" v-if="selectedMethod === '手沖 (Pour Over)'">
                  <span class="text-[#8DA390] font-medium uppercase tracking-wider text-xs">段數 (Stages)</span>
                  <span class="font-notoserif text-[#2C3E2D] text-right text-lg">{{ pourStages }}</span>
                </div>
              </div>
              <div class="bg-white/60 p-5 border border-white rounded-lg z-10">
                <p class="text-[10px] font-bold text-[#8DA390] uppercase tracking-widest mb-3">預測風味 (Projected Profile)</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-[#5C6B5D] text-xs px-3 py-1 bg-white border border-[#E6EBE6] shadow-sm rounded-md">明亮酸質 (Acidic)</span>
                  <span class="text-[#5C6B5D] text-xs px-3 py-1 bg-white border border-[#E6EBE6] shadow-sm rounded-md">柑橘 (Citrus)</span>
                  <span class="text-[#5C6B5D] text-xs px-3 py-1 bg-white border border-[#E6EBE6] shadow-sm rounded-md">花香 (Floral)</span>
                  <span class="text-[#5C6B5D] text-xs px-3 py-1 bg-white border border-[#E6EBE6] shadow-sm rounded-md">中等醇厚 (Body)</span>
                </div>
              </div>
              <button class="w-full bg-[#2C3E2D] hover:bg-[#6B8E6B] text-white font-medium text-sm tracking-widest uppercase py-4 px-6 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#6B8E6B]/20 z-10 rounded-lg">
                開始模擬 (Start)
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div class="flex gap-4 p-6 bg-white border border-[#E6EBE6]/60 items-start shadow-soft rounded-xl">
              <span class="material-symbols-outlined text-[#8FA98F] mt-1 font-light">spa</span>
              <div>
                <p class="text-sm font-notoserif font-medium mb-2 text-[#2C3E2D]">關於研磨度的小提示 (Note)</p>
                <p class="text-xs leading-relaxed text-[#5C6B5D] font-light">細研磨會增加萃取表面積，非常適合義式濃縮等快速高壓沖煮法。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="w-full border-t border-[#E6EBE6]/50 py-12 mt-10 bg-[#F2F7F2]">
      <div class="max-w-[1400px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="size-6 text-[#6B8E6B]">
            <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <span class="text-[#5C6B5D] text-xs tracking-widest uppercase font-bold">FeiTime Coffee</span>
        </div>
        <p class="text-[#8DA390] text-xs">© 2024 FeiTime. 專為完美的一杯而設計。</p>
      </div>
    </footer>
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

// Reactive State
const selectedOrigin = ref('衣索比亞 耶加雪菲 (Ethiopia Yirgacheffe)');
const selectedRoast = ref('中焙 (Medium Roast)');
const selectedGrind = ref('細研磨 (Fine)');
const selectedMethod = ref('義式濃縮 (Espresso)');
const pourStages = ref('1 段 (Stage)');

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
</style>
