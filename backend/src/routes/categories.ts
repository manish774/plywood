import express from 'express';
import requireAuth from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', asyncHandler(listCategories));
router.get('/:id', asyncHandler(getCategory));
router.post('/', requireAuth, asyncHandler(createCategory));
router.put('/:id', requireAuth, asyncHandler(updateCategory));
router.delete('/:id', requireAuth, asyncHandler(deleteCategory));

export default router;
