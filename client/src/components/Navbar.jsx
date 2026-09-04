import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sprout,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Bell,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Public Nav Links (When NOT logged in)
  const publicNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Platform' },
  ];

  // Authenticated Nav Links (When logged in)
  const authNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/crop-recommendation', label: 'Crop Advisor' },
    { path: '/disease-detection', label: 'Disease Doctor' },
    { path: '/weather', label: 'Weather' },
    { path: '/market-prices', label: 'Market Rates' },
    { path: '/government-schemes', label: 'Schemes' },
  ];

  const currentNavLinks = isAuthenticated ? authNavLinks : publicNavLinks;

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="saas-header border-b border-slate-200/90 dark:border-darkagri-border z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight leading-none">
                Smart Agriculture <span className="text-emerald-600 dark:text-emerald-400">Copilot</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                AI-Powered Farming Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
            {currentNavLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-200/60 dark:border-emerald-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-darkagri-hover'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Toolbar Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Platform Tagline Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-darkagri-hover text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-semibold border border-slate-200/80 dark:border-darkagri-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI AgTech SaaS</span>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center gap-1 bg-slate-100 dark:bg-darkagri-hover px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-darkagri-border text-xs font-bold text-slate-700 dark:text-slate-200">
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (HI)</option>
                <option value="bn">বাংলা (BN)</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Authenticated User Controls vs Public Sign In Buttons */}
            {isAuthenticated && user ? (
              <div className="relative flex items-center gap-2">
                
                {/* Notifications Bell */}
                <Link
                  to="/notifications"
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border transition-all relative"
                  title="Alerts Center"
                >
                  <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </Link>

                {/* Profile Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{user.name ? user.name.split(' ')[0] : 'Farmer'}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border rounded-2xl shadow-xl py-2 z-50 text-xs font-bold space-y-1">
                      <div className="px-3.5 py-2 border-b border-slate-100 dark:border-darkagri-border">
                        <p className="text-slate-900 dark:text-white font-extrabold truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal truncate">{user.email || user.phone}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-darkagri-hover"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Farmer Dashboard</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-darkagri-hover"
                      >
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-darkagri-hover"
                      >
                        <SettingsIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Settings</span>
                      </Link>

                      <div className="border-t border-slate-100 dark:border-darkagri-border pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 bg-slate-100 dark:bg-darkagri-hover text-slate-700 dark:text-slate-200 hover:bg-slate-200 rounded-xl text-xs font-bold border border-slate-200/80 dark:border-darkagri-border transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-darkagri-border"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-darkagri-border"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-darkagri-border bg-white dark:bg-darkagri-card p-4 space-y-3 text-xs font-bold shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkagri-border">
            <span className="text-slate-500">Language Select:</span>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="p-1.5 bg-slate-100 dark:bg-darkagri-hover rounded-xl text-xs dark:text-white font-bold"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {currentNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl text-left border ${
                  location.pathname === link.path
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-darkagri-hover text-slate-800 dark:text-slate-200 border-slate-200/60 dark:border-darkagri-border'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-slate-100 text-center text-slate-800 rounded-xl font-bold border border-slate-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-emerald-600 text-center text-white rounded-xl font-bold shadow-sm"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl font-bold border border-red-200 text-center mt-2"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};
