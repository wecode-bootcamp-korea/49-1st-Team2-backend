const express = require('express');
const {
  getVerificationCodeController,
} = require('../controllers/resetPasswordController');
const router = express.Router();

router.post('/reset-password', getVerificationCodeController);
// router.post('/reset-password');

module.exports = router;
