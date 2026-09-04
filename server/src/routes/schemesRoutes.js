import express from 'express';
import { getSchemes, saveScheme } from '../controllers/schemesController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSchemes);
router.post('/save', optionalAuth, saveScheme);

export default router;
