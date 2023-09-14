const { dataSource } = require('../models');
const { throwError } = require('../utils');
const { commentDao } = require('../models');
const { createCommentDao, updateCommentDao, deleteCommentDao} = commentDao;

const createCommentService = async () => {
    createCommentDao()
    return { message : "comment created",
...nickname,
...}
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