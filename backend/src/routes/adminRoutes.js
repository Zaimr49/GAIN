const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authMiddleware');

router.get('/users', ensureAuthenticated, ensureAdmin, getAllUsers);
router.delete('/users/:userId', ensureAuthenticated, ensureAdmin, deleteUser);

module.exports = router;