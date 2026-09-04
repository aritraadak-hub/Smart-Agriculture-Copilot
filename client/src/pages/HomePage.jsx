import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  TrendingUp,
  Mic,
  Sun,
  ShieldAlert,
  Search,
  BookOpen,
  PieChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Droplets,
  Layers,
  Star,
  Award
} from 'lucide-react';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 dark:border-darkagri-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Next-Gen Smart AgTech SaaS Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Smarter Farming. <br />
                <span className="text-emerald-600 dark:text-emerald-400">
                  Better Harvests.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                AI-powered farming intelligence for crop recommendations, real-time soil & weather analytics, plant disease diagnosis, and AGMARKNET price forecasting.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/crop-recommendation"
                  className="w-full sm:w-auto saas-button-primary px-7 py-3.5 text-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto saas-button-secondary px-7 py-3.5 text-sm"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Explore Dashboard</span>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Setup
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multilingual Support
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> SIH 2026 Ready
                </span>
              </div>
            </div>

            {/* Right Hero Preview Card */}
            <div className="lg:col-span-5">
              <div className="saas-card p-6 shadow-saas-lg space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-darkagri-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Field Telemetry</h3>
                      <p className="text-xs text-slate-400">Khanna Block A (12.5 Acres)</p>
                    </div>
                  </div>
                  <span className="badge-emerald">Optimal 92%</span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Soil Moisture</span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">28.5%</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Ideal Range</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">NPK Balance</span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">Optimal</p>
                    <span className="text-[10px] text-slate-500">N:42 P:18 K:165</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Local Weather</span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">28°C</p>
                    <span className="text-[10px] text-slate-500">Partly Cloudy</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-darkagri-hover rounded-xl border border-slate-200/80 dark:border-darkagri-border space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Wheat Price</span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">₹2,380</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+5.2% Surge</span>
                  </div>
                </div>

                {/* Copilot Advisory */}
                <div className="p-4 bg-emerald-900 text-white rounded-xl text-xs space-y-1 border border-emerald-800">
                  <div className="flex items-center justify-between font-bold">
                    <span>🤖 Copilot Advisory</span>
                    <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded text-emerald-300">Rabi Season</span>
                  </div>
                  <p className="text-emerald-100 leading-relaxed text-[11px]">
                    Soil nitrogen level is optimal for Wheat tiller development. Plan second split dose of Urea before Wednesday rain.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 HIGHLIGHTED CARDS */}
      <section className="py-16 bg-white dark:bg-darkagri-card border-b border-slate-200/80 dark:border-darkagri-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="saas-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-time Soil & Weather Analytics</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-medium">
                Connect IoT soil sensors or enter manual parameters to monitor NPK, soil pH, moisture levels, and live micro-climate forecasts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="saas-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Market Price Prediction</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-medium">
                Track live AGMARKNET mandi rates and utilize AI time-series models to forecast 7, 15, and 30-day price trends to maximize profits.
              </p>
            </div>

            {/* Card 3 */}
            <div className="saas-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multilingual Voice Support</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-medium">
                Ask farming queries in English, Hindi (हिंदी), or Bengali (বাংলা). Our speech synthesis copilot provides hands-free audio advice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS BANNER */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">50+</p>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Supported Crops</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">Real-Time</p>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Weather & Advisory</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">100+</p>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Mandi Locations</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">3</p>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Languages (EN, HI, BN)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 FEATURE CARDS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Enterprise Agriculture Suite
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Everything a Farmer Needs in One Platform
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
            Modular tools designed for precision agronomy, crop protection, smart financial decisions, and government assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="saas-card p-6 space-y-2">
            <Sprout className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Crop Recommendation</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Input soil NPK, pH, season, and rainfall to receive machine learning crop suitability matches with expected yields.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="saas-card p-6 space-y-2">
            <Layers className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Soil Analysis</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Determine soil fertility scores, view nutrient deficiency warnings, and get exact fertilizer dosage calculations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="saas-card p-6 space-y-2">
            <Sun className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Weather Forecast</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              7-day microclimate forecasting with rain probability and automated field spray/irrigation advisories.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="saas-card p-6 space-y-2">
            <ShieldAlert className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Plant Disease Detection</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Upload leaf photos to identify fungal, bacterial, or pest damage instantly with organic and chemical treatment guides.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="saas-card p-6 space-y-2">
            <Search className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Market Price Tracking</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Compare live minimum, maximum, and modal mandi rates across neighboring states and districts.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="saas-card p-6 space-y-2">
            <TrendingUp className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Market Price Prediction</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Forecasting models generate Buy/Sell/Hold recommendations for 7, 15, and 30-day windows.
            </p>
          </div>

          {/* Feature 7 */}
          <div className="saas-card p-6 space-y-2">
            <Droplets className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Precision Farming</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Schedule drip fertigation cycles, monitor field water stress, and save input operational costs.
            </p>
          </div>

          {/* Feature 8 */}
          <div className="saas-card p-6 space-y-2">
            <BookOpen className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Government Schemes</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Explore PM-KISAN, PMFBY, AIF, and SMAM subsidies filtered by state, landholding, and crop type.
            </p>
          </div>

          {/* Feature 9 */}
          <div className="saas-card p-6 space-y-2">
            <PieChart className="w-7 h-7 text-emerald-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Farmer Analytics</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Consolidated dashboard tracking farm health scores, crop growth timelines, tasks, and advisory alerts.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-darkagri-card border-y border-slate-200/80 dark:border-darkagri-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Simple Workflow
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="saas-card p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Enter Farm & Soil Data</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Provide NPK values, soil pH, moisture, location, or connect IoT sensor telemetry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="saas-card p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Analyzes Conditions</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Algorithms evaluate climate data, historical yield patterns, disease risk, and market rates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="saas-card p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Receive Actionable Insights</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Get crop match suggestions, fertilizer dosage formulas, disease cure steps, and ideal sell dates.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Farmer Impact
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Trusted by Progressive Farmers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="saas-card p-6 space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic font-medium">
              "The market price prediction tool saved my wheat harvest! I held my inventory for 12 extra days as recommended by the AI and sold at ₹2,450/quintal."
            </p>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Gurpreet Singh</h5>
              <p className="text-[11px] text-slate-400">Ludhiana, Punjab • 15 Acres</p>
            </div>
          </div>

          <div className="saas-card p-6 space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic font-medium">
              "The leaf photo disease scanner diagnosed Tomato Early Blight in less than 5 seconds. Following the recommended neem spray cured the crop completely."
            </p>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Subhash Patil</h5>
              <p className="text-[11px] text-slate-400">Nashik, Maharashtra • 8 Acres</p>
            </div>
          </div>

          <div className="saas-card p-6 space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic font-medium">
              "Hindi voice assistant makes it so easy to get answers while working directly in the field. I just tap the mic and get weather and fertilizer advice."
            </p>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Ramchandra Yadav</h5>
              <p className="text-[11px] text-slate-400">Karnal, Haryana • 10 Acres</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-2xl bg-emerald-900 text-white text-center space-y-6 shadow-saas-lg border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black">Transform Your Farm With AI</h2>
            <p className="text-emerald-100 text-xs leading-relaxed">
              Join thousands of Indian farmers using data-driven intelligence for healthier crops and higher profits.
            </p>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-emerald-900 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-all shadow-sm"
              >
                <span>Register Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};
