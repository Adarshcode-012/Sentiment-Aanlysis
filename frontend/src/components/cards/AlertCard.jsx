import React from 'react';
import { AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react';

const AlertCard = ({ type, message, time }) => {
    const styles = {
        warning: {
            icon: AlertTriangle,
            color: 'text-sentiment-neutral',
            bg: 'bg-sentiment-neutral/10',
            border: 'border-sentiment-neutral/20'
        },
        info: {
            icon: Info,
            color: 'text-accent-secondary',
            bg: 'bg-accent-secondary/10',
            border: 'border-accent-secondary/20'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-sentiment-positive',
            bg: 'bg-sentiment-positive/10',
            border: 'border-sentiment-positive/20'
        }
    };

    const current = styles[type] || styles.info;
    const Icon = current.icon;

    return (
        <div className={`p-4 rounded-xl border ${current.bg} ${current.border} flex items-start space-x-3 transition-all hover:shadow-md hover:bg-opacity-20`}>
            <div className={`mt-0.5 ${current.color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <p className={`text-sm font-semibold text-text-primary`}>
                    {message}
                </p>
                <div className="flex items-center mt-1 text-xs text-text-secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {time}
                </div>
            </div>
        </div>
    );
};

export default AlertCard;
