import { predictDiseaseService } from '../services/diseaseDetectionService.js';
import { prisma } from '../utils/prisma.js';

export const analyzePlantDisease = async (req, res, next) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.imageUrl || '/uploads/sample_leaf.jpg');

    const result = await predictDiseaseService(imageUrl);

    if (req.user && prisma) {
      try {
        await prisma.diseaseDetection.create({
          data: {
            userId: req.user.id,
            imageUrl,
            diseaseName: result.diseaseName,
            plantName: result.plantName,
            confidence: result.confidence,
            symptoms: result.symptoms,
            causes: result.causes,
            treatments: [result.recommendedTreatment, result.organicTreatment, result.chemicalTreatment],
            prevention: result.preventionTips,
            severity: result.severity,
          },
        });
      } catch (dbErr) {
        console.warn('Prisma disease record save skipped (standalone mode):', dbErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Plant leaf disease analyzed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
