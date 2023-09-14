const { threadService } = require('../services');
const { createThreadService, updateThreadService, deleteThreadService } =
  threadService;
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

const updateThreadController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { content, postId } = req.body;
    if (!content || !postId) throwError(400, 'key error');
    if (content.length <= 1) throwError(400, 'content too short');
    return res
      .status(201)
      .json({ message: await updateThreadService(id, req.body) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteThreadController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.body;
    if (!postId) throwError(400, 'key error');
    return res
      .status(200)
      .json({ message: await deleteThreadService(id, postId) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  createThreadController,
  updateThreadController,
  deleteThreadController,
};
