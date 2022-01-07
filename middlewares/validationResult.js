const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require("express-validator");

// Send error in validation
let validator = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(
      res,
      "Validation Error",
      errors.array()
    );
  } else {
    next();
  }
};

module.exports = validator;
