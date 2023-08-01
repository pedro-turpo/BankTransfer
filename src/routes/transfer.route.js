const transferController = require('../controllers/transfer.controller');
const express = require('express');

const router = express.Router();

router.post('/', transferController.amountTransfer);

module.exports = router;
