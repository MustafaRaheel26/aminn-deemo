/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { apiService } from '../services/api';
import { LogIn, Lock, Mail, Sparkles, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const { setCurrentUser } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.login(email, password);
      setCurrentUser(response.user);
      
      // Automatically redirect the browser hash to the appropriate home workspace dashboard
      if (response.user.role === 'super_admin') {
        window.location.hash = '#/super-dashboard';
      } else {
        window.location.hash = '#/restaurant-dashboard';
      }
    } catch (err: any) {
      setError(err?.message || 'Access Denied. Check your email and password pair.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row shadow-sm" id="login-page">
      {/* Visual Left Banner (Toast-inspired branding) */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#EA580C] via-[#EA580C]/95 to-orange-500 text-white flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract pattern decor */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-24 -right-12 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
            <Sparkles className="h-6 w-6 text-orange-200" />
          </div>
          <span className="font-display font-bold text-2xl tracking-wider uppercase">Amin Demo</span>
        </div>

        <div className="my-auto max-w-lg z-10">
          <span className="bg-white/10 backdrop-blur-md text-orange-100 text-xs px-2.5 py-1 rounded-full font-mono uppercase tracking-widest border border-white/10 inline-block mb-4">
            Enterprise Display Manager
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-none mb-4">
            Transform plates into high-converting digital boards.
          </h1>
          <p className="text-slate-100 text-base leading-relaxed font-sans font-light">
            Centralized multi-tenant operation. Instantly push custom pricing overrides, daily kitchen boards, high-definition promo triggers, and automatic menus across thousands of global TV screens.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold font-display">100%</p>
              <p className="text-xs text-orange-100 font-sans">Remote Cloud Control</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">Instant</p>
              <p className="text-xs text-orange-100 font-sans">Kitchen-to-Screen Sync</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
          <span>Enterprise Version 4.8.0</span>
          <span>•</span>
          <span>SSL Secured Session</span>
        </div>
      </div>

      {/* Login Form on Right Container */}
      <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white" id="login-container">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-905 tracking-tight" id="login-welcome-title">Control Hub Login</h2>
            <p className="text-slate-500 text-sm mt-2">Enter your authorized organization email to sync dashboard parameters.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6" id="credential-form">
            {/* Email Input */}
            <div className="space-y-1.55">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="email-input">
                E-Mail Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all font-sans"
                  placeholder="name@restaurant.com"
                />
              </div>
            </div>

            {/* Password Input (Now fully editable, custom feedback) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700" htmlFor="password-input">
                  Lock Phrase / Security PIN
                </label>
                <span className="text-[10px] text-[#EA580C] hover:underline cursor-pointer font-semibold font-mono">Password SSO</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
                />
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-xs text-slate-650 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#EA580C] focus:ring-[#EA580C] accent-[#EA580C] h-4 w-4"
                />
                <span>Remember this terminal</span>
              </label>
              <a href="#" className="font-semibold text-[#EA580C] hover:underline">Forgot PIN?</a>
            </div>

            {/* Error Message rendering with Motion */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#EA580C] hover:bg-[#EA580C]/90 active:bg-orange-700 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              id="login-submit-btn"
            >
              {isLoading ? (
                <>
                  <div className="border-2 border-white/30 border-t-white h-4 w-4 rounded-full animate-spin" />
                  <span>Authorizing Node...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Secure Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Discreet cloud security badge */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 uppercase text-[10px] tracking-widest font-mono block">Zero-Trust Secure Core</span>
              <p className="text-[11px] text-slate-550 leading-relaxed mt-0.5">
                Every request undergoes real-time server signature verification. Access tokens lapse automatically upon session termination.
              </p>
            </div>
          </div>

          {/* Footnotes */}
          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
            <p>© 2026 Amin Technologies S.R.O. All Rights Reserved.</p>
            <p className="mt-0.5 text-slate-300">Managed under Cloud Infrastructure License.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
