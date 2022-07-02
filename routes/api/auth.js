const express = require('express');
const { body } = require('express-validator');
const { activateUser, loginUser, getUser } = require('../../controllers/auth');

const auth = require('../../middleware/auth');

const router = express.Router();

//@route PUT api/auth
//desc Activate User
//@access Private
router.put('/', auth, activateUser);

//@route GET api/auth
//desc Get User by ID
//@access Private
router.get('/', auth, getUser);

//@route POST api/auth
//desc Login User
//@access Public
router.post(
  '/',
  [
    body('email', 'Please Enter a Vaild Email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
);

module.exports = router;
