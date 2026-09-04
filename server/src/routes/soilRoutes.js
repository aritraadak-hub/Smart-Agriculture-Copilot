import express from 'express';
import {
  getSoilAnalysis,
  createSoilReading,
  getSoilReadingsByFarm
} from '../controllers/soilController.js';

const router = express.Router();

router.get('/', getSoilAnalysis);
router.post('/readings', createSoilReading);
router.get('/readings/:farmId', getSoilReadingsByFarm);

export default router;
