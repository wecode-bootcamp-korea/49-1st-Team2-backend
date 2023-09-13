const { dataSource } = require('../models');

const createUser = async (
  nickname,
  email,
  password,
  profileImage,
  phoneNumber,
  birthday,
) => {
  try {
    const userCredential = dataSource.query(
      `INSERT INTO users(nickname, email, password, profile_image, phone_number, birth_day) VALUES (?, ?, ?, ?, ?, ?);
    `,
      [nickname, email, password, profileImage, phoneNumber, birthday],
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getVerificationCodeService = async (email, next) => {
  try {
    const [id] = await dataSource.query(
      `
      SELECT id FROM users WHERE email = ?
      `,
      [email],
    );
    return id;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const setNewPasswordService = async (id, password, next) => {
  try {
    await dataSource.query(
      `
    UPDATE users SET password = ? WHERE id = ? 
    `,
      [password, id],
    );
    return 'password updated';
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

module.exports = {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
};
