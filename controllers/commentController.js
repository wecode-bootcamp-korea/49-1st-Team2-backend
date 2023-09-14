const { commentServices } = require('../services');
const { createCommentService } = commentServices;
const { throwError } = require('../utils')

const createCommentController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { content } = req.body;
        if (!content) throwError(400, 'NO_CONTENT');
        return res.status(201).json(await createCommentService())
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateCommentController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { content, commentId } = req.body;
        if (!content || !commentId) throwError(400, 'key error');
        return res.status(201).json({message : await updateCommentService()})
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
        return res.status(200).json({ message : await deleteCommentService()})
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