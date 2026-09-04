import express from 'express';
import { getCropRecommendation } from '../controllers/cropController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/recommend', optionalAuth, getCropRecommendation);

export default router;
