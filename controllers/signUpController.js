const { createUser } = require('../services/signUpService');
const { throwError } = require('../utils/throwError');
const bcrypt = require('bcrypt');

exports.signUpController = async (req, res) => {
  try {
    const { nickname, email, password, profileImage, phoneNumber, birthday } =
      req.body;

    //필수 값 확인 - falsy 사용
    if (!nickname || !email || !password)
      throwError(400, 'missing nickname, email or password');

    // 비밀번호 확인에 필요한 정규식
    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;
    if (!pwValidation.test(password))
      throwError(409, 'Password must contain Special Character');

    //bcrypt
    const hash = await bcrypt.hash(password, 12);

    await createUser(
      nickname,
      email,
      hash,
      profileImage,
      phoneNumber,
      birthday,
    );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
