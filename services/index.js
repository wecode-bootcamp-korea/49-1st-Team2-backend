const {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  loginService,
  dupliCheckEmail,
  dupliCheckNickname,
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
    createUser,
    getVerificationCodeService,
    setNewPasswordService,
    loginService,
    dupliCheckEmail,
    dupliCheckNickname,
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
