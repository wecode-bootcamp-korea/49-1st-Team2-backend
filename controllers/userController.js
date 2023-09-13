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
  dupliCheckEmail,
  dupliCheckNickname,
} = userServices;

const signUpController = async (req, res) => {
  try {
    const { nickname, email, password, profileImage, phoneNumber, birthday } =
      req.body;

    //필수 값 확인 - falsy 사용
    if (!nickname || !email || !password)
      throwError(400, 'missing nickname, email or password');

    // 이메일 형식 확인하는 정규식
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email))
      throwError(400, 'Please Check Your Email Address');

    if (password.length < 10)
      throwError(400, 'Password must be longer than 10 characters');

    // 비밀번호 확인에 필요한 정규식
    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;
    if (!pwValidation.test(password))
      throwError(409, 'Password must contain Special Character');

    // bcrypt
    const hash = await bcrypt.hash(password, 12);

    // 기본 프로파일 이미지 설정
    if (!profileImage) {
      const defaultProfileImage =
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff04d8ea9-3dd9-414b-b700-d298ec13121d%2Fwecode_symbol_b2x.png?table=block&id=a98c177b-5abd-45fc-aeee-d59612683b44&spaceId=4b97eaca-7938-4c43-b27c-a0c55795a841&width=250&userId=b9a7ee3f-f583-46d3-a09c-85f2f080696e&cache=v2';

      await createUser(
        nickname,
        email,
        hash,
        defaultProfileImage,
        phoneNumber,
        birthday,
      );
      return res.status(201).json({
        message: 'SIGNUP_SUCCESS',
      });
    } else {
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
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const dupliCheckController = async (req, res) => {
  //바디에, 이메일이 있으면, 엘스이프 닉네임.
  try {
    const { email, nickname } = req.body;
    if (email) {
      const check = await dupliCheckEmail(email)
      if (check > 0) {
        return res.status(400).json({message : "Email is Already in Use"})
      } else {
        return res.status(200).json({message : "Email can be Used"})
      }
    } else if (nickname) {
      const check = await dupliCheckNickname(nickname)
      if (check > 0) {
        return res.status(400).json({message : "Nickname is Already in Use"})
    } else {
      return res.status(200).json({message : "Nickname can be used"})
    }
  };
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
    console.log(userCheck);
    if (!userCheck) throwError(401, 'not found email');

    // 비밀번호 체크
    const passwordCheck = userCheck[0].password;
    const result = await bcrypt.compare(password, passwordCheck);
    if (result) {
      const userId = userCheck[0].id;
      const userNickname = userCheck[0].nickname;
      if (!tokenGeneration(userId)) throwError(401, 'token generation failure');
      return res.status(200).json({
        message: 'login success',
        token: `${tokenGeneration(userId)}`,
        id: userId,
        nickname: userNickname,
      });
    }
    throwError(401, 'invalid password');
  } catch (err) {
    console.log(err);
    next(err);
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
  dupliCheckController,
};
