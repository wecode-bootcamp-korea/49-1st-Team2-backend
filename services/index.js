const {
  createUserService,
  dupliCheckEmailService,
  dupliCheckNicknameService,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,

} = require('./userService');
const {
  viewThreadService,
  createThreadService,
  updateThreadService,
  deleteThreadService,
  getThreadByIdService,
} = require('./threadService');
const {
  createCommentService,
  updateCommentService,
  deleteCommentService,
} = require('./commentService');

module.exports = {
  userService: {
    createUserService,
    dupliCheckEmailService,
    dupliCheckNicknameService,
    getVerificationCodeService,
    setNewPasswordService,
    isEmailValid,
  },
  threadService: {
    viewThreadService,
    createThreadService,
    updateThreadService,
    deleteThreadService,
    getThreadByIdService,
  },
  commentService: {
    createCommentService,
    updateCommentService,
    deleteCommentService,
  },
};
