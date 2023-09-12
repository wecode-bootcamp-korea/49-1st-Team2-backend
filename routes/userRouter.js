const express = require('express');
const signUpController = require('../controllers/signUpController');

const router = express.Router();
const { loginController } = require('../controllers/loginController');

router.post('/login', loginController);

router.post('/signup', signUpController.signUp);

module.exports = {
	router
}