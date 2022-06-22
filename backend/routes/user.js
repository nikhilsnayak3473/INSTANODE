const express = require('express');
const { registerUser, activateUser } = require('../controllers/user');

const router = express.Router();

//@route POST /api/user/register
//desc Register User
//@access Public
router.post('/register', registerUser);

//@route POST /api/user/activate
//desc Register User
//@access Public
router.post('/activate', activateUser);

module.exports = router;
