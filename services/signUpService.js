const { dataSource } = require('../models');

exports.createUser = async (nickname, email, password, profileImage, phoneNumber, birthday) => {
  try {
    const userCredential = dataSource.query(
    `INSERT INTO users(nickname, email, password, profile_image, phone_number, birth_day) VALUES (?, ?, ?, ?, ?, ?);
    `,
    [nickname, email, password, profileImage, phoneNumber, birthday]
    );

  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};
