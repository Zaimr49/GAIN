"use strict";

// const express = require("express");
// const { getAllUsers, getUserById, createUser,loginUser } = require("../controllers/userController");
// const router = express.Router();
// // Routes
// router.get("/users", getAllUsers);
// router.get("/users/:id", getUserById);
// router.post("/signup", createUser);
// router.post("/login", loginUser);
// module.exports = router;
// module.exports = router;
var express = require('express');

var _require = require('../controllers/userController'),
    getAllUsers = _require.getAllUsers,
    getUserById = _require.getUserById,
    createUser = _require.createUser,
    loginUser = _require.loginUser,
    googleSignup = _require.googleSignup,
    googleLogin = _require.googleLogin;

var router = express.Router(); // Existing routes

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', loginUser); // New Google signup route

router.post('/googleSignup', googleSignup);
router.post('/googleLogin', googleLogin);
module.exports = router;