// models/book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    publishedYear: Number,
    price: Number,
});

module.exports = mongoose.model('Book', bookSchema);
