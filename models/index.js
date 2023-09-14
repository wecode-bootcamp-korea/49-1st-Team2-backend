const { getVerificationCodeDao, setNewPasswordDao } = require('./userDao');
const { updateThreadDao } = require('./threadDao');

module.exports = {
  userDao: { getVerificationCodeDao, setNewPasswordDao },
  threadDao: {
    updateThreadDao,
  },
};
