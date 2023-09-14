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
    const result = await dataSource.query(`
      SELECT 
        threads.id, 
        users.nickname, 
        users.profile_image, 
        threads.user_id, 
        threads.content, 
        threads.created_at,
        comments.comment, 
        comments.created_at AS comment_created_at, 
        comments.user_id AS comment_user_id,
        users.nickname AS comment_nickname,
        users.profile_image AS comment_profile_image
      FROM threads
      LEFT JOIN users ON threads.user_id = users.id
      LEFT JOIN comments ON threads.id = comments.thread_id
      LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
    `);

    // Transform data to desired format
    const threadsMap = new Map();
    result.forEach((row) => {
      if (!threadsMap.has(row.id)) {
        threadsMap.set(row.id, {
          id: row.id,
          nickname: row.nickname,
          profileImage: row.profile_image,
          content: row.content,
          isMyPost: id === row.user_id,
          createdAt: row.created_at,
          comments: [],
        });
      }
      if (row.comment) {
        threadsMap.get(row.id).comments.push({
          comment: row.comment,
          createdAt: row.comment_created_at,
          isMyReply: row.comment_user_id === id,
          nickname: row.comment_nickname,
          profileImage: row.comment_profile_image,
        });
      }
    });

    return { data: Array.from(threadsMap.values()) };
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
  deleteThreadService
};
