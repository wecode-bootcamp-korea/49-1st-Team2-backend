const { dataSource } = require('./dataSource');

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
};
