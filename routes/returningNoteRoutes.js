const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {createReturningNote, getAllReturningNotes, deleteReturningNoteById, updateReturningNoteById } = require('../controllers/returningNoteController');

router.post('/', protect, createReturningNote);
router.get('/', protect, getAllReturningNotes);
router.delete('/:id', protect, deleteReturningNoteById)
router.patch('/:id', protect, updateReturningNoteById)

module.exports = router;