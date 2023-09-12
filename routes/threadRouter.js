const express = require('express');
const { verifyToken } = require('../middlewares');
const {
  createThreadController,
  viewThreadController,
} = require('../controllers/threadController');
const router = express.Router();

router.post('/', verifyToken, createThreadController);
router.get('/', verifyToken, viewThreadController);

module.exports = router;
