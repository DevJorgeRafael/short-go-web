import { api } from '@/lib/axios';

// DTO para tipar lo que recibes
interface StatsData {
    clicks: number;
    browser: Record<string, number>;
    // ...
}

export const getLinkStats = async (shortCode: string, guestToken?: string) => {
    const config = {
        params: {} as any
    };

    // Lógica Dual:
    // Si hay guestToken, lo enviamos como query param (o header especial)
    // Si no hay, el interceptor de Axios enviará el Bearer token del usuario logueado
    if (guestToken) {
        config.params.token = guestToken;
    }

    const { data } = await api.get<StatsData>(`/analytics/${shortCode}`, config);
    return data;
};