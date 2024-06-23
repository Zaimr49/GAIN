"use strict";

// require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const passport = require('./auth');
// const { connectToDatabase } = require('./Database');
// const userRoutes = require('./src/routes/userRoutes');
// const authRoutes = require('./src/routes/authRoutes');
// const app = express();
// const PORT = process.env.PORT || 5000;
// // Middleware to parse JSON bodies
// app.use(express.json());
// // Initialize session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));
// // Initialize Passport and restore authentication state, if any, from the session
// app.use(passport.initialize());
// app.use(passport.session());
// // Connect to MongoDB and then start the server
// connectToDatabase().then((client) => {
//   // Make the MongoDB client available in the request object
//   app.use((req, res, next) => {
//     req.dbClient = client;
//     req.db = client.db('investment_advisor_db'); // Replace with your database name
//     next();
//   });
//   // Mount routes
//   app.use('/api/users', userRoutes);
//   app.use(authRoutes);
//   // Start the server
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((error) => {
//   console.error('Failed to connect to MongoDB', error);
// });
var express = require("express");

var _require = require("./Constant.js"),
    UserRoute = _require.UserRoute;

var app = express();
var port = process.env.PORT || 5001;

var connectDB = require("./src/DB/Connect.js");

require("dotenv").config();

var cors = require("cors"); // Importing Routes


var userRouter = require("./src/routes/userroutes.js");

app.use(cors());
app.use(express.json()); // For User Routes

app.use(UserRoute, userRouter);

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGO_URI));

        case 3:
          console.log("Connected to MongoDB");
          app.listen(port, function () {
            console.log("Server is running on port ".concat(port, "..."));
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

start();