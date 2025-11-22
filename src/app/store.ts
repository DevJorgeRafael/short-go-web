import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/authSlice";
import shortLinksReducer from "@/features/short-links/store/shortLinksSlice";
import analyticsReducer from "@/features/analytics/store/analyticsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shortLinks: shortLinksReducer,
        analytics: analyticsReducer,
    },
    devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;