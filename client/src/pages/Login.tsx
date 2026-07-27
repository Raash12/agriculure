import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Wheat, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@baladweyne-ams.so');
  const [password, setPassword] = useState('Admin@2026');
  const [rememberMe, setRememberMe] = useState(true);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    await login(email, password);
    showToast('Welcome Back', 'Logged in to Baladweyne AMS Dashboard', 'success');
    navigate('/', { replace: true });
  };

  const fillDemoUser = (userType: 'admin' | 'farmer' | 'officer') => {
    if (userType === 'admin') {
      setEmail('admin@baladweyne-ams.so');
      setPassword('Admin@2026');
    } else if (userType === 'farmer') {
      setEmail('farmer@baladweyne-ams.so');
      setPassword('Farmer@2026');
    } else {
      setEmail('officer@baladweyne-ams.so');
      setPassword('Officer@2026');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-slate-800 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <Wheat className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">BALADWEYNE AMS</h2>
          <p className="text-xs text-slate-400 mt-1">Agricultural Management System • Hiran Region</p>
        </div>

        {/* Demo Fast Logins */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2 text-center">
            ⚡ Quick Demo Logins
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillDemoUser('admin')}
              className="py-1.5 px-2 rounded-xl bg-emerald-500/10 text-emerald-400 font-semibold hover:bg-emerald-500/20 text-[11px]"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemoUser('officer')}
              className="py-1.5 px-2 rounded-xl bg-sky-500/10 text-sky-400 font-semibold hover:bg-sky-500/20 text-[11px]"
            >
              Officer
            </button>
            <button
              type="button"
              onClick={() => fillDemoUser('farmer')}
              className="py-1.5 px-2 rounded-xl bg-amber-500/10 text-amber-400 font-semibold hover:bg-amber-500/20 text-[11px]"
            >
              Farmer
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label htmlFor="email-input" className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="email-input"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-input" className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="password-input"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-emerald-500"
              />
              <span>Remember session</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password Reset', 'Password reset instructions sent to email.', 'info'); }} className="text-emerald-400 font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all mt-4"
          >
            <span>Sign In to System</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
