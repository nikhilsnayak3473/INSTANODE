const User = require('../models/User');

exports.validateUsername = async (username) => {
  let cond = false;

  do {
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 2);
      cond = true;
    } else {
      cond = false;
    }
  } while (cond);

  return username;
};
