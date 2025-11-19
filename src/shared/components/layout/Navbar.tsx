import { useAuthStore } from "@/features/auth/store/authStore";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();

    return (
        <nav className="relative z-20 border-b border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SG</span>
                        </div>
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
                                        onClick={logout}
                                        className="h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
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
                                    className="h-9 px-4 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all"
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