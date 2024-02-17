// Library
const mongoose = require("mongoose");
const Joi = require("joi");

class Utils {
  // Validator for MongoDB ObjectId
  objectIdValidator = Joi.string().custom((value, helpers) => {
    // Check if the provided value is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(value)) {
      // If not valid, return an error
      return helpers.error("any.invalid");
    }
    // If valid, return the value
    return value;
  }, "MongoDB ObjectId");
}

// Export an instance of Utils class
module.exports = new Utils();
