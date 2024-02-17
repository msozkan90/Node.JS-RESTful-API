// Library
const http = require("http");
const mongoose = require("mongoose");

// Import the Express app
const app = require("./app");

// Define the port for the server to listen on
const port = process.env.PORT || 3000;

// Create a server using the Express app
const server = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // MongoDB connected successfully
    console.log("MongoDB connected");
    // Start the server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    // Error occurred during MongoDB connection
    console.error("Error connecting to MongoDB:", err);
  });
