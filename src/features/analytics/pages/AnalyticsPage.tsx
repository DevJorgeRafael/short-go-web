import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getStats, clearAnalytics } from '../store/analyticsSlice';
import { Loader2, MousePointer2, Globe, Link as LinkIcon, Clock } from 'lucide-react';

// Componentes nuevos
import { TrendChart } from '../components/TrendChart';
import { RankingList } from '../components/RankingList';
import { RecentActivity } from '../components/RecentActivity';
import { KpiStatCard } from '../components/kpiStatCard';

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const { statsCode } = useParams<{ statsCode: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { data: stats, isLoading, error } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    if (statsCode) dispatch(getStats({ code: statsCode, token: token || undefined }));
    return () => { dispatch(clearAnalytics()); };
  }, [dispatch, statsCode, token]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 text-cyan-400 animate-spin" /></div>;
  if (error || !stats) return <div className="min-h-screen flex items-center justify-center text-red-400">{error || "No data"}</div>;

  // Preparar datos para RankingList
  const countryItems = stats.topCountries.map(c => ({
    label: c.countryCode === 'XX' ? 'Desconocido' : c.countryCode,
    count: c.count,
    icon: c.countryCode !== 'XX' ? `https://flagcdn.com/24x18/${c.countryCode.toLowerCase()}.png` : undefined
  }));

  const referrerItems = (stats.topReferrers || []).map(r => ({
    label: r.referrer || 'Directo / Email',
    count: r.count
  }));

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* === HEADER === */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              Dashboard <span className="text-cyan-400">#{statsCode}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Live</span>
          </div>
        </div>

        {/* === BENTO GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">

          {/* 1. KPI ROW (4 cards) */}
          <KpiStatCard
            title="Total Clics"
            value={stats.totalClicks}
            icon={<MousePointer2 className="w-5 h-5" />}
            color="cyan"
          />
          <KpiStatCard
            title="Último Clic"
            value={stats.lastClicks[0] ? new Date(stats.lastClicks[0].clickedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
            subtext={stats.lastClicks[0] ? new Date(stats.lastClicks[0].clickedAt).toLocaleDateString() : ''}
            icon={<Clock className="w-5 h-5" />}
            color="purple"
          />
          <KpiStatCard
            title="Top País"
            value={stats.topCountries[0]?.countryCode || '--'}
            subtext={`${stats.topCountries[0]?.count || 0} clics`}
            icon={<Globe className="w-5 h-5" />}
            color="green"
          />
          <KpiStatCard
            title="Top Fuente"
            value={stats.topReferrers?.[0]?.referrer ? new URL(stats.topReferrers[0].referrer).hostname : 'Directo'}
            icon={<LinkIcon className="w-5 h-5" />}
            color="orange"
          />

          {/* 2. MIDDLE ROW: Chart (Large) + Countries (Small) */}
          <div className="lg:col-span-3 glass-card p-6 rounded-3xl h-60">
            <TrendChart data={stats.clicksByDate} />
          </div>

          <div className="lg:col-span-1 h-60">
            <RankingList
              title="Top Países"
              items={countryItems}
              total={stats.totalClicks}
              type="country"
            />
          </div>

          {/* 3. BOTTOM ROW: Referrers + Activity */}
          <div className="lg:col-span-2 h-72">
            <RankingList
              title="Fuentes de Tráfico"
              items={referrerItems}
              total={stats.totalClicks}
              type="referrer"
            />
          </div>
          <div className="lg:col-span-2 h-72">
            <RecentActivity clicks={stats.lastClicks} />
          </div>

        </div>
      </div>
      <div className="h-8 md:h-6 w-full" />
    </div>
  );
};

export default AnalyticsPage;