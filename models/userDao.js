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

const loginEmailCheckDao = async (email) => {
  const emailCheck = await dataSource.query(
    `
    SELECT id, email, password, nickname
    FROM users
    WHERE email = ?;
  `,
    [email],
  );
  return emailCheck;
};

module.exports = {
  getVerificationCodeDao,
  setNewPasswordDao,
  loginEmailCheckDao,
};
