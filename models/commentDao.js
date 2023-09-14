const { dataSource } = require('../models');
const { throwError } = require('../utils');

const createCommentDao = async (userId, content, threadId, next) => {
  try {
    // 코멘트 생성
    const comment = await dataSource.query(
      `
        INSERT INTO comments (content, user_id, thread_id) VALUES (?, ?, ?)`,
      [content, userId, threadId],
    );
  } catch (err) {
    console.error(err);
    next(err);
  };
};

const createCommentDao = async (id, content) => {
  const [nickname] = await dataSource.query(
    `
            SELECT nickname FROM users WHERE id = ?
          `,
    [id],
  );
  if (nickname && nickname.nickname) {
    await dataSource.query(
      `INSERT INTO threads (content, user_id) VALUES (?, ?)`,
      [content, id],
    );
    const [created_at] = await dataSource.query(
      `SELECT created_at FROM threads WHERE content = ?`,
      [content],
    );
    return {
      message: 'post created',
      ...nickname,
      ...created_at,
    };
  };
  throwError(400, "user doesn't exist");
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
