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

    // 이메일 형식 확인하는 정규식
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(email))
      throwError(400, "Please Check Your Email Address");

    if (password.length < 10)
      throwError(400, "Password must be longer than 10 characters");

    // 비밀번호 확인에 필요한 정규식
    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;
    if (!pwValidation.test(password))
      throwError(409, 'Password must contain Special Character');

    if (!profileImage) {
      const profileImage = "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff04d8ea9-3dd9-414b-b700-d298ec13121d%2Fwecode_symbol_b2x.png?table=block&id=a98c177b-5abd-45fc-aeee-d59612683b44&spaceId=4b97eaca-7938-4c43-b27c-a0c55795a841&width=250&userId=b9a7ee3f-f583-46d3-a09c-85f2f080696e&cache=v2"
    }

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
