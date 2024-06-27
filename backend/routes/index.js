// routes/index.js
const express = require('express');
const router = express.Router();
const { getAllBooks, getABook, deleteBook, addBook, updateBook } = require('../controllers/bookController');
const { registerUser, authenticateUser, getMe, updateUser, getUserLibrary } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


// Define books routes
router.route('/api/books').get(getAllBooks).post(protect, addBook);
router.route('/api/books/:id').get(getABook).delete(protect, deleteBook).put(protect, updateBook);



// Define users routes
router.route('/api/users').post(registerUser);
router.route('/api/users/login').post(authenticateUser);
router.route('/api/users/me').get(protect, getMe);
router.route('/api/users/:id').put(protect, updateUser);
router.route('/api/users/:id/library').get(protect, getUserLibrary);

module.exports = router;