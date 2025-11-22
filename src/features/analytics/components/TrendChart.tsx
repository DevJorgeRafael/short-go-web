import { useMemo } from 'react';
import type { ClickStat } from '../types/analytics.types';

interface TrendChartProps {
    data: ClickStat[];
    className?: string;
}

export const TrendChart = ({ data, className = "" }: TrendChartProps) => {
    const { path, areaPath, max } = useMemo(() => {
        if (!data || data.length === 0) return { path: '', areaPath: '', max: 0 };

        // Tomamos solo los últimos 30 datos para que no se amontone
        const slicedData = data.slice(-30);
        const maxVal = Math.max(...slicedData.map(d => d.count)) || 1;

        // Dimensiones relativas del SVG (viewBox)
        const width = 100;
        const height = 40; // Relación de aspecto ancha

        // Generar puntos coordenadas [x, y]
        const points = slicedData.map((item, index) => {
            const x = (index / (slicedData.length - 1)) * width;
            // Invertimos Y porque en SVG 0 es arriba
            const y = height - (item.count / maxVal) * height * 0.8; // 0.8 para dejar margen arriba
            return `${x},${y}`;
        }).join(' ');

        // Línea principal
        const linePath = `M ${points}`;

        // Área rellena (cierra el polígono abajo)
        const fillPath = `M ${points} L ${width},${height} L 0,${height} Z`;

        return { path: linePath, areaPath: fillPath, max: maxVal };
    }, [data]);

    if (data.length === 0) return <div className="h-full flex items-center justify-center text-white/20">Sin datos suficientes</div>;

    return (
        <div className={`w-full h-full flex flex-col ${className}`}>
            <div className="flex justify-between items-end mb-2 px-2">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Tendencia (Últimos 30 días)</h3>
                <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                    Pico: {max} clics
                </span>
            </div>

            {/* Contenedor flexible para el SVG */}
            <div className="flex-1 min-h-0 w-full relative">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Área Rellena */}
                    <path d={areaPath} fill="url(#chartGradient)" />

                    {/* Línea */}
                    <path
                        d={path}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke" // Mantiene la línea fina al escalar
                    />
                </svg>
            </div>

            {/* Eje X simple */}
            <div className="flex justify-between text-[10px] text-white/30 mt-1 px-1 font-mono">
                <span>{new Date(data[0]?.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                <span>{new Date(data[data.length - 1]?.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
            </div>
        </div>
    );
};