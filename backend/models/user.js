const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

  library: {
    type: [{
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      title: String,
      author: String,
      genre: String,
      description: String,
      publishedYear: Number,
      price: Number
    }],
    default: []
  },

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
