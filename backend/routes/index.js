// routes/index.js
const express = require('express');
const router = express.Router();
const { getAllBooks, getABook, deleteBook } = require('../controllers/bookController');

// Define routes
router.route('/api/books').get(getAllBooks);
router.route('/api/books/:id').get(getABook).delete(deleteBook);

module.exports = router;
