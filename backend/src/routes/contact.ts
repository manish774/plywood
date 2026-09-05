import express from 'express';
import requireAuth from '../middleware/auth';
import { requireUserAuth, attachUserIfPresent } from '../middleware/userAuth';
import asyncHandler from '../middleware/asyncHandler';
import {
  createContact,
  listContacts,
  listMyContacts,
  acknowledgeContact,
} from '../controllers/contactController';

const router = express.Router();

router.post('/', attachUserIfPresent, asyncHandler(createContact));
router.get('/mine', requireUserAuth, asyncHandler(listMyContacts));
router.get('/', requireAuth, asyncHandler(listContacts));
router.put('/:id/acknowledge', requireAuth, asyncHandler(acknowledgeContact));

export default router;
