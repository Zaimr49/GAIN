"use strict";

// const express = require("express");
// const session = require('express-session');
// const passport = require('./src/Auth/googleAuth'); // Adjusted path
// require('dotenv').config();
// const { UserRoute } = require("./Constant.js");
// const app = express();
// const port = process.env.PORT || 5001;
// const connectToDatabase = require("./src/DB/Connect.js");
// const cors = require("cors");
// // Importing Routes
// const userRoutes = require("./src/routes/userRoutes.js");
// const authRoutes = require('./src/routes/authRoutes');
// app.use(cors());
// app.use(express.json());
// app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// // For User Routes
// app.use(UserRoute, userRoutes);
// app.use(authRoutes); // Using authRoutes
// const start = async () => {
//   try {
//     await connectToDatabase(process.env.MONGO_URI);
//     console.log("Connected to MongoDB");
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}...`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// start();
var express = require("express");

var session = require('express-session');

var passport = require('./src/Auth/googleAuth');

require('dotenv').config();

var cors = require("cors");

var _require = require("./Constant"),
    UserRoute = _require.UserRoute;

var connectToDatabase = require("./src/DB/Connect"); // Importing Routes


var userRoutes = require("./src/routes/userRoutes");

var authRoutes = require('./src/routes/authRoutes');

var app = express();
var port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // For User Routes

app.use(UserRoute, userRoutes);
app.use(authRoutes); // Using authRoutes

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectToDatabase(process.env.MONGO_URI));

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