const userController = require('../controllers/user.controller');
const express = require('express');

const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:id/history', userController.history);

module.exports = router;
