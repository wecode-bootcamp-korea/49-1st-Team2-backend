const { dataSource } = require('../models/dataSource');
const { throwError } = require('../utils');
const { threadDao } = require('../models');
const { deleteThreadDao } = require('../models/threadDao');
const { updateThreadDao } = threadDao;

const createThreadService = async (id, content) => {
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
};

const viewThreadService = async (id, next) => {
  try {
    let [viewThread] = await dataSource.query(
      `
      SELECT threads.id, users.nickname, users.profile_image, threads.user_id, threads.content, threads.created_at
      FROM threads, users;
      `,
    );

    const viewThreadComment = await dataSource.query(
      `
      SELECT threads.id, users.nickname, comments.comment, comments.created_at, comments.user_id AS comment_user_id
      FROM threads
      LEFT JOIN comments ON threads.id = comments.thread_id
      LEFT JOIN users ON comments.user_id = users.id
      WHERE threads.id = ?
      `,
      [viewThread.id],
    );

    return {
      data: {
        id: viewThread.id,
        nickname: viewThread.nickname,
        profileImage: viewThread.profile_image,
        isMyPost: id === viewThread.user_id,
        commentCount: viewThreadComment.length,
        comments: viewThreadComment.map((data) => {
          return { ...data, isMyReply: data.comment_user_id === id };
        }),
        createdAt: viewThread.created_at,
      },
    };
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateThreadService = (id, body) => {
  updateThreadDao(id, body);
  return 'post updated';
};

const deleteThreadService = (id, postId) => {
  deleteThreadDao(id, postId);
  return 'post deleted';
};

module.exports = {
  viewThreadService,
  createThreadService,
  updateThreadService,
  deleteThreadService,
};
