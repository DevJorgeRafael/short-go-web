import { configureStore } from "@reduxjs/toolkit";
import shortLinksReducer from "@/features/short-links/store/shortLinksSlice";
import authReducer from "@/features/auth/store/authSlice";

export const store = configureStore({
    reducer: {
        shortLinks: shortLinksReducer,
        auth: authReducer,
    },
    devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;