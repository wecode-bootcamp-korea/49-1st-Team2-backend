const {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
} = require('./userService');
const { createThreadService } = require('./threadService');

module.exports = {
  userServices: {
    createUser,
    getVerificationCodeService,
    setNewPasswordService,
    isEmailValid,
  },
  threadServices: {
    createThreadService,
  },
};
