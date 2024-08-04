const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createLogisticPoint,
  getAllLogisticPoints,
  getLogisticPointById,
  updateLogisticPointById,
  deleteLogisticPointById,
} = require('../controllers/logisticPointController');

router.post('/', protect, createLogisticPoint);
router.get('/', protect, getAllLogisticPoints);
router.get('/:id', protect, getLogisticPointById);
router.patch('/:id', protect, updateLogisticPointById);
router.delete('/:id', protect, deleteLogisticPointById);

module.exports = router;