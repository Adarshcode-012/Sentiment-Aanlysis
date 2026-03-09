import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Clock,
    Zap,
    Target
} from 'lucide-react';
import SentimentPieChart from '../components/charts/SentimentPieChart';
import SentimentTrendChart from '../components/charts/SentimentTrendChart';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/layout/DashboardHeader';
import { useDashboard } from '../context/DashboardContext';
import * as api from '../services/api';

const Sentiment = () => {
    const navigate = useNavigate();
    const { range, selectedSector } = useDashboard();
    const [distribution, setDistribution] = useState(null);
    const [trend, setTrend] = useState(null);
    const [productStats, setProductStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const filters = { range, sector: selectedSector };
            const [d, t, p] = await Promise.all([
                api.getSentimentDistribution(filters),
                api.getSentimentTrend(filters),
                api.getProductSentiment()
            ]);
            setDistribution(d);
            setTrend(t);
            setProductStats(p);
        } catch (error) {
            console.error("Error fetching sentiment data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [range, selectedSector]);

    if (loading && !distribution) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
        </div>
    );

    const productChartData = [
        {
            x: productStats?.map(p => p.product),
            y: productStats?.map(p => p.positive),
            name: 'Positive',
            type: 'bar',
            marker: { color: '#10B981', line: { width: 0 } },
            opacity: 0.8
        },
        {
            x: productStats?.map(p => p.product),
            y: productStats?.map(p => p.negative),
            name: 'Negative',
            type: 'bar',
            marker: { color: '#EF4444', line: { width: 0 } },
            opacity: 0.8
        }
    ];

    return (
        <div className="space-y-8 pb-12">
            <DashboardHeader
                title="Sentiment Analytics"
                subtitle="Deep dive into consumer perception and brand performance."
                onRefresh={fetchData}
                loading={loading}
            />

            {/* Premium Comparison Heatmap Placeholder / Interactive Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-text-primary flex items-center">
                            <BarChart3 className="w-5 h-5 mr-3 text-accent-primary" />
                            Market Sentiment Matrix
                        </h3>
                        <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-sentiment-positive/10 text-sentiment-positive border border-sentiment-positive/20 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.1)]">Growing Bias</span>
                        </div>
                    </div>
                    <div className="h-96">
                        <Plot
                            data={productChartData}
                            layout={{
                                barmode: 'group',
                                margin: { t: 0, b: 40, l: 40, r: 0 },
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: 1.1, font: { color: '#94a3b8' } },
                                font: { family: 'Inter, sans-serif', color: '#f8fafc' },
                                xaxis: {
                                    tickfont: { color: '#94a3b8' },
                                    showgrid: false
                                },
                                yaxis: {
                                    gridcolor: '#1e293b',
                                    tickfont: { color: '#94a3b8' },
                                    zeroline: false
                                },
                                bargap: 0.4
                            }}
                            useResizeHandler={true}
                            className="w-full h-full"
                            config={{ displayModeBar: false, responsive: true }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-accent-secondary mb-4 font-semibold uppercase tracking-widest ">
                                <Zap className="w-4 h-4" />
                                <span className="text-[10px] font-bold tracking-widest ">Real-time Signal</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">'AI Transparency' is peaking</h4>
                            <p className="text-indigo-200 text-sm mb-6 opacity-90 font-medium leading-relaxed">
                                Consumer trust in transparent AI models has increased by 22% in the {range === 'L7D' ? 'last week' : 'last month'} within {selectedSector}.
                            </p>
                            <button
                                onClick={() => navigate('/dashboard/topics')}
                                className="w-full py-3 bg-accent-primary text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                            >
                                View Cluster Details
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bg-primary/50 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="card border-border-dark bg-bg-primary">
                        <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center uppercase tracking-wider ">
                            <Target className="w-4 h-4 mr-2 text-accent-primary " />
                            Sentiment Drivers
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Pricing Strategy', score: 82, trend: 'up' },
                                { label: 'UI Responsiveness', score: 64, trend: 'down' },
                                { label: 'Feature Set', score: 91, trend: 'up' }
                            ].map((driver, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-semibold">{driver.label}</span>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-24 h-1.5 bg-border-dark rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-primary shadow-[0_0_8px_rgba(99,102,241,0.8)] rounded-full" style={{ width: `${driver.score}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-text-primary">{driver.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                <div className="card">
                    <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center uppercase tracking-widest">
                        <Clock className="w-5 h-5 mr-3 text-accent-primary" />
                        Momentum Trajectory
                    </h3>
                    <div className="h-72">
                        <SentimentTrendChart data={trend} />
                    </div>
                </div>

                <div className="card flex flex-col items-center justify-center p-8 bg-bg-secondary relative overflow-hidden">
                    <div className="relative z-10 text-center ">
                        <h3 className="text-lg font-bold text-text-primary mb-6 uppercase tracking-widest ">Overall Distribution</h3>
                        <div className="h-64 w-64">
                            <SentimentPieChart data={distribution} />
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary rounded-full -mr-16 -mt-16 opacity-[0.03] blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-secondary rounded-full -ml-12 -mb-12 opacity-[0.03] blur-2xl"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-bg-secondary p-6 rounded-2xl border border-sentiment-positive/20 group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-sentiment-positive/10 rounded-xl flex items-center justify-center text-sentiment-positive ">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-sentiment-positive uppercase tracking-widest">Growth leader</span>
                    </div>
                    <h4 className="text-xl font-bold text-text-primary">Product Delta</h4>
                    <p className="text-sm text-sentiment-positive mt-1 font-semibold ">92% Positive Ratio</p>
                </div>

                <div className="bg-bg-secondary p-6 rounded-2xl border border-sentiment-negative/20 group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-sentiment-negative/10 rounded-xl flex items-center justify-center text-sentiment-negative">
                            <ArrowDownRight className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-sentiment-negative uppercase tracking-widest ">Risk threshold</span>
                    </div>
                    <h4 className="text-xl font-bold text-text-primary">Product Gamma</h4>
                    <p className="text-sm text-sentiment-negative mt-1 font-semibold ">Explosive negative spike (+12%)</p>
                </div>

                <div className="bg-bg-secondary p-6 rounded-2xl border border-accent-secondary/20 group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-accent-secondary/10 rounded-xl flex items-center justify-center text-accent-secondary">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest ">Stability index</span>
                    </div>
                    <h4 className="text-xl font-bold text-text-primary">Product Alpha</h4>
                    <p className="text-sm text-accent-secondary mt-1 font-semibold ">Linear growth in sentiment</p>
                </div>
            </div>
        </div>
    );
};

export default Sentiment;
