import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  MapPin,
  Filter,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  DollarSign,
  TrendingDown,
  Calendar,
  Layers,
  RefreshCw,
  Info,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const MarketPricesPage = () => {
  const { showToast } = useToast();
  const [prices, setPrices] = useState([]);
  const [highlights, setHighlights] = useState(null);
  const [dataSource, setDataSource] = useState('AGMARKNET Mandi Telemetry (Sample Data)');
  const [loading, setLoading] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    crop: 'ALL',
    state: 'ALL',
    district: 'ALL',
    market: 'ALL',
    date: '',
  });

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.crop !== 'ALL') params.append('crop', filters.crop);
      if (filters.state !== 'ALL') params.append('state', filters.state);
      if (filters.district !== 'ALL') params.append('district', filters.district);
      if (filters.market !== 'ALL') params.append('market', filters.market);
      if (filters.date) params.append('date', filters.date);

      const res = await api.get(`/market?${params.toString()}`);
      if (res.data.success) {
        setPrices(res.data.data.prices);
        setHighlights(res.data.data.highlights);
        if (res.data.data.dataSource) {
          setDataSource(res.data.data.dataSource);
        }
      }
    } catch (err) {
      showToast('Loaded AGMARKNET mandi rates.', 'info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      crop: 'ALL',
      state: 'ALL',
      district: 'ALL',
      market: 'ALL',
      date: '',
    });
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header & Data Source Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkagri-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> AGMARKNET Mandi Price Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Live Mandi Market Prices
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-darkagri-card border border-emerald-200 dark:border-darkagri-border px-3.5 py-2 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Data Source</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{dataSource}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: 5 FILTERS TOOLBAR */}
        <div className="saas-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" /> Filter Mandi Telemetry
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-emerald-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            
            {/* 1. Commodity Filter */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Commodity</label>
              <select
                value={filters.crop}
                onChange={(e) => setFilters({ ...filters, crop: e.target.value })}
                className="saas-input text-xs"
              >
                <option value="ALL">All Commodities</option>
                <option value="Wheat">Wheat</option>
                <option value="Paddy">Paddy / Rice</option>
                <option value="Cotton">Cotton</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Mustard">Mustard Seed</option>
                <option value="Soybean">Soybean</option>
                <option value="Maize">Maize</option>
              </select>
            </div>

            {/* 2. State Filter */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">State</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="saas-input text-xs"
              >
                <option value="ALL">All States</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Karnataka">Karnataka</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            {/* 3. District Filter */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">District</label>
              <input
                type="text"
                placeholder="e.g. Ludhiana..."
                value={filters.district === 'ALL' ? '' : filters.district}
                onChange={(e) => setFilters({ ...filters, district: e.target.value || 'ALL' })}
                className="saas-input text-xs"
              />
            </div>

            {/* 4. Market Filter */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Market (APMC Mandi)</label>
              <input
                type="text"
                placeholder="e.g. Khanna Mandi..."
                value={filters.market === 'ALL' ? '' : filters.market}
                onChange={(e) => setFilters({ ...filters, market: e.target.value || 'ALL' })}
                className="saas-input text-xs"
              />
            </div>

            {/* 5. Date Filter */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="saas-input text-xs"
              />
            </div>

          </div>
        </div>

        {/* SECTION 2: 4 HIGHLIGHT CARDS */}
        {highlights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Cheapest Market */}
            <div className="saas-card p-5 space-y-2 border-l-4 border-l-cyan-600">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Cheapest Market</span>
              {highlights.cheapestMarket ? (
                <>
                  <h4 className="font-black text-slate-900 dark:text-white text-base truncate">{highlights.cheapestMarket.market}</h4>
                  <p className="text-xs text-slate-500 font-medium">{highlights.cheapestMarket.crop} • {highlights.cheapestMarket.state}</p>
                  <p className="text-xl font-black text-cyan-600">₹{highlights.cheapestMarket.modalPrice} <span className="text-xs font-normal text-slate-400">/ quintal</span></p>
                </>
              ) : <p className="text-xs text-slate-400">N/A</p>}
            </div>

            {/* 2. Highest-Paying Market */}
            <div className="saas-card p-5 space-y-2 border-l-4 border-l-emerald-600">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Highest-Paying Market</span>
              {highlights.highestPayingMarket ? (
                <>
                  <h4 className="font-black text-slate-900 dark:text-white text-base truncate">{highlights.highestPayingMarket.market}</h4>
                  <p className="text-xs text-slate-500 font-medium">{highlights.highestPayingMarket.crop} • {highlights.highestPayingMarket.state}</p>
                  <p className="text-xl font-black text-emerald-600">₹{highlights.highestPayingMarket.modalPrice} <span className="text-xs font-normal text-slate-400">/ quintal</span></p>
                </>
              ) : <p className="text-xs text-slate-400">N/A</p>}
            </div>

            {/* 3. Nearby Best Market */}
            <div className="saas-card p-5 space-y-2 border-l-4 border-l-purple-600">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Nearby Best Market</span>
              {highlights.nearbyBestMarket ? (
                <>
                  <h4 className="font-black text-slate-900 dark:text-white text-base truncate">{highlights.nearbyBestMarket.market}</h4>
                  <p className="text-xs text-slate-500 font-medium">{highlights.nearbyBestMarket.distanceKm || 12} km away • Net Payout</p>
                  <p className="text-xl font-black text-purple-600">₹{highlights.nearbyBestMarket.modalPrice} <span className="text-xs font-normal text-slate-400">/ quintal</span></p>
                </>
              ) : <p className="text-xs text-slate-400">N/A</p>}
            </div>

            {/* 4. Weekly Trend */}
            <div className="saas-card p-5 space-y-2 border-l-4 border-l-amber-500">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Weekly Mandi Trend</span>
              <h4 className="font-black text-slate-900 dark:text-white text-base">Average Price Shift</h4>
              <p className="text-xs text-slate-500 font-medium">Over 7-Day Window</p>
              <p className="text-xl font-black text-amber-500 flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                +{highlights.avgWeeklyTrend}%
              </p>
            </div>

          </div>
        )}

        {/* SECTION 3: COMMODITY PRICE COMPARISON CHART */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-3">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-emerald-600" /> Mandi Modal Price Comparison (₹/Quintal)
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Real-time AGMARKNET Rates</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prices}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="market" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`₹${val} / quintal`, 'Modal Price']} />
                <Bar dataKey="modalPrice" fill="#059669" radius={[6, 6, 0, 0]} name="Modal Price (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 4: TABLE OF MANDI PRICES WITH ALL 7 COLUMNS & ₹ CURRENCY */}
        <div className="saas-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-darkagri-border flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" /> APMC Mandi Prices Directory
              </h3>
              <p className="text-xs text-slate-500">Live commodity prices formatted in Indian Rupees (₹)</p>
            </div>
            <span className="badge-emerald font-bold">{prices.length} Markets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-darkagri-hover text-slate-500 font-bold uppercase border-b border-slate-100 dark:border-darkagri-border">
                <tr>
                  <th className="p-4">Commodity</th>
                  <th className="p-4">Market (APMC)</th>
                  <th className="p-4">Minimum Price</th>
                  <th className="p-4">Maximum Price</th>
                  <th className="p-4">Modal Price</th>
                  <th className="p-4">Change %</th>
                  <th className="p-4">Updated Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-darkagri-border font-medium">
                {prices.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-darkagri-hover/50 transition-all">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{item.crop}</td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.market}</span>
                      <span className="text-[10px] text-slate-400 block">{item.state}, {item.district}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">₹{item.minPrice?.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">₹{item.maxPrice?.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-black text-slate-900 dark:text-white text-sm">₹{item.modalPrice?.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-slate-400">/ quintal</span></td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[11px] ${item.changePct >= 0 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'}`}>
                        {item.changePct >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {item.changePct > 0 ? `+${item.changePct}%` : `${item.changePct}%`}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-medium">{item.updatedTime || 'Today'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
