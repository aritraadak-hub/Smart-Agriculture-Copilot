import express from 'express';
import { getPrices, getPricePrediction } from '../controllers/marketController.js';

const router = express.Router();

router.get('/', getPrices);
router.get('/predict', getPricePrediction);

export default router;
