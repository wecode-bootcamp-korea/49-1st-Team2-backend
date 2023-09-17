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

const getThreadByIdDao = async (id, postId) => {
  const [result] = await dataSource.query(
    `
    SELECT 
    threads.id AS threadId,
    users.nickname AS nickname,
    users.profile_image AS profileImage,
    threads.content AS content,
    CASE 
        WHEN threads.user_id = ? THEN true
        ELSE false
    END AS isMyPost,
    DATE_FORMAT(threads.created_at, '%Y-%m-%d') AS createdAt,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', comments.id,
            'comment', comments.comment,
            'createdAt', DATE_FORMAT(comments.created_at, '%Y-%m-%d'),
            'isMyReply', CASE 
                            WHEN comments.user_id = ? THEN true
                            ELSE false
                         END,
            'nickname', cu.nickname,
            'profileImage', cu.profile_image
        )
    ) AS comments
FROM
    threads
JOIN 
    users ON threads.user_id = users.id
LEFT JOIN 
    comments ON threads.id = comments.thread_id
LEFT JOIN 
    users AS cu ON comments.user_id = cu.id
    WHERE threads.id = ?
GROUP BY 
    threads.id, users.id
  `,
    [id, id, postId],
  );
  const filteredComments = result.comments.filter((data) => data.id);
  const { threadId, nickname, profileImage, content, isMyPost, createdAt } =
    result;
  return {
    data: {
      threadId,
      nickname,
      profileImage,
      content,
      isMyPost,
      createdAt,
      comments: filteredComments,
    },
  };
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
