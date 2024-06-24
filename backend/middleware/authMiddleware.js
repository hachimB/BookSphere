const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];

        //we verify the token here
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get the user from the token
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
          console.error(error);
          return res.status(401).json({ error: 'Not authorized' });
      }
    }
    if (!token) {
      return res.status(401).json({ error: 'No token' });
    }
}

module.exports = protect;