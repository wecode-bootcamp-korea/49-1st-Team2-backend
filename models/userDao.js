const { dataSource } = require('./dataSource');

const getVerificationCodeDao = async (email) => {
  const [id] = await dataSource.query(
    `
        SELECT id FROM users WHERE email = ?
        `,
    [email],
  );
  return id;
};

const setNewPasswordDao = async (id, password) => {
  await dataSource.query(
    `
  UPDATE users SET password = ? WHERE id = ? 
  `,
    [password, id],
  );
};

const createUserDao = async (
  nickname,
  email,
  password,
  profileImage,
  phoneNumber,
  birthday,
) => {
  const userCredential = dataSource.query(
    `INSERT INTO users(
      nickname, email, password, profile_image, phone_number, birth_day) VALUES (?, ?, ?, ?, ?, ?);
  `,
    [nickname, email, password, profileImage, phoneNumber, birthday],
  );
  return userCredential;
};

const dupliCheckEmailDao = async (email) => {
  const checkVal = await dataSource.query(
    `
    SELECT email FROM users WHERE email = ?
    `,
    [email],
  );
  return checkVal.length;
};

const dupliCheckNicknameDao = async (nickname) => {
  const checkVal = await dataSource.query(
    `
    SELECT nickname FROM users WHERE nickname = ?
    `,
    [nickname],
  );
  return checkVal.length;
};

module.exports = {
  getVerificationCodeDao,
  setNewPasswordDao,
  createUserDao,
  dupliCheckEmailDao,
  dupliCheckNicknameDao,
};
