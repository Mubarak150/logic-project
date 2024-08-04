const express = require('express');
const router = express.Router();
const {protect, checkSignIn} = require('../middleware/auth');
const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
} = require('../controllers/countryController');

router.post('/', protect, createCountry);
router.get('/', protect, getAllCountries);
router.get('/:id', protect, getCountryById);
router.patch('/:id', protect, updateCountryById);
router.delete('/:id', protect, deleteCountryById);

module.exports = router;
