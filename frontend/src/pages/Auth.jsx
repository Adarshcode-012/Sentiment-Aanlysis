import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, Loader2, ArrowRight, Facebook, Github, Linkedin } from 'lucide-react';
import { authService } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
        setError('');
    }, [location.pathname]);

    const handleToggle = (toLogin) => {
        setIsLogin(toLogin);
        navigate(toLogin ? '/login' : '/signup', { replace: true });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await authService.signIn(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            await authService.signUp(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        try {
            await authService.signInWithGoogle();
            // Google OAuth redirects are handled manually in authService
        } catch {
            setError('Google login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const loginForm = (
        <form className="space-y-5 w-full" onSubmit={handleLogin}>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign In</h1>

            {/* Social Icons - Small circular icons */}
            <div className="flex justify-center gap-3 mb-6">
                <button type="button" onClick={handleGoogleLogin} className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </button>
                <button type="button" className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <Facebook className="w-5 h-5" />
                </button>
                <button type="button" className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <Linkedin className="w-5 h-5" />
                </button>
            </div>

            <p className="text-gray-400 text-sm mb-6">or use your email account</p>

            {error && !isLogin && <div className="text-red-500 text-xs mb-2">{error}</div>}
            {error && isLogin && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl mb-4 animate-shake">{error}</div>}

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Email"
                />
            </div>

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Password"
                />
            </div>

            <div className="text-right">
                <button type="button" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
                    Forgot your password?
                </button>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center mt-4"
            >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'SIGN IN'}
            </button>
        </form>
    );

    const signupForm = (
        <form className="space-y-5 w-full" onSubmit={handleSignup}>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>

            {/* Social Icons */}
            <div className="flex justify-center gap-3 mb-6">
                <button type="button" onClick={handleGoogleLogin} className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </button>
                <button type="button" className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <Facebook className="w-5 h-5" />
                </button>
                <button type="button" className="p-2.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-all">
                    <Linkedin className="w-5 h-5" />
                </button>
            </div>

            <p className="text-gray-400 text-sm mb-6">or use your email for registration</p>

            {error && !isLogin && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl mb-4 animate-shake">{error}</div>}

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <User className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Name"
                />
            </div>

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Email"
                />
            </div>

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Password"
                />
            </div>

            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                    placeholder="Confirm Password"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center mt-4"
            >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'SIGN UP'}
            </button>
        </form>
    );

    return (
        <AuthLayout
            isLogin={isLogin}
            setIsLogin={handleToggle}
            loginForm={loginForm}
            signupForm={signupForm}
        />
    );
};

export default Auth;
