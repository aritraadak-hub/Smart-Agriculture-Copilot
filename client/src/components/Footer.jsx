import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Logo & Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Smart Agriculture <span className="text-emerald-400">Copilot</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering farmers with AI-driven crop recommendations, real-time soil & weather analytics, plant disease diagnosis, and commodity market price predictions.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" /> Ludhiana, Punjab
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" /> support@agricopilot.in
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider text-emerald-400">
              Product Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/crop-recommendation" className="hover:text-emerald-400 transition-colors">
                  Crop Recommendation
                </Link>
              </li>
              <li>
                <Link to="/soil-analytics" className="hover:text-emerald-400 transition-colors">
                  Soil Analytics
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="hover:text-emerald-400 transition-colors">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-emerald-400 transition-colors">
                  Weather Advisory
                </Link>
              </li>
              <li>
                <Link to="/market-prices" className="hover:text-emerald-400 transition-colors">
                  Market Prices
                </Link>
              </li>
              <li>
                <Link to="/price-prediction" className="hover:text-emerald-400 transition-colors">
                  Price Prediction
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider text-emerald-400">
              Resources & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/government-schemes" className="hover:text-emerald-400 transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link to="/my-farm" className="hover:text-emerald-400 transition-colors">
                  My Farm Profiles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <a href="#help" className="hover:text-emerald-400 transition-colors">
                  Help Center & FAQs
                </a>
              </li>
              <li>
                <a href="#apidocs" className="hover:text-emerald-400 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider text-emerald-400">
              Legal & Policy
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-emerald-400 transition-colors">
                  Agricultural Disclaimer
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-emerald-400 transition-colors">
                  Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smart Agriculture Copilot. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Farmers
          </p>
        </div>
      </div>
    </footer>
  );
};
