const { getVerificationCodeDao, setNewPasswordDao } = require('./userDao');
const { updateThreadDao, deleteThreadDao } = require('./threadDao');

module.exports = {
  userDao: { getVerificationCodeDao, setNewPasswordDao },
  threadDao: {
    updateThreadDao,
    deleteThreadDao,
  },
};
