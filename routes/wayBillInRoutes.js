const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {createWayBillIn, getAllWayBillIns, deleteWayBillInById, updateWayBillInById } = require('../controllers/wayBillInController');

router.post('/', protect, createWayBillIn);
router.get('/', protect, getAllWayBillIns);
router.delete('/:id', protect, deleteWayBillInById)
router.patch('/:id', protect, updateWayBillInById)

module.exports = router;