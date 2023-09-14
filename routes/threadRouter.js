const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const { createThreadController, updateThreadController } = threadController;
const router = express.Router();

router.post('/', verifyToken, createThreadController);
router.patch('/', verifyToken, updateThreadController);

module.exports = router;
