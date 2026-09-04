import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationsController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getNotifications);
router.patch('/read/:id', optionalAuth, markAsRead);

export default router;
