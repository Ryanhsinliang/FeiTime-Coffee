<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end">
    <!-- 聊天視窗 -->
    <transition name="fade">
      <div
        v-if="showChat"
        class="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden mb-3"
      >
        <div class="bg-[#A2AF9B] text-white px-4 py-2 flex justify-between items-center">
          <span>咖啡小助手</span>
          <button @click="showChat = false" class="text-white font-bold">✕</button>
        </div>

        <div class="flex-1 p-2 overflow-y-auto space-y-2 bg-gray-50" ref="chatBody">
          <div v-for="(msg, idx) in messages" :key="idx" class="flex">
            <div v-if="msg.user === 'ai'" class="bg-gray-200 p-2 rounded-lg max-w-[70%]">
              {{ msg.text }}
            </div>
            <div v-else class="ml-auto bg-[#A2AF9B] text-white p-2 rounded-lg max-w-[70%]">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div class="p-2 border-t flex space-x-2">
          <input
            v-model="inputText"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="輸入訊息..."
            class="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
          />
          <button @click="sendMessage" class="bg-[#A2AF9B] text-white px-3 rounded-lg">送出</button>
        </div>
      </div>
    </transition>

    <!-- 圓形浮動按鈕 -->
    <div class="relative w-16 h-16">
      <!-- 底部明顯陰影 -->
      <span
        class="absolute w-24 h-6 bg-black/15 rounded-full bottom-1 left-1/2 -translate-x-1/2 blur-lg"
      ></span>

      <button
        @click="showChat = !showChat"
        class="w-16 h-16 rounded-full overflow-hidden hover:scale-105 transition transform shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
      >
        <img src="@/assets/ai_agent_icon.png" alt="AI Agent" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick } from 'vue';

  const showChat = ref(false);
  const inputText = ref('');
  const messages = ref([{ user: 'ai', text: '嗨！我是你的咖啡小助手，有什麼可以幫你？' }]);
  const chatBody = ref(null);

  const scrollToBottom = () => {
    if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight;
  };

  const sendMessage = async () => {
    if (!inputText.value.trim()) return;

    messages.value.push({ user: 'me', text: inputText.value });
    const question = inputText.value;
    inputText.value = '';

    await nextTick();
    scrollToBottom();

    const answer = await askAI(question);
    messages.value.push({ user: 'ai', text: answer });

    await nextTick();
    scrollToBottom();
  };

  // 呼叫 Strapi API
  const askAI = async (question) => {
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      return data.answer;
    } catch (e) {
      console.error(e);
      return '發生錯誤，請稍後再試。';
    }
  };
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
