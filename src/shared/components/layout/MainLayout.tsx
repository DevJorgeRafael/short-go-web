import { Outlet } from 'react-router-dom';
import { NavBar } from './Navbar';

export const MainLayout = () => {
    return (
        <div className="h-screen w-full gradient-gi flex flex-col overflow-hidden">
            <NavBar />
            <main className="relative z-10 flex-1 flex flex-col overflow-y-auto custom-scrollbar scroll-smooth">
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>
        </div>
    );
};