const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required '});
    }

    // The user already exists ???
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create a new user
    const user = await User.create({ name, email, password:  hashedPassword });

    if (user) {
      return res.status(200).json({ _id: user.id, name: name, email: user.email }); 
    }
    else {
      return res.status(400).json({ error: 'User not registered' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.authenticateUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required '});
      }
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({ message: 'User signed in successfully', _id: user.id, name: user.name, email: user.email });
      }
      else {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  exports.getMe = async (req, res) => {
    try {
      res.status(200).json({ message: 'user name' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
