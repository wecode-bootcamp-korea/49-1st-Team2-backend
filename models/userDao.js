const { dataSource } = require('.');
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

module.exports = {
  getVerificationCodeDao,
  setNewPasswordDao,
};
