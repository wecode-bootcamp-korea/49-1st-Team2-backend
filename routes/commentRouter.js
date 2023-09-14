const express = require('express');
const { verifyToken } = require('../middlewares');
const { commentController } = require('../controllers');
const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
} = commentController;
const router = express.Router();

router.post('/', verifyToken, createCommentController);
router.patch('/', verifyToken, updateCommentController);
router.delete('/', verifyToken, deleteCommentController);

module.exports = router;
