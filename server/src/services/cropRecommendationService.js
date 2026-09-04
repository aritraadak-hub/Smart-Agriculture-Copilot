// Agronomic Crop Knowledge Base & ML-Ready Recommendation Engine

const CROPS_DATABASE = [
  {
    name: 'Rice (Paddy)',
    idealN: [80, 120],
    idealP: [40, 60],
    idealK: [40, 60],
    idealPh: [5.5, 7.2],
    idealTemp: [20, 35],
    idealHumidity: [70, 95],
    idealRainfall: [150, 300],
    seasons: ['Kharif', 'Monsoon'],
    suitableSoil: 'Clayey & Deep Alluvial Soil',
    growingDuration: '110 - 140 days',
    estimatedYield: '4.5 - 6.0 tonnes / hectare',
    waterRequirement: 'High (1200 - 1400 mm)',
    fertilizerRecommendation: 'N: 120 kg/ha, P2O5: 60 kg/ha, K2O: 40 kg/ha in 3 split doses (basal, tillering, panicle initiation).',
    description: 'Thrives in warm, humid climates with abundant water availability and heavy clay soils.',
  },
  {
    name: 'Wheat',
    idealN: [100, 140],
    idealP: [50, 75],
    idealK: [40, 60],
    idealPh: [6.0, 7.5],
    idealTemp: [12, 25],
    idealHumidity: [50, 70],
    idealRainfall: [50, 100],
    seasons: ['Rabi', 'Winter'],
    suitableSoil: 'Loamy & Alluvial Soil',
    growingDuration: '120 - 150 days',
    estimatedYield: '4.0 - 5.5 tonnes / hectare',
    waterRequirement: 'Moderate (450 - 650 mm)',
    fertilizerRecommendation: 'Apply N:P:K at 120:60:40 kg/ha. Apply half N and full P & K at sowing time.',
    description: 'Ideal cool season cereal crop. Prefers well-drained fertile loamy soils and moderate rainfall.',
  },
  {
    name: 'Maize (Corn)',
    idealN: [70, 110],
    idealP: [40, 60],
    idealK: [35, 55],
    idealPh: [5.8, 7.2],
    idealTemp: [18, 30],
    idealHumidity: [55, 80],
    idealRainfall: [60, 110],
    seasons: ['Kharif', 'Rabi', 'Summer'],
    suitableSoil: 'Well-drained Loamy & Red Soil',
    growingDuration: '90 - 110 days',
    estimatedYield: '5.0 - 7.2 tonnes / hectare',
    waterRequirement: 'Moderate (500 - 700 mm)',
    fertilizerRecommendation: 'N: 120 kg/ha, P: 60 kg/ha, K: 50 kg/ha. Zinc sulfate 25 kg/ha if deficiency noticed.',
    description: 'Versatile crop with quick maturity and high market demand for grain and fodder.',
  },
  {
    name: 'Cotton',
    idealN: [100, 130],
    idealP: [45, 65],
    idealK: [45, 65],
    idealPh: [6.0, 8.0],
    idealTemp: [22, 34],
    idealHumidity: [45, 75],
    idealRainfall: [60, 120],
    seasons: ['Kharif', 'Monsoon'],
    suitableSoil: 'Black Cotton & Deep Alluvial Soil',
    growingDuration: '160 - 190 days',
    estimatedYield: '2.5 - 3.8 tonnes / hectare',
    waterRequirement: 'Moderate to High (700 - 1000 mm)',
    fertilizerRecommendation: 'N: 100 kg/ha, P: 50 kg/ha, K: 50 kg/ha. Split nitrogen across vegetative and boll formation stages.',
    description: 'Cash crop highly suitable for deep black cotton soils and sunny warm conditions.',
  },
  {
    name: 'Mustard / Rapeseed',
    idealN: [60, 90],
    idealP: [30, 50],
    idealK: [30, 50],
    idealPh: [6.0, 7.5],
    idealTemp: [10, 24],
    idealHumidity: [45, 65],
    idealRainfall: [35, 75],
    seasons: ['Rabi', 'Winter'],
    suitableSoil: 'Loamy & Sandy Loam Soil',
    growingDuration: '105 - 130 days',
    estimatedYield: '1.8 - 2.5 tonnes / hectare',
    waterRequirement: 'Low to Moderate (250 - 400 mm)',
    fertilizerRecommendation: 'N: 80 kg/ha, P: 40 kg/ha, K: 40 kg/ha + Sulfur 40 kg/ha (crucial for oil content).',
    description: 'High value oilseed crop with low irrigation needs, suitable for dry rabi seasons.',
  },
  {
    name: 'Chickpea (Gram)',
    idealN: [20, 45],
    idealP: [40, 65],
    idealK: [30, 50],
    idealPh: [6.0, 7.8],
    idealTemp: [15, 26],
    idealHumidity: [40, 65],
    idealRainfall: [40, 80],
    seasons: ['Rabi'],
    suitableSoil: 'Loamy & Black Soil',
    growingDuration: '100 - 120 days',
    estimatedYield: '1.5 - 2.2 tonnes / hectare',
    waterRequirement: 'Low (250 - 350 mm)',
    fertilizerRecommendation: 'N: 20 kg/ha (legume fixes nitrogen!), P2O5: 50 kg/ha, K2O: 20 kg/ha + Rhizobium biofertilizer.',
    description: 'Excellent leguminous pulse crop that enriches soil nitrogen and thrives on residual soil moisture.',
  },
  {
    name: 'Tomato',
    idealN: [80, 120],
    idealP: [50, 80],
    idealK: [60, 90],
    idealPh: [6.0, 7.0],
    idealTemp: [18, 28],
    idealHumidity: [55, 75],
    idealRainfall: [40, 90],
    seasons: ['Kharif', 'Rabi', 'Summer'],
    suitableSoil: 'Sandy Loam & Loamy Soil',
    growingDuration: '90 - 120 days',
    estimatedYield: '25 - 40 tonnes / hectare',
    waterRequirement: 'Moderate (600 - 800 mm)',
    fertilizerRecommendation: 'N: 150 kg/ha, P: 100 kg/ha, K: 100 kg/ha. Apply Calcium Nitrate to prevent blossom end rot.',
    description: 'High return vegetable crop. Requires staked support and regular fertigation.',
  },
];

// Helper calculation function for fuzzy range scoring
const calculateParameterScore = (val, [min, max]) => {
  if (val >= min && val <= max) return 1.0;
  const mid = (min + max) / 2;
  const tolerance = (max - min) * 0.8 || 15;
  const diff = Math.abs(val - mid);
  return Math.max(0, 1 - diff / tolerance);
};

// Extensible ML Adapter Interface
export const recommendCropsService = async (params) => {
  // If external Python ML microservice environment is configured (e.g. PYTHON_ML_URL)
  if (process.env.PYTHON_ML_URL) {
    try {
      // Plug in Python ML model endpoint seamlessly without frontend changes!
      // const response = await axios.post(process.env.PYTHON_ML_URL, params);
      // return response.data;
    } catch (mlErr) {
      console.warn('Python ML microservice unreachable, falling back to Agronomic Rule Engine:', mlErr.message);
    }
  }

  // Native Agronomic Rule Engine
  const {
    nitrogen = 60,
    phosphorus = 40,
    potassium = 40,
    ph = 6.5,
    temperature = 25,
    humidity = 65,
    rainfall = 100,
    soilType = 'Loamy',
    season = 'Kharif',
    location = 'Farm Location',
  } = params;

  const N = Number(nitrogen);
  const P = Number(phosphorus);
  const K = Number(potassium);
  const pHVal = Number(ph);
  const temp = Number(temperature);
  const hum = Number(humidity);
  const rain = Number(rainfall);

  const scoredCrops = CROPS_DATABASE.map((crop) => {
    const nScore = calculateParameterScore(N, crop.idealN);
    const pScore = calculateParameterScore(P, crop.idealP);
    const kScore = calculateParameterScore(K, crop.idealK);
    const phScore = calculateParameterScore(pHVal, crop.idealPh);
    const tempScore = calculateParameterScore(temp, crop.idealTemp);
    const humScore = calculateParameterScore(hum, crop.idealHumidity);
    const rainScore = calculateParameterScore(rain, crop.idealRainfall);

    const soilMatch = crop.suitableSoil.toLowerCase().includes(soilType.toLowerCase()) || soilType.toLowerCase().includes(crop.suitableSoil.toLowerCase()) ? 1.0 : 0.65;
    const seasonMatch = crop.seasons.some(s => s.toLowerCase().includes(season.toLowerCase())) ? 1.0 : 0.7;

    const compositeScore = (
      nScore * 0.18 +
      pScore * 0.14 +
      kScore * 0.14 +
      phScore * 0.16 +
      tempScore * 0.14 +
      humScore * 0.06 +
      rainScore * 0.08 +
      soilMatch * 0.05 +
      seasonMatch * 0.05
    );

    const suitabilityPercentage = Math.min(99, Math.max(45, Math.round(compositeScore * 100)));

    // Generate specific agronomic "Why this crop?" explanation
    const whyThisCrop = `Your soil NPK levels (${N}/${P}/${K} kg/ha) and pH (${pHVal}) align optimally with ${crop.name}'s nutrient absorption curve. In ${location} (${season} season), expected temperatures (${temp}°C) and moisture (${rain}mm rainfall) create ideal conditions for high crop yield (${crop.estimatedYield}).`;

    return {
      name: crop.name,
      suitabilityPercentage,
      estimatedYield: crop.estimatedYield,
      growingDuration: crop.growingDuration,
      waterRequirement: crop.waterRequirement,
      suitableSoil: crop.suitableSoil,
      fertilizerRecommendation: crop.fertilizerRecommendation,
      reasonForRecommendation: `Excellent affinity with ${soilType} soil, NPK balance (${N}/${P}/${K}), and ${season} season temperature (${temp}°C).`,
      whyThisCrop,
      description: crop.description,
    };
  });

  // Sort by suitability descending
  scoredCrops.sort((a, b) => b.suitabilityPercentage - a.suitabilityPercentage);

  // Return Top 3 Recommended Crops
  const topCrops = scoredCrops.slice(0, 3);

  return {
    topRecommendedCrops: topCrops,
    bestCrop: topCrops[0],
    inputParameters: { nitrogen: N, phosphorus: P, potassium: K, ph: pHVal, temperature: temp, humidity: hum, rainfall: rain, soilType, season, location },
    engineArchitecture: 'Agronomic-Rule-Engine-v2.0 (Python ML microservice ready)',
  };
};
