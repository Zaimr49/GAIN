"use strict";

var express = require("express");

var session = require('express-session');

var passport = require('./src/Auth/googleAuth');

require('dotenv').config();

var cors = require("cors");

var _require = require("./Constant"),
    UserRoute = _require.UserRoute;

var connectToDatabase = require("./src/DB/Connect"); // Importing Routes


var userRoutes = require("./src/routes/userRoutes");

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