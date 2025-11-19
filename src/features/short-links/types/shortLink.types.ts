export interface ShortLinkRequest {
    originalUrl: string;
}

export interface ShortLinkResponse {
    originalUrl: string;      // URL original
    shortUrl: string;          // URL acortado (ej: short.go/abc123)
    qrCodeUrl: string;         // URL para descargar QR
    statsCode: string;         // Código privado para ver stats
    statsUrl: string;          // URL completa para stats
    createdAt: string;
    expiresAt?: string;
}

export interface ShortLinkStats {
    shortCode: string;
    totalClicks: number;
    clicksByCountry: Record<string, number>;
    clicksByDevice: Record<string, number>;
    clicksByDate: Array<{
        date: string;
        clicks: number;
    }>;
}