export interface ClickStat {
    date: string;
    count: number; 
}

export interface CountryStat {
    countryCode : string;
    count: number;
}

export interface LastClick {
    id: number;
    linkCode: string;
    ipAddress: string;
    countryCode: string;
    userAgent: string;
    clickedAt: string;
}

export interface StatsRequest {
    code: string;
    token?: string;
}

export interface ReferrerStat {
    referrer: string;
    count: number;
}

export interface StatsResponse {
    totalClicks: number;
    clicksByDate: ClickStat[];
    topCountries: CountryStat[];
    topReferrers: ReferrerStat[] | null;
    lastClicks: LastClick[];
}

export interface StatsDisplay extends StatsResponse {
    // Se pude agregar más cosas
}