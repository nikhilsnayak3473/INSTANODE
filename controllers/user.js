const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../config/tokens');
const { sendVerificationEmail } = require('../config/mailer');
const { validateUsername } = require('../config/validation');

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDate,
      gender,
    } = req.body;

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);
    let tempUsername = first_name + last_name;
    let username = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      username,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDate,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      {
        user: {
          id: user.id,
        },
      },
      '30m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

    sendVerificationEmail(user.email, user.first_name, url);

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = generateToken(payload, '7d');
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('SERVER ERROR');
  }
};
