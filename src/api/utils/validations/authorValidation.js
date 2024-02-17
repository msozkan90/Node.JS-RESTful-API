// Library
const Joi = require("joi");

// Validator schema for creating an author
const authorCreateValidator = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  birthDate: Joi.date().required(),
});

// Validator schema for updating an author
const authorUpdateValidator = Joi.object({
  name: Joi.string(),
  country: Joi.string(),
  birthDate: Joi.date(),
});

module.exports = {
  authorCreateValidator,
  authorUpdateValidator,
};
