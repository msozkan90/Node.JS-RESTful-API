// Library
const asyncHandler = require("express-async-handler");
// Services
const { AuthorService } = require("../../services/index");

class AuthorController {
  // Get All Authors
  getAllAuthors = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const authors = await AuthorService.getAllAuthors(page, limit);
    res.json(authors);
  });

  // Get Author
  getAuthor = asyncHandler(async (req, res) => {
    const author = await AuthorService.getAuthor(req.params.id);
    res.json(author);
  });

  // Create Author
  createAuthor = asyncHandler(async (req, res) => {
    const author = await AuthorService.createAuthor(req.body);
    res.status(201).json(author);
  });

  // Update Author
  updateAuthor = asyncHandler(async (req, res) => {
    const author = await AuthorService.updateAuthor(req.params.id, req.body);
    res.json(author);
  });

  // Delete Author
  deleteAuthor = asyncHandler(async (req, res) => {
    await AuthorService.deleteAuthor(req.params.id);
    res.status(204).send();
  });
}

module.exports = new AuthorController();
