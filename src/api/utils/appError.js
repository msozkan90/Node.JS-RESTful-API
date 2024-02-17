// Custom error class for handling application errors
class AppError extends Error {
  constructor(err) {
    super(err.error.message);

    this.statusCode = err.error.statusCode;

    this.status = `${err.error.statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
