import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // IMPORTANTE: para enviar cookies httpOnly
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o no autenticado
            // Podrías redirigir al login o refrescar el token
        }
        return Promise.reject(error);
    }
);