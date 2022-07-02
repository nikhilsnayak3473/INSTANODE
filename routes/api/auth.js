const express = require('express');
const { activateUser, loginUser } = require('../../controllers/user');

const router = express.Router();
//@route POST /api/user/activate
//desc Activate User
//@access Public
router.post('/activate', activateUser);

//@route POST /api/user/login
//desc Login User
//@access Public
router.post('/login', loginUser);

module.exports = router;
