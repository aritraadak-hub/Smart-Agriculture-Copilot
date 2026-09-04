import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  title = 'No Data Found',
  description = 'There are no records to display at this moment.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="glass-card p-10 rounded-3xl text-center flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-darkagri-hover flex items-center justify-center text-emerald-600">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">{description}</p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
