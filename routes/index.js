require('dotenv').config();
const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const threadRouter = require('./threadRouter');

router.use('/users', userRouter);
router.use('/threads', threadRouter);

module.exports = router;
