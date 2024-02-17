// Models
const { Author } = require("../../models/index.js");
// Utils
const AppError = require("../../utils/appError.js");
const {
  authorCreateValidator,
  authorUpdateValidator,
} = require("../../utils/validations/authorValidation");

class AuthorService {
  // Get all authors
  getAllAuthors = async (page = 1, limit = 10) => {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const totalCount = await Author.countDocuments();
    const authors = await Author.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return {
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
        totalCount,
        hasNextPage: pageNumber * limitNumber < totalCount,
        hasPreviousPage: pageNumber > 1,
        nextPage: pageNumber * limitNumber < totalCount ? pageNumber + 1 : null,
        previousPage: pageNumber > 1 ? pageNumber - 1 : null,
      },
      response: authors,
    };
  };

  // Get author by ID
  getAuthor = async (id) => {
    const author = await Author.findById(id); // Find author by ID in the database
    if (!author) {
      // If author is not found, throw an error
      throw new AppError({
        error: { message: "Author not found", statusCode: 404 },
      });
    }
    return author; // Return the retrieved author
  };

  // Create a new author
  createAuthor = async (data) => {
    const { error } = authorCreateValidator.validate(data); // Validate author data
    if (error) {
      // If validation fails, throw an error
      throw new AppError({
        error: { message: error.details[0].message, statusCode: 400 },
      });
    }
    const author = await Author.create(data); // Create author in the database
    return author; // Return the created author
  };

  // Update an existing author by ID
  updateAuthor = async (id, data) => {
    const { error } = authorUpdateValidator.validate(data); // Validate updated author data
    if (error) {
      // If validation fails, throw an error
      throw new AppError({
        error: { message: error.details[0].message, status: 400 },
      });
    }
    const author = await Author.findByIdAndUpdate(id, data, { new: true }); // Find and update author by ID
    if (!author) {
      // If author is not found, throw an error
      throw new AppError({
        error: { message: "Author not found", statusCode: 404 },
      });
    }
    return author; // Return the updated author
  };

  // Delete an author by ID
  deleteAuthor = async (id) => {
    const author = await Author.findByIdAndDelete(id); // Find and delete author by ID
    if (!author) {
      // If author is not found, throw an error
      throw new AppError({
        error: { message: "Author not found", statusCode: 404 },
      });
    }
  };
}
module.exports = new AuthorService();
