const express = require('express');
const router = express.Router();
const {protect, checkSignIn} = require('../middleware/auth');

const {
  createRequisitionNote,
  readAllRequisitionNotes,
  readOneRequisitionNoteById,
  updateRequisitionNote,
  deleteRequisitionNote
} = require('../controllers/requisitionNoteController');

// Create a requisition note along with its items
router.post('/', protect, createRequisitionNote);

// Update a requisition note along with its items
router.patch('/:id', protect, updateRequisitionNote);

// Delete a requisition note along with its items
router.delete('/:id', protect, deleteRequisitionNote);

// Read all requisition notes with pagination and filters 
router.get('/', protect, readAllRequisitionNotes);

// Read a requisition note by ID
router.get('/:id', readOneRequisitionNoteById);

module.exports = router;
