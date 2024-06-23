const express = require('express');
const passport = require('../auth');
const router = express.Router();

// Route to start OAuth2.0 authentication with Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route that Google redirects to after authentication
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to your app's main page or dashboard
    res.redirect('/dashboard');
  }
);

// Route to log out the user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

module.exports = router;
