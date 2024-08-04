const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const transportContractController = require('../controllers/transportContractController');

router.post('/', protect, transportContractController.createTransportContract);
router.get('/', protect, transportContractController.getAllTransportContracts);
router.get('/:id', protect, transportContractController.getTransportContractById);
router.patch('/:id', protect, transportContractController.updateTransportContractById);
router.delete('/:id', protect, transportContractController.deleteTransportContractById);

module.exports = router;
