const { dataSource } = require('../models');

exports.getVerificationCodeService = async (id, next) => {
  try {
    const [email] = await dataSource.query(
      `
      SELECT email FROM users WHERE users.id = ?
      `,
      [id],
    );
    return email;
  } catch (err) {
    console.error(err);
    next(err);
  }
};
