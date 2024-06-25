const express = require("express");
const session = require('express-session');
const passport = require('./src/Auth/googleAuth');
require('dotenv').config();
const cors = require("cors");

const { UserRoute } = require("./Constant");
const connectToDatabase = require("./src/DB/Connect");

// Importing Routes
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());const express = require("express");
const session = require('express-session');
const passport = require('./src/Auth/googleAuth');
require('dotenv').config();
const cors = require("cors");

const { UserRoute } = require("./Constant");
const connectToDatabase = require("./src/DB/Connect");

// Importing Routes
const userRoutes = require("./src/routes/userRoutes");
const userDataRoutes = require("./src/routes/userDataRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// For User Routes
app.use(UserRoute, userRoutes);
app.use('/api/userdata', userDataRoutes);
app.use('/api/admin', adminRoutes);

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();


// For User Routes
app.use(UserRoute, userRoutes);

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
