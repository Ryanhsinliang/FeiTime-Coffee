<!-- src/views/CoffeeSimulator.vue -->
<template>
  <div
    class="min-h-screen w-full overflow-hidden bg-stone-50 text-stone-800 font-sans flex flex-col md:flex-row"
  >
    <!-- Sidebar -->
    <aside
      class="w-full md:w-80 lg:w-96 bg-stone-100/50 text-stone-700 px-6 py-6 flex flex-col border-b md:border-b-0 md:border-r border-stone-200"
    >
      <!-- Logo -->
      <div class="mb-8 mt-2">
        <div class="text-center text-3xl tracking-[0.25em] font-light text-stone-800">
          FeiTime<span class="text-amber-700">.</span>
        </div>
        <div class="text-center text-[0.65rem] tracking-[0.4em] uppercase text-stone-400 mt-2">
          Hand Brew Simulator
        </div>
      </div>

      <!-- Sidebar content -->
      <div class="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
        <!-- Bean type -->
        <div class="flex flex-col border-b border-stone-200 pb-4">
          <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-2">
            Coffee Bean
          </span>
          <div class="relative">
            <select
              class="w-full appearance-none rounded-none bg-transparent text-stone-800 text-sm py-2 border-none outline-none focus:ring-0 font-medium cursor-pointer"
            >
              <option>Arabica</option>
              <option>Robusta</option>
              <option>Both</option>
            </select>
            <span class="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">▼</span>
          </div>
        </div>

        <!-- Brew name -->
        <div class="flex flex-col border-b border-stone-200 pb-4">
          <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1">
            Recipe Name
          </span>
          <input
            type="text"
            value="MENDO BLENDO"
            class="bg-transparent border-none outline-none text-lg text-stone-800 placeholder:text-stone-300 font-light"
          />
        </div>

        <!-- Ratio / Total time -->
        <div class="grid grid-cols-2 gap-8 border-b border-stone-200 pb-4">
          <div>
            <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1 block">
              Ratio
            </span>
            <div class="text-xl font-light text-stone-800">1:17.2</div>
          </div>
          <div>
            <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1 block">
              Time
            </span>
            <div class="text-xl font-light text-stone-800">01:57</div>
          </div>
        </div>

        <!-- Temperature -->
        <div class="flex flex-col border-b border-stone-200 pb-4">
          <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1">
            Water Temp
          </span>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-light text-stone-800">92.0</span>
            <span class="text-sm text-stone-400">°C</span>
          </div>
        </div>

        <!-- Pouring structure title -->
        <div class="border-b border-stone-200 pb-4">
           <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-3 block">
            Pour Structure
          </span>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <span class="text-xs text-stone-500 mb-1 block">Steps</span>
              <div class="text-xl font-light">3</div>
            </div>
            <div>
              <span class="text-xs text-stone-500 mb-1 block">Bloom</span>
              <div class="text-xl font-light">30s</div>
            </div>
          </div>
        </div>

        <!-- Grind / Bean weight -->
        <div class="grid grid-cols-2 gap-8 border-b border-stone-200 pb-4">
          <div>
            <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1 block">
              Grind
            </span>
            <div class="text-lg font-light text-stone-800">Medium</div>
          </div>
          <div>
            <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-1 block">
              Dose
            </span>
            <div class="text-lg font-light text-stone-800">20.0g</div>
          </div>
        </div>

        <!-- Note -->
        <div class="flex flex-col pt-2">
          <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase mb-2">
            Notes
          </span>
          <textarea
            rows="2"
            class="w-full bg-stone-200/50 rounded-md border-none outline-none text-sm text-stone-700 p-3 placeholder:text-stone-400 resize-none focus:ring-1 focus:ring-amber-200"
            placeholder="Tasting notes..."
          ></textarea>
        </div>
      </div>

      <!-- Sidebar footer -->
      <div class="mt-6 pt-4 border-t border-stone-200">
        <div class="flex gap-2 mb-4 justify-between items-center">
             <span class="text-[0.65rem] text-stone-400 tracking-[0.15em] uppercase">
            Save Slot
          </span>
          <div class="flex gap-1">
             <button class="w-8 h-8 rounded-full border border-amber-600 text-amber-700 text-xs flex items-center justify-center bg-amber-50">1</button>
             <button class="w-8 h-8 rounded-full border border-stone-200 text-stone-400 text-xs flex items-center justify-center hover:border-stone-300">2</button>
             <button class="w-8 h-8 rounded-full border border-stone-200 text-stone-400 text-xs flex items-center justify-center hover:border-stone-300">3</button>
          </div>
        </div>
        <button
          class="w-full bg-stone-800 hover:bg-stone-700 text-stone-50 font-medium tracking-[0.15em] uppercase text-xs py-4 rounded-sm transition-colors shadow-sm"
        >
          Save Recipe
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col bg-white">
      <!-- Top stats bar -->
      <header
        class="min-h-[80px] bg-white border-b border-stone-100 flex items-stretch px-4 md:px-8 gap-8 md:gap-16 overflow-x-auto"
      >
        <div class="flex flex-col justify-center min-w-fit">
           <span class="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase mb-1">
            Timer
          </span>
          <span class="text-3xl font-light text-stone-800">
            01:57
          </span>
        </div>
        
        <div class="flex gap-8 md:gap-16 items-center flex-1">
           <div class="flex flex-col justify-center">
             <span class="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase mb-1">
              Flow Rate
            </span>
             <span class="text-xl font-light text-stone-700">1.2 <small class="text-sm">g/s</small></span>
           </div>
           
            <div class="flex flex-col justify-center">
             <span class="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase mb-1">
              Water Used
            </span>
             <span class="text-xl font-light text-stone-700">143.4 <small class="text-sm">g</small></span>
           </div>
           
            <div class="flex flex-col justify-center">
             <span class="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase mb-1">
              Yield
            </span>
             <span class="text-xl font-light text-stone-700">136.7 <small class="text-sm">g</small></span>
           </div>
        </div>
      </header>

      <!-- Graph area -->
      <section
        class="flex-1 relative bg-stone-50 flex items-end justify-center overflow-hidden"
      >
        <!-- Grid pattern -->
        <div
          class="absolute inset-0 opacity-30"
          style="background-image: radial-gradient(#d6d3d1 1px, transparent 1px); background-size: 24px 24px;"
        ></div>

        <!-- Simulated curve -->
        <!-- Water Line (Blue-ish Grey) -->
         <svg class="absolute bottom-0 left-0 w-full h-[70%] z-10 opacity-70" preserveAspectRatio="none" viewBox="0 0 100 100">
             <path d="M0,100 C20,90 40,40 100,35" fill="none" stroke="#94a3b8" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
         </svg>
         
         <!-- Brew Line (Amber) -->
          <svg class="absolute bottom-0 left-0 w-full h-[60%] z-20" preserveAspectRatio="none" viewBox="0 0 100 100">
             <path d="M0,100 C10,100 20,20 100,20" fill="url(#amberGradient)" stroke="#d97706" stroke-width="1" vector-effect="non-scaling-stroke"/>
             <defs>
               <linearGradient id="amberGradient" x1="0" x2="0" y1="0" y2="1">
                 <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2"/>
                 <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
               </linearGradient>
             </defs>
         </svg>

      </section>

      <!-- Sensory panel -->
      <section
        class="h-[35%] border-t border-stone-100 bg-white px-6 py-6 flex flex-col lg:flex-row gap-8 items-center justify-center"
      >
        <!-- Radar chart -->
        <div class="relative w-48 h-48 lg:w-56 lg:h-56 flex-shrink-0">
            <!-- Background circles -->
            <div class="absolute inset-0 rounded-full border border-stone-100"></div>
            <div class="absolute inset-4 rounded-full border border-stone-100"></div>
            <div class="absolute inset-8 rounded-full border border-stone-100"></div>
            
            <!-- Shape -->
             <div
              class="absolute top-1/2 left-1/2 w-24 h-24 lg:w-28 lg:h-28 bg-amber-100/60 border border-amber-500/50 -translate-x-1/2 -translate-y-1/2 rotate-12 [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"
            ></div>
            
             <!-- Labels -->
            <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-wider text-stone-500">Sweet</span>
            <span class="absolute top-1/3 -right-8 text-[0.65rem] uppercase tracking-wider text-stone-500">Acidity</span>
            <span class="absolute bottom-2 -right-8 text-[0.65rem] uppercase tracking-wider text-stone-500">Clarity</span>
            <span class="absolute bottom-2 -left-8 text-[0.65rem] uppercase tracking-wider text-stone-500">Body</span>
            <span class="absolute top-1/3 -left-10 text-[0.65rem] uppercase tracking-wider text-stone-500">Aftertaste</span>
        </div>

        <!-- Sliders -->
        <div class="flex-1 w-full max-w-md grid grid-cols-1 gap-4">
             <div class="flex items-center gap-4" v-for="attr in ['Sweetness', 'Acidity', 'Clarity', 'Body', 'Aftertaste']" :key="attr">
                 <span class="w-20 text-xs text-stone-500 uppercase tracking-wide text-right">{{ attr }}</span>
                 <div class="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                     <div class="h-full bg-amber-400 w-[60%]"></div>
                 </div>
                 <span class="w-8 text-xs text-stone-800 font-medium">3.0</span>
             </div>
        </div>
      </section>
    </main>

    <!-- AI Assistant Floating Bubble -->
    <div
      class="fixed bottom-6 right-6 z-50"
    >
       <button
        class="w-12 h-12 rounded-full bg-stone-800 text-white shadow-lg shadow-stone-300/50 flex items-center justify-center text-xl hover:bg-stone-700 transition-transform hover:scale-105"
      >
        <span class="text-amber-300">✦</span>
      </button>
    </div>
  </div>
</template>


<script setup>
// 目前只做靜態 UI 之後再補唄
</script>
