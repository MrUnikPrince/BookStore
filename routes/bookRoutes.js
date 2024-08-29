const router = require('express').Router();
const bookController = require('../controllers/bookController');

// Get request for books 
router.get('/', bookController.getAllBooks);

// Post Request for books (Create New Book)
router.post('/', bookController.createBook);

// Get book by Id
router.get('/:id', bookController.getBookById);

// Update Book
router.put('/:id', bookController.updateBook);

// Delete Book
router.delete('/:id', bookController.deleteBook);

module.exports = router;