// Library
const express = require("express");
// Routes
const router = express.Router();
// Controllers
const { AuthorController } = require("../../controllers/index");
// Middlewares
const idCheck = require("../../middlewares/idCheckMiddleware");

// Get Author
router.get("/:id", idCheck, AuthorController.getAuthor);

// Create Author
router.post("/", AuthorController.createAuthor);

// Get All Authors
router.get("/", AuthorController.getAllAuthors);

// Update Author
router.put("/:id", idCheck, AuthorController.updateAuthor);

// Delete Author
router.delete("/:id", idCheck, AuthorController.deleteAuthor);

module.exports = router;
