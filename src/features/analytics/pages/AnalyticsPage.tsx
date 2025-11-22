import { useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getStats, clearAnalytics } from '../store/analyticsSlice';
import {
  Loader2,
  BarChart3,
  Globe,
  MousePointer2,
  Clock,
  CalendarDays,
  ArrowLeft,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import type { ClickStat } from '../types/analytics.types';

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const { statsCode } = useParams<{ statsCode: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { data: stats, isLoading, error } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    if (statsCode) {
      dispatch(getStats({
        code: statsCode,
        token: token || undefined
      }));
    }
    return () => { dispatch(clearAnalytics()); };
  }, [dispatch, statsCode, token]);

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-cyan-500/20 rounded-full"></div>
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin relative z-10" />
        </div>
        <p className="text-white/60 font-display animate-pulse">Cargando estadísticas...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-3xl max-w-md text-center border-red-500/30">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Acceso Denegado</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <Link to="/" className="btn-gradient px-6 py-3 rounded-xl text-white font-medium inline-flex">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">

        {/* === HEADER === */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors mb-2 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Analíticas <span className="text-cyan-400">#{statsCode}</span>
            </h1>
            <p className="text-white/50 font-serif italic mt-1">
              Reporte en tiempo real
            </p>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-white/80 uppercase">Live</span>
            </div>
          </div>
        </header>

        {/* === KPI CARDS === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TOTAL CLICKS (Hero Card) */}
          <div className="glass-card p-6 rounded-3xl md:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <MousePointer2 className="w-32 h-32 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-cyan-300 mb-2">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-bold tracking-wider uppercase">Total Clics</span>
              </div>
              <div className="text-7xl md:text-8xl font-display font-bold text-white tracking-tighter">
                {stats.totalClicks}
              </div>
            </div>
            <div className="mt-4 text-white/40 text-sm">
              Clics totales registrados desde la creación
            </div>
          </div>

          {/* LAST CLICK INFO */}
          <div className="glass-card p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-blue-300 mb-4">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-bold tracking-wider uppercase">Último Clic</span>
              </div>
              {stats.lastClicks.length > 0 ? (
                <div>
                  <p className="text-3xl font-display font-bold text-white">
                    {new Date(stats.lastClicks[0].clickedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    {new Date(stats.lastClicks[0].clickedAt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-white/80">{stats.lastClicks[0].countryCode} - {stats.lastClicks[0].ipAddress}</span>
                  </div>
                </div>
              ) : (
                <p className="text-white/40 italic">Sin actividad reciente</p>
              )}
            </div>
          </div>
        </div>

        {/* === CHART SECTION (Custom CSS Bar Chart) === */}
        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-2 text-purple-300 mb-6">
            <CalendarDays className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider uppercase">Rendimiento Histórico</span>
          </div>

          {/* Gráfico de Barras Responsivo */}
          <div className="h-64 w-full flex items-end justify-around gap-2 md:gap-4">
            {stats.clicksByDate.length > 0 ? (
              stats.clicksByDate.map((item, index) => (
                <BarItem
                  key={index}
                  data={item}
                  max={Math.max(...stats.clicksByDate.map(d => d.count))}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 italic">
                No hay datos suficientes para mostrar el gráfico
              </div>
            )}
          </div>
        </div>

        {/* === GRID INFERIOR === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* TOP COUNTRIES */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-green-300 mb-6">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider uppercase">Top Países</span>
            </div>
            <div className="space-y-4">
              {stats.topCountries.map((country, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {/* Bandera usando API simple */}
                      {country.countryCode !== 'XX' ? (
                        <img
                          src={`https://flagcdn.com/24x18/${country.countryCode.toLowerCase()}.png`}
                          alt={country.countryCode}
                          className="rounded-sm"
                        />
                      ) : (
                        <div className="w-6 h-4 bg-white/10 rounded-sm flex items-center justify-center text-[8px]">?</div>
                      )}
                      <span className="text-white font-medium">
                        {country.countryCode === 'XX' ? 'Desconocido' : country.countryCode}
                      </span>
                    </div>
                    <span className="text-white/60 text-sm">{country.count} clics</span>
                  </div>
                  {/* Barra de progreso */}
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400/80 rounded-full transition-all duration-1000 ease-out group-hover:bg-green-400"
                      style={{ width: `${(country.count / stats.totalClicks) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP REFERRERS */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-orange-300 mb-6">
              <LinkIcon className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider uppercase">Top Referentes</span>
            </div>
            <div className="space-y-3">
              {stats.topReferrers && stats.topReferrers.length > 0 ? (
                stats.topReferrers.map((ref, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-white text-sm font-medium truncate">
                        {ref.referrer || 'Directo / Email'}
                      </p>
                    </div>
                    <div className="bg-white/10 px-2 py-1 rounded-lg">
                      <span className="text-xs font-bold text-white">{ref.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-white/30 italic">
                  Sin datos de referentes aún
                </div>
              )}
            </div>
          </div>
        </div>

        {/* === RECENT CLICKS LOG (TABLE) === */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-bold">Actividad Reciente</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/60">
              <thead className="bg-white/5 text-xs uppercase text-white/40">
                <tr>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">IP</th>
                  <th className="px-6 py-4 font-medium">País</th>
                  <th className="px-6 py-4 font-medium">Navegador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.lastClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white whitespace-nowrap">
                      {new Date(click.clickedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {click.ipAddress}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 text-xs text-white border border-white/10">
                        {click.countryCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={click.userAgent}>
                      {parseUserAgent(click.userAgent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- SUBCOMPONENTE: BARRA DEL GRÁFICO ---
const BarItem = ({ data, max }: { data: ClickStat, max: number }) => {
  // Calculamos altura relativa (mínimo 10% para que se vea)
  const heightPercentage = Math.max((data.count / max) * 100, 10);

  return (
    <div className="flex flex-col items-center gap-2 group flex-1 h-full justify-end">
      <div
        className="w-full max-w-10 bg-linear-to-t from-cyan-600 to-cyan-400 rounded-t-lg opacity-60 group-hover:opacity-100 transition-all duration-300 relative"
        style={{ height: `${heightPercentage}%` }}
      >
        {/* Tooltip simple on hover */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {data.count} Clics
        </div>
      </div>
      <span className="text-xs text-white/40 font-mono -rotate-45 md:rotate-0 origin-top-left md:origin-center mt-2 md:mt-0">
        {new Date(data.date).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}
      </span>
    </div>
  );
};

// Helper simple para limpiar el User Agent visualmente
const parseUserAgent = (ua: string) => {
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Otro";
};

export default AnalyticsPage;