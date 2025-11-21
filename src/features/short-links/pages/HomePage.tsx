import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createShortLink, clearCurrentLink } from '../store/shortLinksSlice';
import { ShortLinkResult } from '../components/ShortLinkResult';
import type { ShortLinkRequest } from '../types/shortLink.types';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { currentLink, isLoading, error } = useAppSelector((state) => state.shortLinks);

    // Configurar react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<ShortLinkRequest>({
        mode: 'onChange', // Validación en tiempo real
    });

    const onSubmit = async (data: ShortLinkRequest) => {
        try {
            await dispatch(createShortLink(data)).unwrap();
            reset(); // Limpiar el formulario después del éxito
        } catch (error) {
            // El error ya está manejado en el slice
            console.error('Error al crear link:', error);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl flex flex-col gap-8">

                {/* HEADER */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest text-white/90 uppercase">
                            Sistema Activo
                        </span>
                    </div>

                    <div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                            Acorta tus Links
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100/60 font-serif italic mt-2">
                            Rápido, Seguro y con Estadísticas
                        </p>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-white ml-1">
                                    Pega tu link largo aquí
                                </label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <input
                                            type="url"
                                            placeholder="https://ejemplo.com/tu-link-muy-largo..."
                                            className={`glass-input w-full h-14 rounded-xl px-4 text-white placeholder:text-white/30 ${errors.originalUrl ? 'border-red-500/50' : ''
                                                }`}
                                            disabled={isLoading}
                                            {...register('originalUrl', {
                                                required: 'La URL es requerida',
                                                pattern: {
                                                    value: /^https?:\/\/.+/,
                                                    message: 'Debe ser una URL válida (http:// o https://)'
                                                }
                                            })}
                                        />
                                        {/* Error de validación del formulario */}
                                        {errors.originalUrl && (
                                            <p className="text-red-300 text-sm mt-2 ml-1">
                                                {errors.originalUrl.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !isValid}
                                        className="btn-gradient h-14 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                <span>Procesando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Acortar Link</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Error de la API */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                        <p className="text-red-300 text-sm">{error}</p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                
                {currentLink && (
                    <ShortLinkResult
                        link={currentLink}
                        onClose={() => dispatch(clearCurrentLink())}
                    >

                    </ShortLinkResult>
                )}


                {/* FEATURES */}
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="glass-card rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-1">Súper Rápido</h3>
                        <p className="text-white/50 text-sm">Acorta links en menos de 1 segundo</p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-1">Con Estadísticas</h3>
                        <p className="text-white/50 text-sm">Trackea clicks y ubicaciones</p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-1">100% Seguro</h3>
                        <p className="text-white/50 text-sm">Links protegidos y privados</p>
                    </div>
                </div>
            </div>
        </div>
    );
};