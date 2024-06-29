// models/book.js

const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  content: String
});

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  author: String,
  genre: String,
  description: String,
  publishedYear: Number,
  price: Number,
  chapters: [chapterSchema], // Update here
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Book', bookSchema);
