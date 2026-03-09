import React from 'react';
import { TrendingUp } from 'lucide-react';

const AuthLayout = ({ isLogin, setIsLogin, loginForm, signupForm }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className={`auth-container relative z-10 w-full max-w-4xl min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden ${!isLogin ? 'right-panel-active' : ''}`}>

                {/* Signup Form Container */}
                <div className="form-container sign-up-container">
                    <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 bg-white">
                        <div className="w-full max-w-md">
                            {signupForm}
                        </div>
                    </div>
                </div>

                {/* Login Form Container */}
                <div className="form-container sign-in-container">
                    <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 bg-white">
                        <div className="w-full max-w-md">
                            {loginForm}
                        </div>
                    </div>
                </div>

                {/* Overlay Container (Hidden on Mobile) */}
                <div className="overlay-container hidden md:block">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                                <TrendingUp className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                            <p className="mb-8 text-white/80">To keep connected with us please login with your personal info</p>
                            <button
                                className="px-12 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                                onClick={() => setIsLogin(true)}
                            >
                                SIGN IN
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                                <TrendingUp className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
                            <p className="mb-8 text-white/80">Enter your personal details and start your journey with us</p>
                            <button
                                className="px-12 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                                onClick={() => setIsLogin(false)}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle (Only on Mobile) */}
                <div className="md:hidden absolute bottom-4 left-0 w-full text-center z-[100]">
                    <p className="text-gray-500 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-bold hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
