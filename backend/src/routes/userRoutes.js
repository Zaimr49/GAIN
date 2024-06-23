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
const express = require('express');
const { getAllUsers, getUserById, createUser, loginUser, googleSignup,googleLogin } = require('../controllers/userController');
const router = express.Router();

// Existing routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', loginUser);

// New Google signup route
router.post('/googleSignup', googleSignup);
router.post('/googleLogin', googleLogin);


module.exports = router;
