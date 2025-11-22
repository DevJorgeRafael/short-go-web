interface RankingItem {
    label: string;
    count: number;
    icon?: string; // URL de imagen (bandera) o null
    secondaryText?: string;
}

interface RankingListProps {
    title: string;
    items: RankingItem[];
    total: number;
    type: 'country' | 'referrer';
}

export const RankingList = ({ title, items, total, type }: RankingListProps) => {
    return (
        <div className="glass-card p-5 rounded-3xl h-full flex flex-col">
            <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4 flex items-center gap-2">
                {title}
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {items.length > 0 ? items.map((item, idx) => (
                    <div key={idx} className="group">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <div className="flex items-center gap-2 overflow-hidden">
                                {type === 'country' && item.icon && (
                                    <img src={item.icon} alt={item.label} className="w-4 h-3 rounded-sm object-cover" />
                                )}
                                <span className="text-white/90 truncate" title={item.label}>{item.label}</span>
                            </div>
                            <span className="text-white/50 text-xs font-mono">{item.count}</span>
                        </div>
                        {/* Barra de progreso mini */}
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${type === 'country' ? 'bg-green-400' : 'bg-orange-400'}`}
                                style={{ width: `${(item.count / total) * 100}%` }}
                            />
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-white/20 text-xs py-4">Sin datos</div>
                )}
            </div>
        </div>
    );
};