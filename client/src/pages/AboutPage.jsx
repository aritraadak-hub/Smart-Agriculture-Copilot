import React from 'react';
import { Sprout, Award, ShieldCheck, Cpu, Code2, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* About Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Smart India Hackathon & AgTech Innovation Edition</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Smart Agriculture <span className="text-emerald-600">Copilot</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            A comprehensive, deployment-ready smart farming intelligence platform providing real-time soil & weather analytics, AI crop suitability recommendations, plant disease diagnosis, and AGMARKNET price forecasting.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border shadow-sm space-y-3">
            <Code2 className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Modern Frontend Stack</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              React.js + Vite, Tailwind CSS, Lucide React icons, Recharts visualization, Web Speech API voice copilot in EN, HI, BN.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border shadow-sm space-y-3">
            <Cpu className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Modular AI/ML Backend</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Node.js + Express REST API with TensorFlow / PyTorch microservice abstraction layers for crop and disease inference.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border shadow-sm space-y-3">
            <Database className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">PostgreSQL & Prisma ORM</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Relational schemas for Users, Farms, Crops, Soil Readings, Disease Detections, Market Prices, Notifications, and Schemes.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
