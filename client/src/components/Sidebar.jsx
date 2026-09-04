import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  Sun,
  Layers,
  ShieldAlert,
  TrendingUp,
  LineChart,
  BookOpen,
  Bell,
  MapPin,
  Cpu,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const groups = [
    {
      title: 'AGRI ANALYTICS',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/my-farm', label: 'My Farm Portfolio', icon: MapPin },
        { path: '/weather', label: 'Weather Analytics', icon: Sun },
        { path: '/soil-analytics', label: 'Soil Health & IoT', icon: Layers },
      ],
    },
    {
      title: 'AI DECISION COPILOT',
      items: [
        { path: '/crop-recommendation', label: 'Crop Recommendation', icon: Sprout },
        { path: '/disease-detection', label: 'Disease Doctor', icon: ShieldAlert },
        { path: '/price-prediction', label: 'AI Price Prediction', icon: LineChart },
      ],
    },
    {
      title: 'MARKET & SUBSIDIES',
      items: [
        { path: '/market-prices', label: 'Market Mandi Rates', icon: TrendingUp },
        { path: '/government-schemes', label: 'Government Schemes', icon: BookOpen },
        { path: '/notifications', label: 'Notifications Alert', icon: Bell },
      ],
    },
    {
      title: 'ACCOUNT & PREFERENCES',
      items: [
        { path: '/settings', label: 'Account Settings', icon: SettingsIcon },
      ],
    },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white/80 dark:bg-darkagri-card/85 backdrop-blur-md border-r border-slate-200/90 dark:border-darkagri-border min-h-[calc(100vh-4rem)] p-4 space-y-6 shrink-0 transition-colors">
      
      {/* Navigation Groups */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            <h4 className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              {group.title}
            </h4>
            <nav className="space-y-1 text-xs font-bold">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all relative ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-darkagri-hover'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Live System Telemetry Widget */}
      <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-darkagri-hover border border-slate-200/80 dark:border-darkagri-border text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200 text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> IoT Telemetry
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          <span>Node 1 (Khanna Farm)</span>
          <span className="font-bold text-emerald-600">Online</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs border border-red-200/80 dark:border-red-900/40 hover:bg-red-100 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>

    </aside>
  );
};
