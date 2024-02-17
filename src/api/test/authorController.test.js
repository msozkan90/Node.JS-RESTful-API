// Library
const request = require("supertest");
const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
// Routes
const authorRoutes = require("../routes/author/authorRoutes");
const { Author } = require("../models/index");

const app = express();
app.use(express.json());
app.use("/api/authors", authorRoutes);

describe("Author API Endpoints", () => {
  let mongoServer; // MongoDB server instance
  let author; // Sample author data

  // Set up MongoDB server and sample author data before running tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // Create a new MongoDB server instance
    const mongoUri = mongoServer.getUri(); // Get the URI for the MongoDB server
    await mongoose.connect(mongoUri); // Connect to the MongoDB server

    // Create a sample author document in the database
    author = await Author.create({
      name: "Ali Budak",
      country: "Turkey",
      birthDate: "1990-01-01",
    });
  });

  // Tear down MongoDB server after running tests
  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect from the MongoDB server
    await mongoServer.stop(); // Stop the MongoDB server instance
  });

  // Get All Authors
  it("GET /api/author - Success", async () => {
    const result = await request(app).get("/api/authors");
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body.response)).toBeTruthy();
  });

  // Create Author
  it("POST /api/author - Success", async () => {
    const newAuthor = {
      name: "Mehmet Budak",
      country: "Turkey",
      birthDate: "1995-01-01",
    };

    const result = await request(app).post("/api/authors").send(newAuthor);
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("_id");
  });

  // Update Author
  it("PUT /api/author/:id - Success", async () => {
    const result = await request(app).put(`/api/authors/${author._id}`).send({
      name: "Updated Test Author",
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body.name).toEqual("Updated Test Author");
  });

  // Delete Author
  it("DELETE /api/authors/:id - Success", async () => {
    const result = await request(app).delete(`/api/authors/${author._id}`);
    expect(result.statusCode).toEqual(204);
  });

  // Required Fields Exception for Author Creation
  it("POST /api/authors - Fail (Validation Error)", async () => {
    const newAuthor = {
      // 'name','country' and 'birthDate' fields are required
    };
    const result = await request(app).post("/api/authors").send(newAuthor);
    expect(result.statusCode).toEqual(400);
    expect(result).toHaveProperty("error");
  });

  // Trying to update a author that doesn't exist
  it("PUT /api/authors/:id - Not Found", async () => {
    const nonExistingAuthorId = new mongoose.Types.ObjectId();
    const result = await request(app)
      .put(`/api/authors/${nonExistingAuthorId}`)
      .send({
        name: "Non-existing Author",
      });

    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });

  // Trying to delete a author that doesn't exist
  it("DELETE /api/authors/:id - Not Found", async () => {
    const nonExistingAuthorId = new mongoose.Types.ObjectId();
    const result = await request(app).delete(
      `/api/authors/${nonExistingAuthorId}`
    );
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });

  // Request with invalid ID
  it("GET /api/authors/:id - Invalid ID Format", async () => {
    const invalidAuthorId = "123";
    const result = await request(app).get(`/api/authors/${invalidAuthorId}`);
    expect(result.statusCode).toEqual(400);
    expect(result).toHaveProperty("error");
  });

  // Trying to get a author that doesn't exist
  it("GET /api/authors/:id - Not Found", async () => {
    const nonExistingAuthorId = new mongoose.Types.ObjectId();
    const result = await request(app).get(
      `/api/authors/${nonExistingAuthorId}`
    );
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("error");
  });
});
