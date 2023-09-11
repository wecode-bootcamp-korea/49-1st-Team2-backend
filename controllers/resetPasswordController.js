const {
  getVerificationCodeService,
} = require('../services/resetPasswordServices');
const { throwError } = require('../utils/throwError');

exports.getVerificationCodeController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const id = await getVerificationCodeService(email, next);
    if (!id) throwError(401, "user doesn't exist");
    return res.status(201).json({
      email,
      isVerifiedUser: 'Y',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
