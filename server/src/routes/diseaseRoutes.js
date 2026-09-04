import express from 'express';
import multer from 'multer';
import path from 'path';
import { analyzePlantDisease } from '../controllers/diseaseController.js';
import { optionalAuth } from '../middleware/auth.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'leaf-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const router = express.Router();

router.post('/predict', optionalAuth, upload.single('image'), analyzePlantDisease);

export default router;
