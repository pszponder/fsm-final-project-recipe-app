// ====================================
// DEFINE MIDDLEWARE FOR ERROR HANDLING
// ====================================
const errorHandler = (err, req, res, next) => {
  // Default the status code to 500 if a status code is not defined
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode); // Set response status code

  // Add a custom Error Object to the response
  // Only show a stack trace when not in production environment
  res.json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });

  next();
};

module.exports = { errorHandler };
