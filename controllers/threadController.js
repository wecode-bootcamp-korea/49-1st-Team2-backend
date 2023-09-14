const { threadService } = require('../services');
const { createThreadService, viewThreadService } = threadService;
const { throwError } = require('../utils');

const createThreadController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { content } = req.body;
    if (!content) throwError(400, 'key error');
    if (content.length <= 1) throwError(400, 'content too short');
    return res.status(201).json(await createThreadService(id, content));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const viewThreadController = async (req, res, next) => {
  try {
    const { id } = req.user;
    return res.status(200).json(await viewThreadService(id, next));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createThreadController,
  viewThreadController,
};
