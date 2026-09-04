import React from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';

export const SoilCard = ({ soilData }) => {
  if (!soilData) return null;

  return (
    <div className="glass-card p-6 rounded-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
            Soil Health Index
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Score: {soilData.soilFertilityScore} / 100
          </h2>
          <p className="text-xs text-slate-500 font-medium">{soilData.healthStatus}</p>
        </div>

        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-4 border-emerald-500 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-extrabold text-xl shadow-inner">
          {soilData.soilFertilityScore}%
        </div>
      </div>

      {/* IoT Status indicator */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-darkagri-hover border border-emerald-200/50 text-xs">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>{soilData.sensorStatus}</span>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
      </div>

      {/* Progress Bars for Nutrients */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Nutrient Breakdown</h3>

        {Object.entries(soilData.nutrients).map(([key, item]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="capitalize text-slate-700 dark:text-slate-300">{key}</span>
              <span className="text-slate-900 dark:text-white font-bold">
                {item.value} {item.unit} ({item.status})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-darkagri-hover rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.status.includes('Low')
                    ? 'bg-amber-500'
                    : item.status.includes('High')
                    ? 'bg-blue-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(20, (item.value / 250) * 100))}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-2 pt-3 border-t border-emerald-100 dark:border-darkagri-border">
        <h4 className="text-xs uppercase font-bold text-slate-400">Actionable Advice</h4>
        {soilData.recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
