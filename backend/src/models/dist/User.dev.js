"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required"]
  }
}); // Pre Hash Function

userSchema.pre("save", function _callee(next) {
  var hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified("password")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 5));

        case 4:
          hash = _context.sent;
          this.password = hash;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // Hashed Password Validity Check Function

userSchema.methods.isPasswordValid = function _callee2(password) {
  var compare;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(password, this.password));

        case 2:
          compare = _context2.sent;
          return _context2.abrupt("return", compare);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = mongoose.model("User", userSchema);
module.exports = User;