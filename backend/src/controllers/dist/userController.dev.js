"use strict";

var User = require("../models/User");

var bcrypt = require('bcrypt');

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Get all users

var getAllUsers = function getAllUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context.sent;
          res.status(200).json(users);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get one user


var getUserById = function getUserById(req, res) {
  var id, user;
  return regeneratorRuntime.async(function getUserById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findById(id));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 7:
          res.status(200).json(user);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; // Create a new user


var createUser = function createUser(req, res) {
  var _req$body, username, email, password, name, age, gender, existingUser, newUser;

  return regeneratorRuntime.async(function createUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, name = _req$body.name, age = _req$body.age, gender = _req$body.gender; // Check if the email is already registered

          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Email already exists'
          }));

        case 7:
          // Create a new user
          newUser = new User({
            username: username,
            email: email,
            password: password,
            name: name,
            age: age,
            gender: gender
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          res.status(201).json({
            message: 'User created successfully',
            user: newUser
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Failed to create user',
            error: _context3.t0.message
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // Login a user


var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch;

  return regeneratorRuntime.async(function loginUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context4.sent;

          if (isMatch) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username
          });
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            message: 'Server error',
            error: _context4.t0.message
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 15]]);
}; // Existing controller functions (getAllUsers, getUserById, createUser, loginUser)
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


var googleSignup = function googleSignup(req, res) {
  var token, ticket, _ticket$getPayload, name, email, picture, sub, user;

  return regeneratorRuntime.async(function googleSignup$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.body.token;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
          }));

        case 4:
          ticket = _context5.sent;
          _ticket$getPayload = ticket.getPayload(), name = _ticket$getPayload.name, email = _ticket$getPayload.email, picture = _ticket$getPayload.picture, sub = _ticket$getPayload.sub;
          _context5.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            googleId: sub
          }));

        case 8:
          user = _context5.sent;

          if (!user) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 11:
          // User does not exist, create a new user
          user = new User({
            googleId: sub,
            name: name,
            email: email,
            image: picture,
            username: sub,
            // Example: using Google ID as username
            password: 'temporaryPassword',
            // Example: temporary password for non-local users
            age: 22,
            // Example: default age
            gender: 'Other' // Example: default gender

          });
          _context5.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.status(200).json({
            message: 'User signed up successfully',
            user: user
          });
          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](1);
          console.error('Google signup error:', _context5.t0);
          res.status(500).json({
            message: 'Google signup failed',
            error: _context5.t0.message
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var googleLogin = function googleLogin(req, res) {
  var token, ticket, _ticket$getPayload2, email, sub, user;

  return regeneratorRuntime.async(function googleLogin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          token = req.body.token;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
          }));

        case 4:
          ticket = _context6.sent;
          _ticket$getPayload2 = ticket.getPayload(), email = _ticket$getPayload2.email, sub = _ticket$getPayload2.sub;
          _context6.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            googleId: sub
          }));

        case 8:
          user = _context6.sent;

          if (user) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'User not found. Please sign up.'
          }));

        case 11:
          // User found, log them in
          res.status(200).json({
            message: 'Login successful',
            user: user
          });
          _context6.next = 18;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](1);
          console.error('Google login error:', _context6.t0);
          res.status(500).json({
            message: 'Google login failed',
            error: _context6.t0.message
          });

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser: createUser,
  loginUser: loginUser,
  googleSignup: googleSignup,
  googleLogin: googleLogin
};