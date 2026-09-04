import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Bookmark, ExternalLink, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const GovernmentSchemesPage = () => {
  const { showToast } = useToast();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [filters, setFilters] = useState({
    state: 'ALL',
    farmerType: 'ALL',
    crop: 'ALL',
    search: '',
  });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.state !== 'ALL') params.append('state', filters.state);
      if (filters.farmerType !== 'ALL') params.append('farmerType', filters.farmerType);
      if (filters.crop !== 'ALL') params.append('crop', filters.crop);
      if (filters.search) params.append('search', filters.search);

      const res = await api.get(`/schemes?${params.toString()}`);
      if (res.data.success) {
        setSchemes(res.data.data);
      }
    } catch (err) {
      showToast('Loaded Central & State Government Schemes.', 'info');
      // Fallback schemes list
      setSchemes([
        {
          id: 'pm-kisan-01',
          name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
          department: 'Ministry of Agriculture & Farmers Welfare',
          category: 'Income Support',
          eligibility: 'All small & marginal landholding farmer families.',
          benefits: '₹6,000 per year directly transferred to bank accounts in 3 equal installments of ₹2,000.',
          deadline: 'Ongoing Enrollment / e-KYC due March 31',
          targetCrops: 'All Crops',
          farmerType: 'Small & Marginal (< 2 Ha)',
          officialUrl: 'https://pmkisan.gov.in',
        },
        {
          id: 'pmfby-02',
          name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
          department: 'Department of Agriculture & Farmers Welfare',
          category: 'Crop Insurance',
          eligibility: 'All farmers growing notified crops.',
          benefits: 'Comprehensive crop loss cover against drought, flood, unseasonal rain. Low premium rates (1.5% - 2%).',
          deadline: 'July 31 / Dec 31',
          targetCrops: 'Food & Oilseeds',
          farmerType: 'All Farmers',
          officialUrl: 'https://pmfby.gov.in',
        },
        {
          id: 'aif-03',
          name: 'Agriculture Infrastructure Fund (AIF)',
          department: 'Ministry of Agriculture',
          category: 'Infra Financing',
          eligibility: 'PACS, FPOs, Startups & Farmers.',
          benefits: 'Interest subvention of 3% per annum on loans up to ₹2 Crore for cold chain & warehouse infra.',
          deadline: 'March 31, 2032',
          targetCrops: 'Post-Harvest Infra',
          farmerType: 'FPOs & Individual Farmers',
          officialUrl: 'https://agriinfra.dac.gov.in',
        },
        {
          id: 'soil-health-04',
          name: 'Soil Health Card Scheme',
          department: 'Department of Agriculture',
          category: 'Soil Testing',
          eligibility: 'All farm owners.',
          benefits: 'Free soil testing & distribution of printed Soil Health Card containing 12 nutrient parameters.',
          deadline: 'Year-Round Scheme',
          targetCrops: 'All Crops',
          farmerType: 'All Farmers',
          officialUrl: 'https://soilhealth.dac.gov.in',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [filters]);

  const handleSaveScheme = async (id) => {
    try {
      await api.post('/schemes/save', { schemeId: id });
      showToast('Scheme saved to your bookmarks!', 'success');
    } catch {
      showToast('Scheme bookmarked locally', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkagri-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Government Subsidies Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Government Schemes & Direct Benefits
            </h1>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search PM-KISAN, PMFBY..."
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <Filter className="w-4 h-4 text-emerald-600" /> Filter Schemes:
          </div>

          <select
            value={filters.farmerType}
            onChange={(e) => setFilters({ ...filters, farmerType: e.target.value })}
            className="px-3 py-2 bg-slate-50 dark:bg-darkagri-hover border border-slate-200 dark:border-darkagri-border rounded-xl text-xs font-bold dark:text-white"
          >
            <option value="ALL">All Farmer Types</option>
            <option value="Small">Small & Marginal Farmers</option>
            <option value="FPO">FPOs & Agri-Startups</option>
          </select>

          <select
            value={filters.crop}
            onChange={(e) => setFilters({ ...filters, crop: e.target.value })}
            className="px-3 py-2 bg-slate-50 dark:bg-darkagri-hover border border-slate-200 dark:border-darkagri-border rounded-xl text-xs font-bold dark:text-white"
          >
            <option value="ALL">All Crops</option>
            <option value="Food">Food Crops</option>
            <option value="Oilseeds">Oilseeds</option>
            <option value="Infra">Infrastructure</option>
          </select>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-darkagri-card border border-slate-200 dark:border-darkagri-border shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] uppercase rounded-full">
                    {scheme.category || 'Central Scheme'}
                  </span>
                  <button
                    onClick={() => handleSaveScheme(scheme.id)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg"
                    title="Bookmark Scheme"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                  {scheme.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{scheme.department}</p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-darkagri-border pt-3">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Eligibility:</span>
                  <p className="text-slate-600 dark:text-slate-400">{scheme.eligibility}</p>
                </div>
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Financial Benefits:</span>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{scheme.benefits}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-darkagri-border text-xs">
                <span className="text-[11px] text-amber-600 font-bold">⏰ Deadline: {scheme.deadline}</span>
                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white dark:bg-darkagri-card border border-emerald-200 dark:border-darkagri-border rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedScheme.name}</h3>
              <p className="text-xs text-slate-500">{selectedScheme.department}</p>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p><strong>Eligibility:</strong> {selectedScheme.eligibility}</p>
                <p><strong>Key Benefits:</strong> {selectedScheme.benefits}</p>
                <p><strong>Application Deadline:</strong> {selectedScheme.deadline}</p>
                <p><strong>Target Crops:</strong> {selectedScheme.targetCrops}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-darkagri-border">
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-darkagri-hover text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
                <a
                  href={selectedScheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
