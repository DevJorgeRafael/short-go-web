import axios from 'axios';
import { useAuthStore } from '../features/auth/store/authStore';

// 1. Instancia principal
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    withCredentials: true, // IMPORTANTE: Permite enviar/recibir cookies HttpOnly
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor de Request: Inyecta el Access Token si existe
api.interceptors.request.use(
    (config) => {
        // Leemos el token directo del store de Zustand (sin hooks de React)
        const token = useAuthStore.getState().accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Interceptor de Response: Maneja el error 401 y el Refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no hemos reintentado aún
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Intentamos refrescar el token
                // Nota: Esta ruta '/auth/refresh' debe leer la cookie HttpOnly en el backend
                const { data } = await api.post('/auth/refresh');

                // Si funciona, actualizamos el store
                useAuthStore.getState().setAccessToken(data.access_token);

                // Y reintentamos la petición original con el nuevo token
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Si el refresh falla (token expirado o inválido), cerramos sesión
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);