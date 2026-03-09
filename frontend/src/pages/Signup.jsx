import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, Loader2, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [showPhoneLogin, setShowPhoneLogin] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
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
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        try {
            await authService.signInWithGoogle();
            // Google OAuth redirects are handled in authService itself
        } catch {
            setError('Google signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneSignup = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await authService.signInWithOtp(phoneNumber);
            setOtpSent(true);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await authService.verifyOtp(phoneNumber, otp);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            mode="signup"
            title="Create Account"
            subtitle="or use your email for registration"
            footerText="Already have an account?"
            footerLink="/login"
            footerLinkText="Sign In"
        >
            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg animate-shake">
                    {error}
                </div>
            )}

            {!showPhoneLogin ? (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                            placeholder="Name"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                            placeholder="Email"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                            placeholder="Password"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="flex items-center gap-2 px-2">
                        <input
                            id="terms"
                            type="checkbox"
                            required
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-500">
                            I agree to the <span className="text-teal-600 font-semibold cursor-pointer">Terms</span> & <span className="text-teal-600 font-semibold cursor-pointer">Privacy Policy</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-500 text-white font-bold py-4 rounded-full shadow-lg shadow-teal-500/30 hover:bg-teal-600 hover:shadow-teal-500/40 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                SIGN UP
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">OR</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isSubmitting}
                        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-50 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowPhoneLogin(true)}
                        className="w-full text-center text-sm font-semibold text-gray-500 hover:text-teal-600 flex items-center justify-center gap-2 mt-4"
                    >
                        <Phone className="w-4 h-4" />
                        Use Phone Number
                    </button>
                </form>
            ) : (
                <form className="space-y-5" onSubmit={otpSent ? handleVerifyOtp : handlePhoneSignup}>
                    {!otpSent ? (
                        <>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="tel"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                                    placeholder="Phone Number (e.g., +1234567890)"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-teal-500 text-white font-bold py-4 rounded-full shadow-lg shadow-teal-500/30 hover:bg-teal-600 hover:shadow-teal-500/40 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'SEND OTP'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl input-focus text-gray-700 font-medium"
                                    placeholder="Enter OTP"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-teal-500 text-white font-bold py-4 rounded-full shadow-lg shadow-teal-500/30 hover:bg-teal-600 hover:shadow-teal-500/40 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'VERIFY OTP'}
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setShowPhoneLogin(false);
                            setOtpSent(false);
                            setOtp('');
                        }}
                        className="w-full text-center text-sm font-semibold text-gray-500 hover:text-teal-600"
                    >
                        Back to Email Signup
                    </button>
                </form>
            )}
        </AuthLayout>
    );
};

export default Signup;
