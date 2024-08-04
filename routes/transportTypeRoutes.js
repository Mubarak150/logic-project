const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransportById,
  deleteTransportById,
} = require('../controllers/transportTypeController');

router.post('/', protect,  createTransport);
router.get('/', protect, getAllTransports);
router.get('/:id', protect, getTransportById);
router.patch('/:id', protect, updateTransportById);
router.delete('/:id', protect, deleteTransportById);

module.exports = router;
