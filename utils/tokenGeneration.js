const jwt = require('jsonwebtoken');

exports.tokenGeneration = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  return token;
};
