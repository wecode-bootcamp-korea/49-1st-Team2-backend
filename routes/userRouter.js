const express = require('express');
const { userControllers } = require('../controllers');
const {
  signUpController,
  loginController,
  getVerificationCodeController,
  setNewPasswordController,
} = userControllers;
const { verifyToken } = require('../middlewares');
const router = express.Router();

router.post('/login', loginController);

router.post('/reset-password', getVerificationCodeController);
router.post('/new-password', verifyToken, setNewPasswordController);
router.post('/signup', signUpController);

module.exports = router;
