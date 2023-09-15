const {
  getVerificationCodeDao,
  setNewPasswordDao,
  loginEmailCheckDao,
} = require('./userDao');
const {
  updateThreadDao,
  deleteThreadDao,
  createThreadDao,
  getThreadByIdDao,
} = require('./threadDao');
const {
  createCommentDao,
  updateCommentDao,
  deleteCommentDao,
} = require('./commentDao');

module.exports = {
  userDao: {
    getVerificationCodeDao,
    setNewPasswordDao,
    loginEmailCheckDao,
  },
  threadDao: {
    updateThreadDao,
    deleteThreadDao,
    createThreadDao,
    getThreadByIdDao,
  },
  commentDao: {
    createCommentDao,
    updateCommentDao,
    deleteCommentDao,
  },
};
