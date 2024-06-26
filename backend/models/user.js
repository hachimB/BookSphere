const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name']
  },

  email: {
    type: String,
    required: [true, 'Please add your email'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'Please add your password'],
  },

  age: {
    type: Number,
    required: [true, 'Please add your age'],
  },

  gender: {
    type: String,
    required: [true, 'Please add your gender'],
    enum: ['Male', 'Female'] 
  },

},
{
  timestamps: true,
})

module.exports = mongoose.model('User', bookSchema);