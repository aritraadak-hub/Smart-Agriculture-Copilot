import React from 'react';

export const StatCard = ({ title, value, unit, change, changeType, icon: Icon, color = 'emerald' }) => {
  return (
    <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
          </div>
        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
          <span
            className={
              changeType === 'increase'
                ? 'text-emerald-600 dark:text-emerald-400'
                : changeType === 'decrease'
                ? 'text-red-600 dark:text-red-400'
                : 'text-slate-500'
            }
          >
            {change}
          </span>
          <span className="text-slate-400 font-normal">vs last week</span>
        </div>
      )}
    </div>
  );
};
