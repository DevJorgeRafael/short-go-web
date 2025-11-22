import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/shared/types/apiResponse.types";
import type { ShortLinkRequest, ShortLinkResponse, ShortLinkDisplay } from "../types/shortLink.types";

export const shortLinksApi = {
    // crear link corto (sin auth)
    createShortLink: async (data: ShortLinkRequest): Promise<ShortLinkDisplay> => {
        const response = await apiClient.post<ApiResponse<ShortLinkResponse>>(
            '/short-links',
            data
        );

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || 'Error al crear el link corto');
        }

        return transformToDisplay(response.data.data);
    },

    getUserLinks: async (): Promise<ShortLinkDisplay[]> => {
        const response = await apiClient.get<ApiResponse<ShortLinkResponse[]>>(
            'short-links/my-links'
        );

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || 'Error al obtener los links');
        }

        return response.data.data.map(transformToDisplay);
    }
}

// ============================= HELPERS ====================================
const getAppBaseUrl = (): string => {
    const env = import.meta.env.VITE_ENV;
    return env === 'prod'
        ? import.meta.env.VITE_APP_URL_PROD
        : import.meta.env.VITE_APP_URL_DEV;
}

function transformToDisplay(data: ShortLinkResponse): ShortLinkDisplay {
    const shortCode = data.shortUrl.split('/').pop() || '';
    const statsToken = extractTokenFromUrl(data.statsUrl);
    const appBaseUrl = getAppBaseUrl();

    const frontendStatsUrl = `${appBaseUrl}/stats/${shortCode}${statsToken ? `?token=${statsToken}` : ''}`;

    return {
        shortCode,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
        statsUrl: frontendStatsUrl,
        qrUrl: data.qrUrl,
        statsToken,
        expiresAt: data.expiresAt,
    }
}

function extractTokenFromUrl(url: string): string | undefined {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('token') || undefined;
    } catch (error) {
        return undefined;
    }
}