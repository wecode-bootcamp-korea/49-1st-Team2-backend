const express = require('express');
const {
  getVerificationCodeController,
} = require('../controllers/resetPassword');
const { verifyToken } = require('../middlewares');
const router = express.Router();

router.get('/reset-password', verifyToken, getVerificationCodeController);
// router.post('/reset-password');

module.exports = router;
