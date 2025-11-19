import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { MainLayout } from '@/shared/components/layout/MainLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { HomePage } from '@/features/short-links/pages/HomePage';
import { DashboardPage } from '@/features/short-links/pages/DashboardPage';
import StatsPage from '@/features/analytics/pages/StatsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'auth/login',
                element: <LoginPage />,
            },
            {
                path: 'auth/register',
                element: <RegisterPage />,
            },
            {
                path: 'stats/:statsCode',
                element: <StatsPage />,
            },
        ],
    },
    // Rutas protegidas anidadas
    {
        element: <ProtectedRoute />, // 👈 Usa Outlet
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            // Aquí puedes agregar más rutas protegidas
        ],
    },
]);