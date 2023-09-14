const { dataSource } = require('../models/dataSource');
const { throwError } = require('../utils');
const { threadDao } = require('../models');
const { updateThreadDao, deleteThreadDao, createThreadDao } = threadDao;

const createThreadService = async (id, content) => {
  const result = await createThreadDao(id, content);
  if (result && result.message === 'post created') {
    return result;
  }
  throwError(400, "user doesn't exist");
};

const viewThreadService = async (id, next) => {
  try {
    let viewThread = await dataSource.query(
      `
      SELECT threads.id, users.nickname, users.profile_image, threads.user_id, threads.content, threads.created_at
      FROM threads
      LEFT JOIN users ON threads.user_id = users.id
      `,
    );

    let commentsMap = new Map();
    for (let i = 0; i < viewThread.length; i++) {
      let result = await dataSource.query(
        `
          SELECT threads.id, users.nickname, comments.comment, comments.created_at, comments.user_id AS comment_user_id
          FROM threads
          LEFT JOIN comments ON threads.id = comments.thread_id
          LEFT JOIN users ON comments.user_id = users.id
          WHERE threads.id = ?
          `,
        [viewThread[i].id],
      );
      if (result[0].nickname) {
        commentsMap.set(viewThread[i].id, result);
      }
    }
    return {
      data: viewThread.map((outerData) => {
        if (commentsMap.get(outerData.id)) {
          return {
            id: outerData.id,
            nickname: outerData.nickname,
            profileImage: outerData.profile_image,
            content: outerData.content,
            isMyPost: id === outerData.user_id,
            // commentCount: arr[index].length,
            comments: commentsMap.get(outerData.id).map((data) => {
              return { ...data, isMyReply: data.comment_user_id === id };
            }),
            createdAt: outerData.created_at,
          };
        } else {
          return {
            id: outerData.id,
            nickname: outerData.nickname,
            profileImage: outerData.profile_image,
            content: outerData.content,
            isMyPost: id === outerData.user_id,
            createdAt: outerData.created_at,
          };
        }
      }),
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
