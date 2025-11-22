import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { analyticsApi } from "../api/analyticsApi";
import type { StatsRequest, StatsDisplay } from "../types/analytics.types";

interface AnalyticsState {
    data: StatsDisplay | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    data: null,
    isLoading: false,
    error: null,
}

export const getStats = createAsyncThunk(
    'analytics/getStats',
    async (request: StatsRequest, { rejectWithValue }) => {
        try {
            const response = await analyticsApi.getLinkStats(request);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error desconocido al cargar estadísticas');
        }
    }
)

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        clearAnalytics: (state) => {
            state.data = null;
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getStats.fulfilled, (state, action: PayloadAction<StatsDisplay>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;