const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouseById,
  deleteWarehouseById,
} = require('../controllers/warehouseController');

router.post('/', protect, createWarehouse);
router.get('/', protect, getAllWarehouses);
router.get('/:id', protect, getWarehouseById);
router.patch('/:id', protect, updateWarehouseById);
router.delete('/:id', protect, deleteWarehouseById);

module.exports = router;