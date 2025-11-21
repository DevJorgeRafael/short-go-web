import { createSlice } from '@reduxjs/toolkit';

// Tipo de usuario
interface User {
    id: string;
    email: string;
    name?: string;
}

// Estado inicial temporal (sin auth aún)
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

// Slice temporal de auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Por ahora vacío, lo implementaremos después
    },
});

export default authSlice.reducer;