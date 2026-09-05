import express from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { requireUserAuth } from '../middleware/userAuth';
import { register, login, verifyOtp, resendOtp, me } from '../controllers/authController';

const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/verify-otp', asyncHandler(verifyOtp));
router.post('/resend-otp', asyncHandler(resendOtp));
router.get('/me', requireUserAuth, asyncHandler(me));

export default router;
