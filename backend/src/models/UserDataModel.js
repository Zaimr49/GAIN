const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferences: { type: Map, of: String },
  settings: { type: Map, of: String }
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
