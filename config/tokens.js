const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
    expiresIn: expired,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_TOKEN);
};
