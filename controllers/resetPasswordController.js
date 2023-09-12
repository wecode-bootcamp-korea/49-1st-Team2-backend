const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {
  getVerificationCodeService,
  setNewPasswordService,
} = require('../services/resetPasswordServices');
const { throwError } = require('../utils/throwError');
const { isValidData } = require('../utils/isValidData');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
});

exports.getVerificationCodeController = async (req, res, next) => {
  try {
    const { email, redirect_uri } = req.body;
    if (!email || !redirect_uri) throwError(400, 'key error');
    const id = await getVerificationCodeService(email, next);
    if (!id) throwError(401, "user doesn't exist");
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

exports.setNewPasswordController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { password } = req.body;
    if (!password) throwError(400, 'key error');
    const passwordRegExp = /[ !@#$%^&*(),.?":{}|<>]/g;
    if (isValidData(passwordRegExp, password)) {
      const hash = await bcrypt.hash(password, 12);
      res
        .status(201)
        .json({ message: await setNewPasswordService(id, hash, next) });
    }
    console.log(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
