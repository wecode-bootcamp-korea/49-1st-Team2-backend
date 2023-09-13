const {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
  dupliCheckEmail,
  dupliCheckNickname,
} = require('./userService');
const {
  createThreadService,
  getUserThreadService,
} = require('./threadService');

module.exports = {
  userService: {
    createUser,
    getVerificationCodeService,
    setNewPasswordService,
    isEmailValid,
    dupliCheckEmail,
    dupliCheckNickname,
  },
  threadService: {
    createThreadService,
    getUserThreadService,
  },
};
