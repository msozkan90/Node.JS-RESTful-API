// Library
const request = require("supertest");
const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
// Routes
const bookRoutes = require("../routes/book/bookRoutes");
const { Book } = require("../models/index");

const app = express();
app.use(express.json());
app.use("/api/books", bookRoutes);

describe("Book API Endpoints", () => {
  let mongoServer; // MongoDB server instance
  let book; // Sample book data

  // Set up MongoDB server and sample book data before running tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // Create a new MongoDB server instance
    const mongoUri = mongoServer.getUri(); // Get the URI for the MongoDB server
    await mongoose.connect(mongoUri); // Connect to the MongoDB server

    // Create a sample book document in the database
    book = await Book.create({
      title: "Test Book",
      author: new mongoose.Types.ObjectId(),
      price: 9.99,
      isbn: "123-4567890123",
      language: "English",
      numberOfPages: 100,
      publisher: "Test Publisher",
    });
  });

  // Tear down MongoDB server after running tests
  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect from the MongoDB server
    await mongoServer.stop(); // Stop the MongoDB server instance
  });

  // Get All Books
  it("GET /api/books - Success", async () => {
    const result = await request(app).get("/api/books");
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body.response)).toBeTruthy();
  });

  // Create Book
  it("POST /api/books - Success", async () => {
    const newBook = {
      title: "Test Book",
      author: new mongoose.Types.ObjectId(),
      price: 10,
      isbn: "123456789",
      language: "English",
      numberOfPages: 100,
      publisher: "Test Publisher",
    };

    const result = await request(app).post("/api/books").send(newBook);
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("_id");
  });

  // Update Book
  it("PUT /api/books/:id - Success", async () => {
    const result = await request(app).put(`/api/books/${book._id}`).send({
      title: "Updated Test Book",
    });
    expect(result.statusCode).toEqual(200);
  });

  // Delete Book
  it("DELETE /api/books/:id - Success", async () => {
    const result = await request(app).delete(`/api/books/${book._id}`);
    expect(result.statusCode).toEqual(204);
  });

  // Required Fields Exception for Book Creation
  it("POST /api/books - Fail (Validation Error)", async () => {
    const newBook = {
      /* 'title','author','price','isbn','language','numberOfPages','publisher'
      fields are required */
    };
    const result = await request(app).post("/api/books").send(newBook);
    expect(result.statusCode).toEqual(400);
    expect(result).toHaveProperty("error");
  });

  // Trying to update a book that doesn't exist
  it("PUT /api/books/:id - Not Found", async () => {
    const nonExistingBookId = new mongoose.Types.ObjectId();
    const result = await request(app)
      .put(`/api/books/${nonExistingBookId}`)
      .send({
        title: "Non-existing Book",
      });

    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });

  // Trying to delete a book that doesn't exist
  it("DELETE /api/books/:id - Not Found", async () => {
    const nonExistingBookId = new mongoose.Types.ObjectId();
    const result = await request(app).delete(`/api/books/${nonExistingBookId}`);
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });

  // Request with invalid ID
  it("GET /api/books/:id - Invalid ID Format", async () => {
    const invalidBookId = "123";
    const result = await request(app).get(`/api/books/${invalidBookId}`);
    expect(result.statusCode).toEqual(400);
    expect(result).toHaveProperty("error");
  });

  // Trying to get a book that doesn't exist
  it("GET /api/books/:id - Not Found", async () => {
    const nonExistingBookId = new mongoose.Types.ObjectId();
    const result = await request(app).get(`/api/books/${nonExistingBookId}`);
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });
});
