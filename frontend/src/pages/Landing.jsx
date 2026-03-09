import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Zap,
    BarChart3,
    ArrowRight,
    Layers,
    Cpu,
    PieChart,
    Globe,
    Github,
    Twitter,
    Linkedin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';

const mockChartData = [
    { time: '09:00', price: 42000 },
    { time: '10:00', price: 42500 },
    { time: '11:00', price: 41800 },
    { time: '12:00', price: 43200 },
    { time: '13:00', price: 44000 },
    { time: '14:00', price: 43800 },
    { time: '15:00', price: 45000 },
];

const tickerData = [
    { label: 'BTC', value: '↑ 2.3%', up: true },
    { label: 'NIFTY', value: '↑ 1.1%', up: true },
    { label: 'ETH', value: '↓ 0.5%', up: false },
    { label: 'AI Confidence', value: '87%', neutral: true },
    { label: 'Volatility', value: 'Medium', neutral: true },
    { label: 'S&P 500', value: '↑ 0.8%', up: true },
    { label: 'GOLD', value: '↓ 0.2%', up: false },
    { label: 'NASDAQ', value: '↑ 1.5%', up: true },
];

const Landing = () => {
    const [scrolled, setScrolled] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-[#F1F5F9] font-sans selection:bg-[#22D3EE] selection:text-[#0B1120] overflow-x-hidden">

            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1120]/90 backdrop-blur-lg border-b border-[#111827]' : 'bg-transparent'}`}>
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2 cursor-pointer group"
                    >
                        <div className="bg-[#111827] border border-[#22D3EE]/30 p-2 rounded-xl group-hover:border-[#22D3EE] transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <TrendingUp className="text-[#22D3EE] w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#F1F5F9]">
                            AI Market <span className="text-[#22D3EE]">Forecaster</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hidden md:flex items-center space-x-8"
                    >
                        {['Features', 'How it Works', 'Dashboard', 'Stats'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                className="relative text-sm font-medium text-[#94A3B8] hover:text-[#F1F5F9] transition-colors group py-1"
                            >
                                {item}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#22D3EE] transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4"
                    >
                        <Link to="/login" className="text-sm font-semibold text-[#F1F5F9] hover:text-[#22D3EE] transition-colors">
                            Log in
                        </Link>
                        <Link to="/signup" className="relative group px-5 py-2 rounded-full overflow-hidden bg-[#22D3EE]/10 border border-[#22D3EE]/30 hover:border-[#22D3EE]">
                            <span className="relative z-10 text-sm font-semibold text-[#22D3EE] group-hover:text-white transition-colors duration-300">
                                Get Started
                            </span>
                            <div className="absolute inset-0 bg-[#22D3EE] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </Link>
                    </motion.div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22D3EE]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A78BFA]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full z-10 py-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-left"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#111827] border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                            <Zap className="w-3.5 h-3.5 mr-2" />
                            Next-Gen Forecasting
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-[#F1F5F9]">
                            Predict Market<br />Trends with<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#A78BFA]">
                                AI Precision
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-[#94A3B8] mb-10 leading-relaxed max-w-xl">
                            Real-time forecasting powered by machine learning and advanced analytics.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
                            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center bg-[#22D3EE] text-[#0B1120] px-8 py-4 rounded-full font-bold hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] group">
                                Start Forecasting
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="w-full sm:w-auto flex items-center justify-center bg-[#111827] border border-[#22D3EE]/30 text-[#F1F5F9] px-8 py-4 rounded-full font-bold hover:bg-[#111827]/80 hover:border-[#22D3EE]/60 transition-all group">
                                View Demo
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Animated Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-[400px] w-full bg-[#111827]/50 backdrop-blur-md border border-[#22D3EE]/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.1)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1120]/80 rounded-3xl z-0 pointer-events-none"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#F1F5F9]">Market Projection</h3>
                                    <p className="text-sm text-[#94A3B8]">AI Confidence: 94%</p>
                                </div>
                                <div className="flex bg-[#0B1120] rounded-lg p-1 border border-[#111827]">
                                    <div className="px-3 py-1 text-xs font-semibold bg-[#22D3EE]/20 text-[#22D3EE] rounded-md">Live</div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockChartData}>
                                        <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111827', borderColor: '#22D3EE', borderRadius: '8px', color: '#F1F5F9' }}
                                            itemStyle={{ color: '#22D3EE' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#22D3EE"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#111827', stroke: '#22D3EE', strokeWidth: 2 }}
                                            activeDot={{ r: 6, fill: '#22D3EE', stroke: '#0B1120', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Live Market Ticker Strip */}
            <div className="w-full bg-[#111827] border-y border-[#22D3EE]/20 py-3 overflow-hidden whitespace-nowrap flex relative shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#111827] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#111827] to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex space-x-12 pr-12 items-center text-sm font-medium"
                >
                    {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <span className="text-[#94A3B8]">{item.label}</span>
                            <span className={`${item.neutral ? 'text-[#A78BFA]' : item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {item.value}
                            </span>
                            <span className="mx-4 text-[#111827] border-r border-[#22D3EE]/20 h-4"></span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-32 relative z-10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="text-3xl md:text-5xl font-bold mb-6 text-[#F1F5F9]"
                        >
                            How the AI Thinks
                        </motion.h2>
                        <motion.p
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            Our multi-layered neural network processes vast amounts of market noise into high-fidelity forecasting signals.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Data Aggregation", desc: "Real-time ingestion of social sentiment, news feeds, and live market ticks via advanced APIs.", icon: <Layers className="w-8 h-8" /> },
                            { title: "AI Model Processing", desc: "Proprietary LLMs evaluate emotional tone, contextual momentum, and historical correlations.", icon: <Cpu className="w-8 h-8" /> },
                            { title: "Predictive Insights", desc: "Actionable forecasts and trend trajectories delivered straight to your dashboard.", icon: <PieChart className="w-8 h-8" /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="group relative p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-sm border border-[#22D3EE]/10 hover:border-[#22D3EE]/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/0 to-[#22D3EE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#22D3EE]"></div>

                                <div className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-[#0B1120] border border-[#22D3EE]/20 text-[#22D3EE] group-hover:bg-[#22D3EE]/10 transition-colors relative z-10 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-[#F1F5F9] relative z-10">{item.title}</h3>
                                <p className="text-[#94A3B8] leading-relaxed text-sm relative z-10">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section id="dashboard" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-[#A78BFA]/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-xl border border-[#22D3EE]/30 bg-[#111827] shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#22D3EE]/5 before:to-transparent"
                    >
                        {/* Mockup Top Bar */}
                        <div className="bg-[#0B1120] border-b border-[#22D3EE]/20 py-3 px-4 flex items-center">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                            </div>
                            <div className="mx-auto bg-[#111827] rounded-md px-6 py-1 text-xs text-[#94A3B8] font-mono border border-[#22D3EE]/10">
                                ai-market-dashboard.terminal
                            </div>
                        </div>

                        {/* Mockup Body */}
                        <div className="p-8 pb-0">
                            <div className="grid grid-cols-12 gap-6 pb-8">
                                <div className="col-span-3 space-y-6">
                                    <div className="h-24 rounded-lg bg-[#0B1120] border border-[#22D3EE]/10 p-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#A78BFA]/10 blur-xl"></div>
                                        <div className="h-3 w-16 bg-[#111827] rounded mb-3"></div>
                                        <div className="h-6 w-24 bg-[#22D3EE]/80 rounded"></div>
                                    </div>
                                    <div className="h-40 rounded-lg bg-[#0B1120] border border-[#22D3EE]/10 p-4">
                                        <div className="h-3 w-full bg-[#111827] rounded mb-3"></div>
                                        <div className="h-3 w-4/5 bg-[#111827] rounded mb-3"></div>
                                        <div className="h-3 w-full bg-[#111827] rounded"></div>
                                    </div>
                                </div>
                                <div className="col-span-9 h-72 rounded-lg bg-[#0B1120] border border-[#22D3EE]/20 p-6 flex flex-col justify-end relative shadow-[inset_0_0_30px_rgba(34,211,238,0.02)]">
                                    <div className="flex items-end gap-4 h-full pt-4">
                                        {[40, 60, 45, 80, 55, 90, 70, 100].map((h, j) => (
                                            <div key={j} className="w-full relative group cursor-pointer" style={{ height: `${h}%` }}>
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#22D3EE]/80 to-[#A78BFA]/80 rounded-t-sm group-hover:brightness-125 transition-all"></div>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111827] text-xs text-[#22D3EE] px-2 py-1 rounded border border-[#22D3EE]/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    +{h}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="py-24 border-y border-[#22D3EE]/10 bg-[#111827]/50 relative z-10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { prefix: "", value: 95, suffix: "%", label: "Accuracy Rate" },
                            { prefix: "", value: 10, suffix: "K+", label: "Forecasts Generated" },
                            { prefix: "", value: 24, suffix: "/7", label: "Market Monitoring" },
                            { prefix: "$", value: 50, suffix: "B+", label: "Data Volume Analyzed" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#22D3EE]/70 mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                    {stat.prefix}
                                    <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                                    {stat.suffix}
                                </div>
                                <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 px-6 relative z-10">
                <div className="max-w-[1000px] mx-auto rounded-3xl p-12 md:p-20 text-center relative overflow-hidden bg-[#111827] border border-[#22D3EE]/30 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/10 to-[#A78BFA]/10"></div>
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#22D3EE]/20 blur-[100px] rounded-full mix-blend-screen" />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-[#F1F5F9] mb-6 leading-tight"
                        >
                            Start Making Smarter<br />Market Decisions Today
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#94A3B8] text-lg mb-10 max-w-xl mx-auto"
                        >
                            Join quantitative analysts and modern investors utilizing our AI to uncover alpha in the markets before everyone else.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link to="/signup" className="px-10 py-4 bg-[#22D3EE] text-[#0B1120] rounded-full font-bold text-lg hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                                Create Free Account
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0B1120] border-t border-[#111827] pt-16 pb-8 relative z-10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <TrendingUp className="text-[#22D3EE] w-6 h-6" />
                                <span className="text-xl font-bold tracking-tight text-[#F1F5F9]">
                                    AI Market <span className="text-[#22D3EE]">Forecaster</span>
                                </span>
                            </div>
                            <p className="text-[#94A3B8] text-sm max-w-sm leading-relaxed mb-6">
                                The intelligent layer for modern financial insights. Predicting tomorrow's trends using today's deep learning algorithms.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-[#111827] border border-[#22D3EE]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE] hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#111827] border border-[#22D3EE]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE] hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
                                    <Globe className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#111827] border border-[#22D3EE]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE] hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[#F1F5F9] font-bold mb-6">Platform</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Forecasting</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">API Features</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Data Solutions</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Pricing Tier</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[#F1F5F9] font-bold mb-6">Company</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">About Us</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Careers Team</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-[#94A3B8] text-sm hover:text-[#22D3EE] transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-[#111827] pt-8 flex flex-col md:flex-row justify-between items-center text-[#94A3B8] text-xs">
                        <p>© 2026 AI Market Trend Forecaster. All rights reserved.</p>
                        <p className="mt-4 md:mt-0">Built with precision for the modern market.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
