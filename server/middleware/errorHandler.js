export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Error',
      message: 'This email is already registered'
    });
  }

  res.status(err.status || 500).json({
    error: err.name || 'Server Error',
    message: err.message || 'Something went wrong'
  });
};