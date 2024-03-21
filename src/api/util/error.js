const httpStatus = require("http-status");
const expressValidation = require("express-validation");
const APIError = require("./api-error");
const { env } = require("../../config/var");
const { notFoundError } = require("../../config/user-messages");

/**
 * error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== "development") {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * if error is not an instance of API error, convert it.
 * @public
 */
exports.converter = (err, req, res) => {
  let convertedError = err;

  if (
    err instanceof expressValidation.ValidationError ||
    !(err instanceof APIError)
  ) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: notFoundError,
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};

/**
 * catch entry duplicate in db for unique fields
 * @public
 */
exports.checkDuplicate = (err, res, name = "") => {
  const { errmsg: errMsg } = err;
  let message = `${name} with same `;
  if (errMsg.includes("email_1")) message += "email already exists";

  return res.status(400).send({ success: false, message });
};
