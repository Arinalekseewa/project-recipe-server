export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;

  res.status(status).json({
    status: 'error',
    code: status,
    message: err.message,
    ...(err.details && { details: err.details }),
  });
};
