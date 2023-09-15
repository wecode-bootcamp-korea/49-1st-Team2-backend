const {
  getVerificationCodeDao,
  setNewPasswordDao,
  createUserDao,
  dupliCheckEmailDao,
  dupliCheckNicknameDao,
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
    createUserDao,
    dupliCheckEmailDao,
    dupliCheckNicknameDao,
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
