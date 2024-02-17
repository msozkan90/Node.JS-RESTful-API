// Library
const Joi = require("joi");
// Utils
const Utils = require("../utils");

// Validator schema for creating a book
const bookCreateValidator = Joi.object({
  title: Joi.string().required(),
  author: Utils.objectIdValidator.required(),
  price: Joi.number().required(),
  isbn: Joi.string().required(),
  language: Joi.string().required(),
  numberOfPages: Joi.number().required(),
  publisher: Joi.string().required(),
});

// Validator schema for updating a book
const bookUpdateValidator = Joi.object({
  title: Joi.string(),
  author: Utils.objectIdValidator,
  price: Joi.number(),
  isbn: Joi.string(),
  language: Joi.string(),
  numberOfPages: Joi.number(),
  publisher: Joi.string(),
});

module.exports = {
  bookCreateValidator,
  bookUpdateValidator,
};
