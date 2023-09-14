const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const {
  createThreadController,
  updateThreadController,
  deleteThreadController,
} = threadController;
const router = express.Router();

router.post('/', verifyToken, createThreadController);
router.patch('/', verifyToken, updateThreadController);
router.delete('/', verifyToken, deleteThreadController);

module.exports = router;
