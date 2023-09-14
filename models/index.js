const { getVerificationCodeDao, setNewPasswordDao } = require('./userDao');
const {
  updateThreadDao,
  deleteThreadDao,
  createThreadDao,
} = require('./threadDao');

module.exports = {
  userDao: { getVerificationCodeDao, setNewPasswordDao },
  threadDao: {
    updateThreadDao,
    deleteThreadDao,
    createThreadDao,
  },
};
