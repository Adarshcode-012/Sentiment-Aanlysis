import React, { useState, useEffect } from 'react';
import {
    Database,
    Smile,
    Frown,
    Hash,
    TrendingUp,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import MetricCard from '../components/cards/MetricCard';
import SentimentPieChart from '../components/charts/SentimentPieChart';
import SentimentTrendChart from '../components/charts/SentimentTrendChart';
import DashboardHeader from '../components/layout/DashboardHeader';
import { useDashboard } from '../context/DashboardContext';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const { range, selectedSector } = useDashboard();
    const [stats, setStats] = useState(null);
    const [distribution, setDistribution] = useState(null);
    const [trend, setTrend] = useState(null);
    const [sectors, setSectors] = useState([]);
    const [liveSignals, setLiveSignals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const filters = { range, sector: selectedSector };
            const [s, d, t, sec, ls] = await Promise.all([
                api.getStats(filters),
                api.getSentimentDistribution(filters),
                api.getSentimentTrend(filters),
                api.getSectorSentiment(),
                api.getLiveSignals()
            ]);
            setStats(s);
            setDistribution(d);
            setTrend(t);
            setSectors(sec);
            setLiveSignals(ls);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [range, selectedSector]);

    if (loading && !stats) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            <DashboardHeader
                title="Market Overview"
                subtitle="Global consumer sentiment and emerging trend analysis."
                onRefresh={fetchData}
                loading={loading}
            />

            {/* Premium Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Analyzed Signals"
                    value={stats?.totalDataPoints.toLocaleString()}
                    change="+12.5%"
                    changeType="up"
                    icon={Database}
                />
                <MetricCard
                    title="Positive Momentum"
                    value={stats?.positiveSentiment}
                    unit="%"
                    change="+3.2%"
                    changeType="up"
                    icon={Smile}
                />
                <MetricCard
                    title="Negative Friction"
                    value={stats?.negativeSentiment}
                    unit="%"
                    change="-1.5%"
                    changeType="down"
                    icon={Frown}
                />
                <MetricCard
                    title="Detected Clusters"
                    value={stats?.activeTopics}
                    change="Stable"
                    changeType="stable"
                    icon={Hash}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sentiment Trend */}
                <div className="lg:col-span-8 card">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-text-primary">Sentiment Trajectory</h3>
                            <p className="text-xs text-text-secondary mt-1">Aggregate sentiment scoring over time.</p>
                        </div>
                        <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-accent-secondary">
                            <span className="w-2 h-2 bg-accent-secondary rounded-full mr-2 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                            Global Index
                        </span>
                    </div>
                    <div className="h-[350px]">
                        <SentimentTrendChart data={trend} />
                    </div>
                </div>

                {/* Sector Performance */}
                <div className="lg:col-span-4 card flex flex-col">
                    <h3 className="text-xl font-bold text-text-primary mb-6">Sector Performance</h3>
                    <div className="flex-1 space-y-6">
                        {sectors.map((s, i) => (
                            <div key={i} className="space-y-2 group">
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-text-primary group-hover:text-accent-secondary transition-colors">{s.sector}</span>
                                    <span className={s.score > 60 ? 'text-sentiment-positive' : s.score < 40 ? 'text-sentiment-negative' : 'text-sentiment-neutral'}>
                                        {s.score}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-border-dark rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${s.score > 60 ? 'bg-sentiment-positive shadow-[0_0_10px_rgba(34,197,94,0.5)]' : s.score < 40 ? 'bg-sentiment-negative shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-sentiment-neutral shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}
                                        style={{ width: `${s.score}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] uppercase font-bold text-text-secondary">
                                    <span>Volatility: {s.vol}%</span>
                                    <span className={`flex items-center ${s.score > 50 ? 'text-sentiment-positive' : 'text-sentiment-negative'}`}>
                                        {s.score > 50 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                        {s.score > 50 ? 'Strong' : 'Weak'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 w-full py-3 bg-bg-primary text-text-secondary text-xs font-bold rounded-xl hover:bg-bg-secondary transition-colors border border-border-dark hover:border-accent-primary/50 hover:text-text-primary uppercase tracking-widest">
                        Full Sector Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sentiment Distribution */}
                <div className="card">
                    <h3 className="text-lg font-bold text-text-primary mb-6">Sentiment Breakdown</h3>
                    <div className="h-72 flex items-center justify-center">
                        <SentimentPieChart data={distribution || []} />
                    </div>
                </div>

                {/* Live Analysis Feed */}
                <div className="card lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text-primary flex items-center">
                            <span className="w-2 h-2 bg-sentiment-negative rounded-full mr-3 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                            Live Intelligence Feed
                        </h3>
                        <span className="text-[10px] font-bold text-text-secondary uppercase">Streaming active</span>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                        {liveSignals.map((sig) => (
                            <div key={sig.id} className="p-4 bg-bg-primary rounded-xl border border-border-dark flex items-center justify-between hover:bg-bg-secondary hover:border-accent-primary/30 transition-all cursor-pointer group">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sig.type === 'surge' ? 'bg-sentiment-positive/10 text-sentiment-positive' :
                                            sig.type === 'dip' ? 'bg-sentiment-negative/10 text-sentiment-negative' : 'bg-accent-primary/10 text-accent-primary'
                                        }`}>
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-primary group-hover:text-accent-secondary transition-colors">{sig.msg}</p>
                                        <p className="text-xs text-text-secondary uppercase tracking-tighter mt-1">Sector: {sig.sector} • Intensity: <span className="text-accent-primary">{sig.intensity}</span></p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-text-secondary">{sig.time}</span>
                                    <div className="hidden group-hover:flex justify-end mt-1">
                                        <ChevronRight className="w-4 h-4 text-accent-secondary" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Deep Insight */}
            <div className="card bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white relative overflow-hidden group border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                <div className="relative z-10 p-6">
                    <div className="flex items-center space-x-2 text-accent-secondary mb-6">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Generative AI Forecast</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-3xl font-bold mb-4 leading-tight tracking-tight text-white">Sentiment shift detected in 'Renewables'</h3>
                            <p className="text-indigo-200 text-lg opacity-90 leading-relaxed font-medium">
                                Quantitative analysis reveals a 45% week-over-week increase in positive discourse
                                surrounding battery technology advancements.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <p className="text-xs font-bold uppercase text-accent-secondary mb-2 tracking-widest">Primary Catalyst</p>
                                <p className="text-sm font-bold text-white leading-relaxed">New solid-state breakthroughs in EV manufacturing clusters.</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate('/dashboard/topics')}
                                    className="bg-accent-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                                >
                                    Analyze Cluster
                                </button>
                                <button className="px-8 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/10 text-white transition-all">
                                    Dismiss Insight
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bg-primary/80 to-transparent pointer-events-none"></div>
                <Activity className="absolute -right-20 -bottom-20 w-96 h-96 text-accent-primary opacity-10 rotate-12 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000" />
            </div>
        </div>
    );
};

export default Dashboard;
