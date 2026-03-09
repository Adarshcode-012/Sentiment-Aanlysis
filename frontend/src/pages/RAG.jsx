import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Send,
    Bot,
    Sparkles,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    Database
} from 'lucide-react';
import * as api from '../services/api';

const RAG = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleAskAI = async (e, customQuery) => {
        if (e) e.preventDefault();
        const finalQuery = customQuery || query;
        if (!finalQuery.trim()) return;

        setLoading(true);
        try {
            const res = await api.getRAGResponse(finalQuery);
            setResponse(res.response);
            setHistory(prev => [{ query: finalQuery, response: res.response }, ...prev]);
            setQuery('');
        } catch (error) {
            console.error("Error asking AI", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-trigger if query is passed in state
    useEffect(() => {
        if (location.state?.query) {
            handleAskAI(null, location.state.query);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-text-primary">Insights Assistant</h2>
                <p className="text-text-secondary">Ask any question about your market data and get AI-powered answers.</p>
            </div>

            <div className="card min-h-[600px] flex flex-col shadow-2xl border-border-dark bg-bg-primary overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {!response && history.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                            <div className="w-20 h-20 bg-accent-primary/10 rounded-3xl flex items-center justify-center text-accent-primary rotate-3">
                                <Bot className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-text-primary">Intelligence Engine Activated</p>
                                <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mt-2 font-medium">
                                    Ask about sentiment shifts, trending topics, or compare product performance across sectors.
                                </p>
                            </div>
                        </div>
                    )}

                    {history.map((chat, idx) => (
                        <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            {/* User Question */}
                            <div className="flex justify-end">
                                <div className="bg-accent-primary text-white rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%] shadow-lg shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                    <p className="text-sm font-medium">{chat.query}</p>
                                </div>
                            </div>
                            {/* AI Answer */}
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-4 max-w-[90%]">
                                    <div className="w-10 h-10 bg-accent-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-accent-secondary/20 shadow-sm">
                                        <Bot className="w-6 h-6 text-accent-secondary" />
                                    </div>
                                    <div className="bg-bg-secondary border border-border-dark rounded-3xl rounded-tl-none px-6 py-6 shadow-md text-text-primary relative group">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Sparkles className="w-4 h-4 text-accent-secondary animate-pulse" />
                                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Context-Aware Intelligence</span>
                                        </div>
                                        <p className="text-sm leading-relaxed whitespace-pre-line font-medium text-text-secondary group-hover:text-text-primary transition-colors">{chat.response}</p>
                                        <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-border-dark uppercase text-[10px] font-bold text-text-secondary tracking-wider">
                                            <button className="hover:text-accent-primary flex items-center transition-colors">
                                                <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy
                                            </button>
                                            <button className="hover:text-sentiment-positive flex items-center transition-colors">
                                                <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> Helpful
                                            </button>
                                            <button className="hover:text-sentiment-negative flex items-center transition-colors">
                                                <ThumbsDown className="w-3.5 h-3.5 mr-1.5" /> Not Helpful
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start animate-pulse">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-accent-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 ">
                                    <Bot className="w-6 h-6 text-accent-secondary" />
                                </div>
                                <div className="bg-bg-secondary border border-border-dark rounded-3xl rounded-tl-none px-8 py-5 shadow-sm flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-border-dark bg-bg-secondary rounded-b-xl">
                    <form onSubmit={handleAskAI} className="relative group">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask about market shifts or topic resonance..."
                            className="w-full pl-8 pr-16 py-5 bg-bg-primary border border-border-dark rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-primary/20 shadow-sm transition-all text-sm font-medium text-text-primary placeholder-text-secondary"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent-primary text-white rounded-xl flex items-center justify-center hover:bg-accent-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:bg-border-dark disabled:shadow-none disabled:text-text-secondary"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <div className="mt-4 flex items-center justify-center space-x-8">
                        <div className="text-[10px] font-bold text-text-secondary flex items-center uppercase tracking-widest">
                            <RefreshCw className="w-3.5 h-3.5 mr-2 text-accent-primary" /> 1,240 tokens remaining
                        </div>
                        <div className="text-[10px] font-bold text-text-secondary flex items-center uppercase tracking-widest">
                            <Database className="w-3.5 h-3.5 mr-2 text-accent-secondary" /> Data Source: Q1 Index
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => handleAskAI(null, "What is the general sentiment for renewable energy products?")}
                    className="text-left p-6 bg-bg-secondary border border-border-dark rounded-2xl hover:border-accent-primary/40 hover:bg-bg-primary transition-all group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-accent-primary mb-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Analyze Context</p>
                        <p className="text-sm font-bold text-text-primary leading-snug group-hover:text-accent-secondary transition-colors">What is the general sentiment for renewable energy products?</p>
                    </div>
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-accent-primary/5 -rotate-12 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={() => handleAskAI(null, "Compare sentiment between Product A and Product C.")}
                    className="text-left p-6 bg-bg-secondary border border-border-dark rounded-2xl hover:border-accent-primary/40 hover:bg-bg-primary transition-all group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-accent-primary mb-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Compare Performance</p>
                        <p className="text-sm font-bold text-text-primary leading-snug group-hover:text-accent-secondary transition-colors">Compare sentiment between Product A and Product C.</p>
                    </div>
                    <Database className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-accent-primary/5 -rotate-12 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default RAG;
