const {
  signUpController,
  getVerificationCodeController,
  setNewPasswordController,
  loginController,
  dupliCheckController,
} = require('./userController');
const {
  createThreadController,
  viewThreadController,
  updateThreadController,
  deleteThreadController,
  getThreadByIdController,
} = require('./threadController');
const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
} = require('./commentController');

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
    viewThreadController,
    updateThreadController,
    deleteThreadController,
    getThreadByIdController,
  },
  commentController: {
    createCommentController,
    updateCommentController,
    deleteCommentController,
  },
};
