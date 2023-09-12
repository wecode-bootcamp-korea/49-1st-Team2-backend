const express = require('express');
const signUpController = require('../controllers/signUpController');

const router = express.Router();

router.post('/signup', signUpController.signUp);

module.exports = {
	router
}