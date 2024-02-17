// Library
const mongoose = require("mongoose");
// Utils
const AppError = require("../utils/appError");

// Middleware function to check if a given parameter is a valid MongoDB ObjectId
const idCheck = (req, res, next, paramName = "id") => {
  const id = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      new AppError({ error: { message: "Invalid ID format", statusCode: 400 } })
    );
  }
  next();
};

module.exports = idCheck;
