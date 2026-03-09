import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart3,
    PieChart,
    Search,
    AlertCircle,
    LogOut,
    User,
    Activity
} from 'lucide-react';
import { authService } from '../../services/authService';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Sentiment Analysis', path: '/dashboard/sentiment', icon: PieChart },
        { name: 'Topic Insights', path: '/dashboard/topics', icon: BarChart3 },
        { name: 'Insights Assistant', path: '/dashboard/rag', icon: Search },
        { name: 'User Profile', path: '/dashboard/profile', icon: User },
    ];

    const handleLogout = async () => {
        try {
            await authService.signOut();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="w-64 bg-bg-secondary/90 backdrop-blur-xl h-screen border-r border-border-dark flex flex-col fixed left-0 top-0 pt-6 z-20 shadow-2xl">
            <div className="px-6 mb-8 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/20">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-text-primary tracking-tight">AI Forecaster</span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative group overflow-hidden
                            ${isActive
                                ? 'bg-accent-primary/10 text-accent-primary shadow-[inset_0px_0px_20px_rgba(99,102,241,0.15)] ring-1 ring-accent-primary/30'
                                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary hover:scale-[1.02]'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className="w-5 h-5 mr-3 z-10" />
                                <span className="z-10">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 bg-accent-primary/5 rounded-xl z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-primary rounded-r-md shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                    </motion.div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 space-y-4">
                <div className="bg-bg-primary rounded-xl p-4 border border-border-dark shadow-inner">
                    <div className="flex items-center text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        <AlertCircle className="w-4 h-4 mr-1 text-sentiment-positive" />
                        System Status
                    </div>
                    <div className="text-sm text-text-primary font-medium">
                        Operational. Data updated.
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-semibold text-text-secondary rounded-xl hover:bg-sentiment-negative/10 hover:text-sentiment-negative transition-all hover:scale-[1.02]"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
