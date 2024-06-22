const express = require('express');
const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = { username, email, password };
    const result = await req.db.collection('users').insertOne(newUser);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating user' });
  }
});

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await req.db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'An error occurred while getting users' });
  }
});

// Route to get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await req.db.collection('users').findOne({ _id: new require('mongodb').ObjectID(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'An error occurred while getting user' });
  }
});

// Add routes for updating and deleting users as necessary...

module.exports = router;
