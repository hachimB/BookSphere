const mongoose = require('mongoose');

class DBClient {
  constructor() {
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_PORT = process.env.DB_PORT || '5001';
    this.DB_NAME = process.env.DB_NAME || 'books_db';
    this.mongoUri = `mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`;
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (err) {
      console.error('MongoDB disconnection error:', err);
    }
  }

  isConnected() {
    return mongoose.connection.readyState === 1;
  }
}

module.exports = DBClient;
