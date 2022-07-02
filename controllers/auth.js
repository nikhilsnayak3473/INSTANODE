const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { generateToken } = require('../config/tokens');
const User = require('../models/User');

exports.activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.verified) {
      return res
        .status(400)
        .json({ message: 'This account is already activated' });
    }
    await User.findByIdAndUpdate(req.user.id, { verified: true });
    res.json({ feedback: [{ msg: 'Account activated Sucessfully' }] });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('SERVER ERROR');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

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

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('SERVER ERROR');
  }
};
