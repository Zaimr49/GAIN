const express = require('express');
const { connectToDatabase } = require('./Database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB and then start the server
connectToDatabase().then((client) => {
  // Make the MongoDB client available in the request object
  app.use((req, res, next) => {
    req.dbClient = client;
    req.db = client.db('investment_advisor_db'); // Replace with your database name, idk the name yet?
    next();
  });

  // Mount user routes
  app.use('/api/users', userRoutes);

  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});
