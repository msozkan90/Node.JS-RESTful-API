// Library
const express = require("express");
// Routes
const router = express.Router();
// Controllers
const { BookController } = require("../../controllers/index");
// Middlewares
const idCheck = require("../../middlewares/idCheckMiddleware");

// Get Book
router.get("/:id", idCheck, BookController.getBook);

// Create Book
router.post("/", BookController.createBook);

// Get All Books
router.get("/", BookController.getAllBooks);

// Update Book
router.put("/:id", idCheck, BookController.updateBook);

// Delete Book
router.delete("/:id", idCheck, BookController.deleteBook);

module.exports = router;
