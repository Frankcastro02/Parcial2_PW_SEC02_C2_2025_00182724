const express = require('express');
const router = express.Router();
const Control = require('../controllers/controllerCuentas');

router.get('/', Control.getQuery);

router.get('/:id', Control.getId);

router.get('/extra/balance', Control.getBalance);

module.exports = router;