const express = require('express');
const userController = require('../controllers/singUpController');

const router = express.Router();

router.post('/signup', signUpController.signUp);

module.exports = {
	router
}