const { dataSource } = require('../models');
const { throwError } = require('../utils');

const createComment = async (userId, content, threadId, next) => {
    try {
        // 코멘트 생성
        const comment = await dataSource.query(`
        INSERT INTO comments (content, user_id, thread_id) VALUES (?, ?, ?)`,
        [content, userId, threadId])
    } catch (err) {
        console.error(err);
        next(err);
    }
}