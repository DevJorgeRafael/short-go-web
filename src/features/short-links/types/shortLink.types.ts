export interface ShortLinkRequest {
    originalUrl: string;
}

export interface ShortLinkResponse {
    shortUrl: string;
    originalUrl: string;
    statsUrl: string;
    qrUrl: string;
    expiresAt?: string;
}

export interface ShortLinkDisplay {
    shortCode: string;
    shortUrl: string;
    originalUrl: string;
    statsUrl: string;
    qrUrl: string;
    statsToken?: string;
    expiresAt?: string;
}
