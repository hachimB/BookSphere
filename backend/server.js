// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB, seedDatabase } = require('./utils/db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Seed database on server startup
seedDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use(routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
