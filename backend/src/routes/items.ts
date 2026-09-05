import express from 'express';
import requireAuth from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = express.Router();

router.get('/', asyncHandler(listItems));
router.get('/:id', asyncHandler(getItem));
router.post('/', requireAuth, asyncHandler(createItem));
router.put('/:id', requireAuth, asyncHandler(updateItem));
router.delete('/:id', requireAuth, asyncHandler(deleteItem));

export default router;
