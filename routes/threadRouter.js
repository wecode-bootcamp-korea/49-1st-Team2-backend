const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const { createThreadController } = threadController;
const router = express.Router();

router.post('/', verifyToken, createThreadController);

module.exports = router;
