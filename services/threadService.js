const { dataSource } = require('../models/dataSource');
const dayjs = require('dayjs');
const { throwError } = require('../utils');
const { threadDao } = require('../models');
const { updateThreadDao, deleteThreadDao, createThreadDao, getThreadByIdDao } =
  threadDao;

const createThreadService = async (id, content) => {
  const result = await createThreadDao(id, content);
  if (result && result.message === 'post created') {
    return result;
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
        users.profile_image AS comment_profile_image,
        comments.id AS comment_id
      FROM threads
      LEFT JOIN users ON threads.user_id = users.id
      LEFT JOIN comments ON threads.id = comments.thread_id
      LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
      ORDER BY threads.id DESC
    `);

    const threadsMap = new Map();
    result.forEach((row) => {
      const threadDate = dayjs(row.created_at);
      const commentDate = dayjs(row.comment_created_at);

      if (!threadsMap.has(row.id)) {
        threadsMap.set(row.id, {
          id: row.id,
          nickname: row.nickname,
          profileImage: row.profile_image,
          content: row.content,
          isMyPost: id === row.user_id,
          createdAt: threadDate.format('YYYY-MM-DD'),
          comments: [],
        });
      }
      if (row.comment) {
        threadsMap.get(row.id).comments.push({
          id: row.comment_id,
          comment: row.comment,
          createdAt: commentDate.format('YYYY-MM-DD'),
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
const getThreadByIdService = (id, postId) => {
  return getThreadByIdDao(id, postId);
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
  getThreadByIdService,
};
