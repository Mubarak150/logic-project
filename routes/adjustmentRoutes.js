// routes/AdjustmentRoutes.js
const express = require('express');
const router = express.Router();
const {protect, checkSignIn} = require('../middleware/auth');
const {
    createAdjustment,
    updateAdjustment,
    deleteAdjustment,
    readAllAdjustments,
    readOneById
} = require('../controllers/adjustmentController');

// Create a Adjustment along with items
router.post('/', createAdjustment);

// Update a Adjustment along with its items
router.patch('/:id', updateAdjustment);

// Delete a Adjustment along with its items
router.delete('/:id', deleteAdjustment);

// Read all  with pagination and filters
router.get('/', readAllAdjustments);

router.get('/:id',  readOneById);

module.exports = router;
