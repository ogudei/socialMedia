const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.validationErrors = [];
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  let errorObjectArray = [];
  for (let index = 0; index < errors.errors.length; index++) {
    var errorObject = {
      data: errors.errors[index].value,
      notification: errors.errors[index].msg,
      isValid: 0,
    };
    errorObjectArray.push(errorObject);
  }
  req.validationErrors = errorObjectArray;

  return next();
};

module.exports = {validate};
