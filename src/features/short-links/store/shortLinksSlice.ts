import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shortLinksApi } from '../api/shortLinksApi';
import type { ShortLinkRequest, ShortLinkDisplay } from '../types/shortLink.types';

// Estado inicial del slice
interface ShortLinksState {
    currentLink: ShortLinkDisplay | null;
    userLinks: ShortLinkDisplay[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ShortLinksState = {
    currentLink: null,
    userLinks: [],
    isLoading: false,
    error: null,
};

// Thunk asíncrono para crear short link
export const createShortLink = createAsyncThunk(
    'shortLinks/create',
    async (data: ShortLinkRequest, { rejectWithValue }) => {
        try {
            const response = await shortLinksApi.createShortLink(data);
            return response;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            return rejectWithValue(message);
        }
    }
);

// Slice
const shortLinksSlice = createSlice({
    name: 'shortLinks',
    initialState,
    reducers: {
        // Acciones síncronas
        clearCurrentLink: (state) => {
            state.currentLink = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Manejo de la acción asíncrona createShortLink
        builder
            .addCase(createShortLink.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createShortLink.fulfilled, (state, action: PayloadAction<ShortLinkDisplay>) => {
                state.isLoading = false;
                state.currentLink = action.payload;
            })
            .addCase(createShortLink.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Exportar acciones
export const { clearCurrentLink, clearError } = shortLinksSlice.actions;

// Exportar reducer
export default shortLinksSlice.reducer;