const express = require('express');
const { verifyToken } = require('../middlewares');
const { threadController } = require('../controllers');
const {
  viewThreadController,
  createThreadController,
  updateThreadController,
  deleteThreadController,
  getThreadByIdController,
} = threadController;
const router = express.Router();

router.get('/', verifyToken, viewThreadController);
router.get('/:id', verifyToken, getThreadByIdController);
router.post('/', verifyToken, createThreadController);
router.patch('/', verifyToken, updateThreadController);
router.delete('/', verifyToken, deleteThreadController);

module.exports = router;
