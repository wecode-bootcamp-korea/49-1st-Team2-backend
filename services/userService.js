const { userDao } = require('../models');
const {
  getVerificationCodeDao,
  setNewPasswordDao,
  createUserDao,
  dupliCheckEmailDao,
  dupliCheckNicknameDao,
  loginEmailCheckDao
} = userDao;

const createUserService = async (
  nickname,
  email,
  password,
  profileImage,
  phoneNumber,
  birthday,
) => {
  try {
    createUserDao(
      nickname,
      email,
      password,
      profileImage,
      phoneNumber,
      birthday,
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const dupliCheckEmailService = async (email, next) => {
  try {
    dupliCheckEmailDao(email);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const dupliCheckNicknameService = async (nickname, next) => {
  try {
    dupliCheckNicknameDao(nickname);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const loginService = async (email) => {
  return await loginEmailCheckDao(email);
};

const getVerificationCodeService = (email) => {
  const id = getVerificationCodeDao(email);
  return id;
};

const setNewPasswordService = (id, password) => {
  setNewPasswordDao(id, password);
  return 'password updated';
};

module.exports = {
  createUserService,
  dupliCheckEmailService,
  dupliCheckNicknameService,
  getVerificationCodeService,
  setNewPasswordService,
  loginService,
};
