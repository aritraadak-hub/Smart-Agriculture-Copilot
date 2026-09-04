import express from 'express';
import {
  getFarms,
  createFarm,
  getFarmById,
  updateFarm,
  deleteFarm
} from '../controllers/farmsController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getFarms);
router.post('/', optionalAuth, createFarm);
router.get('/:id', optionalAuth, getFarmById);
router.put('/:id', optionalAuth, updateFarm);
router.delete('/:id', optionalAuth, deleteFarm);

export default router;
