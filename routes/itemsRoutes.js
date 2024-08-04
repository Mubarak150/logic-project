const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} = require('../controllers/itemsController');

router.post('/', protect, createItem);
router.get('/', protect, getAllItems);
router.get('/:id', protect, getItemById);
router.patch('/:id', protect, updateItemById);
router.delete('/:id', protect, deleteItemById);

module.exports = router;