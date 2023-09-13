require('dotenv').config();

const { tokenGeneration, isValidData, throwError } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { userServices } = require('../services');
const {
  createUser,
  getVerificationCodeService,
  setNewPasswordService,
  isEmailValid,
} = userServices;

const signUpController = async (req, res) => {
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
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const loginController = async (req, res, next) => {
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
        nickname: userCheck[0].nickname,
      });
    }
    throwError(401, 'invalid password');
  } catch (err) {
    console.log(err);
  }
};

const getVerificationCodeController = async (req, res, next) => {
  try {
    const { email, redirect_uri } = req.body;
    const id = await getVerificationCodeService(email, next);
    if (!id) throwError(401, "user doesn't exist");
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: `weread 비밀번호 초기화 링크입니다.`,
      text: `<a href="${redirect_uri}/users/reset-password?token=${jwt.sign(
        id,
        process.env.JWT_SECRET,
        {
          expiresIn: '5m',
        },
      )}">weread 비밀번호 초기화 링크입니다.</a> 인증 링크로 5분 내에 미이동시 링크가 만료됩니다.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    return res.status(201).json({
      email,
      isVerifiedUser: 'Y',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const setNewPasswordController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { password } = req.body;
    if (!password) throwError(400, 'key error');
    const passwordRegExp = /[ !@#$%^&*(),.?":{}|<>]/g;
    if (isValidData(passwordRegExp, password)) {
      const hash = await bcrypt.hash(password, 12);
      res.status(201).json({ message: setNewPasswordService(id, hash, next) });
    }
    console.log(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  signUpController,
  loginController,
  getVerificationCodeController,
  setNewPasswordController,
};
