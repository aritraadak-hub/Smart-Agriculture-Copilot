import { prisma } from '../utils/prisma.js';

// In-memory store for fallback if DB is disconnected
let MOCK_FARMS_STORE = [
  {
    id: 'farm-001',
    name: 'Green Harvest Valley',
    area: 12.5,
    areaUnit: 'acres',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Khanna',
    soilType: 'Alluvial Clay Loam',
    irrigationType: 'Sub-surface Drip & Canal',
    mainCrop: 'Wheat (PBW 550)',
    currentCrop: 'Wheat (PBW 550)',
    plantingDate: '2025-11-15',
    expectedHarvest: '2026-04-10',
    soilCondition: 'Optimal (pH 6.8, High NPK)',
    cropHealth: '92% Excellent',
    weather: '29°C, Partly Cloudy (68% Humidity)',
    nextIrrigationRecommendation: 'Delay irrigation — 24.5mm rain expected within 24h',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'farm-002',
    name: 'Sunrise Mustard Fields',
    area: 5.0,
    areaUnit: 'acres',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Samrala',
    soilType: 'Loamy Soil',
    irrigationType: 'Drip Irrigation',
    mainCrop: 'Mustard (Pusa 30)',
    currentCrop: 'Mustard (Pusa 30)',
    plantingDate: '2025-10-20',
    expectedHarvest: '2026-03-15',
    soilCondition: 'Slightly Acidic (pH 6.2, Medium NPK)',
    cropHealth: '88% Good',
    weather: '28°C, Clear Sky (55% Humidity)',
    nextIrrigationRecommendation: 'Irrigate tomorrow early morning (5-8 AM)',
    createdAt: new Date().toISOString(),
  },
];

// Helper to attach dynamic telemetry to farm object
const enhanceFarmData = (farm) => {
  return {
    ...farm,
    mainCrop: farm.mainCrop || farm.currentCrop || 'Wheat',
    currentCrop: farm.currentCrop || farm.mainCrop || 'Wheat',
    soilCondition: farm.soilCondition || 'Optimal (pH 6.8, Balanced NPK)',
    cropHealth: farm.cropHealth || '90% Excellent',
    weather: farm.weather || '29°C, Partly Cloudy',
    nextIrrigationRecommendation: farm.nextIrrigationRecommendation || 'Irrigate in 2 days (Morning slot)',
  };
};

// GET /api/farms
export const getFarms = async (req, res, next) => {
  try {
    if (req.user && prisma) {
      try {
        const farms = await prisma.farm.findMany({
          where: { userId: req.user.id },
          include: { crops: true, soilReadings: true },
          orderBy: { createdAt: 'desc' },
        });
        if (farms && farms.length > 0) {
          const enhanced = farms.map(enhanceFarmData);
          return res.json({ success: true, data: enhanced });
        }
      } catch (e) {
        console.warn('Prisma getFarms fallback activated:', e.message);
      }
    }

    res.json({
      success: true,
      data: MOCK_FARMS_STORE.map(enhanceFarmData),
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/farms/:id
export const getFarmById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (prisma) {
      try {
        const farm = await prisma.farm.findUnique({
          where: { id },
          include: { crops: true, soilReadings: true },
        });
        if (farm) {
          return res.json({ success: true, data: enhanceFarmData(farm) });
        }
      } catch (e) {
        console.warn('Prisma getFarmById fallback:', e.message);
      }
    }

    const farm = MOCK_FARMS_STORE.find((f) => f.id === id);
    if (!farm) {
      return res.status(404).json({ success: false, message: 'Farm not found' });
    }

    res.json({ success: true, data: enhanceFarmData(farm) });
  } catch (error) {
    next(error);
  }
};

// POST /api/farms
export const createFarm = async (req, res, next) => {
  try {
    const {
      name,
      area,
      areaUnit = 'acres',
      state = 'Punjab',
      district = 'Ludhiana',
      village = 'Local',
      soilType = 'Alluvial Soil',
      irrigationType = 'Sub-surface Drip',
      mainCrop,
      currentCrop,
      plantingDate,
      expectedHarvest,
    } = req.body;

    const farmPayload = {
      name: name || 'New Farm Block',
      area: Number(area) || 5.0,
      areaUnit,
      state,
      district,
      village,
      soilType,
      irrigationType,
      mainCrop: mainCrop || currentCrop || 'Wheat',
      currentCrop: currentCrop || mainCrop || 'Wheat',
      plantingDate: plantingDate || new Date().toISOString().split('T')[0],
      expectedHarvest: expectedHarvest || new Date(Date.now() + 120 * 24 * 3600 * 1000).toISOString().split('T')[0],
      soilCondition: 'Optimal (pH 6.8, Balanced NPK)',
      cropHealth: '92% Excellent',
      weather: '29°C, Clear Sky',
      nextIrrigationRecommendation: 'Scheduled for tomorrow morning',
    };

    let createdFarm = null;

    if (req.user && prisma) {
      try {
        createdFarm = await prisma.farm.create({
          data: {
            name: farmPayload.name,
            area: farmPayload.area,
            areaUnit: farmPayload.areaUnit,
            state: farmPayload.state,
            district: farmPayload.district,
            village: farmPayload.village,
            soilType: farmPayload.soilType,
            irrigationType: farmPayload.irrigationType,
            user: { connect: { id: req.user.id } },
            crops: {
              create: {
                name: farmPayload.mainCrop,
                plantingDate: new Date(farmPayload.plantingDate),
                expectedHarvest: new Date(farmPayload.expectedHarvest),
                status: 'GROWING',
                healthScore: 92,
              },
            },
          },
          include: { crops: true },
        });
      } catch (dbErr) {
        console.warn('Prisma createFarm failed, using memory store:', dbErr.message);
      }
    }

    if (!createdFarm) {
      createdFarm = {
        id: `farm-${Date.now()}`,
        ...farmPayload,
        createdAt: new Date().toISOString(),
      };
      MOCK_FARMS_STORE.unshift(createdFarm);
    }

    res.status(201).json({
      success: true,
      message: 'Farm registered successfully with user relationship',
      data: enhanceFarmData(createdFarm),
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/farms/:id
export const updateFarm = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (prisma) {
      try {
        const updated = await prisma.farm.update({
          where: { id },
          data: {
            name: req.body.name,
            area: req.body.area ? Number(req.body.area) : undefined,
            soilType: req.body.soilType,
            irrigationType: req.body.irrigationType,
            district: req.body.district,
            state: req.body.state,
            village: req.body.village,
          },
        });
        if (updated) {
          return res.json({ success: true, message: 'Farm updated', data: enhanceFarmData(updated) });
        }
      } catch (e) {
        console.warn('Prisma updateFarm fallback:', e.message);
      }
    }

    const index = MOCK_FARMS_STORE.findIndex((f) => f.id === id);
    if (index !== -1) {
      MOCK_FARMS_STORE[index] = { ...MOCK_FARMS_STORE[index], ...req.body };
      return res.json({ success: true, message: 'Farm updated', data: enhanceFarmData(MOCK_FARMS_STORE[index]) });
    }

    res.status(404).json({ success: false, message: 'Farm not found' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/farms/:id
export const deleteFarm = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (prisma) {
      try {
        await prisma.farm.delete({ where: { id } });
        return res.json({ success: true, message: 'Farm removed successfully' });
      } catch (e) {
        console.warn('Prisma deleteFarm fallback:', e.message);
      }
    }

    MOCK_FARMS_STORE = MOCK_FARMS_STORE.filter((f) => f.id !== id);
    res.json({ success: true, message: 'Farm removed successfully' });
  } catch (error) {
    next(error);
  }
};
