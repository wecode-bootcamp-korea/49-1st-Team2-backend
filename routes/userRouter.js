const express = require('express');
const { userController } = require('../controllers');
const {
  signUpController,
  loginController,
  getVerificationCodeController,
  setNewPasswordController,
  dupliCheckController,
} = userController;
const { verifyToken } = require('../middlewares');
const router = express.Router();

router.post('/login', loginController);
router.post('/reset-password', getVerificationCodeController);
router.post('/new-password', verifyToken, setNewPasswordController);
router.post('/signup', signUpController);
router.post('/checkduplicate', dupliCheckController);

module.exports = router;
