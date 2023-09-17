const { dataSource } = require('./dataSource');

const createCommentDao = async (userId, { comment, threadId }) => {
  await dataSource.query(
    `
    INSERT INTO comments (comment, user_id, thread_id) VALUES (?, ?, ?)
    `,
    [comment, userId, threadId],
  );
};

const updateCommentDao = async (userId, { comment, commentId }) => {
  await dataSource.query(
    `
    UPDATE comments SET comment = ? WHERE user_id = ? AND id = ?
    `,
    [comment, userId, commentId],
  );
};

const deleteCommentDao = async (userId, commentId) => {
  await dataSource.query(
    `
    DELETE FROM comments WHERE user_id = ? AND id = ?
    `,
    [userId, commentId],
  );
};

module.exports = {
  createCommentDao,
  updateCommentDao,
  deleteCommentDao,
};
