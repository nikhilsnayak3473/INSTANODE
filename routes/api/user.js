const express = require('express');
const { registerUser } = require('../../controllers/user');
const { body } = require('express-validator');

const router = express.Router();

//@route POST api/user
//desc Register User
//@access Public
router.post(
  '/',
  [
    body('first_name', 'First Name must be within 3 - 20 characters').isLength({
      min: 3,
      max: 20,
    }),
    body('last_name', 'Last Name must be within 3 - 20 characters').isLength({
      min: 3,
      max: 20,
    }),
    body('email', 'Please enter a Vaild Email').isEmail(),
    body('password', 'Password must be within 8 - 20 characters').isLength({
      min: 3,
      max: 20,
    }),
    body('bDate', 'Birth Date is Required').not().isEmpty(),
    body('bMonth', 'Birth Month is Required').not().isEmpty(),
    body('bYear', 'Birth Year is Required').not().isEmpty(),
    body('gender', 'Gender is Required').not().isEmpty(),
  ],
  registerUser
);

module.exports = router;
