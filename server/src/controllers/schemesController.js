const GOVERNMENT_SCHEMES = [
  {
    id: 'pm-kisan-01',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    department: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    category: 'Central Sector Scheme',
    eligibility: 'All small & marginal landholding farmer families across India holding cultivable land in their names.',
    benefits: '₹6,000 per year directly transferred to bank accounts in 3 equal installments of ₹2,000 every 4 months.',
    deadline: 'Ongoing Enrollment / e-KYC due March 31',
    targetCrops: 'All Crops',
    farmerType: 'Small & Marginal Farmers (< 2 Hectares)',
    state: 'All India',
    officialUrl: 'https://pmkisan.gov.in',
    description: 'Income support scheme providing financial assistance to supplement agricultural input expenses and domestic needs.',
  },
  {
    id: 'pmfby-02',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    department: 'Department of Agriculture, Cooperation & Farmers Welfare',
    category: 'Crop Insurance Scheme',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.',
    benefits: 'Comprehensive crop loss cover against non-preventable natural risks (drought, flood, unseasonal rain, pest outbreak). Low premium rates: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops.',
    deadline: 'July 31 for Kharif / Dec 31 for Rabi',
    targetCrops: 'Food crops, Oilseeds, Commercial & Horticultural crops',
    farmerType: 'All Farmers',
    state: 'All India',
    officialUrl: 'https://pmfby.gov.in',
    description: 'Yield-based index insurance covering complete crop cycle from pre-sowing to post-harvest losses.',
  },
  {
    id: 'aif-03',
    name: 'Agriculture Infrastructure Fund (AIF)',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Financial Infrastructure Credit',
    eligibility: 'Primary Agricultural Credit Societies (PACS), FPOs, Agri-entrepreneurs, Startups, Individual Farmers.',
    benefits: 'Interest subvention of 3% per annum on bank loans up to ₹2 Crore for up to 7 years. Credit guarantee coverage under CGTMSE scheme.',
    deadline: 'March 31, 2032',
    targetCrops: 'Post-harvest & Cold Chain Infra',
    farmerType: 'FPOs, Agri Startups & Individual Farmers',
    state: 'All India',
    officialUrl: 'https://agriinfra.dac.gov.in',
    description: 'Medium to long term debt financing facility for investment in viable post-harvest management infrastructure and community farming assets.',
  },
  {
    id: 'soil-health-04',
    name: 'Soil Health Card Scheme',
    department: 'Department of Agriculture & Farmers Welfare',
    category: 'Soil Testing & Nutrient Management',
    eligibility: 'All farm owners across India.',
    benefits: 'Free soil testing & distribution of printed Soil Health Card every 3 years containing soil nutrient status (12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) + customized fertilizer dosage advisories.',
    deadline: 'Year-Round Active Scheme',
    targetCrops: 'All Crops',
    farmerType: 'All Farmers',
    state: 'All India',
    officialUrl: 'https://soilhealth.dac.gov.in',
    description: 'Assists farmers to improve soil productivity through balanced judicious application of fertilizers.',
  },
  {
    id: 'smam-05',
    name: 'SMAM (Sub-Mission on Agricultural Mechanization)',
    department: 'Ministry of Agriculture, Govt of India',
    category: 'Farm Machinery Subsidy',
    eligibility: 'Small, marginal farmers, women farmers, SC/ST farmers & Custom Hiring Centers (CHCs).',
    benefits: '40% to 50% capital subsidy on purchase of agricultural equipment (tractors, happy seeders, rotavators, laser land levelers, drones). Up to 80% subsidy for setting up Custom Hiring Centers.',
    deadline: 'Annual State Allocation (Check portal for active cycles)',
    targetCrops: 'Mechanized Farming Equipment',
    farmerType: 'Small, Marginal & SC/ST Farmers',
    state: 'All India',
    officialUrl: 'https://agrimachinery.nic.in',
    description: 'Increases reach of farm mechanization to small landholders and reduces labor cost.',
  },
  {
    id: 'pmksy-06',
    name: 'PMKSY - Per Drop More Crop (Micro Irrigation)',
    department: 'Ministry of Jal Shakti & Ministry of Agriculture',
    category: 'Irrigation Technology',
    eligibility: 'Farmers having cultivable land with assured water source.',
    benefits: '55% subsidy for small/marginal farmers and 45% for other farmers on installation of Drip & Sprinkler irrigation systems.',
    deadline: 'Ongoing State Quotas',
    targetCrops: 'Horticulture, Cotton, Sugarcane, Maize, Vegetables',
    farmerType: 'All Farmers',
    state: 'All India',
    officialUrl: 'https://pmksy.gov.in',
    description: 'Focuses on water use efficiency at farm level through precision micro-irrigation systems.',
  },
];

export const getSchemes = async (req, res, next) => {
  try {
    const { state, farmerType, crop, search } = req.query;

    let schemes = [...GOVERNMENT_SCHEMES];

    if (state && state !== 'ALL') {
      schemes = schemes.filter(s => s.state === 'All India' || s.state.toLowerCase() === state.toLowerCase());
    }
    if (farmerType && farmerType !== 'ALL') {
      schemes = schemes.filter(s => s.farmerType.toLowerCase().includes(farmerType.toLowerCase()) || s.farmerType.includes('All Farmers'));
    }
    if (crop && crop !== 'ALL') {
      schemes = schemes.filter(s => s.targetCrops.toLowerCase().includes(crop.toLowerCase()) || s.targetCrops.includes('All Crops'));
    }
    if (search) {
      const q = search.toLowerCase();
      schemes = schemes.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      data: schemes,
      totalCount: schemes.length,
    });
  } catch (error) {
    next(error);
  }
};

export const saveScheme = async (req, res, next) => {
  try {
    const { schemeId } = req.body;
    res.json({
      success: true,
      message: `Scheme ${schemeId} saved to your bookmarks successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
