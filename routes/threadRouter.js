const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadControllers } = require('../controllers');
const { createThreadController } = threadControllers;
const router = express.Router();

router.post('/', verifyToken, createThreadController);

module.exports = router;
