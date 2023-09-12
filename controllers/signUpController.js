const { createUser } = require('../services/signUpService');
const { throwError } = require('../utils/throwError');

exports.signUpController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profileImage,
      nickname,
      phoneNumber,
      birthday,
    } = req.body;

    //필수 값 확인 - falsy 사용
    if (!name || !email || !password) throwError(400, "missing name, email or password");

    // 비밀번호 확인에 필요한 정규식
    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;

    if (!pwValidation.test(password)) throwError(409, "Password must contain Special Character")
    await createUser(
      name,
      email,
      password,
      profileImage,
      nickname,
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
