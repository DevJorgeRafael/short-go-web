import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirige al login pero guarda la ubicación para volver después
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};