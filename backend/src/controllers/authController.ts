import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { generateOtp, otpExpiry, OTP_TTL_MINUTES } from '../utils/otp';
import { sendOtpEmail } from '../utils/mailer';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

interface RegisterBody {
  name?: string;
  email?: string;
  phone?: string;
}

interface LoginBody {
  email?: string;
}

interface VerifyOtpBody {
  email?: string;
  otp?: string | number;
}

interface ResendOtpBody {
  email?: string;
}

interface PublicUser {
  id: IUser['_id'];
  name: string;
  email: string;
  phone: string;
}

function signUserToken(user: IUser): string {
  return jwt.sign({ id: user._id, email: user.email, role: 'user' }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
}

function publicUser(user: IUser): PublicUser {
  return { id: user._id, name: user.name, email: user.email, phone: user.phone };
}

// Registration is passwordless: create the account, then send an OTP the
// user must verify (via /verify-otp) before a token is issued.
async function register(req: Request<unknown, unknown, RegisterBody>, res: Response): Promise<void> {
  const { name, email, phone } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }
  if (!phone || !phone.trim()) {
    res.status(400).json({ error: 'phone is required' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (user && user.isVerified) {
    res.status(400).json({ error: 'An account with this email already exists. Please login instead.' });
    return;
  }

  const otp = generateOtp();
  if (!user) {
    user = new User({ name, email: normalizedEmail, phone });
  } else {
    user.name = name;
    user.phone = phone;
  }
  user.otpCode = otp;
  user.otpExpiresAt = otpExpiry();
  await user.save();

  await sendOtpEmail(normalizedEmail, otp, { minutes: OTP_TTL_MINUTES });

  res.status(201).json({ message: 'OTP sent to email. Verify to complete registration.' });
}

// Login is OTP-based: request an OTP here, then verify it via /verify-otp.
async function login(req: Request<unknown, unknown, LoginBody>, res: Response): Promise<void> {
  const { email } = req.body;

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user || !user.isVerified) {
    res.status(404).json({ error: 'No verified account found for this email. Please register first.' });
    return;
  }

  const otp = generateOtp();
  user.otpCode = otp;
  user.otpExpiresAt = otpExpiry();
  await user.save();

  await sendOtpEmail(normalizedEmail, otp, { minutes: OTP_TTL_MINUTES });

  res.json({ message: 'OTP sent to email.' });
}

// Shared by both the registration and login flows.
async function verifyOtp(req: Request<unknown, unknown, VerifyOtpBody>, res: Response): Promise<void> {
  const { email, otp } = req.body;

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }
  if (!otp || !String(otp).trim()) {
    res.status(400).json({ error: 'otp is required' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+otpCode +otpExpiresAt');

  if (!user || !user.otpCode) {
    res.status(400).json({ error: 'No OTP request found for this email' });
    return;
  }
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    return;
  }
  if (String(otp).trim() !== user.otpCode) {
    res.status(400).json({ error: 'Invalid OTP' });
    return;
  }

  user.isVerified = true;
  user.otpCode = null;
  user.otpExpiresAt = null;
  await user.save();

  const token = signUserToken(user);
  res.json({ token, user: publicUser(user) });
}

async function resendOtp(req: Request<unknown, unknown, ResendOtpBody>, res: Response): Promise<void> {
  const { email } = req.body;

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404).json({ error: 'No account found for this email' });
    return;
  }

  const otp = generateOtp();
  user.otpCode = otp;
  user.otpExpiresAt = otpExpiry();
  await user.save();

  await sendOtpEmail(normalizedEmail, otp, { minutes: OTP_TTL_MINUTES });

  res.json({ message: 'OTP resent to email.' });
}

async function me(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.user?.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(publicUser(user));
}

export { register, login, verifyOtp, resendOtp, me };
