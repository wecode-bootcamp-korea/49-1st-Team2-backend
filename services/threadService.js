const { dataSource } = require('../models');
const { throwError } = require('../utils');

const createThreadService = async (id, content, next) => {
  try {
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
    throwError(400, "user doesn't exist");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createThreadService,
};
