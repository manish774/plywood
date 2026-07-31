const express = require('express');
const requireAuth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const { createContact, listContacts } = require('../controllers/contactController');

const router = express.Router();

router.post('/', asyncHandler(createContact));
router.get('/', requireAuth, asyncHandler(listContacts));

module.exports = router;
