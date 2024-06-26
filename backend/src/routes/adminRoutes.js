const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/adminControllers');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../Auth/authMiddleware');

router.get('/users', ensureAuthenticated, ensureAdmin, getAllUsers);
router.delete('/users/:userId', ensureAuthenticated, ensureAdmin, deleteUser);

module.exports = router;