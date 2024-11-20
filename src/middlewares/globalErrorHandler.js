import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!(err instanceof ApiError)) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    code: statusCode,
    message
  });
};

export default globalErrorHandler;
