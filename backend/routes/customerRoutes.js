const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.create);

router.get('/:id', customerController.read);

router.put('/:id', customerController.update);

router.delete('/:id', customerController.delete);

router.get('/', customerController.list);

module.exports = router;