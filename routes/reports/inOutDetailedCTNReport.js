// routes/consignmentRoutes.js
const express = require('express');
const router = express.Router();
// const {protect, checkSignIn} = require('../middleware/auth');
const {
    getByCTN
} = require('../../controllers/reports/inOutDetailedCTNReport');

// Create a consignment along with items and documents
// router.post('/', protect, createConsignment);

// // Update a consignment along with its items and documents
// router.patch('/:id', updateConsignment);

// // Delete a consignment along with its items and documents
// router.delete('/:id', protect, deleteConsignment);

// Read all  with pagination and filters
router.get('/', getByCTN);

// router.get('/:id',  readOneById);/

module.exports = router;
