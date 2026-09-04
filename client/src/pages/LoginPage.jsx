import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, LogIn, UserCheck, Eye, EyeOff, CheckSquare, Square, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, guestLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!emailOrPhone || !password) {
      setErrorMsg('Please enter your email/phone and password.');
      return;
    }

    setLoading(true);
    const res = await login(emailOrPhone, password);
    setLoading(false);

    if (res && res.success) {
      showToast(`Welcome back, ${res.user?.name || 'Farmer'}!`, 'success');
      navigate('/dashboard');
    } else {
      const msg = res?.message || 'Invalid credentials. Please try again.';
      setErrorMsg(msg);
      showToast(msg, 'error');
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    await guestLogin();
    setLoading(false);
    showToast('Logged in as Demo Farmer (Guest Mode)', 'info');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white/85 dark:bg-darkagri-card/90 backdrop-blur-xl border border-emerald-100 dark:border-darkagri-border rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-1 shadow-sm">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Farmer Sign In
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Access your Smart Agriculture Copilot dashboard
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-300 font-semibold animate-pulse">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Email or Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="farmer@smartagri.org or 9876543210"
                className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-darkagri-hover border border-slate-200 dark:border-darkagri-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white/70 dark:bg-darkagri-hover border border-slate-200 dark:border-darkagri-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Options */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              {rememberMe ? (
                <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>Remember me on this device</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 dark:border-darkagri-border w-full"></div>
          <span className="bg-white/80 dark:bg-darkagri-card px-3 text-[11px] font-bold text-slate-400 uppercase">OR</span>
        </div>

        {/* Guest Demo Login Button */}
        <button
          onClick={handleGuest}
          className="w-full py-3 bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
        >
          <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Continue as Guest (Demo Mode)</span>
        </button>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Create Farmer Account
          </Link>
        </p>

      </div>
    </div>
  );
};
