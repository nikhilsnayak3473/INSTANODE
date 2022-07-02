const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../config/tokens');
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
    // const emailVerificationToken = generateToken(
    //   { id: user._id.toString() },
    //   '30m'
    // );
    // const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // sendVerificationEmail(user.email, user.first_name, url);
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

exports.activateUser = async (req, res) => {
  try {
    const { token } = req.body;
    const user = verifyToken(token);
    const check = await User.findById(user.id);
    if (check.verified) {
      return res
        .status(400)
        .json({ message: 'This account is already activated' });
    }
    await User.findByIdAndUpdate(user.id, { verified: true });
    res.json({ message: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This Email doesn't exist" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: 'Invaild password' });
    }
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Login Successfull',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
