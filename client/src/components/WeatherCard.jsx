import React from 'react';
import { CloudSun, Droplets, Wind, Thermometer, Sunrise, Sunset, ShieldAlert } from 'lucide-react';

export const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="glass-card p-6 rounded-3xl relative overflow-hidden bg-gradient-to-br from-emerald-900 to-green-950 text-white border-0 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
            Live Field Weather • {weather.location}
          </span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-5xl font-black tracking-tight">{weather.currentTemp}°C</span>
            <div>
              <p className="text-sm font-semibold capitalize text-emerald-100">{weather.condition}</p>
              <p className="text-xs text-emerald-300">Feels like {weather.feelsLike}°C</p>
            </div>
          </div>
        </div>

        {/* Quick Weather Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-[10px] uppercase text-emerald-200">Humidity</p>
              <p className="text-sm font-bold">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-[10px] uppercase text-emerald-200">Wind</p>
              <p className="text-sm font-bold">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-[10px] uppercase text-emerald-200">Rain Prob.</p>
              <p className="text-sm font-bold">{weather.rainProbability}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sunrise className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-[10px] uppercase text-emerald-200">Sunrise</p>
              <p className="text-sm font-bold">{weather.sunrise}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farming Advisories banner */}
      {weather.advisories && weather.advisories.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/15 flex items-start gap-3 text-xs bg-emerald-800/40 p-3 rounded-xl">
          <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-200 uppercase tracking-wider block text-[10px]">
              Farmer Advisory:
            </span>
            <p className="text-emerald-100 mt-0.5">{weather.advisories[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
};
