const express = require('express');
const requireAuth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', asyncHandler(listCategories));
router.get('/:id', asyncHandler(getCategory));
router.post('/', requireAuth, asyncHandler(createCategory));
router.put('/:id', requireAuth, asyncHandler(updateCategory));
router.delete('/:id', requireAuth, asyncHandler(deleteCategory));

module.exports = router;
