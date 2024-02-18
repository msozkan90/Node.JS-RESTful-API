# Node.JS RESTful API

This project is a RESTful API for managing books and authors. It is built with Node.js, Express, MongoDB, and Docker for easy setup and deployment.

## Features

CRUD operations for books and authors.
Validation of input data for creating and updating books and authors.
Custom error handling for better error responses.
Docker integration for easy setup and deployment.
Automated tests for endpoints.

## Endpoints

### Books

- GET /api/books - Retrieve all books.
- GET /api/books/:id - Retrieve a single book by its ID.
- POST /api/books - Create a new book.
- PUT /api/books/:id - Update an existing book by its ID.
- DELETE /api/books/:id - Delete a book by its ID.

### Authors

- GET /api/authors - Retrieve all authors.
- GET /api/authors/:id - Retrieve a single author by its ID.
- POST /api/authors - Create a new author.
- PUT /api/authors/:id - Update an existing author by its ID.
- DELETE /api/authors/:id - Delete an author by its ID.

## Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development without Docker)
- Running with Docker
  Clone the repository:

```
git clone https://github.com/msozkan90/Node.JS-RESTful-API.git
```

Navigate to the project directory:

```
cd path/to/your/project
```

Build and run the containers with Docker Compose:

```
docker-compose -f docker-compose.yml up -d --build
```

The API should now be accessible at http://localhost:3000

Running Locally (Without Docker)
Ensure MongoDB is running on your local machine or use a MongoDB cloud service. You need to add MONGO_URI to .env file

Install dependencies:

```
npm install
```

Start the server:

```
npm start
```

Testing
To run the automated tests for the endpoints, use the following command:

```
npm test
```

Ensure MongoDB is accessible for the tests to run successfully.

## Postman
You can easily test the endpoints of the project by opening Postman and importing the NodeJS-Restful-Api.postman_collection.json file.

## Development

This project follows a modular structure for easy maintenance and scalability. The src/api directory contains the core components like controllers, services, models, routes, and utilities.

### Controllers

Handle incoming HTTP requests and delegate operations to services.

### Services

Contain the business logic and interact with models for data manipulation.

### Models

Define the schema for database collections.

### Routes

Define the API endpoints and associate them with controller functions.

### Utils

Contain helper functions and utilities like custom error handlers and validation schemas.

## License

[MIT](https://choosealicense.com/licenses/mit/)
