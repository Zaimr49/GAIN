"use strict";

var express = require("express");

var _require = require("../controllers/userController"),
    getAllUsers = _require.getAllUsers,
    getUserById = _require.getUserById,
    createUser = _require.createUser,
    loginUser = _require.loginUser;

var router = express.Router(); // Routes

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/signup", createUser);
router.post("/login", loginUser);
module.exports = router;