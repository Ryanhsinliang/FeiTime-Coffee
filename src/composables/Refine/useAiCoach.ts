/**
 * AI 教練功能 Composable
 * 從 App.vue 抽取的 AI 相關功能
 */

import { reactive, ref } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { AiAdvice, AiReport, BrewConfig } from '@/types/RefineTypes';
import { getExtractionIndex } from '@/utils/Refine/brewMath';

// Google Generative AI
// import { GoogleGenAI } from "@google/genai";

/**
 * AI 教練 Composable
 * 提供即時建議和沖煮報告
 */
export function useAiCoach(
    configObject: ComputedRef<BrewConfig>,
    currentRatio: ComputedRef<string>,
    roastLabel: ComputedRef<string>,
    grindLabel: ComputedRef<string>,
    formattedTime: ComputedRef<string>,
    currentExtractionIndex: ComputedRef<string>,
    currentUniformityIndex: ComputedRef<string>,
    sessionLog: Ref<any[]>
) {
    // AI 客戶端 - 使用 Vite 環境變數
    // AI 客戶端 - 改用後端 API
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    // const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    // AI 即時建議狀態
    const aiAdvice = reactive<AiAdvice>({ action: '', reason: '' });
    const isAiLoading = ref(false);
    let lastAiCallTime = 0;

    // AI 沖煮報告狀態
    const aiReport = reactive<AiReport>({
        summary: '',
        top_issues: [],
        next_attempt_plan: [],
        taste_prediction: '',
        loading: false,
        done: false
    });

    /**
     * 取得即時 AI 建議
     */
    /**
     * 取得即時 AI 建議
     */
    const fetchAiAdvice = async (trigger = 'update') => {
        // 節流：載入中或 8 秒內不重複呼叫 (除非是階段變化)
        const now = Date.now();
        if (isAiLoading.value) return;
        if (trigger === 'update' && (now - lastAiCallTime < 8000)) return;

        isAiLoading.value = true;
        lastAiCallTime = now;

        const config = configObject.value;
        const simplifiedState = {
            roast: config.roastLevel < -0.3 ? 'light' : config.roastLevel > 0.3 ? 'dark' : 'medium',
            grind: config.grindLevel < -0.3 ? 'fine' : config.grindLevel > 0.3 ? 'coarse' : 'medium',
            water_poured: Math.round(config.waterPouredMl),
            time_elapsed: Math.round(config.elapsedSec),
            phase: config.bloomPhase,
            ratio: `1:${currentRatio.value}`,
            extraction_index: getExtractionIndex(config).toFixed(2)
        };

        try {
            const response = await fetch(`${API_BASE}/api/gemini/refine/advice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brewState: simplifiedState })
            });

            if (!response.ok) throw new Error('API Request successful but returned error status');

            const json = await response.json();
            aiAdvice.action = json.action;
            aiAdvice.reason = json.reason;
        } catch (e: any) {
            console.error("AI Coach Error (fetchAiAdvice):", e);
            aiAdvice.action = "連線錯誤";
            aiAdvice.reason = "無法取得建議";
        } finally {
            isAiLoading.value = false;
        }
    };

    /**
     * 生成沖煮報告
     */
    /**
     * 生成沖煮報告
     */
    const generateBrewReport = async () => {
        aiReport.loading = true;
        aiReport.done = false;

        // 壓縮日誌字串
        const logStr = sessionLog.value.map(l => `T${l.t}:W${l.w}:Ph-${l.ph}`).join('\n');

        const finalConfig = {
            roast: roastLabel.value,
            grind: grindLabel.value,
            ratio: currentRatio.value,
            time: formattedTime.value,
            extraction: currentExtractionIndex.value,
            uniformity: currentUniformityIndex.value
        };

        try {
            const response = await fetch(`${API_BASE}/api/gemini/refine/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ finalConfig, logStr })
            });

            if (!response.ok) throw new Error("Report API Error");

            const json = await response.json();
            aiReport.summary = json.summary;
            aiReport.top_issues = json.top_issues || [];
            aiReport.next_attempt_plan = json.next_attempt_plan || [];
            aiReport.taste_prediction = json.taste_prediction;
            aiReport.done = true;
        } catch (e: any) {
            console.error("AI Report Error (generateBrewReport):", e);
            aiReport.summary = `無法生成報告: ${e.message || "未知錯誤"}`;
        } finally {
            aiReport.loading = false;
        }
    };

    /**
     * 複製配方到剪貼簿
     */
    const copyRecipe = () => {
        if (!aiReport.done) return;
        const text = `FeiTime AI 建議配方:\n${aiReport.next_attempt_plan.join('\n')}`;
        navigator.clipboard.writeText(text).then(() => {
            alert("配方已複製 (Recipe Copied)");
        });
    };

    /**
     * 重置 AI 狀態
     */
    const resetAiState = () => {
        aiAdvice.action = '';
        aiAdvice.reason = '';
        lastAiCallTime = 0;
        aiReport.done = false;
        aiReport.loading = false;
        aiReport.summary = '';
        aiReport.top_issues = [];
        aiReport.next_attempt_plan = [];
        aiReport.taste_prediction = '';
    };

    return {
        aiAdvice,
        isAiLoading,
        aiReport,
        fetchAiAdvice,
        generateBrewReport,
        copyRecipe,
        resetAiState
    };
}
