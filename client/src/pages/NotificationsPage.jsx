import React, { useState, useEffect } from 'react';
import { Bell, CloudRain, TrendingUp, ShieldAlert, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const NotificationsPage = () => {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch {
      // Fallback
      setNotifications([
        {
          id: 'notif-101',
          title: 'Rainfall Advisory Alert 🌧️',
          message: 'Moderate rain expected in Ludhiana district within 36 hours. Avoid pesticide spraying.',
          type: 'WEATHER_ALERT',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'notif-102',
          title: 'Market Price Surge 📈',
          message: 'Wheat modal price in Khanna Mandi reached ₹2,380/quintal (+5.2% gain).',
          type: 'MARKET_PRICE',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 'notif-103',
          title: 'PM-KISAN e-KYC Deadline 🏛️',
          message: 'Complete your e-KYC verification before March 31 to receive the upcoming 17th installment.',
          type: 'SCHEME_DEADLINE',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'notif-104',
          title: 'Irrigation Reminder 💧',
          message: 'Scheduled drip irrigation cycle for Green Harvest Valley (Block B) due today at 5:00 PM.',
          type: 'IRRIGATION_REMINDER',
          isRead: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.patch('/notifications/read/all');
    } catch {}
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkagri-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Real-time Alert System
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Farmer Notifications Center
            </h1>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2.5 bg-slate-100 dark:bg-darkagri-hover hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 max-w-4xl">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                notif.isRead
                  ? 'bg-white dark:bg-darkagri-card border-slate-200 dark:border-darkagri-border opacity-80'
                  : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-sm'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-darkagri-card text-emerald-600 border border-slate-200 dark:border-darkagri-border shrink-0">
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
