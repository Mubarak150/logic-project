const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrencyById,
  deleteCurrencyById,
} = require('../controllers/currencyController');

router.post('/', protect, createCurrency);
router.get('/', protect, getAllCurrencies);
router.get('/:id', getCurrencyById);
router.put('/:id', updateCurrencyById);
router.delete('/:id', deleteCurrencyById);

module.exports = router;
