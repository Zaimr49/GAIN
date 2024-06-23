"use strict";

var passport = require("passport");

var OAuth2Strategy = require("passport-google-oauth2").Strategy;

var User = require("../models/User"); // Import User model
// Load environment variables from .env file


require('dotenv').config();

passport.use(new OAuth2Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
}, function _callee(request, accessToken, refreshToken, profile, done) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            googleId: profile.id
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 8;
            break;
          }

          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          return _context.abrupt("return", done(null, user));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", done(_context.t0, null));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});
module.exports = passport;