import React from 'react';
import { CloudRain, TrendingUp, AlertTriangle, Calendar, Droplets, BellRing } from 'lucide-react';

export const NotificationCard = ({ notif, onMarkRead }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'WEATHER_ALERT':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'MARKET_PRICE':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'DISEASE_RISK':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'IRRIGATION_REMINDER':
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      case 'SCHEME_DEADLINE':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return <BellRing className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div
      className={`glass-card p-4 rounded-2xl flex items-start gap-4 transition-all ${
        !notif.isRead ? 'border-l-4 border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20' : ''
      }`}
    >
      <div className="p-2.5 rounded-xl bg-white dark:bg-darkagri-card shadow-sm border border-slate-100 dark:border-darkagri-border">
        {getIcon(notif.type)}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
          <span className="text-[10px] text-slate-400 font-medium">
            {new Date(notif.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
      </div>

      {!notif.isRead && onMarkRead && (
        <button
          onClick={() => onMarkRead(notif.id)}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold px-2 py-1 rounded-lg hover:bg-emerald-100/50"
        >
          Read
        </button>
      )}
    </div>
  );
};
