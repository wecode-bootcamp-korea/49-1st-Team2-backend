const { dataSource } = require('../models/dataSource');
const { userDao } = require('../models');
const {
  getVerificationCodeDao,
  setNewPasswordDao,
  createUserDao,
  dupliCheckEmailDao,
  dupliCheckNicknameDao,
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

const isEmailValid = async (email, next) => {
  try {
    const emailCheck = await dataSource.query(`
      SELECT id, email, password, nickname
      FROM users
      WHERE email = '${email}';
      `);
    return emailCheck;
  } catch (err) {
    console.log(err);
    next(err);
  }
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
  isEmailValid,
};
