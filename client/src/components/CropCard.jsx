import React from 'react';
import { Sprout, Calendar, Droplets, CheckCircle, Info } from 'lucide-react';

export const CropCard = ({ crop }) => {
  if (!crop) return null;

  return (
    <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{crop.cropName}</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {crop.category}
            </span>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md">
          {crop.suitabilityPercentage}% Match
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-emerald-100 dark:border-darkagri-border text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Expected Yield</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{crop.expectedYield}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Duration</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{crop.estimatedDuration}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <Droplets className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Watering: </span>
            <span className="text-slate-600 dark:text-slate-400">{crop.waterRequirement}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Fertilizer: </span>
            <span className="text-slate-600 dark:text-slate-400">{crop.fertilizerRecommendation}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-50 dark:border-darkagri-border/50 text-[11px] text-slate-500 dark:text-slate-400 italic">
        "{crop.reasonForRecommendation}"
      </div>
    </div>
  );
};
