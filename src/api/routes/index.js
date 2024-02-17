// Library
const express = require("express");
// Routes
const bookRoutes = require("./book/bookRoutes");
const authorRoutes = require("./author/authorRoutes");

const router = express.Router();

// Define routes for books and authors
router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);

module.exports = router;
