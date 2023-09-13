const {
    signUpController,
    getVerificationCodeController,
    setNewPasswordController,
    loginController,
  } = require('./userController');
  const { createThreadController } = require('./threadController');
  
  module.exports = {
    userControllers: {
      signUpController,
      getVerificationCodeController,
      setNewPasswordController,
      loginController,
    },
    threadControllers: {
      createThreadController,
    },
  };