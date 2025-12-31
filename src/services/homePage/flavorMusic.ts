import api from '@/services/api';

// ============================================
// 型別定義
// ============================================
export interface YouTubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  embedUrl: string;
}

export interface RecommendationResponse {
  success: boolean;
  flavor: string;
  recommendation: string;
  videos: YouTubeVideo[];
  message?: string;
}

interface FlavorRequest {
  flavorId: string;
  flavorName: string;
  description: string;
}

interface RandomMusicRequest {
  currentFlavorName: string;
}

// ============================================
// API 方法
// ============================================

/**
 * 根據風味取得音樂推薦
 */
export const getMusicByFlavor = async (request: FlavorRequest): Promise<RecommendationResponse> => {
  const response = await api.post('/api/music/flavor', request);
  return response.data;
};

/**
 * 取得隨機音樂推薦
 */
export const getRandomMusic = async (
  request: RandomMusicRequest
): Promise<RecommendationResponse> => {
  const response = await api.post('/api/music/random', request);
  return response.data;
};
