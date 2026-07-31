const express = require('express');
const requireAuth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', asyncHandler(listItems));
router.get('/:id', asyncHandler(getItem));
router.post('/', requireAuth, asyncHandler(createItem));
router.put('/:id', requireAuth, asyncHandler(updateItem));
router.delete('/:id', requireAuth, asyncHandler(deleteItem));

module.exports = router;
