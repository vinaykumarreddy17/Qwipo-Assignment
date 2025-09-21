const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/', addressController.create);

router.get('/customer/:customer_id', addressController.listByCustomer);

router.put('/:address_id', addressController.update);

router.delete('/:address_id', addressController.delete);

module.exports = router;