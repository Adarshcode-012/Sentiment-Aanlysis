import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const MetricCard = ({ title, value, unit, change, changeType, icon: Icon }) => {
    return (
        <div className="card hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-accent-primary/10 rounded-xl border border-accent-primary/20">
                    <Icon className="w-5 h-5 text-accent-primary" />
                </div>
                <div className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${changeType === 'up' ? 'bg-sentiment-positive/10 text-sentiment-positive border-sentiment-positive/20' :
                        changeType === 'down' ? 'bg-sentiment-negative/10 text-sentiment-negative border-sentiment-negative/20' :
                            'bg-bg-primary text-text-secondary border-border-dark'
                    }`}>
                    {changeType === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
                    {changeType === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                    {changeType === 'stable' && <Minus className="w-3.5 h-3.5 mr-1" />}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-sm text-text-secondary font-medium tracking-wide mb-1">{title}</p>
                <div className="flex items-baseline space-x-1">
                    <h3 className="text-3xl font-bold text-text-primary tracking-tight">{value}</h3>
                    {unit && <span className="text-sm font-semibold text-text-secondary">{unit}</span>}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
