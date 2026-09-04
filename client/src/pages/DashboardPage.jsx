import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Droplets,
  Thermometer,
  CloudRain,
  Activity,
  Calendar,
  Bell,
  CheckSquare,
  Sparkles,
  TrendingUp,
  MapPin,
  Sprout,
  ShieldCheck,
  ArrowUpRight,
  AlertTriangle,
  Info,
  ChevronRight,
  User,
  Clock,
  PieChart as PieIcon,
  BarChart2,
  LineChart as LineIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';

// Chart 1: Soil Moisture Trend
const soilMoistureData = [
  { day: 'Mon', moisture: 24, idealMin: 22, idealMax: 32 },
  { day: 'Tue', moisture: 26, idealMin: 22, idealMax: 32 },
  { day: 'Wed', moisture: 28.5, idealMin: 22, idealMax: 32 },
  { day: 'Thu', moisture: 27, idealMin: 22, idealMax: 32 },
  { day: 'Fri', moisture: 31, idealMin: 22, idealMax: 32 },
  { day: 'Sat', moisture: 30, idealMin: 22, idealMax: 32 },
  { day: 'Sun', moisture: 28.5, idealMin: 22, idealMax: 32 },
];

// Chart 2: Temperature Trend
const temperatureTrendData = [
  { day: 'Mon', maxTemp: 27, minTemp: 16, avgTemp: 21.5 },
  { day: 'Tue', maxTemp: 29, minTemp: 18, avgTemp: 23.5 },
  { day: 'Wed', maxTemp: 28.5, minTemp: 17, avgTemp: 22.8 },
  { day: 'Thu', maxTemp: 30, minTemp: 19, avgTemp: 24.5 },
  { day: 'Fri', maxTemp: 26, minTemp: 15, avgTemp: 20.5 },
  { day: 'Sat', maxTemp: 28, minTemp: 17, avgTemp: 22.5 },
  { day: 'Sun', maxTemp: 29.5, minTemp: 18, avgTemp: 23.8 },
];

// Chart 3: Weekly Rainfall
const weeklyRainfallData = [
  { day: 'Mon', rainfall: 2.0 },
  { day: 'Tue', rainfall: 0.0 },
  { day: 'Wed', rainfall: 14.5 },
  { day: 'Thu', rainfall: 8.2 },
  { day: 'Fri', rainfall: 0.0 },
  { day: 'Sat', rainfall: 0.0 },
  { day: 'Sun', rainfall: 1.5 },
];

// Chart 4: Crop Health Breakdown
const cropHealthData = [
  { name: 'Optimal Growth', value: 75, color: '#16a34a' },
  { name: 'Needs Nitrogen Dose', value: 15, color: '#eab308' },
  { name: 'Pest Scouting Needed', value: 10, color: '#f97316' },
];

// Chart 5: Market Price Trend
const marketPriceData = [
  { date: 'Feb 25', Wheat: 2280, Rice: 3950 },
  { date: 'Feb 26', Wheat: 2310, Rice: 3980 },
  { date: 'Feb 27', Wheat: 2340, Rice: 4020 },
  { date: 'Feb 28', Wheat: 2350, Rice: 4080 },
  { date: 'Mar 01', Wheat: 2380, Rice: 4140 },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [currentDate] = useState(() =>
    new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  );

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Inspect Block A drip irrigation valves', completed: true },
    { id: 2, text: 'Verify soil telemetry Node 1 NPK readings', completed: true },
    { id: 3, text: 'Apply top-dressing Urea dose before Wednesday rain', completed: false },
    { id: 4, text: 'Scout wheat leaf undersides for fungal rust spots', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* DEMO MODE BANNER IF GUEST */}
        {user?.isGuest && (
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between gap-3 text-xs text-amber-800 dark:text-amber-300 font-bold mb-4 shadow-sm">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>DEMO MODE ACTIVE: You are viewing sample agricultural data.</span>
            </span>
            <span className="text-[11px] bg-amber-200/80 dark:bg-amber-900/80 px-2.5 py-1 rounded-lg">
              Guest Session
            </span>
          </div>
        )}

        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200/90 dark:border-darkagri-border pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Good Morning, {user?.name || 'Farmer'} 🌾
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {user?.district || 'Ludhiana'}, {user?.state || 'Punjab'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {currentDate}
              </span>
            </div>
          </div>

          {/* Controls: Notifications & Profile Avatar */}
          <div className="flex items-center gap-3">
            
            {/* Notification Drawer Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 bg-white dark:bg-darkagri-card hover:bg-slate-100 dark:hover:bg-darkagri-hover border border-slate-200/90 dark:border-darkagri-border rounded-xl text-slate-700 dark:text-slate-200 transition-all relative shadow-sm"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>

              {/* Quick Notifications Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border rounded-2xl p-4 shadow-xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Recent Alerts</span>
                    <Link to="/notifications" className="text-[11px] text-emerald-600 font-bold hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200">
                      <p className="font-bold">🌧️ Rain expected tomorrow</p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-300">Avoid pesticide spraying in Block A.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200">
                      <p className="font-bold">📈 Rice price surge (+4.8%)</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300">Khanna Mandi modal rate reached ₹4,140/quintal.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-darkagri-border">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {user?.name ? user.name.charAt(0) : 'R'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-bold text-xs text-slate-900 dark:text-white block leading-tight">
                  {user?.name || 'Ramesh Patel'}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Progressive Farmer</span>
              </div>
            </div>

          </div>
        </div>

        {/* TOP STATISTIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Temperature */}
          <div className="saas-card p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Air Temp</span>
              <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                <Thermometer className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">28.5°C</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Feels like 30°C</span>
              <span className="font-bold text-amber-600">Sunny</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="saas-card p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Humidity</span>
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">68%</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Relative Level</span>
              <span className="font-bold text-blue-600">Optimal</span>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="saas-card p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Soil Moisture</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">28.5%</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Root Hydration</span>
              <span className="font-bold text-emerald-600">Ideal</span>
            </div>
          </div>

          {/* Soil pH */}
          <div className="saas-card p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Soil pH</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                <Sprout className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">6.8 pH</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Fertility Zone</span>
              <span className="font-bold text-emerald-600">Neutral</span>
            </div>
          </div>

          {/* Rainfall */}
          <div className="saas-card p-4 space-y-2 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Rainfall</span>
              <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600">
                <CloudRain className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">12.4 mm</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Rain Tomorrow</span>
              <span className="font-bold text-amber-600">65% Alert</span>
            </div>
          </div>

        </div>

        {/* KEY FARM METRICS BAR */}
        <div className="saas-card p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center border-l-4 border-l-emerald-600">
          
          {/* Farm Health Score */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-base flex items-center justify-center border border-emerald-300 dark:border-emerald-800 shrink-0">
              92%
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Farm Health Score</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Excellent Growth</h4>
            </div>
          </div>

          {/* Current Crop */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-darkagri-hover text-emerald-600 shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Current Active Crop</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Wheat (PBW 550)</h4>
            </div>
          </div>

          {/* Expected Harvest Date */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-darkagri-hover text-emerald-600 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Expected Harvest</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">April 10, 2026</h4>
            </div>
          </div>

          {/* Weather Alert Badge */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-0.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Weather Warning</span>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-300/90 font-medium leading-tight">
              Moderate rain forecast within 24 hours.
            </p>
          </div>

        </div>

        {/* AI INSIGHTS PANEL & TODAY'S TASKS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* AI Insights Panel */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-emerald-900 text-white shadow-saas space-y-4 border border-emerald-800">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-200 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Agriculture Copilot Insights & Advisories</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-extrabold rounded-full border border-emerald-700">
                Live Intelligence
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              {/* Insight 1 */}
              <div className="p-3.5 bg-emerald-950/70 border border-emerald-800/80 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <CloudRain className="w-4 h-4 shrink-0" />
                  <span>Spraying Warning</span>
                </div>
                <p className="text-emerald-100 text-[11px] leading-relaxed font-medium">
                  "Rain expected tomorrow. Avoid pesticide spraying."
                </p>
              </div>

              {/* Insight 2 */}
              <div className="p-3.5 bg-emerald-950/70 border border-emerald-800/80 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                  <Droplets className="w-4 h-4 shrink-0" />
                  <span>Irrigation Notice</span>
                </div>
                <p className="text-emerald-100 text-[11px] leading-relaxed font-medium">
                  "Soil moisture is low. Drip irrigation is recommended."
                </p>
              </div>

              {/* Insight 3 */}
              <div className="p-3.5 bg-emerald-950/70 border border-emerald-800/80 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Market Rate Surge</span>
                </div>
                <p className="text-emerald-100 text-[11px] leading-relaxed font-medium">
                  "Rice price increased by 4.8% this week."
                </p>
              </div>

            </div>
          </div>

          {/* Today's Farming Tasks */}
          <div className="lg:col-span-4 saas-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" /> Today's Farming Tasks
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">
                {tasks.filter(t => t.completed).length} / {tasks.length} Done
              </span>
            </div>

            <ul className="space-y-2.5 text-xs">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2.5 cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5 cursor-pointer"
                  />
                  <span className={`leading-tight font-medium ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* RECHARTS DATA VISUALIZATIONS (5 RESPONSIVE CHARTS) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Real-Time Analytics & Trends
            </h2>
            <span className="text-xs font-semibold text-slate-400">Recharts Visualization Suite</span>
          </div>

          {/* Row 1: Soil Moisture & Temperature Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Soil Moisture Trend */}
            <div className="saas-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Soil Moisture Trend</h3>
                  <p className="text-[11px] text-slate-400">7-Day Telemetry (% Moisture)</p>
                </div>
                <span className="badge-emerald">28.5% Optimal</span>
              </div>

              <div className="h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={soilMoistureData}>
                    <defs>
                      <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[15, 35]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="moisture" stroke="#16a34a" strokeWidth={2.5} fillOpacity={1} fill="url(#moistureGrad)" name="Moisture (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Temperature Trend */}
            <div className="saas-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Temperature Trend</h3>
                  <p className="text-[11px] text-slate-400">Weekly Max / Min Air Temp (°C)</p>
                </div>
                <span className="badge-slate">Avg 22.5°C</span>
              </div>

              <div className="h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureTrendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[10, 35]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="maxTemp" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} name="Max Temp (°C)" />
                    <Line type="monotone" dataKey="minTemp" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3 }} name="Min Temp (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Row 2: Weekly Rainfall, Crop Health, Market Price Trend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Chart 3: Weekly Rainfall */}
            <div className="saas-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Weekly Rainfall</h3>
                  <p className="text-[11px] text-slate-400">Precipitation (mm)</p>
                </div>
                <span className="badge-slate">12.4 mm Total</span>
              </div>

              <div className="h-56 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyRainfallData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="rainfall" fill="#0284c7" radius={[4, 4, 0, 0]} name="Rainfall (mm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Crop Health Breakdown */}
            <div className="saas-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Crop Health Breakdown</h3>
                  <p className="text-[11px] text-slate-400">Vegetation Condition (%)</p>
                </div>
                <span className="badge-emerald">92% Healthy</span>
              </div>

              <div className="h-56 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropHealthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {cropHealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 5: Market Price Trend */}
            <div className="saas-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Market Price Trend</h3>
                  <p className="text-[11px] text-slate-400">Wheat vs Rice (₹/quintal)</p>
                </div>
                <span className="badge-emerald">+4.8% Rice</span>
              </div>

              <div className="h-56 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketPriceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="Wheat" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Wheat (₹)" />
                    <Line type="monotone" dataKey="Rice" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} name="Rice (₹)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
