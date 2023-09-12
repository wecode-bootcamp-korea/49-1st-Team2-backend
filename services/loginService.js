const { dataSource } = require('../models');

exports.isEmailValid = async (email, next) => {
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
