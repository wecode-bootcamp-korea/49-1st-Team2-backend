const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers/loginController');

router.post('/login', loginController);
// verifyToken

module.exports = router;
