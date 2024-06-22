// utils/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@bookstorage.e16oshu.mongodb.net/?retryWrites=true&w=majority&appName=BookStorage', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

const seedDatabase = async () => {
    // Your seeding logic here
};

module.exports = { connectDB, seedDatabase };
