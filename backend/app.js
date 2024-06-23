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
const express = require("express");
const session = require('express-session');
const passport = require('./src/Auth/googleAuth');
require('dotenv').config();
const cors = require("cors");

const { UserRoute } = require("./Constant");
const connectToDatabase = require("./src/DB/Connect");

// Importing Routes
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// For User Routes
app.use(UserRoute, userRoutes);
app.use(authRoutes); // Using authRoutes

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
