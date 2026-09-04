import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Globe, Moon, Save } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || 'Rajesh Kumar');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [district, setDistrict] = useState(user?.district || 'Ludhiana');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile and preferences updated successfully!', 'success');
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 space-y-8 max-w-7xl">
        <div className="glass-card p-6 rounded-3xl">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="w-7 h-7 text-emerald-600" />
            <span>Settings & Preferences</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your farmer profile details, notification preferences, theme, and preferred language.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-6 max-w-2xl">
          <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-emerald-100 dark:border-darkagri-border pb-3">
            Farmer Profile Info
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 dark:border-darkagri-border bg-white/50 dark:bg-darkagri-hover font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 dark:border-darkagri-border bg-white/50 dark:bg-darkagri-hover font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 dark:border-darkagri-border bg-white/50 dark:bg-darkagri-hover font-semibold"
                />
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-emerald-100 dark:border-darkagri-border pb-3 pt-4">
              System Preferences
            </h2>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-darkagri-hover">
              <span className="font-bold text-slate-800 dark:text-slate-200">Dark Mode Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                {theme === 'dark' ? 'Dark' : 'Light'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-darkagri-hover">
              <span className="font-bold text-slate-800 dark:text-slate-200">Preferred Language</span>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 font-bold bg-white text-slate-800"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-4"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
