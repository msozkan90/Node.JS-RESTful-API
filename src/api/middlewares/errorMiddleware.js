// Error handling middleware for handling errors in the application
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send({
    error: {
      message: err.message,
      status: err.status,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    },
    statusCode: err.statusCode,
  });
};

module.exports = errorHandler;
