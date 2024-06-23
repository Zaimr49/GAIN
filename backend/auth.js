const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { client, connectToDatabase } = require('./Database');

// Load environment variables (ensure you set these in your environment)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL; // URL to handle the Google auth callback

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('investment_advisor_db');
    const usersCollection = db.collection('users');
    
    // Find or create user
    let user = await usersCollection.findOne({ googleId: profile.id });
    if (!user) {
      user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      };
      await usersCollection.insertOne(user);
    }
    return done(null, user);
  } catch (error) {
    console.error('Error in Google Strategy:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('investment_advisor_db');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ googleId: id });
    done(null, user);
  } catch (error) {
    console.error('Error in deserialization:', error);
    done(error, null);
  }
});

module.exports = passport;
