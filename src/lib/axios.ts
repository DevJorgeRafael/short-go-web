import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // IMPORTANTE: para enviar cookies httpOnly
});

// Interceptor de request (por ahora vacío, después se agrega el refresh token)
apiClient.interceptors.request.use(
    (config) => {
        // Aqui después se agrega la lógica para cada request
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de response para manejar errores globalmente
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o no autenticado
            // Desués se implementará el refresh token aquí
            console.error('No autenticado');
        }
        return Promise.reject(error);
    }
)