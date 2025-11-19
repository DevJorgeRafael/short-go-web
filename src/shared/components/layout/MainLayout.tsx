import { Outlet } from 'react-router-dom';
import { NavBar } from './Navbar';

export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full gradient-gi flex flex-col">
            <NavBar />
            <main className="relative z-10 flex-1 flex flex-col">
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>
        </div>
    );
};