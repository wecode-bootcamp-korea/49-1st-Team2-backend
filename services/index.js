const {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
  dupliCheckEmail,
  dupliCheckNickname
} = require('./userService');
const { createThreadService } = require('./threadService');

module.exports = {
  userServices: {
    createUser,
    getVerificationCodeService,
    setNewPasswordService,
    isEmailValid,
    dupliCheckEmail,
    dupliCheckNickname
  },
  threadServices: {
    createThreadService,
  },
};
