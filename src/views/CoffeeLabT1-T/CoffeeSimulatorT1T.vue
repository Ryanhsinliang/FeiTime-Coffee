<!-- 檔案建議：src/views/CoffeeSimulatorT1.vue -->
<template>
  <!-- 根節點套字體 + 背景 + 文字顏色 -->
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top_left,#fdf8f2_0,#f4eee4_42%,#f3ece2)] text-[#3c3a37] lxgw-wenkai-tc-regular"
  >
    <!-- 整頁佈局：Desktop = 左側側邊欄 + 右側主內容；Tablet/Mobile = 上下堆疊 -->
    <div
      class="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-6"
    >
      <!-- 側邊欄（取代 header） -->
      <aside
        class="mb-6 flex flex-col gap-4 rounded-2xl border border-[rgba(199,182,150,0.5)] bg-[rgba(252,249,243,0.96)] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.04)] lg:sticky lg:top-6 lg:mb-0 lg:self-start"
      >
        <div class="space-y-1">
          <span
            class="block text-base tracking-[0.24em] uppercase text-[#273c35]"
          >
            咖啡工作坊
          </span>
          <span
            class="block text-[11px] tracking-[0.12em] uppercase text-[#8a847a]"
          >
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
          <p
            class="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]"
          >
            今日主題
          </p>
          <p class="text-xs leading-relaxed text-[#8a847a]">
            以中焙、1:16 。
          </p>
        </div>
      </aside>

      <!-- 主內容：Hero / Story / Simulator / Flavor -->
      <main class="w-full lg:max-w-3xl">
        <!-- Hero 區 -->
        <section class="py-4 lg:py-6">
          <div
            class="mx-auto flex max-w-4xl flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center"
          >
            <div>
              <p
                class="mb-3 text-[11px] tracking-[0.18em] uppercase text-[#d8b995]"
              >
                Taiwan · Pour Over
              </p>
              <h1
                class="mb-3 text-3xl leading-snug tracking-[0.12em] text-[#273c35] md:text-[34px]"
              >
                一杯手沖，<br />
                把日常醒成風景。
              </h1>
              <p
                class="max-w-xl text-sm leading-relaxed md:text-[15px] md:leading-[1.7]"
              >
                以實驗精神的邏輯，為咖啡建立一套可被理解、可被重現的風味語言。
                在這裡，你可以透過模擬器，預先「看見」一杯咖啡的五邊形樣貌。
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
                <p
                  class="mb-3 text-[12px] tracking-[0.16em] uppercase text-[#273c35]"
                >
                  今日設定
                </p>
                <ul class="mb-2 space-y-1 text-[13px]">
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">烘焙</span
                    ><span>中焙 / 日曬耶加</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">粉水比</span
                    ><span>1 : 16</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">時間</span><span>2:45</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-[#8a847a]">研磨</span><span>中偏細</span>
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
              <p
                class="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]"
              >
                Concept
              </p>
              <h2
                class="mb-3 text-xl tracking-[0.08em] text-[#273c35] md:text-[22px]"
              >
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
                <p
                  class="mb-1 text-[13px] tracking-[0.14em] uppercase text-[#273c35]"
                >
                  五邊形風味模型
                </p>
                <p
                  class="mb-1 text-[13px] leading-relaxed text-[#8a847a]"
                >
                  模擬器會輸出五項指標：甜度、酸質、清晰度、醇厚度與餘韻。
                  它們不是絕對的評分，而是幫助你理解「某個沖煮選擇」會往哪個方向拉動風味。
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
              <p
                class="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]"
              >
                Pour Over Lab
              </p>
              <h2
                class="mb-3 text-2xl tracking-[0.08em] text-[#273c35] md:text-[28px]"
              >
                手沖咖啡風味模擬器
              </h2>
              <p class="text-sm leading-relaxed text-[#8a847a]">
                透過配方、研磨、時間與烘焙度的細微變化，預測一杯咖啡在甜度、酸質、清晰度、醇厚與餘韻上的表現。
              </p>
            </div>

            <div
              class="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]"
            >
              <!-- 左側：控制介面 -->
              <div
                class="rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
              >
                <h3
                  class="mb-4 text-sm tracking-[0.18em] uppercase text-[#273c35]"
                >
                  沖煮參數
                </h3>

                <div class="space-y-4">
                  <!-- 烘焙度 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>烘焙度：</span>
                      <span class="text-[13px] tracking-normal">
                        {{ roastLabel }}
                      </span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.roastLevel"
                      min="-1"
                      max="1"
                      step="1"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <div
                      class="mt-1 flex justify-between text-[11px] text-[#8a847a]"
                    >
                      <span>淺焙</span><span>中焙</span><span>深焙</span>
                    </div>
                  </div>

                  <!-- 粉水比 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>粉水比：</span>
                      <span class="text-[13px] tracking-normal">
                        1 : {{ config.ratio }}
                      </span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.ratio"
                      min="12"
                      max="20"
                      step="0.5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <p class="mt-1 text-[11px] text-[#8a847a]">
                      1:15 偏濃、1:16 均衡、1:17 清爽。
                    </p>
                  </div>

                  <!-- 總沖煮時間 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>總沖煮時間：</span>
                      <span class="text-[13px] tracking-normal">
                        {{ config.brewTimeSec }} 秒
                      </span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.brewTimeSec"
                      min="120"
                      max="240"
                      step="5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <p class="mt-1 text-[11px] text-[#8a847a]">
                      建議約 2:30 – 3:00 之間。
                    </p>
                  </div>

                  <!-- 研磨度 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>研磨度：</span>
                      <span class="text-[13px] tracking-normal">
                        {{ grindLabel }}
                      </span>
                    </label>
                    <input
                      type="range"
                      v-model.number="config.grindLevel"
                      min="-1"
                      max="1"
                      step="0.5"
                      class="w-full cursor-pointer accent-[#273c35]"
                    />
                    <div
                      class="mt-1 flex justify-between text-[11px] text-[#8a847a]"
                    >
                      <span>細</span><span>中</span><span>粗</span>
                    </div>
                  </div>

                  <!-- 注水段數 -->
                  <div>
                    <label
                      class="mb-1 flex items-baseline justify-between text-[13px] tracking-[0.06em] uppercase text-[#273c35]"
                    >
                      <span>注水段數：</span>
                      <span class="text-[13px] tracking-normal">
                        {{ config.pours }} 段
                      </span>
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
                    <span
                      class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]"
                      >悶蒸時間</span
                    >
                    <span>{{ config.bloomTimeSec }} s</span>
                  </div>
                  <div class="min-w-[88px] flex-1">
                    <span
                      class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]"
                      >水溫</span
                    >
                    <span>{{ config.waterTempC }} °C</span>
                  </div>
                  <div class="min-w-[88px] flex-1">
                    <span
                      class="block text-[10px] tracking-[0.12em] uppercase text-[#8a847a]"
                      >咖啡粉量</span
                    >
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
                  <h3
                    class="mb-2 text-sm tracking-[0.18em] uppercase text-[#273c35]"
                  >
                    風味預測
                  </h3>
                  <p class="mb-4 text-[12px] text-[#8a847a]">
                    依照目前參數計算出的風味權重，分數區間為 1 – 5 分。
                  </p>

                  <div class="mb-4 flex flex-col gap-2.5">
                    <div
                      v-for="(value, key) in finalProfile"
                      :key="key"
                      class="flex items-center"
                    >
                      <span class="w-18 text-[13px] text-[#273c35]">{{
                        labelMap[key]
                      }}</span>
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
                      <span
                        class="w-10 text-right text-[12px] text-[#3c3a37]"
                      >
                        {{ value.toFixed(1) }}
                      </span>
                    </div>
                  </div>

                  <div
                    class="rounded-xl bg-[rgba(44,74,59,0.04)] px-3 py-2.5"
                  >
                    <p
                      class="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#273c35]"
                    >
                      小提示
                    </p>
                    <p class="text-[12px] leading-relaxed text-[#8a847a]">
                      若酸質偏高，可略微延長總時間或調粗研磨；若醇厚不足，可縮短粉水比（例如
                      1:15） 或選擇較深焙配方。
                    </p>
                  </div>
                </div>

                <!-- FeiTime 小助手 -->
                <div
                  class="rounded-2xl border border-[rgba(199,182,150,0.35)] bg-[rgba(252,249,243,0.95)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
                >
                  <div class="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p
                        class="mb-1 text-[14px] tracking-[0.14em] uppercase text-[#273c35]"
                      >
                        FeiTime 小助手
                      </p>
                      <p class="m-0 text-[12px] text-[#8a847a]">
                        不知道怎麼調？讓小助手根據風味幫你選一個起點。
                      </p>
                    </div>
                    <span
                      class="rounded-full border border-[rgba(199,182,150,0.9)] bg-[rgba(253,249,243,0.9)] px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-[#273c35]"
                    >
                      LLM
                    </span>
                  </div>

                  <div class="mb-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      class="flex-1 min-w-[120px] rounded-full bg-gradient-to-r from-[#2c4a3b] to-[#385548] px-3 py-2 text-[12px] tracking-[0.12em] uppercase text-[#fdfaf5]"
                      @click="triggerAssistant('select')"
                    >
                      請小助手幫我選
                    </button>
                    <button
                      type="button"
                      class="flex-1 min-w-[120px] rounded-full border border-[rgba(199,182,150,0.9)] bg-transparent px-3 py-2 text-[12px] tracking-[0.12em] uppercase text-[#273c35]"
                      @click="triggerAssistant('adjust')"
                    >
                      請小助手幫我調整
                    </button>
                  </div>

                  <div
                    v-if="assistantOpen"
                    class="rounded-xl border border-dashed border-[rgba(199,182,150,0.7)] bg-[rgba(44,74,59,0.03)] px-3 py-2"
                  >
                    <div class="mb-2 max-h-40 space-y-1.5 overflow-auto pr-1">
                      <div
                        v-for="(msg, idx) in assistantMessages"
                        :key="idx"
                        :class="[
                          'rounded-lg px-2 py-1.5 text-[12px] leading-relaxed',
                          msg.role === 'assistant'
                            ? 'bg-[#f5efe4] text-[#3c3a37]'
                            : 'ml-auto max-w-[80%] bg-[#2c4a3b] text-[#fdfaf5]',
                        ]"
                      >
                        <p class="m-0">
                          {{ msg.text }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-end gap-2">
                      <textarea
                        v-model="userInput"
                        rows="2"
                        class="h-[60px] flex-1 resize-none rounded-lg border border-[rgba(199,182,150,0.9)] bg-[#fdf9f3] px-2 py-1.5 text-[12px] outline-none"
                        placeholder="想請小助手幫你調哪一個感覺？例如：『我想要更清爽一點』"
                      ></textarea>
                      <button
                        type="button"
                        class="h-fit rounded-full bg-[#2c4a3b] px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase text-[#fdfaf5]"
                        @click="sendUserMessage"
                      >
                        傳送
                      </button>
                    </div>

                    <p class="mt-1 text-[11px] text-[#8a847a]">
                      目前為示意版本，實際串接時可在此呼叫後端的 LLM API，回傳專屬建議。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 風味筆記區 -->
        <section class="pb-10 pt-6" id="flavors">
          <div class="mx-auto max-w-4xl">
            <div class="mb-4">
              <p
                class="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#d8b995]"
              >
                Flavor Notes
              </p>
              <h2
                class="text-xl tracking-[0.08em] text-[#273c35] md:text-[22px]"
              >
                五個維度，記住一杯咖啡。
              </h2>
            </div>

            <div
              class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <article
                class="rounded-xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] px-4 py-3"
              >
                <h3
                  class="mb-2 text-[14px] tracking-[0.08em] uppercase text-[#273c35]"
                >
                  甜度 Sweetness
                </h3>
                <p class="text-[13px] leading-relaxed">
                  來自烘焙、萃取與均勻度的平衡。甜度高的咖啡，入口會有熟果、焦糖或蜂蜜感，而不是單純的「不苦」。
                </p>
              </article>

              <article
                class="rounded-xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] px-4 py-3"
              >
                <h3
                  class="mb-2 text-[14px] tracking-[0.08em] uppercase text-[#273c35]"
                >
                  酸質 Acidity
                </h3>
                <p class="text-[13px] leading-relaxed">
                  不是壞掉的酸，而是類似柑橘、莓果的明亮感。欠萃或過淺焙會讓酸變尖銳；適當的酸讓一杯咖啡有表情。
                </p>
              </article>

              <article
                class="rounded-xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] px-4 py-3"
              >
                <h3
                  class="mb-2 text-[14px] tracking-[0.08em] uppercase text-[#273c35]"
                >
                  清晰度 Clarity
                </h3>
                <p class="text-[13px] leading-relaxed">
                  味道是否分明、乾淨。好的清晰度會讓你更容易說出「像什麼」，而不是只有混雜的苦與焦味。
                </p>
              </article>

              <article
                class="rounded-xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] px-4 py-3"
              >
                <h3
                  class="mb-2 text-[14px] tracking-[0.08em] uppercase text-[#273c35]"
                >
                  醇厚度 Body
                </h3>
                <p class="text-[13px] leading-relaxed">
                  口感的重量與存在感。偏薄像清茶，偏厚像奶茶。粉水比、研磨與烘焙度都會影響這個維度。
                </p>
              </article>

              <article
                class="rounded-xl border border-[rgba(199,182,150,0.4)] bg-[rgba(252,249,244,0.96)] px-4 py-3"
              >
                <h3
                  class="mb-2 text-[14px] tracking-[0.08em] uppercase text-[#273c35]"
                >
                  餘韻 Aftertaste
                </h3>
                <p class="text-[13px] leading-relaxed">
                  咽下之後留下的那一段尾聲。有時是可可、堅果，有時是花香或果乾。好的餘韻讓人想再喝一口。
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import {
  calculateSweetness,
  calculateAcidity,
  calculateClarity,
  calculateBody,
  calculateAftertaste
} from '@/utils/brewLogic.js';

/* --------- 捲動到故事區 --------- */
function scrollToStory() {
  const el = document.getElementById('story');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  // 之後若要加 GA / tracking 可放這裡
});

/* --------- 手沖模擬器核心狀態 --------- */
const config = reactive({
  roastLevel: 0,
  ratio: 16,
  brewTimeSec: 165,
  grindLevel: 0,
  pours: 3,
  bloomTimeSec: 30,
  waterTempC: 92,
  coffeeDose: 20
});

const finalProfile = computed(() => ({
  Sweetness: calculateSweetness(config),
  Acidity: calculateAcidity(config),
  Clarity: calculateClarity(config),
  Body: calculateBody(config),
  Aftertaste: calculateAftertaste(config)
}));

const labelMap = {
  Sweetness: '甜度',
  Acidity: '酸質',
  Clarity: '清晰度',
  Body: '醇厚度',
  Aftertaste: '餘韻'
};

const roastLabel = computed(() => {
  if (config.roastLevel === -1) return '淺焙 (Light)';
  if (config.roastLevel === 0) return '中焙 (Medium)';
  return '深焙 (Dark)';
});

const grindLabel = computed(() => {
  if (config.grindLevel <= -0.5) return '偏細';
  if (config.grindLevel >= 0.5) return '偏粗';
  return '中研磨';
});

// 依分數生成柔和漸層色
function getGradient(score) {
  if (score >= 4) {
    return 'linear-gradient(90deg, #2c4a3b, #cda873)';
  }
  if (score >= 2.5) {
    return 'linear-gradient(90deg, #6f8b6d, #e6d8c5)';
  }
  return 'linear-gradient(90deg, #b46a5c, #f1ddd3)';
}

/* --------- FeiTime 小助手（前端示意） --------- */
const assistantOpen = ref(false);
const assistantMode = ref(null);
const assistantMessages = ref([]);
const userInput = ref('');

function triggerAssistant(mode) {
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
    action =
      '我幫你抓了一個「日常均衡杯」的方向：維持 1:16，時間約 2:40 左右，中焙中研磨，可以先從這個設定開始嘗試。';
  } else if (assistantMode.value === 'adjust') {
    action =
      '如果你想再微調，建議先一次只改一個變數，例如先把粉水比改成 1:15.5 或將時間增加 10 秒，觀察甜度與酸質的變化。';
  }

  const text = [action, ...parts].join(' ');

  assistantMessages.value = [
    {
      role: 'assistant',
      text
    }
  ];
}

function sendUserMessage() {
  const content = userInput.value.trim();
  if (!content) return;

  assistantMessages.value.push({
    role: 'user',
    text: content
  });
  userInput.value = '';
}
</script>

<!-- 只保留字體 class；其他樣式交給 Tailwind -->
<style>
.lxgw-wenkai-tc-regular {
  font-family: 'LXGW WenKai TC', cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
