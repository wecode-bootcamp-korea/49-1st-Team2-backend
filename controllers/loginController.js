const { throwError } = require('../utils/throwError');
const { isEmailValid } = require('../services/loginService');
const { tokenGeneration } = require('../utils/tokenGeneration');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throwError(403, 'email invalid');

    // 이메일 체크
    const userCheck = await isEmailValid(email, next);
    if (!userCheck) throwError(401, 'not found email');

    // 비밀번호 체크
    const passwordCheck = userCheck[0].password;
    const result = await bcrypt.compare(password, passwordCheck);
    if (result) {
      const userId = userCheck[0].id;
      if (!tokenGeneration(userId)) throwError(401, 'token generation failure');
      return res.status(200).json({
        message: 'login success',
        token: `${tokenGeneration(userId)}`,
      });
    }
    throwError(401, 'invalid password');
  } catch (err) {
    console.log(err);
  }
};
