const { dataSource } = require('../models');

exports.getVerificationCodeService = async (email, next) => {
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
