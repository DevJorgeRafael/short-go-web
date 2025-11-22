import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createShortLink, clearCurrentLink } from '../store/shortLinksSlice';
import { ShortLinkResult } from '../components/ShortLinkResult';
import type { ShortLinkRequest } from '../types/shortLink.types';
// Importamos los íconos de Lucide
import {
    Link as LinkIcon,
    Loader2,
    Zap,
    BarChart3,
    ShieldCheck,
    Wand2
} from 'lucide-react';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { currentLink, isLoading, error } = useAppSelector((state) => state.shortLinks);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<ShortLinkRequest>({
        mode: 'onChange',
    });

    const onSubmit = async (data: ShortLinkRequest) => {
        try {
            await dispatch(createShortLink(data)).unwrap();
            reset();
        } catch (error) {
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
                                <label className="text-sm font-medium text-white ml-1 flex items-center gap-2">
                                    <Wand2 className="w-4 h-4 text-blue-300" />
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
                                        {errors.originalUrl && (
                                            <p className="text-red-300 text-sm mt-2 ml-1">
                                                {errors.originalUrl.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !isValid}
                                        className="btn-gradient h-14 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 text-white/80" />
                                                <span>Procesando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Acortar Link</span>
                                                {/* Usamos LinkIcon o Wand2 según prefieras la metáfora */}
                                                <LinkIcon className="w-5 h-5" strokeWidth={2.5} />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
                    />
                )}

                {/* FEATURES */}
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="glass-card rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-6 h-6 text-blue-400" strokeWidth={2} />
                        </div>
                        <h3 className="text-white font-semibold mb-1">Súper Rápido</h3>
                        <p className="text-white/50 text-sm">Acorta links en menos de 1 segundo</p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="w-6 h-6 text-cyan-400" strokeWidth={2} />
                        </div>
                        <h3 className="text-white font-semibold mb-1">Con Estadísticas</h3>
                        <p className="text-white/50 text-sm">Trackea clicks y ubicaciones</p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="w-6 h-6 text-green-400" strokeWidth={2} />
                        </div>
                        <h3 className="text-white font-semibold mb-1">100% Seguro</h3>
                        <p className="text-white/50 text-sm">Links protegidos y privados</p>
                    </div>
                </div>
            </div>
        </div>
    );
};