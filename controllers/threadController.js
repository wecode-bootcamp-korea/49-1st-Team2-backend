const { createThreadService } = require('../services/threadService');
const { throwError } = require('../utils/throwError');

exports.createThreadController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { content } = req.body;
    if (!content) throwError(400, 'key error');
    if (content.length <= 1) throwError(400, 'content too short');
    return res.status(201).json(await createThreadService(id, content, next));
  } catch (err) {
    console.error(err);
    next(err);
  }
};
