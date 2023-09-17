const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const threadRouter = require('./threadRouter');
const commentRouter = require('./commentRouter');

router.use('/users', userRouter);
router.use('/threads', threadRouter);
router.use('/comments', commentRouter);

module.exports = router;
