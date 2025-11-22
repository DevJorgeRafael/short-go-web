import type { LastClick } from "../types/analytics.types";

// Helper para limpiar IPs
const cleanIp = (ip: string) => ip.replace(/:\d+$/, '').replace('[', '').replace(']', '');

// Helper para User Agent
const parseUA = (ua: string) => {
    if (ua.includes("iPhone")) return "iPhone";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("Mac")) return "Mac";
    if (ua.includes("Windows")) return "Windows";
    return "Otro";
};

export const RecentActivity = ({ clicks }: { clicks: LastClick[] }) => {
    return (
        <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-white/10">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Última Actividad</h3>
            </div>
            <div className="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
                <table className="w-full text-left text-xs text-white/60">
                    <thead className="bg-white/5 text-white/40">
                        <tr>
                            <th className="px-4 py-3 font-medium">Hora</th>
                            <th className="px-4 py-3 font-medium">IP</th>
                            <th className="px-4 py-3 font-medium">Dispositivo</th>
                            <th className="px-4 py-3 font-medium text-right">País</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {clicks.map((click) => (
                            <tr key={click.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 text-white whitespace-nowrap">
                                    {new Date(click.clickedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-4 py-3 font-mono text-[10px] opacity-70">
                                    {cleanIp(click.ipAddress)}
                                </td>
                                <td className="px-4 py-3">{parseUA(click.userAgent)}</td>
                                <td className="px-4 py-3 text-right">
                                    <span className="inline-block bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">
                                        {click.countryCode}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};