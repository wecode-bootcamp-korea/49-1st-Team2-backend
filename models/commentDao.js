const { dataSource } = require('./dataSource');

const createCommentDao = async (id, { comment, threadId }) => {
  await dataSource.query(
    `
    INSERT INTO comments (comment, user_id, thread_id) VALUES (?, ?, ?)
    `,
    [comment, id, threadId],
  );
};

const updateCommentDao = async (id, { comment, threadId }) => {
  await dataSource.query(
    `
    UPDATE comments SET comment = ? WHERE user_id = ? AND thread_id = ?
    `,
    [comment, id, threadId],
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
