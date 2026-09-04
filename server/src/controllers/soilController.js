import { prisma } from '../utils/prisma.js';

// In-memory fallback history store for standalone demo mode
const inMemoryReadings = {};

// Helper: Calculate statuses & recommendations for all 6 metrics
export const calculateSoilHealth = (nitrogen, phosphorus, potassium, ph, moisture, temperature) => {
  const N = Number(nitrogen);
  const P = Number(phosphorus);
  const K = Number(potassium);
  const pHVal = Number(ph);
  const M = Number(moisture);
  const T = Number(temperature);

  // Status mapping
  const statusN = N < 40 ? 'Low' : N > 120 ? 'Excess' : 'Optimal';
  const statusP = P < 20 ? 'Low' : P > 60 ? 'Excess' : 'Optimal';
  const statusK = K < 120 ? 'Low' : K > 250 ? 'Excess' : 'Optimal';
  
  let statusPh = 'Optimal Neutral';
  if (pHVal < 5.5) statusPh = 'Acidic';
  else if (pHVal < 6.5) statusPh = 'Slightly acidic';
  else if (pHVal > 7.8) statusPh = 'Alkaline';

  const statusM = M < 30 ? 'Low' : M > 70 ? 'High' : 'Optimal';
  const statusT = T < 15 ? 'Low' : T > 35 ? 'High' : 'Optimal';

  // Fertility Score (0-100)
  let score = 90;
  if (statusN === 'Low') score -= 15;
  if (statusP === 'Low') score -= 12;
  if (statusK === 'Low') score -= 10;
  if (statusPh !== 'Optimal Neutral') score -= 10;
  if (statusM === 'Low') score -= 15;
  if (statusM === 'High') score -= 8;

  const scoreClamped = Math.max(20, Math.min(100, score));

  // Automatic Recommendations Generator
  const recommendations = [];

  if (statusN === 'Low') {
    recommendations.push({
      metric: 'Nitrogen (N)',
      status: 'Low',
      category: 'Fertilizer Application',
      action: 'Apply Nitrogen-rich fertilizer such as Urea (46% N) at 45-50 kg/acre or Neem-Coated Urea.',
    });
  } else if (statusN === 'Excess') {
    recommendations.push({
      metric: 'Nitrogen (N)',
      status: 'Excess',
      category: 'Soil Management',
      action: 'Avoid further nitrogen applications. High nitrogen leads to excessive vegetative growth and pest vulnerability.',
    });
  }

  if (statusP === 'Low') {
    recommendations.push({
      metric: 'Phosphorus (P)',
      status: 'Low',
      category: 'Fertilizer Application',
      action: 'Apply Single Super Phosphate (SSP) or DAP (Di-Ammonium Phosphate) during basal land preparation.',
    });
  }

  if (statusK === 'Low') {
    recommendations.push({
      metric: 'Potassium (K)',
      status: 'Low',
      category: 'Fertilizer Application',
      action: 'Apply Muriate of Potash (MOP - 60% K2O) to boost root vigor, crop stem strength, and drought resilience.',
    });
  }

  if (statusPh === 'Acidic' || statusPh === 'Slightly acidic') {
    recommendations.push({
      metric: 'Soil pH',
      status: statusPh,
      category: 'Soil Amendment',
      action: 'Apply agricultural lime (calcium carbonate) or wood ash at 150-200 kg/acre to neutralize acidity and raise pH to 6.5.',
    });
  } else if (statusPh === 'Alkaline') {
    recommendations.push({
      metric: 'Soil pH',
      status: 'Alkaline',
      category: 'Soil Amendment',
      action: 'Apply agricultural gypsum (calcium sulfate) or elemental sulfur to decrease alkalinity and improve nutrient availability.',
    });
  }

  if (statusM === 'Low') {
    recommendations.push({
      metric: 'Soil Moisture',
      status: 'Low',
      category: 'Irrigation',
      action: 'Initiate drip or micro-sprinkler irrigation immediately. Moisture level is below the optimal 35% growth threshold.',
    });
  } else if (statusM === 'High') {
    recommendations.push({
      metric: 'Soil Moisture',
      status: 'High',
      category: 'Irrigation & Drainage',
      action: 'Pause irrigation and inspect field drainage channels to prevent soil compaction and root rot.',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      metric: 'Overall Soil Health',
      status: 'Optimal',
      category: 'Maintenance',
      action: 'Soil parameters are well balanced! Continue applying organic farmyard manure to maintain soil microbiota.',
    });
  }

  return {
    fertilityScore: scoreClamped,
    soilHealthIndicator: scoreClamped > 80 ? 'Excellent' : scoreClamped > 60 ? 'Good' : 'Needs Attention',
    metrics: {
      nitrogen: { value: N, unit: 'kg/ha', status: statusN },
      phosphorus: { value: P, unit: 'kg/ha', status: statusP },
      potassium: { value: K, unit: 'kg/ha', status: statusK },
      ph: { value: pHVal, unit: 'pH scale', status: statusPh },
      moisture: { value: M, unit: '%' },
      temperature: { value: T, unit: '°C' },
    },
    recommendations,
  };
};

// GET /api/soil
export const getSoilAnalysis = async (req, res, next) => {
  try {
    const { nitrogen = 42, phosphorus = 18, potassium = 165, ph = 6.4, moisture = 28.5, temperature = 24.2 } = req.query;
    const analysis = calculateSoilHealth(nitrogen, phosphorus, potassium, ph, moisture, temperature);

    res.json({
      success: true,
      data: {
        ...analysis,
        iotSensorStatus: 'Active - Transmitting Telemetry every 15 min',
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/soil/readings
export const createSoilReading = async (req, res, next) => {
  try {
    const {
      farmId = 'demo-farm-01',
      userId,
      moisture,
      temperature,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      source = 'IoT Sensor Node'
    } = req.body;

    const readingData = {
      farmId,
      moisture: Number(moisture || 48),
      temperature: Number(temperature || 26),
      nitrogen: Number(nitrogen || 70),
      phosphorus: Number(phosphorus || 42),
      potassium: Number(potassium || 51),
      ph: Number(ph || 6.4),
      recordedAt: new Date(),
      source,
    };

    let savedReading = null;

    try {
      if (prisma.soilReading) {
        savedReading = await prisma.soilReading.create({
          data: {
            ...readingData,
            user: userId ? { connect: { id: userId } } : undefined,
          },
        });
      }
    } catch (err) {
      console.warn('DB record creation skipped, using in-memory fallback store:', err.message);
    }

    if (!savedReading) {
      savedReading = { id: `reading-${Date.now()}`, ...readingData };
      if (!inMemoryReadings[farmId]) {
        inMemoryReadings[farmId] = [];
      }
      inMemoryReadings[farmId].push(savedReading);
    }

    // Compute live health & automatic recommendations for response
    const health = calculateSoilHealth(
      readingData.nitrogen,
      readingData.phosphorus,
      readingData.potassium,
      readingData.ph,
      readingData.moisture,
      readingData.temperature
    );

    res.status(201).json({
      success: true,
      message: 'IoT sensor soil reading recorded successfully',
      data: {
        reading: savedReading,
        health,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/soil/readings/:farmId
export const getSoilReadingsByFarm = async (req, res, next) => {
  try {
    const { farmId } = req.params;

    let history = [];

    try {
      if (prisma.soilReading) {
        history = await prisma.soilReading.findMany({
          where: { farmId },
          orderBy: { recordedAt: 'asc' },
          take: 30,
        });
      }
    } catch (err) {
      console.warn('DB history lookup skipped, serving memory or generated historical telemetry:', err.message);
    }

    if ((!history || history.length === 0) && inMemoryReadings[farmId]) {
      history = inMemoryReadings[farmId];
    }

    // Fallback historical telemetry generator for rich charts
    if (!history || history.length === 0) {
      const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      history = dates.map((day, idx) => ({
        id: `hist-${idx}`,
        farmId,
        day,
        moisture: Number((32 + Math.sin(idx) * 8).toFixed(1)),
        temperature: Number((24 + Math.cos(idx) * 3).toFixed(1)),
        nitrogen: Math.round(55 + Math.sin(idx) * 15),
        phosphorus: Math.round(35 + Math.cos(idx) * 8),
        potassium: Math.round(160 + Math.sin(idx) * 20),
        ph: Number((6.3 + (idx * 0.05)).toFixed(1)),
        recordedAt: new Date(Date.now() - (6 - idx) * 86400000).toISOString(),
      }));
    }

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
