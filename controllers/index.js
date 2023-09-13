const {
    signUpController,
    getVerificationCodeController,
    setNewPasswordController,
    loginController,
    dupliCheckController,
  } = require('./userController');
  const { createThreadController } = require('./threadController');
  
  module.exports = {
    userControllers: {
      signUpController,
      getVerificationCodeController,
      setNewPasswordController,
      loginController,
      dupliCheckController,
    },
    threadControllers: {
      createThreadController,
    },
  };