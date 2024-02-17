// Library
const asyncHandler = require("express-async-handler");
// Services
const { BookService } = require("../../services/index");

class BookController {
  // Get All Books
  getAllBooks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const books = await BookService.getAllBooks(page, limit);
    res.json(books);
  });

  // Get Book
  getBook = asyncHandler(async (req, res) => {
    const book = await BookService.getBook(req.params.id);
    res.json(book);
  });

  // Create Book
  createBook = asyncHandler(async (req, res) => {
    const book = await BookService.createBook(req.body, res);
    res.status(201).json(book);
  });

  // Update Book
  updateBook = asyncHandler(async (req, res) => {
    const book = await BookService.updateBook(req.params.id, req.body, res);
    res.json(book);
  });

  // Delete Book
  deleteBook = asyncHandler(async (req, res) => {
    await BookService.deleteBook(req.params.id);
    res.status(204).send();
  });
}

module.exports = new BookController();
