import { useState } from 'react';
import type { ShortLinkDisplay } from '../types/shortLink.types';
import { Copy, Check } from 'lucide-react';

interface ShortLinkResultProps {
    link: ShortLinkDisplay;
    onClose: () => void;
}

export const ShortLinkResult = ({ link, onClose }: ShortLinkResultProps) => {
    const [copiedShort, setCopiedShort] = useState(false);
    const [copiedStats, setCopiedStats] = useState(false);

    const handleCopyShort = async () => {
        await navigator.clipboard.writeText(link.shortUrl);
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2000);
    };

    const handleCopyStats = async () => {
        await navigator.clipboard.writeText(link.statsUrl);
        setCopiedStats(true);
        setTimeout(() => setCopiedStats(false), 3000);
        // Aquí podrías disparar un Toast real si tienes el componente
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl transform transition-all scale-100">
                <div className="glass-card rounded-3xl p-1 border border-white/20 shadow-2xl shadow-blue-900/20">
                    <div className="rounded-[20px] p-6 md:p-8">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">¡Enlace Generado!</h3>
                                    <p className="text-sm text-gray-400">Tu link está listo para compartir</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* SECCIÓN SUPERIOR: LINK CORTO */}
                        <div className="mb-8">
                            <label className="text-xs uppercase tracking-wider text-blue-300 font-semibold ml-1 mb-2 block">
                                Link Público (Comparte este)
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1 group">
                                    <input 
                                        readOnly
                                        value={link.shortUrl}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                </div>
                                <button 
                                    onClick={handleCopyShort}
                                    className={`h-14 px-6 rounded-xl font-medium flex items-center gap-2 transition-all ${
                                        copiedShort 
                                            ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                                            : 'bg-blue-600 text-white hover:bg-blue-500'
                                    }`}
                                >
                                    {copiedShort ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span>Copiado</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            <span>Copiar</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* SECCIÓN DIVIDIDA: QR y PRIVACIDAD */}
                        <div className="grid md:grid-cols-2 gap-6">
                            
                            {/* COLUMNA 1: QR CODE VISUAL */}
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
                                {/* 1. Contenedor que actúa como "marco" de recorte */}
                                <div className="w-32 h-32 overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-200">
                                    <img
                                        src={link.qrUrl}
                                        alt="QR Code"
                                        className="w-full h-full object-cover scale-[1.15] transition-transform hover:scale-[1.35]"
                                    />
                                </div>
                                <p className="text-white font-medium text-sm">Código QR</p>
                                <p className="text-gray-400 text-xs mt-1">Escanea o toma captura para compartir visualmente.</p>
                            </div>

                            {/* COLUMNA 2: ZONA PRIVADA (STATS) */}
                            <div className="bg-amber-500/10 rounded-2xl p-5 border border-amber-500/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-amber-400">
                                        <Check className="w-5 h-5" />
                                        <h4 className="font-bold text-sm uppercase tracking-wide">Acceso Privado</h4>
                                    </div>
                                    
                                    <p className="text-amber-200/80 text-xs leading-relaxed mb-4">
                                        Este enlace te permite ver las estadísticas o reclamar este link si te registras después. 
                                        <strong className="text-amber-200 block mt-1">¡No lo compartas con nadie!</strong>
                                    </p>
                                </div>

                                <button 
                                    onClick={handleCopyStats}
                                    className="w-full py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl text-amber-300 text-sm font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    {copiedStats ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            ¡Guardado!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            Copiar Link de Administración
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};