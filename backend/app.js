const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const { connectToDatabase } = require('./Database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB and then start the server
connectToDatabase().then((client) => {
  // Make the MongoDB client available in the request object
  app.use((req, res, next) => {
    req.dbClient = client;
    req.db = client.db('userdetails'); // Replace with your database name
    next();
  });

  // Mount routes
  app.use('/api/users', userRoutes);
  app.use(authRoutes);

  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});
