const { constants } = require("../constants");

// This file sends clean error responses instead of crashing the server.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Do not show the full error stack when the project runs in production.
  const stackTrace = process.env.NODE_ENV === "production" ? null : err.stack;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        stackTrace,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Error",
        message: err.message,
        stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        message: err.message,
        stackTrace,
      });
      break;
    default:
      console.log("No error, all good!");
      break;
  }
};

module.exports = errorHandler;
