const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;
    if (!name || !email || !password || !age || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword, age, gender });

    if (user) {
      return res.status(200).json({
        message: 'Successfully registered',
        _id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        token: generateJWT(user._id)
      });
    } else {
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
        return res.status(200).json({ message: 'User signed in successfully', _id: user.id, name: user.name, email: user.email,
            token: generateJWT(user._id)
         });
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
    const user = await User.findById(req.user._id);
    res.status(200).json({ 
      _id: user.id, 
      name: user.name, 
      email: user.email, 
      age: user.age,
      gender: user.gender
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, password, age, gender } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = age;
      if (gender) user.gender = gender;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
    
      await user.save();
  
      res.status(200).json({ message: 'User updated successfully', _id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  

  exports.getUserLibrary = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user.library);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }




  const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }
