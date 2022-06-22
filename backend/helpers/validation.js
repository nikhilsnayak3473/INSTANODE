const User = require('../models/User');

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  } else {
    return true;
  }
};

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
