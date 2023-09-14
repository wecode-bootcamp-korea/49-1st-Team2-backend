const { dataSource } = require('../models');

const createCommentDao = async (id, { content, threadId }) => {
  await dataSource.query(
    `
    INSERT INTO comments (content, user_id, thread_id) VALUES (?, ?, ?)
    `,
    [content, id, threadId],
  );
};

const updateCommentDao = async (id, { content, threadId }) => {
  await dataSource.query(
    `
    UPDATE comments SET content = ? WHERE user_id = ? AND thread_id = ?
    `,
    [content, id, threadId],
  );
};

const deleteCommentDao = async (id, threadId) => {
  await dataSource.query(
    `
    DELETE FROM comments WHERE user_id = ? AND thread_id = ?
    `,
    [id, threadId],
  );
};

module.exports = {
  createCommentDao,
  updateCommentDao,
  deleteCommentDao,
};
