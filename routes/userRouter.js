const express = require('express');
const {
  getVerificationCodeController,
  setNewPasswordController,
} = require('../controllers/resetPasswordController');
const { verifyToken } = require('../middlewares');
const router = express.Router();

router.post('/reset-password', getVerificationCodeController);
router.post('/new-password', verifyToken, setNewPasswordController);

module.exports = router;
