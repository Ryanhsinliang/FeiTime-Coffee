import { GoogleGenAI } from "@google/genai";

export function createGeminiClient() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env.local");
    return new GoogleGenAI({ apiKey });
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function isRetryableGeminiError(e) {
    const msg = (e?.message ?? "").toString();
    // SDK 丟出的錯誤有時候會把 JSON 塞在 message 裡，所以用字串判斷最穩
    return (
        msg.includes('"code":503') ||
        msg.includes("The model is overloaded") ||
        msg.includes('"code":500') ||
        msg.includes('"code":504') ||
        msg.includes('"code":429')
    );
}

export async function geminiText(prompt, options = {}) {
    const {
        model = "gemini-2.5-flash",
        maxRetries = 4,           // 總共嘗試 1 + 4 = 5 次
        baseDelayMs = 800,        // 0.8s 起跳
    } = options;

    const ai = createGeminiClient();

    let lastErr;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
            });
            return response.text ?? "";
        } catch (e) {
            lastErr = e;

            const retryable = isRetryableGeminiError(e);
            const isLast = attempt === maxRetries;

            if (!retryable || isLast) throw e;

            // exponential backoff + jitter
            const jitter = Math.floor(Math.random() * 250);
            const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
            await sleep(delay);
        }
    }

    throw lastErr;
}
