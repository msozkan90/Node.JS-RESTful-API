// Models
const bookModel = require("./book/bookModel");
const authorModel = require("./author/authorModel");

module.exports = {
  Book: bookModel,
  Author: authorModel,
};
