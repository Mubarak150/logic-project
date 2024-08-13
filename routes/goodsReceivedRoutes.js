const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {createGoodsReceived, getAllGoodsReceived, deleteGoodsReceivedById, updateGoodsReceivedById } = require('../controllers/goodsReceivedController');

router.post('/', protect, createGoodsReceived);
router.get('/', protect, getAllGoodsReceived);
router.delete('/:id', protect, deleteGoodsReceivedById)
router.patch('/:id', protect, updateGoodsReceivedById)

module.exports = router;