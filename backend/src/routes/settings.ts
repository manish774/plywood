import express from 'express';
import requireAuth from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { getSettings, updateSettings } from '../controllers/settingsController';

const router = express.Router();

router.get('/', asyncHandler(getSettings));
router.put('/', requireAuth, asyncHandler(updateSettings));

export default router;
