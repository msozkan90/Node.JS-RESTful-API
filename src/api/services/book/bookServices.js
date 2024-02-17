// Models
const { Book } = require("../../models/index.js"); // Import the Book model
// Utils
const AppError = require("../../utils/appError.js"); // Import custom error utility
const {
  bookCreateValidator,
  bookUpdateValidator,
} = require("../../utils/validations/bookValidation"); // Import validation schemas for book creation and update

class BookService {
  // Get all books
  getAllBooks = async (page = 1, limit = 10) => {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const totalCount = await Book.countDocuments();
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalCount,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
        previousPage: pageNumber > 1 ? pageNumber - 1 : null,
      },
      response: books,
    };
  };

  // Get a book by ID
  getBook = async (id) => {
    const book = await Book.findById(id).populate("author"); // Find a book by its ID
    if (!book) {
      // If book is not found, throw a 404 error
      throw new AppError({
        error: { message: "Book not found", statusCode: 404 },
      });
    }
    return book; // Return the found book
  };

  // Create a new book
  createBook = async (data) => {
    const { error } = bookCreateValidator.validate(data); // Validate the provided book data
    if (error) {
      // If data is invalid, throw a 400 error with validation details
      throw new AppError({
        error: { message: error.details[0].message, statusCode: 400 },
      });
    }
    const createdBook = await Book.create(data); // Create a new book using the provided data
    const book = await Book.findById(createdBook._id).populate("author");

    return book; // Return the newly created book
  };

  // Update an existing book by ID
  updateBook = async (id, data) => {
    const { error } = bookUpdateValidator.validate(data); // Validate the provided book data for update
    if (error) {
      // If data is invalid, throw a 400 error with validation details
      throw new AppError({
        error: { message: error.details[0].message, status: 400 },
      });
    }
    const book = await Book.findByIdAndUpdate(id, data, { new: true }).populate(
      "author"
    ); // Find and update the book by its ID
    if (!book) {
      // If book is not found, throw a 404 error
      throw new AppError({
        error: { message: "Book not found", statusCode: 404 },
      });
    }
    return book; // Return the updated book
  };

  // Delete a book by ID
  deleteBook = async (id) => {
    const book = await Book.findByIdAndDelete(id); // Find and delete the book by its ID
    if (!book) {
      // If book is not found, throw a 404 error
      throw new AppError({
        error: { message: "Book not found", statusCode: 404 },
      });
    }
  };
}

module.exports = new BookService();
