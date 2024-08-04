const express = require('express');
const { getProfiles, updateProfile, deleteProfile } = require('../controllers/profileController');
const { protect }  = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getProfiles);
router.patch('/:id', protect, updateProfile);
router.delete('/:id', protect, deleteProfile);

module.exports = router;
