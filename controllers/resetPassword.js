const { getVerificationCodeService } = require('../services/resetPassword');
const { throwError } = require('../utils/throwError');

exports.getVerificationCodeController = async (req, res, next) => {
  try {
    const { email } = await getVerificationCodeService(req.userId, next);
    if (!email) throwError(401, "user doesn't exist");
    return res.status(201).json({
      email,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
