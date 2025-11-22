import type { ReactNode } from "react";

interface KpiStatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon: ReactNode;
    trend?: 'up' | 'down' | 'neutral'; // Por si quieres agregar flechitas luego
    color?: 'cyan' | 'purple' | 'green' | 'orange';
}

export const KpiStatCard = ({ title, value, subtext, icon, color = 'cyan' }: KpiStatCardProps) => {
    const colors = {
        cyan: "text-cyan-400 bg-cyan-500/10",
        purple: "text-purple-400 bg-purple-500/10",
        green: "text-green-400 bg-green-500/10",
        orange: "text-orange-400 bg-orange-500/10",
    };

    return (
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors">
            <div className={`p-3 rounded-xl ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-0.5">{title}</p>
                <h4 className="text-2xl font-display font-bold text-white">{value}</h4>
                {subtext && <p className="text-[10px] text-white/40">{subtext}</p>}
            </div>
        </div>
    );
};