import api from '@/services/api';

// === 類型定義 ===

export interface FlavorProfile {
    sweetness: number;
    acidity: number;
    clarity: number;
    body: number;
    aftertaste: number;
}

export interface FairyContext {
    origin: string;
    roast: string;
    grind: string;
    ratio: string;
    method: string;
    pourStages?: string;
    flavorProfile: FlavorProfile;
}

export interface FairyMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface FairySuggestRequest {
    mode: 'select' | 'adjust';
    context: FairyContext;
}

interface FairyChatRequest {
    mode: 'chat';
    message: string;
    context: FairyContext;
    history?: FairyMessage[];
}

interface FairyResponse {
    answer: string;
    error?: string;
}

// === API 呼叫函數 ===

/**
 * 請精靈幫我選配方
 */
export async function askFairyToSelect(context: FairyContext): Promise<string> {
    const res = await api.post<FairyResponse>('/api/gemini/fairy/suggest', {
        mode: 'select',
        context,
    } as FairySuggestRequest);
    return res.data.answer;
}

/**
 * 請精靈幫我調整
 */
export async function askFairyToAdjust(context: FairyContext): Promise<string> {
    const res = await api.post<FairyResponse>('/api/gemini/fairy/suggest', {
        mode: 'adjust',
        context,
    } as FairySuggestRequest);
    return res.data.answer;
}

/**
 * 與精靈自由對話
 */
export async function chatWithFairy(
    message: string,
    context: FairyContext,
    history: FairyMessage[] = []
): Promise<string> {
    const res = await api.post<FairyResponse>('/api/gemini/fairy/chat', {
        mode: 'chat',
        message,
        context,
        history,
    } as FairyChatRequest);
    return res.data.answer;
}
