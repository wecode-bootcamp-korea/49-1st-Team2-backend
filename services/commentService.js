const { throwError } = require('../utils');
const { commentDao } = require('../models');
const { createCommentDao, updateCommentDao, deleteCommentDao} = commentDao;

const createCommentService = async (id, body) => {
    createCommentDao(id, body)
    return "comment created";
    //추가작성 필요
};
const updateCommentService = async (id, body) => {
    updateCommentDao(id, body);
    return "comment updated";
};
const deleteCommentService = async (id, threadId) => {
    deleteCommentDao(id, threadId);
    return "comment deleted";
};


module.exports = {
    createCommentService,
    updateCommentService,
    deleteCommentService,
};