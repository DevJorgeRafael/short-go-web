import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/shared/types/apiResponse.types";
import type { StatsRequest, StatsResponse, StatsDisplay } from "../types/analytics.types";

export const analyticsApi = {
    getLinkStats: async (request: StatsRequest): Promise<StatsDisplay> => {
        const response = await apiClient.get<ApiResponse<StatsResponse>>(
            `/stats/${request.code}`,
            {
                params: {
                    token: request.token,
                }
            }
        );

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || 'Error al obtener las estadísticas del enlace');
        }

        return transformToDisplay(response.data.data);
    }
}


// ============================= HELPERS ====================================
function transformToDisplay(data: StatsResponse): StatsDisplay {
    return {
        ...data,
        // Se pude agregar más cosas
    };
}