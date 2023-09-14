const {
  signUpController,
  getVerificationCodeController,
  setNewPasswordController,
  loginController,
  dupliCheckController,
} = require('./userController');
const { createThreadController } = require('./threadController');

module.exports = {
  userController: {
    signUpController,
    getVerificationCodeController,
    setNewPasswordController,
    loginController,
    dupliCheckController,
  },
  threadController: {
    createThreadController,
  },
};
