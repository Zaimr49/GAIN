// src/routes/userDataRoutes.js

const express = require('express');
const { getUserData, upsertUserData } = require('../controllers/userDataController');
const router = express.Router();

router.get('/:userId', getUserData);
router.post('/:userId', upsertUserData);

module.exports = router;
