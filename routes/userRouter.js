const express = require('express');
const {
  getVerificationCodeController,
  setNewPasswordController,
} = require('../controllers/resetPasswordController');
const { verifyToken } = require('../middlewares');
const { signUpController } = require('../controllers/signUpController');

const router = express.Router();
const { loginController } = require('../controllers/loginController');

router.post('/login', loginController);

router.post('/reset-password', getVerificationCodeController);
router.post('/new-password', verifyToken, setNewPasswordController);
router.post('/signup', signUpController);

module.exports = {
	router
}