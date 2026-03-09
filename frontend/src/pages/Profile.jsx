import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Shield, Activity } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    // Format date if available
    const joinDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : 'Unknown';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    User Profile
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                {/* Header section with gradient background */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                <div className="px-8 pb-8 flex flex-col sm:flex-row relative">
                    {/* Avatar */}
                    <div className="-mt-16 mb-4 sm:mb-0 sm:mr-8 flex-shrink-0 relative">
                        <div className="w-32 h-32 bg-white rounded-full p-2 border-4 border-white shadow-md flex items-center justify-center">
                            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-5xl font-bold">
                                {user?.email ? user.email.charAt(0).toUpperCase() : <User className="w-16 h-16" />}
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-2 flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h2>
                        <p className="text-gray-500 flex items-center mt-1">
                            <Mail className="w-4 h-4 mr-2" />
                            {user?.email || 'No email provided'}
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Shield className="w-3 h-3 mr-1" />
                                {user?.user_metadata?.plan || 'Free Plan'}
                            </span>
                            <span className="inline-flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                Joined {joinDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-500" />
                        Account Details
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                            <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                                {user?.email || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                            <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-mono text-sm break-all">
                                {user?.id || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity placeholder */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-indigo-500" />
                        Recent Activity
                    </h3>
                    <div className="flex-1 flex items-center justify-center text-gray-400 flex-col py-8">
                        <Activity className="w-12 h-12 text-gray-200 mb-3" />
                        <p className="text-sm">Activity history will appear here.</p>
                        <p className="text-xs mt-1">No recent actions logged.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
