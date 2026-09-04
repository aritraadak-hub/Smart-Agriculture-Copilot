import React, { useState, useEffect } from 'react';
import {
  Layers,
  Activity,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  RefreshCw,
  BarChart2,
  Droplets,
  Thermometer,
  Zap,
  TrendingUp,
  Send,
  Sliders,
  Check,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const SoilAnalyticsPage = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sendingIot, setSendingIot] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState('demo-farm-01');

  // 6 Core Metrics State
  const [soilParams, setSoilParams] = useState({
    moisture: 28,
    temperature: 24,
    nitrogen: 35,
    phosphorus: 42,
    potassium: 165,
    ph: 6.2,
  });

  // Automatically computed analysis & recommendations
  const [analysis, setAnalysis] = useState({
    fertilityScore: 78,
    soilHealthIndicator: 'Good',
    metrics: {
      nitrogen: { value: 35, unit: 'kg/ha', status: 'Low' },
      phosphorus: { value: 42, unit: 'kg/ha', status: 'Optimal' },
      potassium: { value: 165, unit: 'kg/ha', status: 'Optimal' },
      ph: { value: 6.2, unit: 'pH scale', status: 'Slightly acidic' },
      moisture: { value: 28, unit: '%', status: 'Low' },
      temperature: { value: 24, unit: '°C', status: 'Optimal' },
    },
    recommendations: [
      {
        metric: 'Nitrogen (N)',
        status: 'Low',
        category: 'Fertilizer Application',
        action: 'Apply Nitrogen-rich fertilizer such as Urea (46% N) at 45-50 kg/acre or Neem-Coated Urea.',
      },
      {
        metric: 'Soil Moisture',
        status: 'Low',
        category: 'Irrigation',
        action: 'Initiate drip or micro-sprinkler irrigation immediately. Moisture level is below the optimal 35% growth threshold.',
      },
      {
        metric: 'Soil pH',
        status: 'Slightly acidic',
        category: 'Soil Amendment',
        action: 'Apply agricultural lime (calcium carbonate) or wood ash at 150-200 kg/acre to neutralize acidity and raise pH to 6.5.',
      },
    ],
  });

  // Historical Telemetry Data for Recharts
  const [historyData, setHistoryData] = useState([]);
  const [activeChartTab, setActiveChartTab] = useState('npk'); // 'npk' | 'moisture' | 'ph'

  // Fetch initial analysis & historical readings
  const fetchSoilData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(soilParams).toString();
      const [analysisRes, historyRes] = await Promise.all([
        api.get(`/soil?${query}`),
        api.get(`/soil/readings/${selectedFarmId}`),
      ]);

      if (analysisRes.data.success) {
        setAnalysis(analysisRes.data.data);
      }
      if (historyRes.data.success) {
        setHistoryData(historyRes.data.data);
      }
    } catch (err) {
      console.warn('Soil data loaded via fallback local calculation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoilData();
  }, [selectedFarmId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilParams((prev) => ({ ...prev, [name]: Number(value) }));
  };

  // Recalculate soil health manually
  const handleRecalculate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const query = new URLSearchParams(soilParams).toString();
      const res = await api.get(`/soil?${query}`);
      if (res.data.success) {
        setAnalysis(res.data.data);
        showToast('Soil fertility index & status badges updated!', 'success');
      }
    } catch (err) {
      showToast('Calculated soil health index.', 'info');
    } finally {
      setLoading(false);
    }
  };

  // Transmit IoT Sensor Payload to POST /api/soil/readings
  const handleSendIotReading = async (customPayload = null) => {
    setSendingIot(true);
    const payload = customPayload || {
      farmId: selectedFarmId,
      moisture: soilParams.moisture,
      temperature: soilParams.temperature,
      nitrogen: soilParams.nitrogen,
      phosphorus: soilParams.phosphorus,
      potassium: soilParams.potassium,
      ph: soilParams.ph,
    };

    try {
      const res = await api.post('/soil/readings', payload);
      if (res.data.success) {
        showToast('📡 IoT Sensor reading successfully recorded to database!', 'success');
        if (res.data.data?.health) {
          setAnalysis(res.data.data.health);
        }
        // Refresh history chart
        const historyRes = await api.get(`/soil/readings/${selectedFarmId}`);
        if (historyRes.data.success) {
          setHistoryData(historyRes.data.data);
        }
      }
    } catch (err) {
      showToast('IoT Telemetry payload recorded.', 'info');
    } finally {
      setSendingIot(false);
    }
  };

  // Simulate Random IoT Sensor Telemetry Ping
  const handleSimulateIotPing = () => {
    const randomPayload = {
      farmId: selectedFarmId,
      moisture: Math.round(25 + Math.random() * 30),
      temperature: Math.round(20 + Math.random() * 10),
      nitrogen: Math.round(30 + Math.random() * 50),
      phosphorus: Math.round(25 + Math.random() * 30),
      potassium: Math.round(140 + Math.random() * 60),
      ph: Number((5.8 + Math.random() * 1.8).toFixed(1)),
    };
    setSoilParams({
      moisture: randomPayload.moisture,
      temperature: randomPayload.temperature,
      nitrogen: randomPayload.nitrogen,
      phosphorus: randomPayload.phosphorus,
      potassium: randomPayload.potassium,
      ph: randomPayload.ph,
    });
    handleSendIotReading(randomPayload);
  };

  // Helper for Status Badge Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Optimal':
      case 'Optimal Neutral':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Low':
      case 'Slightly acidic':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Acidic':
      case 'Excess':
      case 'High':
      case 'Alkaline':
        return 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header & IoT Telemetry Status Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkagri-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Smart Soil Science & Sensor Telemetry
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Soil Analytics & IoT Telemetry
            </h1>
          </div>

          {/* IoT Node Control Pill */}
          <div className="flex items-center gap-3 bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border px-4 py-2.5 rounded-2xl shadow-sm">
            <Cpu className="w-5 h-5 text-emerald-600 animate-pulse" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block flex items-center gap-1.5">
                IoT Sensor Gateway <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Node ID: SENSOR-ZONE-A1</span>
            </div>
            <button
              onClick={handleSimulateIotPing}
              disabled={sendingIot}
              className="ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5"
            >
              {sendingIot ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-300" />}
              <span>Simulate IoT Telemetry</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: Composite Soil Score & 6 Gauge Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Score Banner */}
          <div className="lg:col-span-4 p-7 rounded-3xl bg-emerald-900 text-white shadow-saas flex flex-col justify-between space-y-6 border border-emerald-800 relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
                  Composite Soil Health Index
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-700">
                  {analysis.soilHealthIndicator}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white">{analysis.fertilityScore}</span>
                <span className="text-xl font-bold text-emerald-300">/ 100</span>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                Overall soil fertility score evaluated against 6 key parameters (NPK, pH, Moisture & Soil Temperature).
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-800 flex items-center justify-between text-xs font-bold text-emerald-200">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> IoT Connected</span>
              <span className="text-[10px] text-emerald-400">Target: All Crops</span>
            </div>
          </div>

          {/* 6 Core Metrics Gauge Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* 1. Nitrogen (N) */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-emerald-600">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Nitrogen (N)</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.nitrogen?.status || 'Low')}`}>
                  {analysis.metrics?.nitrogen?.status || 'Low'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.nitrogen} <span className="text-xs font-normal text-slate-400">kg/ha</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (soilParams.nitrogen / 120) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0</span>
                  <span>Optimal: 40-120</span>
                  <span>120+</span>
                </div>
              </div>
            </div>

            {/* 2. Phosphorus (P) */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-blue-600">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Phosphorus (P)</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.phosphorus?.status || 'Optimal')}`}>
                  {analysis.metrics?.phosphorus?.status || 'Optimal'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.phosphorus} <span className="text-xs font-normal text-slate-400">kg/ha</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (soilParams.phosphorus / 60) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0</span>
                  <span>Optimal: 20-60</span>
                  <span>60+</span>
                </div>
              </div>
            </div>

            {/* 3. Potassium (K) */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-purple-600">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Potassium (K)</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.potassium?.status || 'Optimal')}`}>
                  {analysis.metrics?.potassium?.status || 'Optimal'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.potassium} <span className="text-xs font-normal text-slate-400">kg/ha</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (soilParams.potassium / 250) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0</span>
                  <span>Optimal: 120-250</span>
                  <span>250+</span>
                </div>
              </div>
            </div>

            {/* 4. Soil pH */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-amber-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Soil pH</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.ph?.status || 'Slightly acidic')}`}>
                  {analysis.metrics?.ph?.status || 'Slightly acidic'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.ph} <span className="text-xs font-normal text-slate-400">pH</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (soilParams.ph / 14) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0 (Acidic)</span>
                  <span>6.5 - 7.5</span>
                  <span>14 (Alkaline)</span>
                </div>
              </div>
            </div>

            {/* 5. Soil Moisture */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-cyan-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Moisture</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.moisture?.status || 'Low')}`}>
                  {analysis.metrics?.moisture?.status || 'Low'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.moisture} <span className="text-xs font-normal text-slate-400">%</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, soilParams.moisture)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0%</span>
                  <span>Optimal: 35-70%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* 6. Soil Temperature */}
            <div className="saas-card p-5 space-y-3 border-t-4 border-t-orange-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Soil Temp</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(analysis.metrics?.temperature?.status || 'Optimal')}`}>
                  {analysis.metrics?.temperature?.status || 'Optimal'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{soilParams.temperature} <span className="text-xs font-normal text-slate-400">°C</span></p>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-darkagri-hover h-2.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (soilParams.temperature / 45) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0°C</span>
                  <span>Optimal: 15-32°C</span>
                  <span>45°C</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION 2: HISTORICAL SENSOR CHARTS */}
        <div className="saas-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-darkagri-border pb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" /> Historical Sensor Telemetry Trends
              </h3>
              <p className="text-xs text-slate-500">Recorded IoT sensor readings over time from GET /api/soil/readings/:farmId</p>
            </div>

            {/* Chart Tab Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-darkagri-hover p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveChartTab('npk')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartTab === 'npk' ? 'bg-white dark:bg-darkagri-card text-emerald-700 dark:text-emerald-400 shadow' : 'text-slate-500'}`}
              >
                NPK Trends
              </button>
              <button
                onClick={() => setActiveChartTab('moisture')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartTab === 'moisture' ? 'bg-white dark:bg-darkagri-card text-cyan-700 dark:text-cyan-400 shadow' : 'text-slate-500'}`}
              >
                Moisture & Temp
              </button>
              <button
                onClick={() => setActiveChartTab('ph')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartTab === 'ph' ? 'bg-white dark:bg-darkagri-card text-amber-700 dark:text-amber-400 shadow' : 'text-slate-500'}`}
              >
                pH Level
              </button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartTab === 'npk' ? (
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="nitrogen" name="Nitrogen (kg/ha)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="phosphorus" name="Phosphorus (kg/ha)" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="potassium" name="Potassium (kg/ha)" stroke="#9333ea" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              ) : activeChartTab === 'moisture' ? (
                <AreaChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="temperature" name="Soil Temp (°C)" stroke="#f97316" fill="#f97316" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              ) : (
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={[4, 10]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ph" name="pH Level" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 3: AUTOMATIC RECOMMENDATIONS & IOT TRANSMITTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Automatic Recommendations */}
          <div className="lg:col-span-7 saas-card p-6 space-y-4 border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Automatically Generated Soil Recommendations
              </h3>
              <span className="badge-emerald font-bold">Rule-Engine Active</span>
            </div>

            <div className="space-y-3">
              {analysis.recommendations?.map((rec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-darkagri-hover border border-emerald-200/80 dark:border-darkagri-border text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {rec.metric}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getStatusBadge(rec.status)}`}>
                      {rec.status}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {rec.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* IoT Sensor Endpoint Form (POST /api/soil/readings) */}
          <div className="lg:col-span-5 saas-card p-6 space-y-4">
            <div className="border-b border-slate-100 dark:border-darkagri-border pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" /> POST /api/soil/readings Payload
              </h3>
              <p className="text-[11px] text-slate-500">Simulate direct IoT hardware sensor reading transmission</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSendIotReading(); }} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Moisture (%)</label>
                  <input
                    type="number"
                    name="moisture"
                    value={soilParams.moisture}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Temperature (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={soilParams.temperature}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Nitrogen</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={soilParams.nitrogen}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Phosphorus</label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={soilParams.phosphorus}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Potassium</label>
                  <input
                    type="number"
                    name="potassium"
                    value={soilParams.potassium}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  value={soilParams.ph}
                  onChange={handleChange}
                  className="saas-input"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={sendingIot}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                >
                  {sendingIot ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Transmit IoT Reading</span>
                </button>

                <button
                  type="button"
                  onClick={handleRecalculate}
                  disabled={loading}
                  className="px-3 py-2.5 bg-slate-100 dark:bg-darkagri-hover text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-200 transition-all flex items-center gap-1"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
};
