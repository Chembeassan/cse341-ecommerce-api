// middleware/authenticate.js
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Authentication required',
    message: 'Please log in to access this resource',
    authenticated: false
  });
};

module.exports = {
  isAuthenticated
};