const createUser = require('../services/signUpService');

const signUpController = async (req, res) => {
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

    if (!name || !email || !password) {
      //falsy 값
      const err = new Error('KEY_ERROR');
      err.statusCode = 400;
      err.message = 'KEY_ERROR';
      throw err;
    }

    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
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

module.exports = signUpController

