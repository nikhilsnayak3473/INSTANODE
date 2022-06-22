const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const { generateToken } = require('../helpers/tokens');
const { sendVerificationEmail } = require('../helpers/mailer');

exports.registerUser = async (req, res) => {
  try {
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

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email address' });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: 'First Name must be between 3 and 30 characters' });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: 'Last Name must be between 3 and 30 characters' });
    }

    if (!validateLength(password, 8, 40)) {
      return res
        .status(400)
        .json({ message: 'Password must be atleast 8 characters' });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: 'Email address already Exist' });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
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
      { id: user._id.toString() },
      '30m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register Success!! Please activate your account',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.activateUser = (req, res) => {
  const { token } = req.body;
  console.log(token);
};
