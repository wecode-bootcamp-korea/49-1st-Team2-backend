const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const { createThreadController, viewThreadController } = threadController;
const router = express.Router();

router.post('/', verifyToken, createThreadController);
router.get('/', verifyToken, viewThreadController);

module.exports = router;
