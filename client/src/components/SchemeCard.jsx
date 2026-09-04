import React from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, CreditCard, Tractor, FileText, Sprout } from 'lucide-react';

export const SchemeCard = ({ scheme }) => {
  const getSchemeIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'CreditCard':
        return CreditCard;
      case 'Tractor':
        return Tractor;
      case 'FileText':
        return FileText;
      case 'Sprout':
        return Sprout;
      default:
        return Landmark;
    }
  };

  const Icon = getSchemeIcon(scheme.iconName);

  return (
    <div className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-darkagri-hover text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
            {scheme.state}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
          {scheme.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">{scheme.department}</p>

        <div className="space-y-2.5 my-4 py-3 border-y border-emerald-100 dark:border-darkagri-border text-xs">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Eligibility:</span>
            <span className="text-slate-700 dark:text-slate-300">{scheme.eligibility}</span>
          </div>

          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Key Benefits:</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{scheme.benefits}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
          Deadline: {scheme.deadline}
        </span>

        <a
          href={scheme.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all"
        >
          <span>Learn More</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
