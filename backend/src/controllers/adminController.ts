import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import Admin from '../models/Admin';

interface LoginBody {
  email?: string;
  password?: string;
}

async function login(req: Request<unknown, unknown, LoginBody>, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).select('+password');
  const validPassword = admin ? await admin.comparePassword(password) : false;

  if (!admin || !validPassword) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
  res.json({ token });
}

async function listStaff(req: Request, res: Response): Promise<void> {
  const staff = await Admin.find().sort({ createdAt: -1 });
  res.json(staff);
}

interface CreateStaffBody {
  name?: string;
  email?: string;
  password?: string;
}

async function createStaff(req: Request<unknown, unknown, CreateStaffBody>, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }
  if (!password || password.length < 8) {
    res.status(400).json({ error: 'password must be at least 8 characters' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await Admin.findOne({ email: normalizedEmail });
  if (existing) {
    res.status(400).json({ error: 'A staff account with this email already exists' });
    return;
  }

  const admin = new Admin({ name, email: normalizedEmail, password });
  await admin.save();
  res.status(201).json({ _id: admin._id, name: admin.name, email: admin.email, createdAt: admin.get('createdAt') });
}

async function deleteStaff(req: Request<{ id: string }>, res: Response): Promise<void> {
  const { id } = req.params;

  if (req.admin?.id === id) {
    res.status(400).json({ error: 'You cannot remove your own staff account' });
    return;
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    res.status(404).json({ error: 'Staff account not found' });
    return;
  }

  const staffCount = await Admin.countDocuments();
  if (staffCount <= 1) {
    res.status(400).json({ error: 'Cannot remove the last remaining staff account' });
    return;
  }

  await admin.deleteOne();
  res.json({ success: true });
}

export { login, listStaff, createStaff, deleteStaff };
