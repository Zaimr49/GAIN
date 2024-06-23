const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;
