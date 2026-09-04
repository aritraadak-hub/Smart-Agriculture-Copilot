import React from 'react';
import { Tractor, MapPin, Calendar, Activity, Layers, Edit2, Trash2 } from 'lucide-react';

export const FarmCard = ({ farm, onEdit, onDelete }) => {
  if (!farm) return null;

  return (
    <div className="glass-card p-6 rounded-3xl space-y-4 hover:border-emerald-500 transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{farm.name}</h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{farm.village || farm.district}, {farm.state}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(farm)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-darkagri-hover rounded-xl transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(farm.id)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-darkagri-hover/50 text-xs">
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Farm Area</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {farm.area} {farm.areaUnit || 'acres'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Soil Type</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{farm.soilType || 'Loamy'}</span>
        </div>
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Irrigation</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{farm.irrigationType || 'Drip'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-xs">
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Crop</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">{farm.currentCrop || 'Wheat'}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span>Health: {farm.cropHealth || 90}%</span>
        </div>
      </div>
    </div>
  );
};
