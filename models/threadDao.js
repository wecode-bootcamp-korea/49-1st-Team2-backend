const { dataSource } = require('./dataSource');
const dayjs = require('dayjs');

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

const getThreadByIdDao = async (id, postId) => {
  const result = await dataSource.query(
    `
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
  comment_users.nickname AS comment_nickname,
  comment_users.profile_image AS comment_profile_image,
  comments.id AS comment_id
FROM threads
LEFT JOIN users ON threads.user_id = users.id
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
WHERE threads.id = ?
  `,
    [postId],
  );
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

  const [destructuredMapData] = Array.from(threadsMap.values());
  return { data: destructuredMapData };
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
  getThreadByIdDao,
};
