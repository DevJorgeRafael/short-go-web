import { Outlet } from 'react-router-dom';
import { NavBar } from './Navbar';

export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full gradient-gi flex flex-col">
            {/* BACKGROUND DECORATIVO (opcional, lo puedes mover aquí si lo quieres en todas las páginas) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            {/* NAVBAR */}
            <NavBar />

            {/* CONTENIDO DE LA PÁGINA */}
            <main className="relative z-10 flex-1 flex flex-col">
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>
        </div>
    );
};