// seedDB.js

const mongoose = require('mongoose');
const Book = require('./models/book'); // Adjust the path as per your project structure

// MongoDB connection URI
const mongoURI = 'mongodb+srv://root:root@bookstorage.e16oshu.mongodb.net/?retryWrites=true&w=majority&appName=BookStorage';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define book data
const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        description: 'A classic novel about the American Dream',
        price: 20
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        description: 'A powerful story of racial injustice and moral growth',
        price: 15
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        description: 'A dystopian vision of a totalitarian future society',
        price: 255
    }
];

// Function to seed initial data into the database
const seedDatabase = async () => {
    try {
        await Book.deleteMany(); // Clear existing data
        await Book.insertMany(books); // Insert new data
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect(); // Disconnect after seeding
    }
};

// Seed the database
seedDatabase();
