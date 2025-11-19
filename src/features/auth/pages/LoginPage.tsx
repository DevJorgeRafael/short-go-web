import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">

            <div className="w-full max-w-md relative z-10">

                {/* HEADER: Logo/Título pequeño arriba de la tarjeta */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                        Iniciar Sesión
                    </h1>
                    <p className="text-white/60 text-sm mt-2 font-serif italic">
                        Accede a tu panel de control ShortGo
                    </p>
                </div>

                {/* TARJETA PRINCIPAL - USANDO CLASE GLASS */}
                <div className="glass-card rounded-3xl p-8">
                    <form className="space-y-5">
                        {/* Input Usuario */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white uppercase tracking-wider ml-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="glass-input w-full h-12 rounded-xl px-4 text-white placeholder:text-white/30"
                            />
                        </div>

                        {/* Input Contraseña */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white uppercase tracking-wider ml-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                className="glass-input w-full h-12 rounded-xl px-4 text-white placeholder:text-white/30"
                            />
                        </div>

                        {/* Link Olvidaste contraseña */}
                        <div className="flex justify-end">
                            <Link to="/auth/forgot-password" className="text-xs text-white/60 hover:text-cyan-300 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Botón de Acción */}
                        <button className="btn-gradient w-full h-12 rounded-xl text-white font-semibold flex items-center justify-center gap-2 mt-2">
                            <span>Ingresar al Sistema</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* FOOTER / LINKS EXTERNOS */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-white/60">
                        ¿Aún no tienes cuenta?{' '}
                        <Link to="/auth/register" className="text-cyan-300 font-semibold hover:text-cyan-200 transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>

                    <Link to="/" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al inicio
                    </Link>
                </div>

            </div>
        </div>
    );
};