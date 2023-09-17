const {
  createUserService,
  dupliCheckEmailService,
  dupliCheckNicknameService,
  getVerificationCodeService,
  setNewPasswordService,
  loginService,
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
    loginService,
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
