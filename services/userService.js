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
    return userCredential;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const dupliCheckEmail = async (email, next) => {
  try {
    const checkVal = await dataSource.query(
      `
        SELECT email FROM users WHERE email = ?
        `,
      [email],
    );
    return checkVal.length;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const dupliCheckNickname = async (nickname, next) => {
  try {
    const checkVal = await dataSource.query(
      `
        SELECT nickname FROM users WHERE nickname = ?
        `,
      [nickname],
    );
    return checkVal.length;
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

const getVerificationCodeService = async (email) => {
  const [id] = await dataSource.query(
    `
    SELECT id FROM users WHERE email = ?
    `,
    [email],
  );
  return id;
};

const setNewPasswordService = async (id, password) => {
  await dataSource.query(
    `
  UPDATE users SET password = ? WHERE id = ? 
  `,
    [password, id],
  );
  return 'password updated';
};

module.exports = {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
  dupliCheckEmail,
  dupliCheckNickname,
};
