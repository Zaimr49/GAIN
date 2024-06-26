const express = require('express');
const {getAllUsers, getUserById, createUser, loginUser, googleSignup, googleLogin} = require('../controllers/userController');
const {getUserData, upsertUserData} = require('../controllers/userDataController');
const { ensureAuthenticated } = require('../Auth/authMiddleware');
const router = express.Router();

// User routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', loginUser);

// Google routes
router.post('/googleSignup', googleSignup);
router.post('/googleLogin', googleLogin);

// User data routes (with authentication)
router.get('/userdata/:userId', ensureAuthenticated, getUserData);
router.post('/userdata/:userId', ensureAuthenticated, upsertUserData);

module.exports = router;
