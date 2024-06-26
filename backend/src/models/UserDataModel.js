const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferences: { type: Map, of: String },
  settings: { type: Map, of: String }
});

let UserData;
try {
  UserData = mongoose.model('UserData');
} catch (error) {
  UserData = mongoose.model('UserData', userDataSchema);
}

module.exports = UserData;
