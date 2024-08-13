// routes/WayBillOutRoutes.js
const express = require('express');
const router = express.Router();
const {protect, checkSignIn} = require('../middleware/auth');
const {
    createWayBillOut,
    updateWayBillOut,
    deleteWayBillOut,
    readAllWayBillOuts,
    readOneWayBillOutById
} = require('../controllers/wayBillOutController');

// Create a WayBillOut along with items
router.post('/', createWayBillOut);

// Update a WayBillOut along with its items
router.patch('/:id', updateWayBillOut);

// Delete a WayBillOut along with its items
router.delete('/:id', deleteWayBillOut);

// Read all  with pagination and filters
router.get('/', readAllWayBillOuts);

router.get('/:id',  readOneWayBillOutById);

module.exports = router;