import React from 'react';
import { Loader2, Sprout } from 'lucide-react';

export const LoadingSpinner = ({ label = 'Analyzing farming data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 min-h-[250px]">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
          <Sprout className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};
