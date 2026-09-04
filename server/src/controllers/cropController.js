import { recommendCropsService } from '../services/cropRecommendationService.js';
import { prisma } from '../utils/prisma.js';

export const getCropRecommendation = async (req, res, next) => {
  try {
    const {
      nitrogen,
      phosphorus,
      potassium,
      ph,
      temperature,
      humidity,
      rainfall,
      soilType,
      season,
      location,
    } = req.body;

    const recommendationResult = await recommendCropsService({
      nitrogen,
      phosphorus,
      potassium,
      ph,
      temperature,
      humidity,
      rainfall,
      soilType,
      season,
      location,
    });

    if (req.user && prisma) {
      try {
        await prisma.cropRecommendation.create({
          data: {
            userId: req.user.id,
            nitrogen: Number(nitrogen) || 0,
            phosphorus: Number(phosphorus) || 0,
            potassium: Number(potassium) || 0,
            ph: Number(ph) || 0,
            temperature: Number(temperature) || 0,
            humidity: Number(humidity) || 0,
            rainfall: Number(rainfall) || 0,
            soilType: soilType || 'Loamy',
            season: season || 'Kharif',
            location: location || 'Punjab',
            results: recommendationResult,
          },
        });
      } catch (dbErr) {
        console.warn('Prisma crop recommendation record skipped (standalone mode):', dbErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Crop recommendations generated successfully',
      data: recommendationResult,
    });
  } catch (error) {
    next(error);
  }
};
