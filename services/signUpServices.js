const { dataSource } = require('../models');

const createUser = async (name, email, password, profileImage, nickname, phoneNumber, birthday) => {
  try {
    return await dataSource.query(
    `INSERT INTO users(
      name,
      email,
      password
      profile_image,
      nickname,
      phone_number,
      birthday
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    [name, email, password, profileImage, nickname, phoneNumber,birthday]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
createUser
}



