const { threadService } = require('../services');
const { createThreadService, getUserThreadService } = threadService;
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
const getUserThreadController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (await getUserThreadService(id)) {
      return res.status(200).json({
        data: await getUserThreadService(id),
      });
    }

    throwError(400, 'content not found');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createThreadController,
  getUserThreadController,
};
