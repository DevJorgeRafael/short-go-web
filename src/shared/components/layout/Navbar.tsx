import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { Link } from "react-router-dom";

export const NavBar = () => {
    // Obtener auth desde Redux
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        // Por ahora no hace nada, lo implementaremos después
        console.log('Logout');
    };

    return (
        <nav className="glass-card relative z-20 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-white font-bold text-xl">ShortGo</span>
                    </Link>

                    {/* NAVEGACIÓN */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Mis Links
                                </Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-white/60 text-sm">{user?.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="glass-input h-9 px-4 rounded-lg text-white text-sm font-medium"
                                    >
                                        Salir
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth/login"
                                    className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="btn-gradient h-9 px-4 rounded-lg text-white text-sm font-semibold flex items-center justify-center"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}