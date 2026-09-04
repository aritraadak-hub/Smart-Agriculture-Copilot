import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';

export const MarketPriceCard = ({ priceItem }) => {
  if (!priceItem) return null;

  const isUp = priceItem.priceChange.startsWith('+');
  const isDown = priceItem.priceChange.startsWith('-');

  return (
    <div className="glass-card p-5 rounded-2xl flex items-center justify-between hover:border-emerald-500 transition-all">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-base">{priceItem.crop}</h4>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-darkagri-hover text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
            {priceItem.category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{priceItem.market}, {priceItem.state}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          ₹{priceItem.modalPrice.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ {priceItem.unit}</span>
        </div>

        <div
          className={`flex items-center justify-end gap-1 text-xs font-bold mt-1 ${
            isUp
              ? 'text-emerald-600 dark:text-emerald-400'
              : isDown
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-500'
          }`}
        >
          {isUp && <TrendingUp className="w-3.5 h-3.5" />}
          {isDown && <TrendingDown className="w-3.5 h-3.5" />}
          {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
          <span>{priceItem.priceChange}</span>
        </div>
      </div>
    </div>
  );
};
