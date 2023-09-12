const express = require('express');
const { verifyToken } = require('../middlewares');
const { createThreadController } = require('../controllers/threadController');
const router = express.Router();

router.post('/', verifyToken, createThreadController);

module.exports = router;
