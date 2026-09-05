import express from 'express';
import asyncHandler from '../middleware/asyncHandler';
import requireAuth from '../middleware/auth';
import { login, listStaff, createStaff, deleteStaff } from '../controllers/adminController';

const router = express.Router();

router.post('/login', asyncHandler(login));
router.get('/staff', requireAuth, asyncHandler(listStaff));
router.post('/staff', requireAuth, asyncHandler(createStaff));
router.delete('/staff/:id', requireAuth, asyncHandler(deleteStaff));

export default router;
