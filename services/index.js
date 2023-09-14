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
  updateThreadService,
  deleteThreadService,
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
    updateThreadService,
    deleteThreadService,
  },
};
