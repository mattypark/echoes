const auth = (req, res, next) => {
  // This is a temporary mock version
  req.user = { id: '123', name: 'Test User' };
  next();
};

module.exports = auth; 