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
  }

},
{
  timestamps: true,
})

module.exports = mongoose.model('User', bookSchema);
