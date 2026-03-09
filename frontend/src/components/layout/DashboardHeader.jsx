import React from 'react';
import { Activity, Download, RefreshCw } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const DashboardHeader = ({ title, subtitle, onRefresh, loading }) => {
    const { range, updateRange, selectedSector, updateSector } = useDashboard();

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center space-x-2 text-accent-primary mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary">Real-time Intelligence</span>
                </div>
                <h2 className="text-3xl font-bold text-text-primary tracking-tight">{title}</h2>
                <p className="text-text-secondary mt-1">{subtitle}</p>
            </div>

            <div className="flex items-center space-x-3">
                <div className="flex bg-bg-secondary border border-border-dark rounded-xl p-1 shadow-sm">
                    <button
                        onClick={() => updateRange('L7D')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${range === 'L7D' ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
                    >
                        L7D
                    </button>
                    <button
                        onClick={() => updateRange('L30D')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${range === 'L30D' ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
                    >
                        L30D
                    </button>
                </div>

                <select
                    value={selectedSector}
                    onChange={(e) => updateSector(e.target.value)}
                    className="bg-bg-secondary border border-border-dark rounded-xl px-4 py-2 text-xs font-bold text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary cursor-pointer appearance-none"
                >
                    <option>All Sectors</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Energy</option>
                    <option>Consumer</option>
                </select>

                <button
                    onClick={onRefresh}
                    className="p-2.5 bg-bg-secondary border border-border-dark rounded-xl text-text-secondary hover:text-accent-primary transition-colors shadow-sm focus:outline-none"
                    title="Refresh Data"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-accent-primary' : ''}`} />
                </button>

                <button className="flex items-center px-4 py-2 bg-text-primary text-bg-primary rounded-xl text-xs font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
