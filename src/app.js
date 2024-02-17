// Library
const express = require("express");
const bodyParser = require("body-parser");
// Routes
const routes = require("./api/routes/index");
// Middleware
const errorHandler = require("./api/middlewares/errorMiddleware");

// Create Express application
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Parse JSON bodies
app.use(bodyParser.json());

// Define API routes
app.use("/api", routes);

// Apply error handling middleware
app.use(errorHandler);

module.exports = app;
