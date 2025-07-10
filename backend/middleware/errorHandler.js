// Error handling middleware as a internal server error handler for the application.
// It logs the error stack and sends a generic 500 response to the client.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;