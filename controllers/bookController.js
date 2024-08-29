const Book = require('../models/Book');

// Controller functions

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, description, price } = req.body;
  const newBook = new Book({ title, author, description, price });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { title, author, description, price } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, price },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(deletedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};
