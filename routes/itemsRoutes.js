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

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.patch('/:id', updateItemById);
router.delete('/:id', deleteItemById);

module.exports = router;