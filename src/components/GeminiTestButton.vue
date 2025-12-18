<template>
  <div style="padding: 12px; border: 1px solid #ddd; border-radius: 12px;">
    <button :disabled="loading" @click="run">
      {{ loading ? "Gemini 回覆中..." : "測試 Gemini" }}
    </button>

    <p v-if="error" style="color: #c00; margin-top: 10px;">{{ error }}</p>
    <pre v-if="text" style="white-space: pre-wrap; margin-top: 10px;">{{ text }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { geminiText } from "../services/geminiClient";

const loading = ref(false);
const text = ref("");
const error = ref("");

async function run() {
  loading.value = true;
  text.value = "";
  error.value = "";

  try {
    text.value = await geminiText("用一句話解釋：什麼是手沖咖啡的悶蒸？");
  } catch (e) {
    error.value = e?.message ?? String(e);
  } finally {
    loading.value = false;
  }
}
</script>
