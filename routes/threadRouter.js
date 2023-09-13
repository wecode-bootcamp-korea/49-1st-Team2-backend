const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const { createThreadController, getUserThreadController } = threadController;
const router = express.Router();

router.post('/', verifyToken, createThreadController);
router.get('/:id', verifyToken, getUserThreadController);

module.exports = router;
