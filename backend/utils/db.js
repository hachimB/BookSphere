const mongoose = require('mongoose');
require('dotenv').config();

class MongooseConfig {
  constructor() {
    this.dbHost = process.env.DB_HOST || 'localhost';
    this.dbPort = process.env.DB_PORT || '5001';
    this.dbName = process.env.DB_NAME || 'book_db';
    this.connect();
  }

  connect() {
    mongoose.connect(`mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  }
}

module.exports = new MongooseConfig();
