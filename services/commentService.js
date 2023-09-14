const { dataSource } = require('../models');
const { throwError } = require('../utils');
const { commentDao } = require('../models');
const { createCommentDao, updateCommentDao, deleteCommentDao} = commentDao;

const createCommentService = async () => {

};
const updateCommentService = async () => {

};
const deleteCommentService = async () => {

};


module.exports = {
    createCommentService,
    updateCommentService,
    deleteCommentService,
};