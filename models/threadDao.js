const { dataSource } = require('.');

const getUserThreadServiceDao = async (threadId) => {
  const [data] = await dataSource.query(
    `SELECT threads.id, users.nickname, users.profile_image, threads.content, threads.created_at
        FROM threads
        LEFT JOIN users ON threads.user_id = users.id 
        WHERE threads.id = ?
        `,
    [threadId],
  );
  return data;
};

module.exports = {
  getUserThreadServiceDao,
};
