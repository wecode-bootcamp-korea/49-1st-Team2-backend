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

    res.status(200).json({ message: 'login success' });

    // 비밀번호 체크
    const passwordCheck = userCheck[0].password;
    if (password !== passwordCheck) throwError(401, 'invalid password');

    await bcrypt.compare(password, passwordCheck, (err, result) => {
      if (err) {
        throwError(401, 'invalid password');
      } else if (result === true) {
        const userId = userCheck[0].id;
        tokenGeneration(userId);
        if (!tokenGeneration) throwError(401, 'token generation failure');
        res.header('Authorization', `Bearer ${tokenGeneration}`);
        res.status(200).json({ message: 'login success' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
