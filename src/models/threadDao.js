const { dataSource } = require('./dataSource');

const createThreadDao = async (id, content) => {
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
  }
};

const updateThreadDao = async (id, { content, postId }) => {
  await dataSource.query(
    `
    UPDATE threads SET content = ? WHERE user_id  = ? AND threads.id = ?
  `,
    [content, id, postId],
  );
};

const deleteThreadDao = async (id, postId) => {
  await dataSource.query(
    `DELETE FROM threads WHERE user_id  = ? AND threads.id = ?`,
    [id, postId],
  );
};

module.exports = {
  updateThreadDao,
  deleteThreadDao,
  createThreadDao,
};
