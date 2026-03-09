import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';

// Lazy load components for performance optimization
const Landing = lazy(() => import('./pages/Landing'));
const Auth = lazy(() => import('./pages/Auth'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Sentiment = lazy(() => import('./pages/Sentiment'));
const Topics = lazy(() => import('./pages/Topics'));
const RAG = lazy(() => import('./pages/RAG'));
const Profile = lazy(() => import('./pages/Profile'));

import ProtectedRoute from './components/auth/ProtectedRoute';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading experience...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />

              {/* Protected Routes (Authenticated) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="sentiment" element={<Sentiment />} />
                  <Route path="topics" element={<Topics />} />
                  <Route path="rag" element={<RAG />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
