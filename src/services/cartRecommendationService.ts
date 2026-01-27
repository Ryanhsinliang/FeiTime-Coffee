import api from '@/services/api';

/**
 * AI 推薦商品結構
 */
export interface AIRecommendedProduct {
    id: number;
    documentId?: string;
    name: string;
    flavor_type: string;
    roast: string;
    origin?: string;
    processing?: string;
    flavor_tags?: string[];
    price: number;
    stock?: number;
    img?: any[];
    matchScore: number;
}

/**
 * AI 推薦回應結構
 */
export interface CartRecommendationResponse {
    success: boolean;
    hasProfile: boolean;
    message?: string;
    aiMessage: {
        matchPercentage: number;
        message: string;
        brewingTip: string;
    } | null;
    recommendations: AIRecommendedProduct[];
}

/**
 * 呼叫購物車 AI 推薦 API
 * @param userId 使用者 ID
 * @param cartItems 購物車商品列表
 */
export async function fetchCartRecommendations(
    userId: number,
    cartItems: Array<{ id: number; name?: string; flavor_type?: string }>
): Promise<CartRecommendationResponse> {
    try {
        const response = await api.post<CartRecommendationResponse>(
            '/api/cart/recommendations',
            { userId, cartItems }
        );
        return response.data;
    } catch (error) {
        console.error('❌ 取得購物車推薦失敗:', error);
        // 回傳預設結構以避免前端崩潰
        return {
            success: false,
            hasProfile: false,
            aiMessage: null,
            recommendations: [],
        };
    }
}
