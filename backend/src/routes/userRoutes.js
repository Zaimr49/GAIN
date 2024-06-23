const express = require('express');
const { getAllUsers, getUserById, createUser, loginUser, googleSignup,googleLogin } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', loginUser);

// Google routes
router.post('/googleSignup', googleSignup);
router.post('/googleLogin', googleLogin);


module.exports = router;
