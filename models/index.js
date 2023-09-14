const { getVerificationCodeDao, setNewPasswordDao } = require('./userDao');

module.exports = {
  userDao: { getVerificationCodeDao, setNewPasswordDao },
};
