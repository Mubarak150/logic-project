// routes/AdjustmentRoutes.js
const express = require('express');
const router = express.Router();
const {protect, checkSignIn} = require('../middleware/auth');
const {
    createPreviousStock,
    updatePreviousStock,
    deletePreviousStock,
    readAllPreviousStocks,
    readOnePreviousStockById
} = require('../controllers/previousStockController');

// Create a PreviousStock along with items
router.post('/', createPreviousStock);

// Update a PreviousStock along with its items
router.patch('/:id', updatePreviousStock);

// Delete a PreviousStock along with its items
router.delete('/:id', deletePreviousStock);

// Read all  with pagination and filters
router.get('/', readAllPreviousStocks);

router.get('/:id',  readOnePreviousStockById);

module.exports = router;
