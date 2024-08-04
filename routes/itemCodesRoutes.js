const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createItemCode,
  getAllItemCodes,
  getItemCodeById,
  updateItemCodeById,
  deleteItemCodeById,
} = require('../controllers/itemCodesController');

router.post('/', protect, createItemCode);
router.get('/', protect, getAllItemCodes);
router.get('/:id', protect, getItemCodeById);
router.patch('/:id', protect, updateItemCodeById);
router.delete('/:id', protect, deleteItemCodeById);

module.exports = router;