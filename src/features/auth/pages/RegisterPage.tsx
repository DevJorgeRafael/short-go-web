import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div className="flex-1 flex items-center justify-center p-4">

            <div className="w-full max-w-md relative z-10">

                {/* HEADER: Título adaptado para Registro */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                        Crear Cuenta
                    </h1>
                    <p className="text-white/60 text-sm mt-2 font-serif italic">
                        Únete a ShortGo y empieza a gestionar tus enlaces
                    </p>
                </div>

                {/* TARJETA PRINCIPAL */}
                <div className="glass-card rounded-3xl p-8">
                    <form className="space-y-5">

                        {/* Input Nombre (Nuevo campo solicitado) */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white uppercase tracking-wider ml-1">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                placeholder="John"
                                className="glass-input w-full h-12 rounded-xl px-4 text-white placeholder:text-white/30"
                            />
                        </div>

                        {/* Input Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white uppercase tracking-wider ml-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
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

                        {/* Botón de Acción */}
                        <button className="btn-gradient w-full h-12 rounded-xl text-white font-semibold flex items-center justify-center gap-2 mt-4">
                            <span>Registrarse</span>
                            {/* Icono de User Add */}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* FOOTER / LINKS EXTERNOS */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-white/60">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/auth/login" className="text-cyan-300 font-semibold hover:text-cyan-200 transition-colors">
                            Inicia sesión aquí
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