"use strict";

var express = require('express');

var _require = require('../controllers/userController'),
    getAllUsers = _require.getAllUsers,
    getUserById = _require.getUserById,
    createUser = _require.createUser,
    loginUser = _require.loginUser,
    googleSignup = _require.googleSignup,
    googleLogin = _require.googleLogin;

var router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', loginUser); // Google routes

router.post('/googleSignup', googleSignup);
router.post('/googleLogin', googleLogin);
module.exports = router;