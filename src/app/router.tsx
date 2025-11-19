import { createBrowserRouter } from 'react-router-dom';
import App from '@/app/App'; // Tu Landing Page actual
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // Esta es tu Home (Landing Page)
    },
    {
        path: '/auth/login', // Prefiero agruparlas bajo /auth, pero puede ser /login directo si gustas
        element: <LoginPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
    // Aquí agregaremos el Dashboard luego con ProtectedRoute
    /*
    {
      path: '/dashboard',
      element: <ProtectedRoute />,
      children: [
         { path: '', element: <DashboardPage /> }
      ]
    }
    */
]);