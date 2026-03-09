import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Hash,
    ArrowUp,
    ArrowDown,
    Minus,
    Search,
    Tag,
    Layers,
    ChevronRight,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopicBarChart from '../components/charts/TopicBarChart';
import DashboardHeader from '../components/layout/DashboardHeader';
import { useDashboard } from '../context/DashboardContext';
import * as api from '../services/api';

const Topics = () => {
    const navigate = useNavigate();
    const { range, selectedSector } = useDashboard();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.getTopics();
            setTopics(data);
        } catch (error) {
            console.error("Error fetching topics", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [range, selectedSector]);

    const filteredTopics = topics.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading && topics.length === 0) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            <DashboardHeader
                title="Consumer Trends"
                subtitle="Analyze trending subjects and emerging market clusters."
                onRefresh={fetchData}
                loading={loading}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Search and Cluster Navigator */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Explore topic clusters..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-border-dark rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-accent-primary/20 shadow-sm transition-all text-text-primary placeholder-text-secondary"
                        />
                    </div>

                    <div className="card min-h-[500px] flex flex-col">
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6 flex items-center ">
                            <Layers className="w-4 h-4 mr-2" />
                            Detected Clusters
                        </h3>
                        <div className="flex-1 space-y-3">
                            {filteredTopics.map((topic, idx) => (
                                <div key={idx} className="group p-4 bg-bg-primary rounded-2xl border border-transparent hover:border-accent-primary/30 hover:bg-bg-secondary hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-bg-secondary rounded-xl shadow-sm flex items-center justify-center text-accent-primary border border-border-dark group-hover:bg-accent-primary group-hover:text-white transition-all">
                                                <Hash className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text-primary text-sm group-hover:text-accent-secondary transition-colors">{topic.name}</h4>
                                                <p className="text-[10px] text-text-secondary uppercase font-bold">{topic.frequency} primary mentions</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center ${topic.trend === 'up' ? 'text-sentiment-positive' :
                                            topic.trend === 'down' ? 'text-sentiment-negative' :
                                                'text-text-secondary'
                                            }`}>
                                            {topic.trend === 'up' && <TrendingUp className="w-4 h-4 mr-2" />}
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-secondary" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Visualizer */}
                <div className="lg:col-span-8 flex flex-col space-y-8">
                    <div className="card flex-1">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-bold text-text-primary flex items-center">
                                <Sparkles className="w-5 h-5 mr-3 text-accent-secondary" />
                                Cluster Frequency & Resonance
                            </h3>
                            <button className="text-xs font-bold text-accent-primary uppercase hover:underline">Download Matrix</button>
                        </div>
                        <div className="h-[450px]">
                            <TopicBarChart data={topics} />
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                        <div className="relative z-10 p-2">
                            <div className="flex items-center space-x-2 text-accent-secondary mb-4 ">
                                <Tag className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Optimization Signal</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 leading-tight tracking-tight text-white">'Generative AI' resonance is increasing in {selectedSector}</h3>
                            <p className="text-indigo-200 max-w-2xl leading-relaxed font-semibold opacity-90">
                                Discourse in this cluster has shifted from theoretical exploration to practical implementation strategies
                                in the {range === 'L7D' ? 'past 7 days' : 'last 30 days'}.
                            </p>
                            <div className="mt-8 flex space-x-4 ">
                                <button
                                    onClick={() => navigate('/dashboard/rag', { state: { query: `Analyze the 'Generative AI' cluster in the ${selectedSector} sector for the ${range === 'L7D' ? 'last 7 days' : 'last 30 days'}.` } })}
                                    className="bg-accent-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                                >
                                    Deep Dive Cluster
                                </button>
                                <button className="px-8 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/10 text-white transition-all">
                                    Track Subject
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-primary grid grid-cols-4 gap-1 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity ">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="bg-white/10 h-10 w-full rounded-sm"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topics;
