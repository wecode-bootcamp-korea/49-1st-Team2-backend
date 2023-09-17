const { throwError } = require('../utils')
const { commentService } = require('../services');
const { createCommentService, updateCommentService, deleteCommentService } = commentService;

const createCommentController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { comment, threadId } = req.body;
        if (!comment) throwError(400, 'NO_COMMENT');
        return res.status(201).json(await createCommentService(id, { comment, threadId }))
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateCommentController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { comment, commentId } = req.body;
        if (!comment || !commentId) throwError(400, 'key error');
        return res.status(201).json({message : await updateCommentService(id, req.body)})
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const deleteCommentController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { commentId } = req.body;
        if (!commentId) throwError(400, 'key error');
        return res.status(200).json({ message : await deleteCommentService(id, commentId)})
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    createCommentController,
    updateCommentController,
    deleteCommentController,
};
