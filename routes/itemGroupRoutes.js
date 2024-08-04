const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createItemGroup,
  getAllItemGroups,
  getItemGroupById,
  updateItemGroupById,
  deleteItemGroupById,
} = require('../controllers/itemGroupController');

router.post('/', protect, createItemGroup);
router.get('/', protect, getAllItemGroups);
router.get('/:id', protect, getItemGroupById);
router.patch('/:id', protect, updateItemGroupById);
router.delete('/:id', protect, deleteItemGroupById);

module.exports = router;
