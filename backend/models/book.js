import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
},
  price: {
    type: Number,
    required: true,
  },
});


const Book = mongoose.model('Book', bookSchema);

export default Book;
