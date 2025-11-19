import { apiClient } from '@/lib/axios';
import type { ShortLinkRequest, ShortLinkResponse, ShortLinkStats } from '../types/shortLink.types';

export const shortLinksApi = {
    // Crear link corto (sin auth)
    createShortLink: async (data: ShortLinkRequest): Promise<ShortLinkResponse> => {
        const response = await apiClient.post<ShortLinkResponse>('/shorten', data);
        return response.data;
    },

    // Obtener links del usuario (con auth)
    getUserLinks: async (): Promise<ShortLinkResponse[]> => {
        const response = await apiClient.get<ShortLinkResponse[]>('/my-links');
        return response.data;
    },

    // Obtener estadísticas (requiere statsCode)
    getStats: async (statsCode: string): Promise<ShortLinkStats> => {
        const response = await apiClient.get<ShortLinkStats>(`/stats/${statsCode}`);
        return response.data;
    },
};