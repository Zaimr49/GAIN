const express = require('express');
const passport = require('../Auth/googleAuth'); // Adjust the path as needed

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/login/success'); // Redirect to login success route
  }
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User logged in", user: req.user });
  } else {
    res.status(400).json({ message: "Not authorized" });
  }
});

module.exports = router;
