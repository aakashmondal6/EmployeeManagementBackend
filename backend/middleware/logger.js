
// This middleware logs the HTTP method and URL of incoming requests to the console.
// It can be used for debugging and monitoring purposes in an Express.js application.
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = logger;