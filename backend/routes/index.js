// routes/index.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes
router.get('/api/books', bookController.getAllBooks);

module.exports = router;
