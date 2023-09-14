const {
  getVerificationCodeDao,
  setNewPasswordDao,
} = require('./userDao');
const {
  updateThreadDao,
  deleteThreadDao,
  createThreadDao,
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
  },
  threadDao: {
    updateThreadDao,
    deleteThreadDao,
    createThreadDao,
  },
  commentDao: {
    createCommentDao,
    updateCommentDao,
    deleteCommentDao,
  },
};
