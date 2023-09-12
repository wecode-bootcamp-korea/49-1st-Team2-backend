const signUpService = require('../services/signUpService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage, nickname, phoneNumber, birthday } = req.body;

    if (name === undefined || email === undefined || password === undefined ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    err.message = "KEY_ERROR"
    throw err
    };

    await signUpService.signUp( name, email, password, profileImage, nickname, phoneNumber, birthday );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	signUp
}