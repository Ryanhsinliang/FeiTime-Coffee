<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end">
    <!-- 聊天視窗 -->
    <transition name="fade">
      <div
        v-if="showChat"
        class="w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden mb-3"
        :style="{ height: chatHeight + 'px' }"
      >
        <!-- 頂部拖拉條 -->
        <div
          @mousedown="startResize"
          class="h-1 bg-gray-300 hover:bg-[#A2AF9B] cursor-ns-resize transition-colors"
        ></div>

        <div class="bg-[#A2AF9B] text-white px-4 py-2 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <!-- 咖啡豆機器人小圖標 -->
            <svg viewBox="0 0 100 100" class="w-6 h-6">
              <ellipse cx="50" cy="55" rx="28" ry="35" fill="#6F4E37" />
              <path
                d="M 50 25 Q 45 55 50 85"
                stroke="#8B6F47"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
              />
              <circle cx="50" cy="25" r="15" fill="#A0826D" />
              <line
                x1="50"
                y1="10"
                x2="50"
                y2="15"
                stroke="#E8B4B8"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="50" cy="8" r="3" fill="#FF6B6B" />
              <circle cx="44" cy="24" r="2.5" fill="#FFF" />
              <circle cx="56" cy="24" r="2.5" fill="#FFF" />
              <circle cx="44.5" cy="24.5" r="1.5" fill="#333" />
              <circle cx="56.5" cy="24.5" r="1.5" fill="#333" />
              <path
                d="M 43 28 Q 50 31 57 28"
                stroke="#FFF"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
              />
              <rect x="20" y="50" width="8" height="20" rx="4" fill="#8B6F47" />
              <rect x="72" y="50" width="8" height="20" rx="4" fill="#8B6F47" />
              <circle cx="24" cy="72" r="4" fill="#A0826D" />
              <circle cx="76" cy="72" r="4" fill="#A0826D" />
              <path
                d="M 40 15 Q 38 10 40 5"
                stroke="#E8E8E8"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                opacity="0.6"
              />
              <path
                d="M 60 15 Q 62 10 60 5"
                stroke="#E8E8E8"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                opacity="0.6"
              />
            </svg>
            <span>咖啡小助手</span>
          </div>
          <button @click="showChat = false" class="text-white font-bold hover:opacity-80">✕</button>
        </div>

        <div class="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50" ref="chatBody">
          <div v-for="(msg, idx) in messages" :key="idx" class="flex">
            <div v-if="msg.user === 'ai'" class="bg-white p-3 rounded-lg max-w-[75%] shadow-sm">
              <div class="text-sm text-gray-800 whitespace-pre-wrap">{{ msg.text }}</div>
            </div>
            <div v-else class="ml-auto bg-[#A2AF9B] text-white p-3 rounded-lg max-w-[75%]">
              <div class="text-sm">{{ msg.text }}</div>
            </div>
          </div>

          <!-- 載入中指示器 -->
          <div v-if="isLoading" class="flex">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <div class="flex space-x-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 border-t bg-white flex space-x-2">
          <input
            v-model="inputText"
            @keyup.enter="sendMessage"
            :disabled="isLoading"
            type="text"
            placeholder="輸入訊息..."
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A2AF9B] disabled:bg-gray-100"
          />
          <button
            @click="sendMessage"
            :disabled="isLoading || !inputText.trim()"
            class="bg-[#A2AF9B] text-white px-4 py-2 rounded-lg hover:bg-[#8f9b88] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span class="whitespace-nowrap">送出</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- 圓形浮動按鈕 -->
    <div class="relative w-16 h-16">
      <!-- 底部明顯陰影 -->
      <span
        class="absolute w-24 h-6 bg-black/15 rounded-full bottom-1 left-1/2 -translate-x-1/2 blur-lg"
      ></span>

      <!-- 未讀通知點 -->
      <span
        v-if="hasUnread && !showChat"
        class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse z-10"
      ></span>

      <button
        @click="toggleChat"
        class="relative w-16 h-16 bg-[#bac7b2] rounded-full overflow-hidden hover:scale-105 transition transform shadow-[0_6px_18px_rgba(0,0,0,0.25)] p-2"
      >
        <!-- 咖啡豆機器人 SVG 圖標 -->
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <!-- 機器人身體 - 咖啡豆形狀 -->
          <ellipse cx="50" cy="55" rx="28" ry="35" fill="#6F4E37" />

          <!-- 咖啡豆中線 -->
          <path
            d="M 50 25 Q 45 55 50 85"
            stroke="#8B6F47"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />

          <!-- 機器人頭部 -->
          <circle cx="50" cy="25" r="15" fill="#A0826D" />

          <!-- 天線 -->
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            stroke="#E8B4B8"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="50" cy="8" r="3" fill="#FF6B6B" />

          <!-- 眼睛 -->
          <circle cx="44" cy="24" r="2.5" fill="#FFF" />
          <circle cx="56" cy="24" r="2.5" fill="#FFF" />
          <circle cx="44.5" cy="24.5" r="1.5" fill="#333" />
          <circle cx="56.5" cy="24.5" r="1.5" fill="#333" />

          <!-- 微笑 -->
          <path
            d="M 43 28 Q 50 31 57 28"
            stroke="#FFF"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
          />

          <!-- 機器人手臂 -->
          <rect x="20" y="50" width="8" height="20" rx="4" fill="#8B6F47" />
          <rect x="72" y="50" width="8" height="20" rx="4" fill="#8B6F47" />

          <!-- 手掌 - 小圓 -->
          <circle cx="24" cy="72" r="4" fill="#A0826D" />
          <circle cx="76" cy="72" r="4" fill="#A0826D" />

          <!-- 蒸氣效果 -->
          <path
            d="M 40 15 Q 38 10 40 5"
            stroke="#E8E8E8"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            opacity="0.6"
          />
          <path
            d="M 60 15 Q 62 10 60 5"
            stroke="#E8E8E8"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            opacity="0.6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { askCoffeeAssistant } from '@/services/geminiChatBallAgent';

  const showChat = ref(false);
  const inputText = ref('');
  const isLoading = ref(false);
  const hasUnread = ref(false);
  const chatBody = ref<HTMLElement | null>(null);
  const chatHeight = ref(384); // 預設高度 (h-96 = 384px)
  const isResizing = ref(false);
  const startY = ref(0);
  const startHeight = ref(0);

  interface Message {
    user: 'ai' | 'me';
    text: string;
  }

  const messages = ref<Message[]>([
    {
      user: 'ai',
      text: '嗨！我是你的咖啡小助手 ☕\n有什麼咖啡問題想問我嗎？',
    },
  ]);

  // 滾動到底部
  const scrollToBottom = () => {
    if (chatBody.value) {
      nextTick(() => {
        chatBody.value!.scrollTop = chatBody.value!.scrollHeight;
      });
    }
  };

  // 切換聊天視窗
  const toggleChat = () => {
    showChat.value = !showChat.value;
    if (showChat.value) {
      hasUnread.value = false;
      scrollToBottom();
    }
  };

  // 開始調整大小
  const startResize = (e: MouseEvent) => {
    isResizing.value = true;
    startY.value = e.clientY;
    startHeight.value = chatHeight.value;

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    e.preventDefault();
  };

  // 調整大小中
  const handleResize = (e: MouseEvent) => {
    if (!isResizing.value) return;

    const deltaY = startY.value - e.clientY; // 注意：向上拖是增加高度
    const newHeight = startHeight.value + deltaY;

    // 限制高度範圍
    if (newHeight >= 300 && newHeight <= 700) {
      chatHeight.value = newHeight;
    }
  };

  // 停止調整大小
  const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  // 傳送訊息
  const sendMessage = async () => {
    if (!inputText.value.trim() || isLoading.value) return;

    const question = inputText.value.trim();
    messages.value.push({ user: 'me', text: question });
    inputText.value = '';

    await nextTick();
    scrollToBottom();

    isLoading.value = true;

    try {
      // 準備對話歷史（最近 5 輪對話）
      const conversationHistory = messages.value
        .slice(-10) // 取最近 10 則訊息（5 輪對話）
        .map((msg) => ({
          role: msg.user === 'ai' ? ('assistant' as const) : ('user' as const),
          content: msg.text,
        }));

      const response = await askCoffeeAssistant(question, conversationHistory);
      messages.value.push({ user: 'ai', text: response.answer });

      // 如果視窗關閉，顯示未讀提示
      if (!showChat.value) {
        hasUnread.value = true;
      }
    } catch (error) {
      console.error('AI 回應錯誤:', error);
      messages.value.push({
        user: 'ai',
        text: '抱歉，目前遇到一些技術問題 😅\n請稍後再試，或直接聯繫我們的客服團隊！',
      });
    } finally {
      isLoading.value = false;
      await nextTick();
      scrollToBottom();
    }
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .delay-100 {
    animation-delay: 0.1s;
  }

  .delay-200 {
    animation-delay: 0.2s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  /* 防止拖拉時選取文字 */
  .cursor-ns-resize {
    user-select: none;
  }
</style>
