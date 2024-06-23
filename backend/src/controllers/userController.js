const User = require("../models/User");
const bcrypt = require('bcrypt');

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one user
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, name, age, gender } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password, name, age, gender });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ _id: user._id, email: user.email, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Existing controller functions (getAllUsers, getUserById, createUser, loginUser)

// const googleSignup = async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { name, email, picture, sub } = ticket.getPayload();

//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = new User({
//         googleId: sub,
//         name: name,
//         email: email,
//         image: picture,
//         username: sub, // Example: using Google ID as username
//         password: 'temporaryPassword', // Example: temporary password for non-local users
//         age: 22, // Example: default age
//         gender: 'Other', // Example: default gender
//       });

//       await user.save();
//     }

//     res.status(200).json({ message: 'User signed up successfully', user });
//   } catch (error) {
//     console.error('Google signup error:', error);
//     res.status(500).json({ message: 'Google signup failed', error: error.message });
//   }
// };
// Google OAuth signup
const googleSignup = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });

    if (user) {
      // User already exists, return an error
      return res.status(400).json({ message: 'User already exists' });
    }

    // User does not exist, create a new user
    user = new User({
      googleId: sub,
      name: name,
      email: email,
      image: picture,
      username: sub, // Example: using Google ID as username
      password: 'temporaryPassword', // Example: temporary password for non-local users
      age: 22, // Example: default age
      gender: 'Other', // Example: default gender
    });

    await user.save();

    res.status(200).json({ message: 'User signed up successfully', user });
  } catch (error) {
    console.error('Google signup error:', error);
    res.status(500).json({ message: 'Google signup failed', error: error.message });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, sub } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    // User found, log them in
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed', error: error.message });
  }
};


module.exports = { getAllUsers, getUserById, createUser, loginUser, googleSignup,googleLogin };






