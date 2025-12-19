<!-- 檔案：src/views/CoffeeSimulatorT1.vue -->
<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top_left,#fdf8f2_0,#f4eee4_42%,#f3ece2)] text-[#3c3a37] font-wenkai"
  >
    <div class="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-6">
      <!-- 側邊欄 -->
      <aside
        class="mb-6 flex flex-col gap-4 rounded-2xl border border-[rgba(199,182,150,0.5)] bg-[rgba(252,249,243,0.96)] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.04)] lg:sticky lg:top-6 lg:mb-0 lg:self-start"
      >
        <div class="space-y-1">
          <span class="block text-base tracking-[0.24em] uppercase text-[#273c35]">咖啡工作坊</span>
          <span class="block text-[11px] tracking-[0.12em] uppercase text-[#8a847a]">
            YOUR COFFEE-LAB
          </span>
        </div>
        <nav class="mt-2 flex flex-col gap-1 md:flex-row md:flex-wrap">
          <a
            href="#story"
            class="rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]"
          >
            關於咖啡
          </a>
          <a
            href="#simulator"
            class="rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]"
          >
            手沖模擬器
          </a>
          <a
            href="#flavors"
            class="rounded-full px-3 py-1 text-[12px] tracking-[0.12em] uppercase text-[#8a847a] hover:border hover:border-[rgba(199,182,150,0.6)] hover:bg-[rgba(253,249,243,0.95)] hover:text-[#273c35]"
          >
            風味筆記
          </a>
        </nav>
        <div class="mt-2 border-t border-dashed border-[rgba(199,182,150,0.7)] pt-3">
          <p class="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]">今日主題</p>
          <p class="text-xs leading-relaxed text-[#8a847a]">以中焙、1:16 。</p>
        </div>
      </aside>

      <!-- 主內容 -->
      <main class="w-full lg:max-w-3xl">
        <!-- Hero 區 -->
        <section class="py-4 lg:py-6">
          <div
            class="mx-auto flex max-w-4xl flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center"
          >
            <div>
              <p class="mb-3 text-[11px] tracking-[0.18em] uppercase text-[#d8b995]">
                Taiwan · Pour Over
              </p>
              <h1
                class="mb-3 text-3xl leading-snug tracking-[0.12em] text-[#273c35] md:text-[34px]"
              >
                一杯手沖，
                <br />
                把日常醒成風景。
              </h1>
              <p class="max-w-xl text-sm leading-relaxed md:text-[15px] md:leading-[1.7]">
                以實驗精神的邏輯，為咖啡建立一套可被理解、可被重現的風味語言。在這裡，你可以透過模擬器，預先「看見」一杯咖啡的五邊形樣貌。
              </p>
              <div class="mt-4 flex flex-wrap gap-3">
                <a
                  href="#simulator"
                  class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2c4a3b] to-[#385548] px-5 py-2.5 text-[13px] tracking-[0.12em] uppercase text-[#fdfaf5]"
                >
                  開啟手沖模擬器
                </a>
                <button
                  type="button"
                  @click="scrollToStory"
                  class="inline-flex items-center justify-center rounded-full border border-[rgba(199,182,150,0.7)] px-4 py-2 text-[12px] tracking-[0.16em] uppercase text-[#273c35] bg-transparent"
                >
                  了解風味模型
                </button>
              </div>
            </div>

            <div class="flex justify-start md:justify-end">
              <div
                class="w-full max-w-xs rounded-2xl border border-[rgba(199,182,150,0.4)] bg-[#fdf9f3] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.06)]"
              >
                <p class="mb-3 text-[12px] tracking-[0.16em] uppercase text-[#273c35]">今日設定</p>
                <ul class="mb-2 space-y-1 text-[13px]">
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">烘焙</span>
                    <span>中焙 / 日曬耶加</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">粉水比</span>
                    <span>1 : 16</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">時間</span>
                    <span>2:45</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">研磨</span>
                    <span>中偏細</span>
                  </li>
                </ul>
                <p class="text-[11px] leading-relaxed text-[#8a847a]">
                  捲動頁面，下方模擬器可以自由調整這些參數，看看風味如何變化。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 故事區 -->
        <section class="py-6" id="story">
          <div
            class="mx-auto flex max-w-4xl flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
          >
            <div>
              <p class="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]">Concept</p>
              <h2 class="mb-3 text-xl tracking-[0.08em] text-[#273c35] md:text-[22px]">
                從茶的節奏，學會沖一杯咖啡。
              </h2>
              <p class="mb-2 text-sm leading-relaxed md:text-[14px]">
                Feitime
                以實驗精神的概念，將咖啡在熱水中淬煉、釋放的過程具象化。我們科學的方式看待手沖咖啡：悶蒸是第一口呼吸，分段注水是對豆子的溫柔提問，時間與比例則構成一種風味的句點。
              </p>
              <p class="text-sm leading-relaxed md:text-[14px]">
                因此，我們將手沖拆解為可量化的指標：烘焙度、粉水比、沖煮時間、研磨度與注水段數，讓你在每一次沖煮時，都能更接近心中理想的那一杯。
              </p>
            </div>

            <div>
              <div
                class="rounded-2xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] p-4"
              >
                <p class="mb-1 text-[13px] tracking-[0.14em] uppercase text-[#273c35]">
                  五邊形風味模型
                </p>
                <p class="mb-1 text-[13px] leading-relaxed text-[#8a847a]">
                  模擬器會輸出五項指標：甜度、酸質、清晰度、醇厚度與餘韻。它們不是絕對的評分，而是幫助你理解「某個沖煮選擇」會往哪個方向拉動風味。
                </p>
                <p class="text-[13px] leading-relaxed text-[#8a847a]">
                  你可以把它想像成：每一次轉動滑桿，都在寫下一則沖煮筆記。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 手沖模擬器區 -->
        <section class="border-t border-[rgba(44,74,59,0.12)] py-10" id="simulator">
          <div class="mx-auto max-w-4xl">
            <div class="mx-auto mb-8 max-w-2xl text-center">
              <p class="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]">
                Pour Over Lab
              </p>
              <h2 class="mb-3 text-2xl tracking-[0.08em] text-[#273c35] md:text-[28px]">
                手沖咖啡風味模擬器
              </h2>
              <p class="text-sm leading-relaxed text-[#8a847a]">
                透過配方、研磨、時間與烘焙度的細微變化，預測一杯咖啡在甜度、酸質、清晰度、醇厚與餘韻上的表現。
              </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
              <!-- 左側：控制介面 -->
              <div
                class="rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
              >
                <h3 class="mb-4 text-sm tracking-[0.18em] uppercase text-[#273c35]">沖煮參數</h3>

                <div class="space-y-4">
                  <!-- 烘焙度 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>烘焙度：</span>
                      <span class="text-[13px] tracking-normal">{{ roastLabel }}</span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.roastLevel"
                      min="-1"
                      max="1"
                      step="1"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <div class="mt-1 flex justify-between text-[11px] text-[#8a847a]">
                      <span>淺焙</span>
                      <span>中焙</span>
                      <span>深焙</span>
                    </div>
                  </div>

                  <!-- 粉水比 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>粉水比：</span>
                      <span class="text-[13px] tracking-normal">1 : {{ config.ratio }}</span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.ratio"
                      min="12"
                      max="20"
                      step="0.5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <p class="mt-1 text-[11px] text-[#8a847a]">1:15 偏濃、1:16 均衡、1:17 清爽。</p>
                  </div>

                  <!-- 總沖煮時間 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>總沖煮時間：</span>
                      <span class="text-[13px] tracking-normal">{{ config.brewTimeSec }} 秒</span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.brewTimeSec"
                      min="120"
                      max="240"
                      step="5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <p class="mt-1 text-[11px] text-[#8a847a]">建議約 2:30 – 3:00 之間。</p>
                  </div>

                  <!-- 研磨度 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>研磨度：</span>
                      <span class="text-[13px] tracking-normal">{{ grindLabel }}</span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.grindLevel"
                      min="-1"
                      max="1"
                      step="0.5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <div class="mt-1 flex justify-between text-[11px] text-[#8a847a]">
                      <span>細</span>
                      <span>中</span>
                      <span>粗</span>
                    </div>
                  </div>

                  <!-- 注水段數 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>注水段數：</span>
                      <span class="text-[13px] tracking-normal">{{ config.pours }} 段</span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.pours"
                      min="1"
                      max="5"
                      step="1"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                  </div>
                </div>

                <!-- inline meta -->
                <div
                  class="mt-3 flex flex-wrap gap-3 border-t border-dashed border-[rgba(44,74,59,0.2)] pt-3 text-[13px]"
                >
                  <div class="min-w-[88px] flex-1">
                    <span class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]">
                      悶蒸時間
                    </span>
                    <span>{{ config.bloomTimeSec }} s</span>
                  </div>
                  <div class="min-w-[88px] flex-1">
                    <span class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]">
                      水溫
                    </span>
                    <span>{{ config.waterTempC }} °C</span>
                  </div>
                  <div class="min-w-[88px] flex-1">
                    <span class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]">
                      咖啡粉量
                    </span>
                    <span>{{ config.coffeeDose }} g</span>
                  </div>
                </div>
              </div>

              <!-- 右側：風味 + 小助手 -->
              <div class="flex flex-col gap-4">
                <!-- 風味預測 -->
                <div
                  class="rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
                >
                  <h3 class="mb-2 text-sm tracking-[0.18em] uppercase text-[#273c35]">風味預測</h3>
                  <p class="mb-4 text-[12px] text-[#8a847a]">
                    依照目前參數計算出的風味權重，分數區間為 1 – 5 分。
                  </p>

                  <div class="mb-4 flex flex-col gap-2.5">
                    <div v-for="(value, key) in finalProfile" :key="key" class="flex items-center">
                      <span class="w-18 text-[13px] text-[#273c35]">{{ labelMap[key] }}</span>
                      <div
                        class="mx-2.5 flex-1 h-2 overflow-hidden rounded-full bg-[rgba(240,232,220,0.9)]"
                      >
                        <div
                          class="h-full rounded-full transition-[width] duration-300 ease-out"
                          :style="{
                            width: (value / 5) * 100 + '%',
                            background: getGradient(value),
                          }"
                        ></div>
                      </div>
                      <span class="w-10 text-right text-[12px] text-[#3c3a37]">
                        {{ value.toFixed(1) }}
                      </span>
                    </div>
                  </div>

                  <div class="rounded-xl bg-[rgba(44,74,59,0.04)] px-3 py-2.5">
                    <p class="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]">
                      小提示
                    </p>
                    <p class="text-[12px] leading-relaxed text-[#8a847a]">
                      若酸質偏高，可略微延長總時間或調粗研磨；若醇厚不足，可縮短粉水比（例如 1:15）
                      或選擇中焙。
                    </p>
                  </div>
                </div>

                <!-- 小助手 -->
                <div
                  class="rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
                >
                  <h3 class="mb-2 text-sm tracking-[0.18em] uppercase text-[#273c35]">小助手</h3>
                  <div
                    class="mb-2 min-h-[60px] rounded-lg border border-[rgba(44,74,59,0.15)] bg-white p-2 text-[13px] text-[#3c3a37]"
                  >
                    {{ assistantText }}
                  </div>
                  <button
                    @click="askAssistant"
                    class="w-full rounded-full bg-[#2c4a3b] px-3 py-2 text-[13px] uppercase text-[#fdfaf5]"
                  >
                    請小助手幫我選
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { callGemini } from '@/services/geminiService';

  export default defineComponent({
    name: 'CoffeeSimulatorT1',
    setup() {
      // 模擬器參數
      const config = reactive({
        roastLevel: 0, // -1: 淺焙, 0: 中焙, 1: 深焙
        ratio: 16,
        brewTimeSec: 150,
        grindLevel: 0, // -1 細, 0 中, 1 粗
        pours: 3,
        bloomTimeSec: 30,
        waterTempC: 92,
        coffeeDose: 18,
      });

      // 風味權重計算 (範例)
      const finalProfile = computed(() => ({
        sweetness: Math.min(5, 3 + config.roastLevel * 0.5),
        acidity: Math.max(1, 3 - config.roastLevel * 0.3),
        clarity: Math.min(5, 3 + (config.ratio - 16) * 0.2),
        body: Math.min(5, 2.5 + config.brewTimeSec / 100),
        aftertaste: Math.min(5, 3 + config.pours * 0.3),
      }));

      const labelMap: Record<string, string> = {
        sweetness: '甜度',
        acidity: '酸質',
        clarity: '清晰度',
        body: '醇厚',
        aftertaste: '餘韻',
      };

      function getGradient(value: number) {
        return `linear-gradient(to right, #d8b995, #2c4a3b ${value * 20}%)`;
      }

      const roastLabel = computed(() =>
        config.roastLevel === -1 ? '淺焙' : config.roastLevel === 0 ? '中焙' : '深焙'
      );
      const grindLabel = computed(() =>
        config.grindLevel === -1 ? '細' : config.grindLevel === 0 ? '中' : '粗'
      );

      // 小助手
      const assistantText = ref('點擊「請小助手幫我選」來獲得建議');

      const askAssistant = async () => {
        assistantText.value = '小助手思考中...';

        try {
          const prompt = `請根據目前手沖參數，給出建議。烘焙度：${roastLabel.value}、粉水比：1:${config.ratio}、沖煮時間：${config.brewTimeSec} 秒、研磨度：${grindLabel.value}、注水段數：${config.pours}`;
          const res = await callGemini(prompt);

          // 更新小助手文字
          assistantText.value = res.text;

          // 如果後端有建議參數，套用到模擬器
          if ((res as any).suggestedConfig) {
            Object.assign(config, (res as any).suggestedConfig);
          }
        } catch (err: any) {
          console.error(err);
          assistantText.value = 'API 呼叫失敗，請稍後再試';
        }
      };

      // 滾動到故事區
      const scrollToStory = () => {
        document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
      };

      return {
        config,
        finalProfile,
        labelMap,
        getGradient,
        roastLabel,
        grindLabel,
        assistantText,
        askAssistant,
        scrollToStory,
      };
    },
  });
</script>

<style scoped>
  /* 可以加你 Tailwind 或自訂 class */
</style>
