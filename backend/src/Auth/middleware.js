const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  };
  
  module.exports = { ensureAuthenticated, ensureAdmin };