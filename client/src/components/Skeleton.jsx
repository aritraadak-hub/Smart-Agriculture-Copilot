import React from 'react';

export const Skeleton = ({ className = 'h-6 w-full' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-darkagri-hover rounded-xl ${className}`}
    ></div>
  );
};
