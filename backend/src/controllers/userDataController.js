const UserData = require('../models/userDataModel');

// Get user data
const getUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await UserData.findOne({ userId });
    if (!userData) {
      return res.status(404).json({ message: 'User data not found' });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user data
const upsertUserData = async (req, res) => {
  const { userId } = req.params;
  const { preferences, settings } = req.body;
  try {
    const userData = await UserData.findOneAndUpdate(
      { userId },
      { preferences, settings },
      { new: true, upsert: true }
    );
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserData, upsertUserData };
